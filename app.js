const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);//environmental variables machine level variables
//env vars mozhno izmenyat' pryam s terminala, ya zadal api bota pryam s terminala komandoi BOT_TOKEN=API node app.js
bot.start((ctx) => ctx.reply('Salam kak dela?'));
bot.hears('Salam', (ctx) => ctx.reply('Salam bro'));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));