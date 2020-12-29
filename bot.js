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

// Nomi delle T-doll
const nomi = ["uno", "due", "tre"];

// Tempi delle T-doll
const tempi = ["100", "200", "300"];



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


// Codice di /comandi
bot.onText(/\/comandi/, (msg) => {

  bot.sendMessage(msg.chat.id, "<b>Comandi del bot</b>\n\n\n/botinfo\nVisualizza alcune informazioni sul bot\n\n/info\nVisualizza informazioni su una T-doll (c'è ma mancano ancora i dati)\nUtilizzo: /info <code>nome</code>\n\n/isgood\nVisualizza i vantaggi e svantaggi di una T-doll (non ancora implementato, il nome è temporaneo)\n\n/tempo\nVisualizza quali T-doll si possono ottenere in un determinato lasso di tempo\nUtilizzo: /tempo <code>h:mm</code>", {
    parse_mode: "HTML"
  });

});


// Codice di /info
bot.onText(/\/info/, (msg) => {

  // Variabile con il testo del messaggio
  var testo = msg.text.toString().toLowerCase();

  // Risposte con le informazioni
  if (testo == "/info " + nomi[0])
    bot.sendMessage(msg.chat.id, "a");

  else if (testo == "/info " + nomi[1])
    bot.sendMessage(msg.chat.id, "b");

  else if (testo == "/info " + nomi[2])
    bot.sendMessage(msg.chat.id, "c");

  else
    bot.sendMessage(msg.chat.id, "Non hai specificato il nome di una T-doll.");

});


// Codice di /tempo
bot.onText(/\/tempo/, (msg) => {

  // Variabile con il testo del messaggio
  var testo = msg.text.toString().toLowerCase();

  // Risposte con le informazioni
  if (testo == "/tempo " + tempi[0])
    bot.sendMessage(msg.chat.id, "a");

  else if (testo == "/tempo " + tempi[1])
    bot.sendMessage(msg.chat.id, "b");

  else if (testo == "/tempo " + tempi[2])
    bot.sendMessage(msg.chat.id, "c");

  else
    bot.sendMessage(msg.chat.id, "Tempo non valido.");

});