const Discord = require("discord.js");
const imageapi = require("imageapi.js")

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("Usage: `!!reddit <subreddit>`")
    let query = args[0]
    let url;

    if (args[0].includes("r/")) {
        query = args[0].replace("r/", "")
        console.log(query)
    }
    url = await imageapi(query).catch(() => {
        message.channel.send("Subreddit not found.")
        return;
    })
    if(!url) return;
    const embed = new Discord.MessageEmbed()
        .setAuthor(`r/${query}`, message.author.avatarURL())
        .setColor("#007FFF")
        .setImage(url)
    message.channel.send(embed)
}

module.exports.help = {
    name: "reddit",
    description: "Get a random post from a specified subreddit.",
    aliases: ["reddit", "r/"],
    category: "Fun"
}