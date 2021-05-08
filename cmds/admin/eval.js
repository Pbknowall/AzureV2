const Discord = require("discord.js")
const { inspect } = require("util")

module.exports.run = (bot, message, args) => {
    if (message.author.id !== "283312969931292672") return message.react("🚫")
    const command = args.slice(0).join(" ")
    if (!command) return;

    try {
        const evaled = eval(command)
        let embed = new Discord.MessageEmbed()
            .setColor("007FFF")
            .setAuthor("Evaluation", message.author.avatarURL())
            .addField("Input", `\`\`\`${command}\`\`\``)
            .addField("Output", `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
            .setFooter(`Type: ${typeof (evaled)}`)
        message.channel.send(embed).catch((err) => {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Evaluation Error", message.author.avatarURL())
                .addField("Error", `\`\`\`${err}\`\`\``)
                .setColor("#FF0000")
            message.channel.send(embed)
        })
    } catch (err) {
        try {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Evaluation Error", message.author.avatarURL())
                .addField("Error", `\`\`\`${err}\`\`\``)
                .setColor("#FF0000")
            message.channel.send(embed)
        } catch {
            message.channel.send("Wow 2 errors, both your shitty code and the error itself :joy:")
        }
    }
}

module.exports.help = {
    name: "eval",
    description: "k",
    aliases: ["eval"],
    category: "Admin"
}