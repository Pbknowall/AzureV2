const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
      let embed = new Discord.MessageEmbed() //Embeds.
            .setTitle("Here is your random colour: ")
            .addField("Hex", `#${color}`)
            .setColor(`#${color}`);
     message.channel.send({embed: embed});
}

module.exports.help = {
  name: "randomcolour",
  description: "Shows a random colour",
  aliases: ["randomcolour", "randomcolor"],
  category: "Fun"
}