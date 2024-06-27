const bot = require('..')
const { startText, options, switchRegion } = require('../helper');

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

// bot.on('callback_query', async (data) =>{
//     let chatId = data.message.chat.id

//     if(data.data === '/send_seller'){ //!отправка заказа работяге 
//         const current_user = await User.findAll({where:{username: data.from.username}})
//         let cart = current_user[0].dataValues.cart.cart
//         let lang = current_user[0].dataValues.chosen_lang;
//         let region = current_user[0].dataValues.chosen_region
//         let username = current_user[0].dataValues.username

//         let cash = 0
        
//         let {send_panel, filling_end} = chooseLiquidLang(lang) || {}
//         let cart_list = cart.map((v) =>{
//             if(v !== null && v !== undefined && JSON.stringify(v) !== "{}"){
//                 cash += v?.amount * 10
//                 return `\n${v.liquid.text}\t:\t${v.amount}`
//             }
//         })
//         await User.update({cart:{cart:[]}},{where:{username: data.from.username}})

//         let order_id = Math.floor(Math.random() * 99999)
//         await bot.sendMessage(process.env.AVS_ID, `Заказ K${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}\nВ район -> ${region}`)
//         switch (region) {
//             case 'Kengaraks': //TODO добавить как то айдишник к заказу
//                 await bot.sendMessage(process.env.KENGA_ID, `Заказ K${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}€`, {reply_markup: {inline_keyboard: send_panel.keyboard}})
//                 await bot.sendMessage(chatId, `${filling_end('K'+ order_id.toString())}`, {reply_markup:{inline_keyboard:[[{text: 'Продолжить', callback_data: lang}]]}})
//                 break;
                
//             case 'Plavnieki':
//                 await bot.sendMessage(process.env.PLAVI_ID, `Заказ P${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}€`, {reply_markup: {inline_keyboard: send_panel.keyboard}})
//                 await bot.sendMessage(chatId, `${filling_end('P'+ order_id.toString())}`, {reply_markup:{inline_keyboard:[[{text: 'Продолжить', callback_data: lang}]]}})
//                 break;
//             case 'Ilguciems':
//                 await bot.sendMessage(process.env.ILGA_ID, `Заказ I${order_id}\n${cart_list.join('')}\n\nЭтому челу @${username}\nЗаказ на ${cash}€`, {reply_markup: {inline_keyboard: send_panel.keyboard}})
//                 await bot.sendMessage(chatId, `${filling_end('I'+ order_id.toString())}`, {reply_markup:{inline_keyboard:[[{text: 'Продолжить', callback_data: lang}]]}})
//                 break;
//             default:
//                 console.log("error");
//         }
//     }
    
// })