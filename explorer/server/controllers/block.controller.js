const { block } = require("../models");
const { asyncWrapper } = require('../utils/async');
const {StatusCodes} = require("http-status-codes");

/**
 * 최신 20건의 블록 전체 조회
 * 
 * @req : page (number)
 */
const getAllBlock = asyncWrapper(async (req) => {
    try {
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 20 * (pageNum - 1);
        }

        let trasData = await block.findAll({
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
 * @req : blockNumber
 */
 const getBlockByNumber = asyncWrapper(async (req) => {
    try {
        
        const { blockNumber } = req.params;
        if (blockNumber === undefined) {
            return {
                status: StatusCodes.BAD_REQUEST,
                message: '유효하지 않은 파라미터 값',
                data: {},
            };
        }

        let blockData = await block.findAll({
            where: {
                number: blockNumber,
            },
            order:[["id","DESC"]]
        });
        return {
            status: blockData.length > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT,
            message: '성공',
            data: blockData,
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
    getAllBlock,
    getBlockByNumber
};