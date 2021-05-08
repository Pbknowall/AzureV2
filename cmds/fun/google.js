const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let query = args.join(" ").toString()
    let url = query.replace(/ /g, "+")
    message.channel.send(`https://lmgtfy.com/?q=${url}`)
}

module.exports.help = {
    name: "google",
    description: "Search google.",
    aliases: ["google", "search", "www"],
    category: "Fun"
}