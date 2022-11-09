const axios = require('axios');
const { transaction } = require("../../models");
require('dotenv').config();
const env = process.env;

const getLastTimestampFromChain = async () => {
    try {
            let timestamp;
            console.log(`${env.NODE_URI}/api/v1/transactions/?order=desc&limit=1`);

            const {data} = await axios.get(`${env.NODE_URI}/api/v1/transactions/?order=desc&limit=1`)     
            timestamp = data.transactions[0].consensus_timestamp; // 마지막 합의한 타임스탬프
            console.log("마지막 합의한 타임스탬프  : " + timestamp);

            return timestamp;
    } catch (error) {
        console.log(`네트워크에서 마지막 합의한 타임스탬프를 가져오지 못했습니다. ${ error }`);
        return 1;
    }
};

const getLastTimestampFromDB = async () => {
    try {
        const txData = await transaction.findOne({
            order: [['consensus_timestamp', 'DESC']]
        });

        if (!txData) {
            return 0;
        }

        return txData.consensus_timestamp;
    } catch(error) {
        console.log(`DB에서 마지막 합의 타임스탬프를 가져오지 못했습니다. ${ error }`);
        return 0;
    }
};

module.exports = async () => {
    try {
        const lastTimestampFromChain = await getLastTimestampFromChain();
        const lastTimestampFromDB = (await getLastTimestampFromDB() | 0);
    
        if(lastTimestampFromChain === lastTimestampFromDB) {
            console.log(`트랜잭션과 동기화할 새로운 데이터가 없습니다.`);
            return;
        }

        const {data} = await axios.get(`${env.NODE_URI}/api/v1/transactions/?order=asc&timestamp=gt:${lastTimestampFromDB}`)
        
        console.log(data);

        const txInfo = await Promise.all(
            data.transactions.map(
                async ({charged_tx_fee, consensus_timestamp, entity_id, max_fee, memo_base64, name, node, nonce,
                        result, transaction_hash, transaction_id, transfers, token_transfers, valid_duration_seconds, valid_start_timestamp}) => {
                    let newTx = new transaction({
                        transaction_hash,
                        transaction_id,
                        type: name, 
                        node,
                        charged_tx_fee,
                        consensus_timestamp,
                        entity_id,
                        max_fee,
                        memo_base64,
                        nonce,
                        result,
                        token_id: transfers.length != 0 ? token_transfers[0].token_id : null,
                        token_account_from: transfers.length != 0 ? token_transfers[1].account : null,
                        token_account_to: transfers.length != 0 ? token_transfers[0].account : null,
                        token_amount: transfers.length != 0 ? token_transfers[0].amount : 0, 
                        valid_duration_seconds,
                        valid_start_timestamp,
                    });
                    // transaction db에 저장
                    const createdTx = await newTx.save();
                }
            )
        );

        console.log(`트랜잭션 정보가 성공적으로 저장되었습니다.`);
    } catch (error) {
        console.log(`tx handler error: ${error}`);
    }
}