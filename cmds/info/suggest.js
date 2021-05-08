const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
  let suggestionch = bot.channels.cache.get("441939735926013972")//message.guild.channels.cache.find(channel => channel.name === "azurelogs");
  if (!args[0]) return message.reply("Please enter a suggestion (!!suggest <suggestion>)")
  let suggestion = args.slice(0).join(" ") || args.join(" ")

  let suggestionembed = new Discord.MessageEmbed()
    .setTitle("New Suggestion/Bug Report")
    .setColor("#007FFF")
    .setDescription(`Message: **${suggestion}**`)
    .addField("From", `${message.author.tag} (${message.author.id})`)
    .addField("Server", `"${message.guild.name}"`)
    .setTimestamp(message.createdAt);

  let surembed = new Discord.MessageEmbed()
    .setTitle("New")
    .setColor("#007FFF")
    .addField(`Message: __${suggestion}__`, "React with ✅ to confirm")

  let thanksembed = new Discord.MessageEmbed()
    .setTitle("New")
    .setColor("#007FFF")
    .setDescription("Thank you for your suggestion/bug report, it is greatly appreciated for Azure's development.")
    .addField("Your Message", "\"" + suggestion + "\"\n")
    .setTimestamp(message.createdAt)


  message.channel.send(surembed).then(msg => {
    msg.react("✅")
    const reactionFilter = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
    if (reactionFilter) {
      const confirm = msg.createReactionCollector(reactionFilter, { time: 15000 });
      confirm.on("collect", r => {
        r.remove().catch(error => console.log(error))
        msg.edit(thanksembed)
        suggestionch.send(suggestionembed).catch((err) => console.log(err))
      })
    }
  })
}

module.exports.help = {
  name: 'suggest',
  description: 'Suggest new features for Azure.',
  aliases: ["suggest", "suggestion", "newfeature", "suggestfeature", "feature", "bugr", "bug", "bugreport"],
  category: "Info"
}