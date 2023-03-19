const { json } = require('stream/consumers');
const { Telegraf } = require('telegraf');
require('dotenv').config()//vot eta shtuka daet vozmozhnost' ispol'zovat' file .env kak hranenie sensative dannyh 
const { message } = require('telegraf/filters');

//env vars mozhno izmenyat' pryam s terminala, ya zadal api bota pryam s terminala komandoi BOT_TOKEN=API node app.js
const bot = new Telegraf(process.env.BOT_TOKEN);//environmental variables machine level variables


//dlya togo chtoby postoyanno ne zapuskat' s terminala bota komandoy BOT_TOKEN="API KEY" node app.js 
//ya ustanovil package npm i --D nodemon (no etot package ne rabotal i daval oshibku)
//chtoby ustranit' ee ya prosta ustanovil nodemon takim putem >> npm i --g nodemon (i vse zarabotalo)
//tak kak ya zaebalsya kazhdyi raz dobbavlyat v komandnuyu stroku BOT_TOKEN="TOKEN" nuzhno ustanovit' package dotenv 
bot.start((ctx) => ctx.reply(`Hi dear ${ctx.message.from.first_name} \n
I am tracking every message now.`));
bot.hears('Salam', (ctx) => ctx.reply('Salam zaebal'));

bot.on(message('text'), async (ctx) => {
    // track time, sender and text of the message 
    const data = {
        time: new Date(), 
        sender: ctx.message.from.id,
        text: ctx.message.text
    };
    //on na lyuboy text budet otvechat' hello first_name, v moem sluchae hello Amangeldy dep 
    await ctx.reply(`Hello ${ctx.message.from.first_name}`)
    await ctx.reply(JSON.stringify(data,null,2));
  });

bot.launch();//vot eta komanda ne daet programme zasnut' 

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));