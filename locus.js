const Discord = require("discord.js");
const { RichEmbed } = require('discord.js');
const { red, greenBright, blueBright, yellow, cyan } = require('chalk'); // used for changing colors in console.log
const client = new Discord.Client();
const { prefix, token, ID, sbversion } = require('./config.json'); // allows you to use things like ${prefix} - do NOT change the config.json file
const nekoclient = require('nekos.life'); // nekos.life API used for cat/dog commands
const neko = new nekoclient();
const footer = 'Powered by https://locus.solutions/' // variable for the footer in embeds
process.title = "selfbot terminal | https://locus.solutions"; // changes name of the terminal   

// Logs
console.log(greenBright(`[NOTICE] : we are still developing this selfbot, please report bugs to rayz#4986 or synesta#5526`));
console.log(greenBright(`[NOTICE] : using a selfbot is BANNABLE by discord TOS, if you do not want to get banned, do not use this.`));
console.log(greenBright(`[CLIENT] : you are on version ${sbversion} of our selfbot`))
console.log('============================================================================');

// More logs
client.on('ready', ()=>{
    console.log(blueBright(`[SELFBOT] : connected to ${client.user.tag}`));
    console.log(blueBright(`[SELFBOT] : set prefix is ${prefix}`));
    console.log('============================================================================');
});

client.on('message', async(msg)=>{
    if(msg.author.id !== ID) {
        return;
    }
    let cmd = msg.content.split(" ")[0]
    cmd = cmd.slice(prefix.length);
    let args = msg.content.split(" ").slice(1);
    if(msg.content.startsWith(prefix) && msg.author.id === ID){
        console.log(cyan(`[CLIENT] : ${client.user.tag} ran '${msg.content}'`));
    }
    // ping command, this will display client ping
    if(cmd === `ping`){
        msg.edit(`Client ping is ${client.ping.toFixed()}ms`);
    }



    // smiley command, this will edit your message to a smiley
    if(cmd === 'smiley'){
        msg.edit("☻");
    }
    // wink command, this will edit your message to a wink
    if(cmd === 'wink'){
        msg.edit("( ͡~ ͜ʖ ͡°)")
    }
    // party command, this will edit your message to a party face
    if(cmd === 'party'){
        msg.edit("(つ°ヮ°)つ")
    }
    //  lenny command, this will edit your message to a lenny face
    if(cmd === 'lenny'){
        msg.edit("( ͡° ͜ʖ ͡°)")
    }
    // flip command, this will flip a table
    if(cmd === 'flip'){
        msg.edit("(╯°□°）╯︵ ┻━┻")
    }
    // gently puts table back in place
    if(cmd === 'unflip'){
        msg.edit("┬─┬ ノ( ゜-゜ノ)")
    }
    // yay command, this will edit your message to a yay face
    if(cmd === 'yay'){
        msg.edit("( ﾟヮﾟ)")
    }
    // woah command, this will edit your message to a woah face
    if(cmd === 'woah'){
        msg.edit("【 º □ º 】")
    }



    // spam command
    if(cmd === 'spam'){
        msg.edit("spam")

        var interval = setInterval(function () {
            msg.channel.send("spam");
        }, 1); // edit the value '1' to change the interval of time sent between messages (this is in milliseconds, for conversions refer to > 1 second = 1000 milliseconds
    }
    
    // purges messages at intervals of 100
    if(cmd === 'purge'){
        msg.channel.fetchMessages({ limit: 100 }).then(msgs=>msgs.filter(m => m.author.id === client.user.id).map(r => r.delete()))
    }
    
    // displays the time the client has been connected and online
    if(cmd === "uptime") {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        msg.edit(`I've been online for ${days}d ${hours}h ${minutes}m ${seconds}s`)
    }
    
    // displays author or users avatar
    if(cmd === "avatar"){
        let user = msg.mentions.users.first() || msg.author;
        msg.delete()
        msg.channel.send("", { embed: new RichEmbed()
        .setColor("RANDOM")
        .setImage("https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+".jpeg")
        .setTimestamp()
        .setFooter(footer)})
    }
    
    // displays all commands
    if(cmd === "help"){
        msg.delete()
        msg.channel.send("", { embed: new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`
        	 **All commands require a prefix, the selfbot prefix is "${prefix}"**
             **To display this command, write ${prefix}help**

            **# FUN**
            // lenny - sends lenny face
            // party - sends party face
            // wink - sends a winking face
            // smiley - sends a smiley face
            // flip - flips the dinner table
            // unflip - you gently put the table back in place
            // yay - sends a yay face
            // woah - sends a woah face
            // cat - sends a random image of a cat
            // dog - sends a random image of a dog
            // avatar - sends user avatar
            // say - says something in an embed
	    // nuke - nukes a channel, that's always fun
            // eval - calculator

            **# CLIENT**
            // logout - logs out of the client (you will have to restart)
            // uptime - sends the time the selfbot has been online
            // ping - sends the client ping 
            `)})
    } 
      
    // says something in an embed
    if(cmd === 'say'){
        let saymessage = args.slice(0).join(" ");
        msg.delete()
        msg.channel.send("", { embed: new RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(saymessage)
            .setTimestamp()
            .setFooter(footer)});
    }
    
    if(cmd === "nuke") {
        let clearchannel = msg.channel
        newChannel = await clearchannel.clone()
        clearchannel.delete()
        newChannel.send("", { embed: new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`${client.user.tag} successfully nuked #${newChannel.name}`)
        .setTimestamp()
        .setFooter(footer)})
    }
    
    // utilizing the nekos.life API to send a cat image
    if(cmd === "cat") {
        async function cat() {
            let GIF = await neko.sfw.meow();
            msg.edit("", { embed: new RichEmbed()
            .setColor("BLACK")
            .setImage(GIF.url)})
        }
        cat();
    }
    
   // utilizing the nekos.life API to send a dog image
    if(cmd === "dog") {
        async function dog() {
            let GIF = await neko.sfw.woof();
            msg.edit("", { embed: new RichEmbed()
            .setColor("BLACK")
            .setImage(GIF.url)})
        }
        dog();
    }
    
    /*
    if(cmd === "scare"){
        msg.delete()
        msg.channel.send("", { embed: new RichEmbed()
        .setColor("RANDOM")
        .setImage("need to find an actual image :)")})
    } 
    */

    // exits selfbot process
    if(cmd === "logout"){
        process.exit()
    }

    // BASIC CALCULATOR
    if(cmd === 'eval'){
        let res;
        try{
            res = eval(args.join(" "))
        } catch(e){
            return msg.edit("", { embed: new RichEmbed()
                .setColor("RANDOM")
                .setDescription(`Uh oh, there was an error.`)
                .setTimestamp()
                .setFooter(footer) })
        }
        msg.edit("", { embed: new RichEmbed()
            .setColor("RANDOM")
            .setDescription(`**Asked : ` + args.join(" ") +`**
            **Answer : ${res}**`)
            .setTimestamp()
            .setFooter(footer) })
    }
});

client.login(token); // logs into token from ./config.json
