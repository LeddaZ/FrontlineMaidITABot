# FrontlineMaidITABot ![dimCodice](https://img.shields.io/github/languages/code-size/LeddaZ/FrontlineMaidITABot?label=Dimensione%20del%20codice&style=flat-square) ![Versione](https://img.shields.io/github/v/release/LeddaZ/FrontlineMaidITABot?include_prereleases&label=Ultima%20versione&style=flat-square)
Bot molto bello per Girls Frontline

# Cronologia delle versioni
La [cronologia delle versioni](https://github.com/LeddaZ/FrontlineMaidITABot/blob/main/extra/changelog.md) contiene tutte le modifiche introdotte con i vari aggiornamenti del bot.

# Codice del bot
È possibile scaricare la versione più recente del codice sorgente cliccando [qui](https://github.com/LeddaZ/FrontlineMaidITABot/archive/main.zip)

Per scaricare una versione precedente visitare la sezione [Releases](https://github.com/LeddaZ/FrontlineMaidITABot/releases), cercare la versione desiderata e cliccare su `Source code (zip)` sotto ad `Assets`

# Avviare il bot
Per avviare il codice su un proprio bot seguire queste istruzioni:
- Creare un bot con [BotFather](https://t.me/BotFather) e annotarsi la token del bot
- Nelle impostazioni del bot attivare la tastiera inline; inoltre se il bot viene aggiunto a un gruppo dovrà essere amministratore per assicurare il corretto funzionamento
- Installare [Node.js](https://nodejs.org/it/). È consigliato installare l'ultima versione LTS, dato che il bot viene testato su Node 12 LTS
- Installare [Git](https://git-scm.com/)
- Aprire una nuova finestra del terminale/prompt dei comandi
- Clonare la repository con `git clone https://github.com/LeddaZ/FrontlineMaidITABot.git`
- Spostarsi nella cartella con `cd FrontlineMaidITABot`
- Installare i moduli npm necessari con `npm install` (se si verificano errori utilzzare `sudo npm install` su Linux/macOS o un prompt con permessi di amministratore su Windows)
- Creare un file chiamato `.env` (`touch .env` su Linux/macOS e `type nul > .env` su Windows)
- Aprire il file con un editor di testo (consiglio [Notepad++](https://notepad-plus-plus.org/) su Windows)
- Scrivere `TOKEN = xyz` nel file, sostituendo `xyz` con la token del bot generata da BotFather
- Salvare il file e chiudere l'editor
- Eseguire `npm start` per avviare il bot
