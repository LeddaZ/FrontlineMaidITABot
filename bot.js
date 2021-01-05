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

// Esportazione del bot
module.exports = bot;

// Variabili da dolls.json
const dolls = require('./dolls.json');
const nomi = dolls.nomi;
const tempi = dolls.tempi;

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


// Codice di /comandi
bot.onText(/\/comandi/, (msg) => {

  bot.sendMessage(msg.chat.id, "<b>Comandi del bot</b>\n\n\n/botinfo\nVisualizza alcune informazioni sul bot\n\n/info\nVisualizza informazioni su una T-doll (c'è ma mancano ancora i dati)\nUtilizzo: /info <code>nome</code>\n\n/isgood\nVisualizza i vantaggi e svantaggi di una T-doll (non ancora implementato, il nome è temporaneo)\n\n/nomi\nVisualizza un elenco con i nomi di tutte le T-doll\n\n/tempo\nVisualizza quali T-doll si possono ottenere in un determinato lasso di tempo\nUtilizzo: /tempo <code>h:mm</code>", {
    parse_mode: "HTML"
  });

});


// Codice di /nomi
bot.onText(/\/nomi/, (msg) => {

  bot.sendMessage(msg.chat.id, "<b>Nomi delle T-doll per</b> <code>/info</code>\n\n★★☆☆☆\nHG\nBren Ten\nFNP-9(FF FNP9)\nM1911\nMP-446\nNagant Revolver(M1895)\nP38\nPPK\nUSP Compact(GrUSPCompact)\nAR\nF2000(FF F2000)\nG3(Gr G3)\nGalil\nL85A1\nSIG-510\nType 63\nSMG\nBeretta Model(M38)\nIDW\nM3\nMP40\nPP-2000\nPPSh-41\nSpectre M4\nType 64\nm45\nRF\nBM59(VM59)\nFN-49(FF FN-49)\nG43\nSVT-38\nSimonov(SKS)\nMG\nAAT-52\nDP28\nFG42\nLWMMG\nMG34\n\n★★★☆☆\nHG\nAstra Revolver(Astra)\nC96\nCZ52\nGSh-18\nGlock 17\nHK45\nM9\nMP-443\nMP-448\nMakarov\nP08\nP226\nP99\nPSM\nQSB-91\nSerdyukov\nTEC-9\nTokarev\nType 59\nType 92\nVP70\nWKp\nAR\n6P62\nAK-47\nAR70\nARX-160\nASh-12.7\nCZ-805\nFNC\nHK33\nINSAS\nMagal\nModel L\nOTs-12\nStG-940\nStG44\nT65\nType 03\nVepr\nSMG\n43M\nEVO 3\nF1\nFMG-9\nM12\nMAC'10(Ingram)\nMAS-38\nMP41\nMT-9\nMicro Uzi\nOTs-39\nPPS-43\nSCW\nSUB-2000\nSkorpion\nSten MkII\nT77\nTMP\nZ-62\nRF\nC14\nFalcon\nGM6 Lynx\nGepard M1\nHanyang Type 88\nM1 Garand\nM14\nM1A1\nM21\nOBR\nOTs-44\nRT-20\nSM-1\nSSG 69\nSV-98\nSteyr Scout\nSuper SASS\nT-CMS\nType 56\nType 81 Carbine\nZas M76\nwz.29\nMG\nBren\nCAR\nHK23\nK3\nM1919A4\nM249 SAW\nM2HB\nMG42\nRPD\nType 62\nSG\nHSM10\nKS-23\nM1897\nM500\nNS2000\nRMB-93\nSix12\nTS12\n\n★★★★☆\nHG\nColt Revolver(SAA)\nJericho\nK5\nMk23\nP30\nP7\nRex Zero 1\nSPP-1\nSpitfire\nStechkin\nThunder\nAR\n9A-91\nA-91\nAS Val\nAk 5\nCR-21\nCZ2000\nEM-2\nFAMAS\nG36\nM16A1\nM4 SOPMOD II\nM4A1\nM82\nRibeyrolles\nSAR-21\nST AR-15\nTAR-21\nType56-1\nXM8\nSMG\nCF05\nCx4 Storm\nHoney Badger\nKAC-PDW\nKLIN\nMAT-49\nMP5\nPP-19\nPP-19-01\nPP-90\nSAF\nShipka\nUMP40\nUMP45\nUMP9\nRF\nG28(GR G28)\nK31\nKSVD\nMk 12\n Mondragon\nMosin Nagant\nPSG-1\nPTRD\nPzB 39\nSPR A3G\nSSG300\nSVD\nSpringfield\nT-5000\nTabuk\nType 4(4 Shiki)\nXM3\nMG\nAEK-999\nAmeli\nChauchat\nM1895 CB\nM1918\nM60\nMG3\nMk46\nMk48\nPK\nPM1910\nType 80\nUKM-2000\nSG\nDefender\nHK512\nLiberator\nM014\nM37\nM590\nSPAS-12\nSuper-shorty\nType 97 Shotgun(Type97S)\nUSAS-12\nV-PM5\n\n★★★★★\nHG\nC-93\nCZ75\nContende\nDesert Eagle\nFive-seveN\nGrizzly MkV\nHP-35\nHS2000\nM950A\nNZ75\nP22\nPA-15\nPx4 Storm\nPython\nWebley\nWelrod MkII\nAR\nACR\nADS\nAK-12\nAK-15\nAK-Alpha\nAN-94\nART556\nAUG\nFAL\nG11\nG41\nHK416\nHowa Type 64(64 Shiki)\nHowa Type 89\nK11\nK2\nMDR\nOTs-14\nR5\nRFB\nSIG-556\nSteyr ACR\nT91\nType 95\nType 97\n VHS\nZas M21\nSMG\nAK-74U\nAUG Para\nC-MS\nGr G36c\nJS 9\nLUSA\nGr MP7\nP90\nPM-06\nPM-9\nRO635\nSR-3MP\nSuomi\nThompson\n100 Shiki\n Type79\nVector\nX95\nRF\nBallista\nCarcanoM1891\nCarcano M91/38\nGs DSR-50\nGeneral Liu\nIWS 2000\nJS05\nKar98K\nLee Enfield\nM200\nM82A1\nM99\nNTW-20\nQBU-88\nR93\nSL8\nSRS\nTAC-50\nVSK-94\nWA200\nMG\nHMG21\nKord\nLewis\nGr MG36\nGr MG4\nGr MG5\nNegev\nPKP\nRPK-16\nQJY-88\nZB-26\nSG\nAA-12\nCAWS\nDP-12\nFP-6\nAm KSG\nLTLX 7000\nM1887\nM6 ASW\nM870\nS.A.T.8\nSaiga-12\n★\nHG\nEL Clear\nEL Fail\nJill Stingray\nKiana\nNoel\nSei Asagiri\nTheresa\nAR\nAgent 416\nAngelica\nMurata Himeko\nAgent Vector\nDorothy Haze\nHenrietta\nRF\nBronya\nRaiden Mei\nRico\nStella Hoshii\nMG\nAlma Armas\n Claes\nSG\nDana Zane\nElphelt\nSeele\nTriela", { parse_mode: "HTML" });

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
    bot.sendMessage(msg.chat.id, "<b>[02:40]</b>\n★★☆☆☆ [AR] Galil\n★★☆☆☆ [AR] SIG-510", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[1])
    bot.sendMessage(msg.chat.id, "<b>[02:45]</b>\n★★☆☆☆ [AR] FF F2000\n★★☆☆☆ [AR] Type 63", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[2])
    bot.sendMessage(msg.chat.id, "<b>[02:50]</b>\n★★☆☆☆ [AR] Gr G3\n★★☆☆☆ [AR] L85 A1", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[3])
    bot.sendMessage(msg.chat.id, "<b>[03:00]</b>\n★★★☆☆ [AR] StG44\n★☆☆☆☆ [Fairy] Armor Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[4])
    bot.sendMessage(msg.chat.id, "<b>[03:10]</b>\n★★★☆☆ [AR] OTs-12\n★★☆☆☆ [RF] FF FN49\n★★☆☆☆ [RF] G43\n★☆☆☆☆ [Fairy] Taunt Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[5])
    bot.sendMessage(msg.chat.id, "<b>[03:20]</b>\n★★★☆☆ [AR] AK-47\n★★★☆☆ [AR] FN FNC\n★★☆☆☆ [RF] VM59", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[6])
    bot.sendMessage(msg.chat.id, "<b>[03:25]</b>\n★★★★☆ [AR] Type 56-1\n★★★★☆ [AR] XM8\n★★★★☆ [AR] SAR-21", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[7])
    bot.sendMessage(msg.chat.id, "<b>[03:30]</b>\n★★★★☆ [AR] AS Val\n★★★★☆ [AR] Fr FAMAS\n★★★★☆ [AR] TAR-21\n★★☆☆☆ [RF] SKS\n★★☆☆☆ [RF] SVT-38\n★☆☆☆☆ [Fairy] Sniper Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[8])
    bot.sendMessage(msg.chat.id, "<b>[03:35]</b>\n★★★★☆ [AR] 9A-91\n★★★★☆ [AR] EM-2\n★★★★☆ [AR] CR-21\n★☆☆☆☆ [Fairy] Artillery Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[9])
    bot.sendMessage(msg.chat.id, "<b>[03:40]</b>\n★★★★☆ [AR] Gr G36\n★★★★☆ [AR] Ribeyrolles\n★★★★☆ [RF] M14\n★★★★☆ [RF] SV-98\n★☆☆☆☆ [Fairy] Airstrike Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[10])
    bot.sendMessage(msg.chat.id, "<b>[03:45]</b>\n★★★★★ [AR] FN FAL", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[11])
    bot.sendMessage(msg.chat.id, "<b>[03:48]</b>\n★★★★★ [AR] T91", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[12])
    bot.sendMessage(msg.chat.id, "<b>[03:50]</b>\n★★★★★ [AR] Type95\n★★★★★ [AR] Type97\n★★★☆☆ [RF] OTs-44\n★★★☆☆ [RF] Type 88 Hanyang", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[13])
    bot.sendMessage(msg.chat.id, "<b>[03:53]</b>\n★★★★★ [AR] MDR", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[14])
    bot.sendMessage(msg.chat.id, "<b>[03:55]</b>\n★★★★★ [AR] HK416\n★★★★★ [AR] ADS", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[15])
    bot.sendMessage(msg.chat.id, "<b>[03:58]</b>\n★★★★★ [AR] Am RFB", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[16])
    bot.sendMessage(msg.chat.id, "<b>[04:04]</b>\n★★★★★ [AR] Gr G11\n★★★★☆ [RF] Type 4", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[17])
    bot.sendMessage(msg.chat.id, "<b>[04:05]</b>\n★★★★★ [AR] Gr G41\n★★★★★ [AR] Zas M21\n★☆☆☆☆ [Fairy] Parachute Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[18])
    bot.sendMessage(msg.chat.id, "<b>[04:12]</b>\n★★★★★ [AR] AK-12", { parse_mode: "HTML" });

  else
    bot.sendMessage(msg.chat.id, "Tempo non valido.");

});
