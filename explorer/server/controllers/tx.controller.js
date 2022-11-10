const {transaction} = require("../models");
const {asyncWrapper} = require('../utils/async');
const {StatusCodes} = require("http-status-codes");

/**
 * 최신 20건의 트랜잭션 전체 조회
 *
 * @req : page(number), transactionId
 */
const searchTx = asyncWrapper(async (req) => {
    try {
        const {page, transactionId} = req.query; // 요청 페이지 넘버, 트랜잭션 ID
        let offset = 0;

        if (page > 1) {
            offset = 20 * (page - 1);
        }

        let txData;
        if (transactionId) {
            txData = await transaction.findAll({
                where: {
                    transaction_id: transactionId
                },
                order: [
                    ["id", "DESC"]
                ]
            });
        } else {
            txData = await transaction.findAll({
                offset: offset,
                limit: 20,
                order: [
                    ["id", "DESC"]
                ]
            });
        }
        return {
            status: txData.length > 0
                ? StatusCodes.OK
                : StatusCodes.NO_CONTENT,
            message: '성공',
            data: txData
        };
    } catch (e) {
        console.log(e)
        return {status: StatusCodes.BAD_REQUEST, message: '실패', data: {}};
    }
});

/**
 * 트랜잭션 상세 조회
 *
 * @req : transactionId
 */
const getTxById = asyncWrapper(async (req) => {
    try {
        const {transactionId} = req.params;
        if (transactionId === undefined) {
            return {status: StatusCodes.BAD_REQUEST, message: '유효하지 않은 파라미터 값', data: {}};
        }

        let trasData = await transaction.findAll({
            where: {
                transaction_id: transactionId
            },
            order: [
                ["id", "DESC"]
            ]
        });
        return {status: StatusCodes.OK, message: '성공', data: trasData};
    } catch (e) {
        console.log(e)
        return {status: StatusCodes.BAD_REQUEST, message: '실패', data: {}};
    }
});

module.exports = {
    searchTx,
    getTxById
};