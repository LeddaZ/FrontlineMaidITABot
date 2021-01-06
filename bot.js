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

  bot.sendMessage(msg.chat.id, "<b>Nomi delle T-doll per</b> <code>/info</code>\n<i>Nota: in <code>/isgood</code> e <code>/tempo</code> i nomi vanno scritti rispettando spazi e trattini. Non è obbligatorio rispettare maiuscole e minuscole.</i>" +
  "\n\n★★☆☆☆\n<b>HG</b>\nBren Ten\FF FNP9\nM1911\nMP-446\nM1895\nP38\nPPK\nGrUSPCompact\n<b>AR</b>\nFF F2000\nr G3\nGalil\nL85A1\nSIG-510\nType63\n<b>SMG</b>\nM38\nIDW\nM3\nMP40\nPP-2000\nPPSh-41\nSpectre M4\nType64\nm45\n<b>RF</b>\nVM59\nFF FN-49\nG43\nSVT-38\nSKS\n<b>MG</b>\nAAT-52\nDP28\nFG42\nLWMMG\nMG34" + 
  "\n\n★★★☆☆\n<b>HG</b>\nAstra\nC96\nCZ52\nGSh-18\nG17\nGr HK45\nM9\nMP-443\nMP-448\nMakarov\nP08\nP226\nP99\nPSM\nQSB-91\nSerdyukov\nTEC-9\nTokarev\nType59\nType92\nVP70\nWKp\n<b>AR</b>\n6P62\nAK-47\nAR70\nARX-160\nASh-12.7\nCZ-805\nFF FNC\nGR HK33\nINSAS\nMagal\nModel L\nOTs-12\nStG-940\nStG44\nT65\nType 03\nVepr\n<b>SMG</b>\n43M\nEVO 3\nF1\nFMG-9\nM12\nIngram\nMAS-38\nMP41\nMT-9\nMicro Uzi\nOTs-39\nPPS-43\nSCW\nSUB-2000\nSkorpion\nSTEN MkII\nT77\nTMP\nZ-62\n<b>RF</b>\nC14\nFalcon\nGM6 Lynx\nGepard M1\nType88\nM1 Garand\nM14\nM1A1\nM21\nOBR\nOTs-44\nRT-20\nSM-1\nSSG 69\nSV-98\nScout\nSuper SASS\nT-CMS\nType56R\nType81R\nZas M76\nwz.29\n<b>MG</b>\nBren\nCAR\nGr MK23\nK3\nM1919A4\nFF M249SAW\nM2HB\nMG42\nRPD\n62 Shiki\n<b>SG</b>\nHSM10\nKS-23\nM1897\nM500\nNS2000\nRMB-93\nSix12\nTS12" + 
  "\n\n★★★★☆\n<b>HG</b>\nSAA\nJericho\nK5\nGr Mk23\nGr P30\nP7\nRex Zero 1\nSPP-1\nSpitfire\nStechkin\nThunder\n<b>AR</b>\n9A-91\nA-91\nAS Val\nAk 5\nCR-21\nCZ2000\nEM-2\nFr FAMAS\nGr G36\nM16A1\nM4 SOPMOD II\nM4A1\nM82\nRibeyrolles\nSAR-21\nST AR-15\nTAR-21\nType56-1\nXM8\n<b>SMG</b>\nCF05\nCx4 Storm\nHoney Badger\nK-PDW\nKLIN\nMAT-49\nGr MP5\nPP-19\nPP-19-01\nPP-90\nSAF\nShipka\nUMP40\nUMP45\nUMP9\n<b>RF</b>\nGr G28\nK31\nKSVD\nMk 12\nMondragon\nMosin-Nagant\nGr PSG-1\nPTRD\nPzB 39\nSPR A3G\nSSG3000\nSVD\nSpringfield\nT-5000\nTabuk\n4 Shiki\nXM3\n<b>MG</b>\nAEK-999\nAmeli\nChauchat\nM1895 CB\nM1918\nM60\nMG3\nMk46\nMk48\nPK\nPM1910\nType80\nUKM-2000\n<b>SG</b>\nDefender\nHK512\nLiberator\nM014\nM37\nM590\nSPAS-12\nSuper-Shorty\nType97S\nUSAS-12\nV-PM5" + 
  "\n\n★★★★★\n<b>HG</b>\nC-93\nCZ75\nContender\nDesert Eagle\nFive-seven\nGrizzly\nHP-35\nHS2000\nM950A\nNZ75\nP22\nPA-15\nPx4 Storm\nPython\nWebley\nWelrod MkII\n<b>AR</b>\nACR\nADS\nAK-12\nAK-15\nAK-Alpha\nAN-94\nART556\nAUG\nFAL\nGr G11\nGr G41\nHK416\n64 Shiki\nHowa Type 89\nK11\nK2\nMDR\nOTs-14\nR5\nAm RFB\nSIG-556\nSteyr ACR\nT91\nType95\nType97\nVHS\nZas M21\n<b>SMG</b>\nAK-74U\nAUG Para\nC-MS\nGr G36c\nJS 9\nLUSA\nGr MP7\nP90\nPM-06\nPM-9\nRO635\nSR-3MP\nSuomi\nThompson\n100 Shiki\nType79\nVector\nX95\n<b>RF</b>\nBallista\nCarcanoM1891\nCarcano M91/38\nGd DSR-50\nGeneral Liu\nIWS 2000\nJS05\nKar98K\nLee Enfield\nM200\nM82A1\nM99\nNTW-20\nQBU-88\nR93\nSL8\nSRS\nTAC-50\nVSK-94\nWA2000\n<b>MG</b>\nHMG21\nKord\Lewis\nGr MG36\nGr MG4\nGr MG5\nNegev\nPKP\nRPK-16\nQJY-88\nZB-26\n<b>SG</b>\nAA-12\nCAWS\nDP-12\nFP-6\nAm KSG\nLTLX 7000\nM1887\nM6 ASW\nM870\nS.A.T.8\nSaiga-12" + 
  "\n\n★☆☆☆☆\n<b>HG</b>\nEL Clear\nEL Fail\nJill Stingray\nKiana\nNoel\nSei Asagiri\nTheresa\n<b>AR</b>\nAgent 416\nAngelica\nMurata Himeko\nAgent Vector\nDorothy Haze\nHenrietta\n<b>RF</b>\nBronya\nRaiden Mei\nRico\nStella Hoshii\n<b>MG</b>\nAlma Armas\nClaes\n<b>SG</b>\nDana Zane\nElphelt\nSeele\nTriela", { parse_mode: "HTML" });

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
    bot.sendMessage(msg.chat.id, "Nome non valido.");

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

  else if (testo == "/tempo " + tempi[19])
    bot.sendMessage(msg.chat.id, "<b>[04:09]</b>\n★★★★★ [AR] AN-94", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[20])
    bot.sendMessage(msg.chat.id, "<b>[04:06]</b>\n★★★★★ [AR] 64 Shiki", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[21])
    bot.sendMessage(msg.chat.id, "<b>[04:11]</b>\n★★★★★ [AR] K11", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[22])
    bot.sendMessage(msg.chat.id, "<b>[03:52]</b>\n★★★★★ [AR] K2", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[23])
    bot.sendMessage(msg.chat.id, "<b>[03:56]</b>\n★★★★★ [AR] SIG-556", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[24])
    bot.sendMessage(msg.chat.id, "<b>[00:20]</b>\n★★☆☆☆ [HG] M1895\n★★☆☆☆ [HG] M1911\n★★☆☆☆ [HG] P38\n★★★☆☆ [Equipment] LRA 2-12x50", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[25])
    bot.sendMessage(msg.chat.id, "<b>[00:22]</b>\n★★☆☆☆ [HG] PPK\n★★★☆☆ [Equipment]  AC2 Suppressor", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[26])
    bot.sendMessage(msg.chat.id, "<b>[00:25]</b>\n★★☆☆☆ [HG] FN FNP9\n★★☆☆☆ [HG] MP-446\n★★★☆☆ [Equipment]  AMP COMPM4", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[27])
    bot.sendMessage(msg.chat.id, "<b>[00:28]</b>\n★★☆☆☆ [HG] Bren Ten\n★★☆☆☆ [HG] Gr USPCompact\n★★★☆☆ [Equipment]  ILM Hollow Point Ammo (3-Star)", { parse_mode: "HTML" });
  
  else if (testo == "/tempo " + tempi[28])
    bot.sendMessage(msg.chat.id, "<b>[00:30]</b>\n★★★☆☆ [HG] P08\n★★★☆☆ [HG] C96\n★★★☆☆ [Equipment]  M993 Armor-Piercing Ammo", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[29])
    bot.sendMessage(msg.chat.id, "<b>[00:35]</b>\n★★★☆☆ [HG] Type92\n★★★☆☆ [HG] P99\n★★★★☆ [Equipment]  PSO-1", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[30])
    bot.sendMessage(msg.chat.id, "<b>[00:40]</b>\n★★★☆☆ [HG] Astra\n★★★☆☆ [HG] M9\n★★★☆☆ [HG] Makarov\n★★★★☆ [Equipment] COG M150", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[31])
    bot.sendMessage(msg.chat.id, "<b>[00:45]</b>\n★★★☆☆ [HG] Tokarev\n★★★★☆ [Equipment] COG M150\n★★★★☆ [Equipment] Mk169 Armor-Piercing Ammo\n★★★★★ [Equipment] VFL 6-24x56", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[32])
    bot.sendMessage(msg.chat.id, "<b>[00:50]</b>\n★★★★☆ [HG] Mk23\n★★★★☆ [HG] SAA\n★★★★☆ [HG] P30\n★★★★★ [Equipment] ITI Mars", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[33])
    bot.sendMessage(msg.chat.id, "<b>[00:52]</b>\n★★★★☆ [HG] Spitfire\n★★★★★ [Equipment]  IOP X4 Exoskeleton\n★★★★★ [Equipment] IOP T4 Exoskeleton", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[34])
    bot.sendMessage(msg.chat.id, "<b>[00:53]</b>\n★★★★☆ [HG] K5\n★★★☆☆ [HG] Serdyukov\n★★★★★[Equipment]  ILM Hollow Point Ammo", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[35])
    bot.sendMessage(msg.chat.id, "<b>[00:55]</b>\n★★★★☆ [HG] P7\n★★★★☆ [HG] Stechkin\n★★★★★[Equipment]  Mk211 High-Explosive Armor-Piercing ", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[36])
    bot.sendMessage(msg.chat.id, "<b>[00:49]</b>\n★★★★☆ [HG] Jericho\n★★★★★[Equipment] PEQ-16A ", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[37])
    bot.sendMessage(msg.chat.id, "<b>[01:00]</b>\n★★★★★ [HG] Welrod MkII", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[38])
    bot.sendMessage(msg.chat.id, "<b>[01:02]</b>\n★★★★★ [HG] Contender", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[39])
    bot.sendMessage(msg.chat.id, "<b>[01:05]</b>\n★★★★★ [HG] M950A\n★★★★★ [HG] NZ75", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[40])
    bot.sendMessage(msg.chat.id, "<b>[01:10]</b>\n★★★★★ [HG] Grizzly\n★★☆☆☆ [SMG] IDW\n★★☆☆☆ [SMG] PP-2000", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[41])
    bot.sendMessage(msg.chat.id, "<b>[01:04]</b>\n★★★★★ [HG] Px4 Storm", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[42])
    bot.sendMessage(msg.chat.id, "<b>[01:15]</b>\n★★★★★ [HG] PA-15", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[43])
    bot.sendMessage(msg.chat.id, "<b>[01:09]</b>\n★★★★★ [HG] C-93", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[44])
    bot.sendMessage(msg.chat.id, "<b>[04:50]</b>\n★★★★★ [RF] WA2000\n★★☆☆☆ [MG] AAT-52\n★★☆☆☆ [MG] FG42", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[45])
    bot.sendMessage(msg.chat.id, "<b>[05:00]</b>\n★★★★★ [RF] Lee Enfield\n★★☆☆☆ [MG] DP28\n★★☆☆☆ [MG] MG34\n☆☆★☆☆ [Fairy] Command Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[46])
    bot.sendMessage(msg.chat.id, "<b>[05:10]</b>\n★★☆☆☆ [MG] LWMMG\n☆☆★☆☆ [Fairy] Illumination Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[47])
    bot.sendMessage(msg.chat.id, "<b>[05:20]</b>\n★★★☆☆ [MG] Bren", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[48])
    bot.sendMessage(msg.chat.id, "<b>[05:40]</b>\n★★★☆☆ [MG] M1919 A4\n☆☆★☆☆ [Fairy] Construction Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[49])
    bot.sendMessage(msg.chat.id, "<b>[06:40]</b>\n★★★★★ [MG] MG4", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[50])
    bot.sendMessage(msg.chat.id, "<b>[06:10]</b>\n★★★☆☆ [MG] M2HB\n★★★★☆ [MG] M60", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[51])
    bot.sendMessage(msg.chat.id, "<b>[06:15]</b>\n★★★★☆ [MG] Type80\n★★★★☆ [SG] Type97S", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[52])
    bot.sendMessage(msg.chat.id, "<b>[06:20]</b>\n★★★★☆ [MG] AEK-999\n★★★★☆ [MG] Mk48", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[53])
    bot.sendMessage(msg.chat.id, "<b>[06:25]</b>\n★★★★☆ [MG] Ameli\n★★★★☆ [MG] M1918\n★★★★☆ [MG] Chauchat", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[54])
    bot.sendMessage(msg.chat.id, "<b>[06:30]</b>\n★★★★☆ [MG] MG3\n★★★★☆ [MG] PK", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[55])
    bot.sendMessage(msg.chat.id, "<b>[06:35]</b>\n★★★★★ [MG] Negev", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[56])
    bot.sendMessage(msg.chat.id, "<b>[06:45]</b>\n★★★★★ [MG] Gr MG5", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[57])
    bot.sendMessage(msg.chat.id, "<b>[06:50]</b>\n★★★★★ [MG] PKP", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[58])
    bot.sendMessage(msg.chat.id, "<b>[06:28]</b>\n★★★★★ [MG] QJY-88", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[59])
    bot.sendMessage(msg.chat.id, "<b>[05:50]</b>\n★★★☆☆ [MG] MG42", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[60])
    bot.sendMessage(msg.chat.id, "<b>[06:36]</b>\n★★★★★ [MG] MG36", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[61])
    bot.sendMessage(msg.chat.id, "<b>[04:00]</b>\n★★★☆☆ [RF] M1 Garand\n☆☆★☆☆ [Fairy] Reinforcement Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[62])
    bot.sendMessage(msg.chat.id, "<b>[04:10]</b>\n★★★★☆ [RF] Mosin-Nagant\n★★★★☆ [RF] T-5000\n☆☆★☆☆ [Fairy] Defense Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[63])
    bot.sendMessage(msg.chat.id, "<b>[04:15]</b>\n★★★★☆ [RF] SVD\n★★★★☆ [RF] K31\n★★★★☆ [RF] SPR A3G\n☆☆★☆☆ [Fairy] Barrier Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[64])
    bot.sendMessage(msg.chat.id, "<b>[04:20]</b>\n★★★★☆ [RF] Gr G28\n★★★★☆ [RF] Gr PSG-1", { parse_mode: "HTML" }); 

  else if (testo == "/tempo " + tempi[65])
    bot.sendMessage(msg.chat.id, "<b>[04:25]</b>\n★★★★☆ [RF] Springfield", { parse_mode: "HTML" }); 

  else if (testo == "/tempo " + tempi[66])
    bot.sendMessage(msg.chat.id, "<b>[04:15]</b>\n★★★★☆ [RF] PTRD\n★★★★☆ [RF] PzB 39\n☆☆★☆☆ [Fairy] Warrior Fairy", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[67])
    bot.sendMessage(msg.chat.id, "<b>[04:38]</b>\n★★★★★ [RF] Carcano M1891", { parse_mode: "HTML" }); 

  else if (testo == "/tempo " + tempi[68])
    bot.sendMessage(msg.chat.id, "<b>[04:40]</b>\n★★★★★ [RF] Kar98k\n☆☆★☆☆ [Fairy] Twin Fairy", { parse_mode: "HTML" }); 

  else if (testo == "/tempo " + tempi[69])
    bot.sendMessage(msg.chat.id, "<b>[04:42]</b>\n★★★★★ [RF] Carcano M91/38", { parse_mode: "HTML" }); 

  else if (testo == "/tempo " + tempi[70])
    bot.sendMessage(msg.chat.id, "<b>[04:45]</b>\n★★★★★ [RF] NTW-20", { parse_mode: "HTML" }); 

  else if (testo == "/tempo " + tempi[71])
    bot.sendMessage(msg.chat.id, "<b>[04:52]</b>\n★★★★★ [RF] IWS-2000", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[72])
    bot.sendMessage(msg.chat.id, "<b>[04:55]</b>\n★★★★★ [RF] M99", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[73])
    bot.sendMessage(msg.chat.id, "<b>[04:32]</b>\n★★★★★ [RF] M200", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[74])
    bot.sendMessage(msg.chat.id, "<b>[04:48]</b>\n★★★★★ [RF] QBU-88", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[75])
    bot.sendMessage(msg.chat.id, "<b>[07:15]</b>\n★★★☆☆ [SG] NS2000", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[76])
    bot.sendMessage(msg.chat.id, "<b>[07:20]</b>\n★★★☆☆ [SG] M500", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[77])
    bot.sendMessage(msg.chat.id, "<b>[07:25]</b>\n★★★☆☆ [SG] KS-23", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[78])
    bot.sendMessage(msg.chat.id, "<b>[07:30]</b>\n★★★☆☆ [SG] RMB-93\n★★★☆☆ [SG] M1897", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[79])
    bot.sendMessage(msg.chat.id, "<b>[07:14]</b>\n★★★★☆ [SG] M1014", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[80])
    bot.sendMessage(msg.chat.id, "<b>[07:40]</b>\n★★★★☆ [SG] M590\n★★★★☆ [SG] SPAS-12", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[81])
    bot.sendMessage(msg.chat.id, "<b>[07:45]</b>\n★★★★☆ [SG] M37", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[82])
    bot.sendMessage(msg.chat.id, "<b>[07:50]</b>\n★★★★☆ [SG] Super Shorty", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[83])
    bot.sendMessage(msg.chat.id, "<b>[07:55]</b>\n★★★★☆ [SG] USAS-12", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[84])
    bot.sendMessage(msg.chat.id, "<b>[08:00]</b>\n★★★★★ [SG] Am KSG", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[85])
    bot.sendMessage(msg.chat.id, "<b>[08:10]</b>\n★★★★★ [SG] S.A.T.8", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[86])
    bot.sendMessage(msg.chat.id, "<b>[08:12]</b>\n★★★★★ [SG] AA-12", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[87])
    bot.sendMessage(msg.chat.id, "<b>[08:06]</b>\n★★★★★ [SG] FP-6", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[88])
    bot.sendMessage(msg.chat.id, "<b>[08:05]</b>\n★★★★★ [SG] Saiga-12", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[89])
    bot.sendMessage(msg.chat.id, "<b>[01:20]</b>\n★★☆☆☆ [SMG] Spectre M4\n★★☆☆☆ [SMG] M45", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[90])
    bot.sendMessage(msg.chat.id, "<b>[01:25]</b>\n★★☆☆☆ [SMG] Type64", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[91])
    bot.sendMessage(msg.chat.id, "<b>[01:30]</b>\n★★☆☆☆ [SMG] M38\n★★☆☆☆ [SMG] M3\n★★☆☆☆ [SMG] MP40", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[92])
    bot.sendMessage(msg.chat.id, "<b>[01:50]</b>\n★★☆☆☆ [SMG] PPSh-41\n★★★☆☆ [SMG] F1", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[93])
    bot.sendMessage(msg.chat.id, "<b>[01:40]</b>\n★★★☆☆ [SMG] Micro UZI\n★★★☆☆ [SMG] Sten MkII", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[94])
    bot.sendMessage(msg.chat.id, "<b>[02:00]</b>\n★★★☆☆ [SMG] Ingram\n★★★☆☆ [SMG] Skorpion", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[95])
    bot.sendMessage(msg.chat.id, "<b>[02:05]</b>\n★★★☆☆ [SMG] Z-62", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[96])
    bot.sendMessage(msg.chat.id, "<b>[02:10]</b>\n★★★☆☆ [SMG] PPS-43", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[97])
    bot.sendMessage(msg.chat.id, "<b>[02:15]</b>\n★★★★☆ [SMG] UMP45\n★★★★☆ [SMG] UMP9", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[98])
    bot.sendMessage(msg.chat.id, "<b>[02:18]</b>\n★★★★☆ [SMG] Shipka\n★★★★☆ [SMG] PP-19-01\n★★★★☆ [SMG] MP7", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[99])
    bot.sendMessage(msg.chat.id, "<b>[02:20]</b>\n★★★★☆ [SMG] Gr MP5\n★★★★☆ [SMG] PP-90", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[100])
    bot.sendMessage(msg.chat.id, "<b>[02:25]</b>\n★★★★★ [SMG] Suomi", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[101])
    bot.sendMessage(msg.chat.id, "<b>[02:30]</b>\n★★★★★ [SMG] Gr G36c\n★★★★★ [SMG] Thompson", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[102])
    bot.sendMessage(msg.chat.id, "<b>[02:35]</b>\n★★★★★ [SMG] Type79\n★★★★★ [SMG] Vector", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[103])
    bot.sendMessage(msg.chat.id, "<b>[02:28]</b>\n★★★★★ [SMG] C-MS", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[104])
    bot.sendMessage(msg.chat.id, "<b>[02:29]</b>\n★★★★★ [SMG] P90", { parse_mode: "HTML" });

  else if (testo == "/tempo " + tempi[105])
    bot.sendMessage(msg.chat.id, "<b>[02:19]</b>\n★★★★★ [SMG] 100 Shiki", { parse_mode: "HTML" });
  else
    bot.sendMessage(msg.chat.id, "Nessuna informazione per il tempo inserito.");

});
