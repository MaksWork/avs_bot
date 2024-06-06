const {DataTypes} = require('sequelize')

const UserModel = (sequelize) =>{
    return(
        sequelize.define(
            'user',
            { 
                id:{
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                chosen_region: {
                    type: DataTypes.STRING
                },
                chosen_lang:{
                    type: DataTypes.STRING
                },
                cart:{
                    type: DataTypes.JSON,
                }
            }
        )
    )
}



module.exports = UserModel;