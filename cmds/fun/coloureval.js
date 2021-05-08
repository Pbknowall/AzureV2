const Discord = require("discord.js")

module.exports.run = (bot, message, args) => {
    if(!args[0]) return message.channel.send("Usage: !!colour <hex colour>")
    let embed = new Discord.MessageEmbed()
    .setTitle("Hex Colour Eval")
    .setDescription(args[0])
    .setColor(args[0])
    message.channel.send(embed)
}

module.exports.help = {
    name: "coloureval",
    description: "Evaluate a hex colour.",
    aliases: ["coloureval", "coloreval", "hex", "colour", "color"],
    category: "Fun"
}