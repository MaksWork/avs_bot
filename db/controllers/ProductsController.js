const { where } = require('sequelize');
const {Products} = require('../index.js')

const ProductsController = {
    getAllLiquids: async () =>{
        try {
            let products = await Products.findAll({where: {type: 'liquid'}}).then((data) =>{
                return data
            })
            return products
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductsController