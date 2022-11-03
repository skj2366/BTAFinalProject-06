'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class transaction extends Model {
        
        static associate (models) {
            // define association here
        }
    }
    transaction.init(
        {
            blockHash: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            blockNo: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            gas: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            },          
            hash: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },   
            nonce: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            from: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            to: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            transactionIndex: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            value: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
        },
        {
            sequelize,
            modelName: 'transaction',
            freezeTableName: true,
            timestamps: true,
            createdAt: true,
            updatedAt: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );

    return transaction;
};