/*
Bot bello per Girls Frontline
Scritto in Node.js con https://github.com/yagop/node-telegram-bot-api
*/


// Moduli npm richiesti
const Bot = require("node-telegram-bot-api");
let bot;
const request = require("request");
const dotenv = require('dotenv').config();

// Lettura della token del bot dal file .env
const token = process.env.TOKEN;

// Impostazione webhook per heroku
if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

// Dichiarazione del bot
module.exports = bot;

// Lettura della versione del bot da package.json
const pjson = require('./package.json');
var ver = pjson.version;

/*
Lettura della data della versione (data in cui package.json è stato
modificato per l'ultima volta)
*/
const fs = require('fs');
const stats = fs.statSync("package.json");
var mtime = stats.mtime;

// Formato della data (g/m/a)
var d = {
  day: 'numeric'
};
var m = {
  month: 'numeric'
};
var y = {
  year: 'numeric'
};

// Creazione della stringa con la data
var data = mtime.toLocaleDateString('it-IT', d) + "/" + mtime.toLocaleDateString('it-IT', m) + "/" + mtime.toLocaleDateString('it-IT', y);

// Testo di /botinfo e /start
var start = "<b>FrontlineMaidITABot</b>\n<i>Un bot bello per Girls Frontline</i>\nVersione <code>" + ver + "</code> del " + data + "\nDigita /comandi per la lista di comandi\n<a href=\"https://github.com/LeddaZ/FrontlineMaidITABot/\">Codice sorgente</a> - <a href=\"https://github.com/LeddaZ/FrontlineMaidITABot/blob/main/extra/changelog.md\">Cronologia delle versioni</a>\nCreato da @LeddaZ"


// Codice del bot

// Codice di /start e /botinfo
bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, start, {
    parse_mode: "HTML"
  });

});

bot.onText(/\/botinfo/, (msg) => {

  bot.sendMessage(msg.chat.id, start, {
    parse_mode: "HTML"
  });

});
