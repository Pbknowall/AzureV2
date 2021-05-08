const Discord = require("discord.js");
const imageapi = require("imageapi.js")

module.exports.run = async (bot, message) => {
  let url = await imageapi("meme")
  if(!url) url = await imageapi("meme")

    const embed = new Discord.MessageEmbed()
      .setColor("#007FFF")
      .setImage(url)
    message.channel.send(embed);
}

module.exports.help = {
  name: "meme",
  description: "Memezzzz 4 life",
  aliases: ["meme", "plsmeme", "r/meme"],
  category: "Fun"
}