const {DataTypes} = require('sequelize')

const ProductsModel = (sequelize) =>{
    return(
        sequelize.define(
            'product',
            {
                id:{
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                type:{
                    type: DataTypes.STRING,
                    allowNull: false
                },
                title:{
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                price:{
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                ml:{
                    type: DataTypes.INTEGER
                },
                mg:{
                    type: DataTypes.INTEGER
                },
                img_flag:{
                    type:DataTypes.STRING,
                    allowNull: false
                }
            }
        )
    )
}

module.exports = ProductsModel;