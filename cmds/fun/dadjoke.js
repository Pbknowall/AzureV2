const discord = require ("discord.js");

module.exports.run = async (bot, msg, args) => {

	 let sa = require("superagent");

    let {body} = await sa
    .get(`https://icanhazdadjoke.com/slack`);

    let o = new discord.MessageEmbed()
    .setColor("#007FFF")
        .setDescription("**" + body.attachments.map(a => a.text) + "**")
    msg.channel.send(o)
	
}


module.exports.help = {
  name: "dadjoke",
  description: "Get a random dad joke...",
  aliases: ["dadjoke", "joke"],
  category: "Fun"
}