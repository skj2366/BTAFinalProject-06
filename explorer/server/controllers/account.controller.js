const { asyncWrapper } = require('../utils/async');
const {StatusCodes} = require("http-status-codes");
const axios = require('axios');
require('dotenv').config();
const env = process.env;

/**
 * 최신 20건의 계정 전체 조회
 * 
 * @req : accountId
 */
const searchAccount = asyncWrapper(async (req) => {
    try {
        let accountId = req.query.accountId; // 계정 ID
        let accountData;
        if(accountId) {
            const {data} = await axios.get(`${env.NODE_URI}/api/v1/accounts/?order=desc&account.id=${accountId}`)  
            accountData = data.accounts;
        } else {
            const {data} = await axios.get(`${env.NODE_URI}/api/v1/accounts/?order=desc&limit=20`)  
            accountData = data.accounts;
        }        
      
        console.log(accountData);

        return {
            status: accountData.length > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT,
            message: '성공',
            data: accountData,
        };
    } catch (e) {
        console.log(e)
        return {
            status: StatusCodes.BAD_REQUEST,
            message: '실패',
            data: {},
        };
    }
});

/**
 * 계정 상세 조회
 * 
 * @req : accountId
 */
 const getAccountById = asyncWrapper(async (req) => {
    try {
        const { accountId } = req.params;
        if (accountId === undefined) {
            return {
                status: StatusCodes.BAD_REQUEST,
                message: '유효하지 않은 파라미터 값',
                data: {},
            };
        }
        const {data} = await axios.get(`${env.NODE_URI}/api/v1/accounts/?limit=1&account.id=${accountId}`)   
        console.log(data);

        return {
            status: StatusCodes.OK,
            message: '성공',
            data: data.accounts,
        };
    } catch (e) {
        console.log(e)
        return {
            status: StatusCodes.BAD_REQUEST,
            message: '실패',
            data: {},
        };
    }
});

module.exports = {
    searchAccount,
    getAccountById
};