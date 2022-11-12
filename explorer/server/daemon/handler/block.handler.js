const axios = require('axios');
const { Block } = require("../../models");
require('dotenv').config();
const env = process.env;

const getLastblockNumberFromChain = async () => {
    try {
            let blockNumber;
            console.log(`${env.NODE_URI}/api/v1/blocks/?order=desc&limit=1`);

            const {data} = await axios.get(`${env.NODE_URI}/api/v1/blocks/?order=desc&limit=1`)     
            blockNumber = data.blocks[0].number; //마지막 블록 넘버
            console.log("블록 넘버 : " + blockNumber);

            return blockNumber;
    } catch (error) {
        console.log(`네트워크에서 마지막 트랜잭션 블록 넘버를 가져오지 못했습니다. ${ error }`);
        return 1;
    }
};

const getLastBlockFromDB = async () => {
    try {
        const lastBlock = await Block.findOne({
            order: [['number', 'DESC']]
        });

        if (!lastBlock) {
            return 0;
        }

        return lastBlock.number;
    } catch(error) {
        console.log(`DB에서 마지막 블록 넘버를 가져오지 못했습니다. ${ error }`);
        return 0;
    }
};

module.exports = async () => {
    try {
        const lastBlockFromChain = await getLastblockNumberFromChain();
        const lastBlockFromDB = (await getLastBlockFromDB() | 0);
    
        if(lastBlockFromChain === lastBlockFromDB) {
            console.log(`블록과 동기화할 새로운 데이터가 없습니다.`);
            return;
        }

        const {data} = await axios.get(`${env.NODE_URI}/api/v1/blocks/?order=asc&block.number=gt:${lastBlockFromDB}`)
         
        const blockInfo = await Promise.all(
            data.blocks.map(
                async ({gas_used, hash, number, name, previous_hash, size, timestamp}) => {
                    let newBlock = new Block({
                        gas_used,
                        hash,
                        number, 
                        name,
                        previous_hash,
                        size,
                        timestamp_from: timestamp.from,
                        timestamp_to: timestamp.to,
                    });
                    // block db에 저장
                    const createdBlock = await newBlock.save();
                }
            )
        );

        console.log(`블록 정보가 성공적으로 저장되었습니다.`);
    } catch (error) {
        console.log(`block handler error: ${error}`);
    }
}