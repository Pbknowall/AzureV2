const { MessageEmbed, Collection } = require("discord.js")
const db = require("quick.db")
const moment = require("moment")
const fs = require("fs")
const categories = new Collection()

module.exports.run = async (bot, message) => {
    if (message.author.id !== "283312969931292672") return message.react("🚫")
    const testguild = bot.guilds.cache.get("431417925744984085")
    if (testguild.id !== message.guild.id) return;


    let first = ":one::two:"
    let second = ":three::four:"
    let third = ":four::five:"
    if (!first.length && !second.length && !third.length) return message.channel.send("All elements have been picked! The giveaway should end soon.")
    const embed = new MessageEmbed().setAuthor("Pick an Element", bot.user.avatarURL()).setDescription(`**Here are the current available options:**`).setColor("#ffbe42")
    const embed2 = new MessageEmbed().setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 45 seconds.").setColor("#ffbe42")

    message.channel.send(embed)
    if (first.length) { message.channel.send("> " + first) }
    if (second.length) { message.channel.send("> " + second) }
    if (third.length) { message.channel.send("> " + third) }
    message.channel.send(embed2)
}

module.exports.help = {
    name: "t",
    description: "Test command",
    aliases: ["t"],
    category: "Admin"
}