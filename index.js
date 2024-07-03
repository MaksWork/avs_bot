require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api');
const {app} = require('./server/index.js')
const { startText, options, switchRegion } = require('./helper');

app.listen(process.env.APP_PORT, () =>{ console.log('server starts on port : ' + process.env.APP_PORT)})

const bot_token = process.env.BOT_TOKEN;

const bot = new TelegramApi(bot_token, {polling: true});

bot.onText('/start', async (msg) =>{
    const chatId = msg.chat.id

    register(chatId);
})

const register = async (chatId) =>{
    await bot.sendMessage(chatId, `${startText.eng}${startText.rus}${startText.lv}`, options.start_option)
}

module.exports = {bot}