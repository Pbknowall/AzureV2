const Discord = require("discord.js");
const urban = module.require("urban");

module.exports.run = async (bot, message, args) => {
  if(!message.channel.nsfw) return message.reply("The ud/urban-dictionary command __has__ to be used in a nsfw-marked channel as some searches may contain explicit content. \nThank you for understanding.");
  if(args.length < 1) return message.channel.send("Please enter a search.");
  let str = args.join(" ");

  urban(str).first(json => {
    if(!json) return message.channel.send("No results found.");

    let embed = new Discord.MessageEmbed()
    .setTitle(json.word)
    .setDescription(json.definition)
    .addField("Upvotes \:thumbsup:", json.thumbs_up, true)
    .addField("Downvotes \:thumbsdown:", json.thumbs_down, true)
    .setFooter(`Written by ${json.author}`)
    .setColor("#007FFF")

    message.channel.send({embed})

  });
}

module.exports.help = {
  name: "ud",
  description: "Search a word on urban dictionary!",
  aliases: ["ud", "dictionary", "urban"],
  category: "Info"
}