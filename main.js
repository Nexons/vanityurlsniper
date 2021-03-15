const Discord = require('discord.js'),
      client = new Discord.Client(),
      moment = require("moment-timezone"),
      fetch = require('node-fetch');
      config = require('./config.json')
      cfonts = require('cfonts')

      console.clear()
      cfonts.say('VANITY.SNPR', {
          font: 'chrome',              
          align: 'left',              
          colors: ['system', 'magenta'],         
          background: 'transparent',  
          letterSpacing: 1,           
          lineHeight: 1,              
          space: true,                
          maxLength: '0',             
          gradient: false,            
          independentGradient: false, 
          transitionGradient: false,  
          env: 'node'              
      })
      console.log('Loading, Please wait...')

class Main {
    constructor() {
        this.sniperInterval;
    }

    async setVanityURL(url, guild) {
        const time = moment.tz(Date.now(), "Europe/Paris").format("HH:mm:ss");
        console.log(`[${time}] [INFO] Sniping discord.gg/${url}`);
        return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": "Bot " + client.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": JSON.stringify({
                "code": url
            }),
            "method": "PATCH",
            "mode": "cors"
        });
    }
    async checkVanityURL(url) {
        return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": "Bot " + client.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "method": "GET",
            "mode": "cors"
        });
    }

    async startSnipe(url, guild) {
        this.sniperInterval = setInterval(async () => {
            await this.setVanityURL(url, guild);
        }, 1000);
    }

    stopSnipe() {
        return clearInterval(this.sniperInterval);
    }
}
const prefix = config.prefix;

let handler = new Main();

client.on('message', async (message) => {
    let messageArray = message.content.split(" "),
        args = messageArray.slice(1);
    const args1 = message.content.slice(prefix.length).split(/ +/),
          command = args1.shift().toLowerCase();

    if (command === "start-snipe") {
        let url = args[0];
        

        if (!message.guild.features.includes('VANITY_URL')) {
            return message.reply("You must provide the argument VANITY_URL");
        };

        message.reply(`The vanity url ${url} is being sniped! {This may take some time!}`);
        console.log(`[INFO] Started sniping the url ${url} !`);
        await handler.startSnipe(url, message.guild);
    };

    if (command === "stop-snipe") {
        handler.stopSnipe();
        message.react('👌')
    };
    

});

client.on('ready', () => {
    console.clear()
    console.clear()
    cfonts.say('VANITY.SNPR', {
        font: 'chrome',              
        align: 'left',              
        colors: ['system', 'magenta'],         
        background: 'transparent',  
        letterSpacing: 1,           
        lineHeight: 1,              
        space: true,                
        maxLength: '0',             
        gradient: false,            
        independentGradient: false, 
        transitionGradient: false,  
        env: 'node'              
    })
    console.log(`Logged in as ${client.user.tag},\nSome commands you can use are\n${prefix}start-snipe <vanity>,\n${prefix}stop-snipe\n\nAdd your bot to your server: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=68832\n\nRemember: MP5 Clan on top!\nSuggestions or bugs? Contact Nexonᵐᵖ⁵#3526`)
})
client.login(config.token).catch(err => {
    if(err) return console.log('The provided token is invalid\nPlease create a new token at https://discord.com/developers/applications')
})
