const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = (bot, message, args) => {
    let userset = new db.table("usersettings")
    let msg = args.slice(0).join(" ");
    if (!msg) msg = 'None Provided'
    userset.set(`status_${message.member.id}`, { id: message.member.id, afk: true, reason: msg, time: message.createdAt })
    let afkembed = new Discord.MessageEmbed()
        .setTitle(`Successfully set ${message.author.username} as AFK!!`)
        .addField('Reason', `${msg}`)
        .setColor("#007FFF")
        .setTimestamp(new Date())
    message.channel.send(afkembed)

}

module.exports.help = {
    name: "afk",
    description: "Set a global AFK status.",
    aliases: ["afk", "setafk", "away"],
    category: "Fun"
}