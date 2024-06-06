const {Sequelize, DataTypes} = require('sequelize');

const UserModel = require('./models/UserModel');
const ProductsModel= require('./models/ProductsModels');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/db.db'
})



const User = UserModel(sequelize)
const Products = ProductsModel(sequelize)

const initDB = async () =>{
    await User.sync({force: true})
    await Products.sync({alter: true})
}
initDB()

// Products.bulkCreate([
//     {id : 1, title: 'Blueberry grape', ml: 30, mg: 20, price: 10, img_flag: 'bg_liquid', type: 'liquid'},
//     {id : 2, title: 'Blueberry Bubblegum', ml: 30, mg: 20, price: 10, img_flag: 'bbg_liquid', type: 'liquid'},
//     {id : 3, title: 'Pineapple Coconut', ml: 30, mg: 20, price: 10, img_flag: 'pc_liquid', type: 'liquid'},
//     {id : 4, title: 'Gummy Bears', ml: 30, mg: 20, price: 10, img_flag: 'gb_liquid', type: 'liquid'},
//     {id : 5, title: 'Strawberry Peach Lemon', ml: 30, mg: 20, price: 10, img_flag: 'spl_liquid', type: 'liquid'},
//     {id : 6, title: 'Blue Raspberry Lemon', ml: 30, mg: 20, price: 10, img_flag: 'brl_liquid', type: 'liquid'},
//     {id : 7, title: 'Strawberry Dragonfruit', ml: 30, mg: 20, price: 10, img_flag: 'sdf_liquid', type: 'liquid'},
//     {id : 8, title: 'Raspberry Menthol', ml: 30, mg: 20, price: 10, img_flag: 'rm_liquid', type: 'liquid'},
//     {id : 9, title: 'Watermelon Lemon', ml: 30, mg: 20, price: 10, img_flag: 'wl_liquid', type: 'liquid'},
//     {id : 10, title: 'Raspberry Watermelon', ml: 30, mg: 20, price: 10, img_flag: 'rw_liquid', type: 'liquid'}
// ])

module.exports = {
    User,
    Products
};


