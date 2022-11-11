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
            transaction_hash: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            transaction_id: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            type: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            node: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            charged_tx_fee: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            },
            consensus_timestamp: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            entity_id: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },          
            max_fee: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            },   
            memo_base64: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            nonce: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            result: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            token_id: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            token_account_from: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            token_account_to: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            token_amount: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            valid_duration_seconds: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            valid_start_timestamp: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
        },
        {
            sequelize,
            modelName: 'Transaction',
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