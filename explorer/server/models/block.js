'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class block extends Model {
        
        static associate (models) {
            // define association here
        }
    }
    block.init(
        {
            gas_used: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            },
            hash: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            number: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            },          
            name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },   
            previous_hash: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }, 
            size: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            timestamp_from: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
            timestamp_to: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
            }, 
        },
        {
            sequelize,
            modelName: 'Block',
            freezeTableName: true,
            timestamps: true,
            createdAt: true,
            updatedAt: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );

    return block;
};