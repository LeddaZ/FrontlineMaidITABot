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
var start = "<b>FrontlineMaidITABot</b>\n<i>Un bot bello per Girls Frontline</i>\nVersione <code>" + ver + "</code> del " + data + "\nDigita /comandi per la lista di comandi\n<a href=\"https://github.com/LeddaZ/FrontlineMaidITABot/\">Codice sorgente</a> - <a href=\"https://github.com/LeddaZ/FrontlineMaidITABot/blob/main/extra/changelog.md\">Cronologia delle versioni</a>"


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


// Codice di /info
bot.onText(/\/info/, (msg) => {

  // Nomi delle T-doll
  const nome1 = "uno";
  const nome2 = "due";
  const nome3 = "tre";

  // Variabile con il testo del messaggio
  var testo = msg.text.toString().toLowerCase();

  // Risposte con le informazioni
  if (testo == "/info " + nome1)
    bot.sendMessage(msg.chat.id, "a");

  else if (testo == "/info " + nome2)
    bot.sendMessage(msg.chat.id, "b");

  else if (testo == "/info " + nome3)
    bot.sendMessage(msg.chat.id, "c");

  else
    bot.sendMessage(msg.chat.id, "Non hai specificato il nome di una T-doll.");

});

// Codice di /comandi
bot.onText(/\/comandi/, (msg) => {

  bot.sendMessage(msg.chat.id, "<b>Comandi del bot</b>\n/botinfo - Visualizza alcune informazioni sul bot\n/info - Visualizza informazioni su una T-doll\n/isgood - Visualizza i vantaggi e svantaggi di una T-doll (non ancora implementato, il nome è temporaneo)\n/tempo o /t - Visualizza quali T-doll si possono ottenere in un determinato lasso di tempo (non ancora implementato)", {
    parse_mode: "HTML"
  });

});
