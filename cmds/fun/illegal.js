const Discord = require('discord.js');
const Jimp = require("jimp");
module.exports.run = async (bot, message, args) => {


    if (message.channel.type === "dm") return;
    let meow = message.content.split(" ").slice(1);
    let args1 = meow.join(' ');
    let illegal = `https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/` + args1.toUpperCase() + `.gif`;
    if (!args1) {
        return message.reply(':x: **Please specify something that Trump should make illegal**');
    }
    if (meow.length > 1) {
        return message.reply(':x: **Max 1 word**');
    }
    const emb = new Discord.MessageEmbed()
    .setAuthor("Trump has now made " + meow + " illegal!", "http://blog.adsy.me/wp-content/uploads/2016/11/angry-side-face-trump-transparent.png")
    .setImage(illegal)
    .setColor("#007FFF")
    message.channel.send(emb)
}

module.exports.help = {
  name: "illegal",
  description: "Use Trump to turn things illegal.",
  aliases: ["trump", "illegal"],
  category: "Fun"
}