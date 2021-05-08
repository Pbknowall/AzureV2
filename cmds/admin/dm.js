module.exports.run = async (bot, message, args) => {
  if (message.author.id === "283312969931292672") {
    try {
      let recipient = message.mentions.members.first()
      recipient.send(args.slice(1).join(" "))
      message.channel.send(`Message sent by mention to ${recipient} (${recipient.id})`)
    } catch (_) {
      let recipientId = args[0]
      if (!recipientId) return;
      let fetched = bot.users.fetch(recipientId).then(id => {
        id.send(args.slice(1).join(" "))
      }).catch(err => console.log("2nd " + err))
      message.channel.send(`Message sent to <@${recipientId}> (${recipientId})`)
    }
  }
}
module.exports.help = {
  name: 'dm',
  description: 'DM a user. This is only usable by the bot creator.',
  aliases: ["dm", "pm"],
  category: "Admin"
}