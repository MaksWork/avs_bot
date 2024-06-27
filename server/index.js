require('dotenv').config()
const UserController = require('../db/controllers/UserController');
const ProductsController = require('../db/controllers/ProductsController');
const express = require('express')
const cors = require('cors');


const app = express();

app.use(cors())
app.use(express.json())
app.use('/static', express.static('../public'))

app.post('/createUser', (req, res) =>{
    const {user} = req.body

    try{
        UserController.createUser(user)
        return res.status(200)
    }
    catch(err){
        return res.status(500)
    }
})
app.get('/test', async (req, res) => {
    const products = [{id : 1, title: 'Blueberry grape', ml: 30, mg: 20, price: 10, img_flag: 'bg_liquid', type: 'liquid'},]
    res.send(products)
})

app.get('/getAllLiquids', async (req, res) =>{
    try {
        const products = await ProductsController.getAllLiquids()
        console.log(products);
        res.send(products)
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
})
app.get('/getUserCart', async (req, res) =>{
    const {username} = req.body
    
    try{
        const user_cart = await UserController.getCart(username)
        res.send(user_cart)
        return res.status(200)
    } catch(error) {
        console.log(error);
        return res.status(500)
    }

})
app.post('/addToCart', (req, res) => {
    const {cart, username} = req.body

    try {
        UserController.updateCart(cart, username)
        return res.status(200)
    } catch (error) {
        return res.status(500)
    }
})

module.exports = { app }