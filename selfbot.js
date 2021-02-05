const Discord = require("discord.js"); 
const client = new Discord.Client();
const chalk = require("chalk"); // used for changing colors in console.log
const fs = require("fs");
var config = require("./config.json"); // you will use this for everything included in line 7
const log = console.log; // variable 
const { prefix, token, sbversion, footer } = config;
const Constants = require("discord.js/src/util/Constants.js");
const EventEmitter = require("events");
process.title = "selfbot terminal | https://locus.solutions"; // changes name of the terminal

// logging
client.on("ready", () => {
	client.login(config.token).catch(console.error);
	log(chalk.greenBright("[LOGIN] Successfully logged in with token as : " +client.user.username));
	log(chalk.greenBright(`[CLIENT] You are on version ${sbversion} of our selfbot.`));
	log(chalk.blue("[NOTICE] We are still developing this selfbot, please report bugs to rayz#4986 or synesta#5526"));
	log(chalk.blue("[NOTICE] Using a selfbot is BANNABLE by discord TOS, if you do not want to get banned, do not use this."))
});
	
// help
client.on("message", function(message) {
    if (message.content ==`${prefix}help`) {
		if (message.author.id !== "your discord id") {	// userID check
			return message.channel.send("  ")
		  }
		message.delete()  // this deletes your message after you have sent it
        const embed = new Discord.RichEmbed()
			.setColor("RANDOM") // color of the embed
			.setDescription(`
			 All commands require a prefix, the selfbot prefix is "**${prefix}**"

			**# FUN**
			// lenny - sends lenny face
			// party - sends party face
			// tableflip - flips the dinner table
			// unflip - you gently put the table back in place
			
	
			**# INFO**
			// help - displays all commands + prefix`)

			.setTimestamp()  // adds a timestamp in the footer
			.setFooter(footer);  // footer of the embed
			
			

        message.channel.send(embed); // sends the embed
    }
});

// chat spam, this command doesn't stop. If you want to stop it restart the selfbot 
client.on("message", function (message) {	
	if (message.content == `${prefix}spam`) {	
		message.delete() // deletes message before sending response
		message.channel.send("spam message")
		

		var interval = setInterval(function () {	
			message.channel.send("spam message");	
		}, 1500); // 1500 milliseconds = 1.5 seconds for conversion, refer to (1 MS (MILLISECOND) = TO 0.001 S (SECOND) 
	}	
});

// party
client.on("message", function (message) {
    if (message.content ==`${prefix}party`) {
		message.delete() // deletes message before sending response
		message.channel.send(`(つ°ヮ°)つ`);
	
}
});

// lenny
client.on("message", function (message) {
    if (message.content ==`${prefix}lenny`) {
		message.delete() // deletes message before sending response
		message.channel.send("( ͡° ͜ʖ ͡°)");

}
});

// table flip
client.on("message", function (message) {
    if (message.content ==`${prefix}tableflip`) {
        message.delete() // deletes message before sending response 
		message.channel.send("(╯°□°）╯︵ ┻━┻");
	
}
});

// unflip
client.on("message", function (message) {
	if (message.content ==`${prefix}unflip`) {
        message.delete() // deletes message before sending response
		message.channel.send("┬─┬ ノ( ゜-゜ノ)");
	
}
});

client.login(token);
