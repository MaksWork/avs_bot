require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api');
const { startText, options, switchRegion } = require('./helper');
const UserController = require('./db/controllers/UserController');
const User = require('./db');

const express = require('express')
const cors = require('cors');
const ProductsController = require('./db/controllers/ProductsController');


const app = express();

app.use(cors())
app.use(express.json())
app.use('/static', express.static('public'))



const bot_token = process.env.BOT_TOKEN;

const bot = new TelegramApi(bot_token, {polling: true});

bot.onText('/start', async (msg) =>{//TODO сделать что бы отдельно для юзеров выводилось одно а для меня и шабанова другое
    const chatId = msg.chat.id

    register(chatId);
})

const register = async (chatId) =>{
    await bot.sendMessage(chatId, `${startText.eng}${startText.rus}${startText.lv}`, options.start_option)
}
const showRegionPanel = async (chatId, data) =>{
    let current_user = await User.findAll({where:{username: data?.from.username}})
    let lang = current_user[0].dataValues.chosen_lang
    
    await bot.sendMessage(chatId, switchRegion(lang), {reply_markup:options.regionOptions(lang)})
}

bot.on('callback_query', async (data) =>{
    let chatId = data.message.chat.id

    if(data.data === '/send_seller'){ //!отправка заказа работяге 
        const current_user = await User.findAll({where:{username: data.from.username}})
        let cart = current_user[0].dataValues.cart.cart
        let lang = current_user[0].dataValues.chosen_lang;
        let region = current_user[0].dataValues.chosen_region
        let username = current_user[0].dataValues.username

        let cash = 0
        
        let {send_panel, filling_end} = chooseLiquidLang(lang) || {}
        let cart_list = cart.map((v) =>{
            if(v !== null && v !== undefined && JSON.stringify(v) !== "{}"){
                cash += v?.amount * 10
                return `\n${v.liquid.text}\t:\t${v.amount}`
            }
        })
        await User.update({cart:{cart:[]}},{where:{username: data.from.username}})

        let order_id = Math.floor(Math.random() * 99999)
        await bot.sendMessage(process.env.AVS_ID, `Заказ K${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}\nВ район -> ${region}`)
        switch (region) {
            case 'Kengaraks': //TODO добавить как то айдишник к заказу
                await bot.sendMessage(process.env.KENGA_ID, `Заказ K${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}€`, {reply_markup: {inline_keyboard: send_panel.keyboard}})
                await bot.sendMessage(chatId, `${filling_end('K'+ order_id.toString())}`, {reply_markup:{inline_keyboard:[[{text: 'Продолжить', callback_data: lang}]]}})
                break;
                
            case 'Plavnieki':
                await bot.sendMessage(process.env.PLAVI_ID, `Заказ P${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}€`, {reply_markup: {inline_keyboard: send_panel.keyboard}})
                await bot.sendMessage(chatId, `${filling_end('P'+ order_id.toString())}`, {reply_markup:{inline_keyboard:[[{text: 'Продолжить', callback_data: lang}]]}})
                break;
            case 'Ilguciems':
                await bot.sendMessage(process.env.ILGA_ID, `Заказ I${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}€`, {reply_markup: {inline_keyboard: send_panel.keyboard}})
                await bot.sendMessage(chatId, `${filling_end('I'+ order_id.toString())}`, {reply_markup:{inline_keyboard:[[{text: 'Продолжить', callback_data: lang}]]}})
                break;
            default:
                console.log("error");
        }
    }
    
})


app.listen(process.env.APP_PORT, () => console.log(`Server started on url=${process.env.APP_PORT}`))

//TODO on start client use find or create user then keep user and send to client

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
        //const products = await ProductsController.getAllLiquids()
        const products = [{id : 1, title: 'Blueberry grape', ml: 30, mg: 20, price: 10, img_flag: 'bg_liquid', type: 'liquid'},]
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