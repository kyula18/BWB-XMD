
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUQrbU9HYnc2N0t1eUFRZ1lEZU9sSzVuamFGOFZWdmlxNzZXRWczMFVHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmcwSFk3cnM3K2x0ZktmK3RsenQ5SUlWK1p3bFNjd0xGd041dkpKR1gyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRWJtNVQ3cjlZVnlHRDluYkRrOTZmTzlZWDRrNEhhRXZraENNUXJXbjJvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXVi93Uk1zd015TDQxU2Nrdk5GdEV6Q04xbG9TSVhVbGlYZlB4ZjJwclUwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNQUXdQTk1wM1o5aUg0VE5ONFBVNDlxaXdPQkdoN0ptazNWS2lTR0tSWDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYyMUhoRldjaitqekFmdDUrbVZadS9uOERVd2RBaHoyeWdNWFhDcng3QTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lZYUIxMElFbDZIR3VPekxteWxFeGpOUkxubGlWdk1wMlhIbHF6czExWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXh2L3MrNDkrbTJtbW1oc1Y3clhRYWs4T3cwQUs0SFQ3YWNiR1NGeU9HVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF1Z2RUMnFjeHdMd0gzY25mRzZXbTBYYVc3L1NRVHlQcnZuTDRjRTVSL0d1YllWMTBTYm9TRUoyUlZ5ejFDNG0wWkRENXp3VHhZSEtNbUowMDlJcER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJqeWYyUXZEdkFqNkE3dDZ3aGhXQUlGSGVTUkhmQ2V0S1QwdzFQQnB1RU5zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxNTQyOTQxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEOEJFQTdERDZBMjg4NkEyOEY4QzNFQkE1OUQ4MEE3OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMjg2MjQ0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MTU0Mjk0MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0RGQjcyMjU5MDBEMEU3NThCRTAzRkQ0RUU1ODVFRjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTI4NjI0NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRTlRMjE3VzQiLCJtZSI6eyJpZCI6IjI1NDcxNTQyOTQxNDozOEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE5OTkzOTY1MzExNjExMDozOEBsaWQiLCJuYW1lIjoiQ2FybCDwn6W1In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQWE5zMWNRMElPS3d3WVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOZmErVW1Ici9XeUMzVzh1cDNpeGlQU1lsZCsxMUVoK2llSzc5bGdwV3lZPSIsImFjY291bnRTaWduYXR1cmUiOiJVRTFoelc3ajc3cmZNc085NVZYRXlFemVZSEhGZFh0blVkY2w0ZUNwQnlySE9rUXpLaTF5dEtUd3VZb2FIMW1HTzNBdEl2SDlNcU56aFE1azhMY21DUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZGlLN2RsSUFXMTc4bVMzWXRWamxyVzExd2I1T2JqZDVTeGxmOWxFN0FnWTQxeW5RbTh6aXJEckJGQzVZOE5XTlRpUmwvK1V1QmN6dTRQLyswaXpmRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTU0Mjk0MTQ6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVFgydmxKaDYvMXNndDF2THFkNHNZajBtSlhmdGRSSWZvbml1L1pZS1ZzbSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxMjg2MjM4LCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUYvUyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "carltech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254715429414",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
