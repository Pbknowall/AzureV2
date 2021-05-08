const Discord = require('discord.js')
const imageapi = require("imageapi.js")
module.exports.run = async (bot, message, args) => {

  const url = await imageapi("puppy").then(url => {
    const embed = new Discord.MessageEmbed()
      .setColor("#007FFF")
      .setTitle("Your Requested Puppy :dog:")
      .setImage(url)
    message.channel.send(embed)
  })
}

module.exports.help = {
  name: "dog",
  description: "Shows a random dog.",
  aliases: ["dog", "dogpic", "puppy", "pup", "doggy", "doggo"],
  category: "Fun"
}