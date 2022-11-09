const { transaction } = require("../models");
const { asyncWrapper } = require('../utils/async');
const {StatusCodes} = require("http-status-codes");

/**
 * 최신 20건의 트랜잭션 전체 조회
 * 
 * @req : page (number)
 */
const getAllTx = asyncWrapper(async (req) => {
    try {
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 20 * (pageNum - 1);
        }

        let trasData = await transaction.findAll({
            offset: offset,
            limit: 20,
            order:[["id","DESC"]]
        });
        return {
            status: trasData.length > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT,
            message: '성공',
            data: trasData,
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
 * 트랜잭션 상세 조회
 * 
 * @req : transactionId
 */
 const getTxById = asyncWrapper(async (req) => {
    try {
        
        const { transactionId } = req.params;
        if (transactionId === undefined) {
            return {
                status: StatusCodes.BAD_REQUEST,
                message: '유효하지 않은 파라미터 값',
                data: {},
            };
        }

        let trasData = await transaction.findAll({
            where: {
                transaction_id: transactionId,
            },
            order:[["id","DESC"]]
        });
        return {
            status: trasData.length > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT,
            message: '성공',
            data: trasData,
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
    getAllTx,
    getTxById
};