const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to purge messages.")
  if(isNaN(args[0])) return message.channel.send("Please provide an amount of messages to purge!")
  if(!args[0]) return message.channel.send("Please provide an amount of messages to purge!")
  await message.delete()
  let quant = parseInt(args[0])
  await message.channel.bulkDelete(quant).then(() => {
    message.channel.send(`Purged ${quant} messages.`).then(message => { message.delete({ timeout: 3000 }) })
  }).catch((err) => {
    if(err.message.includes("limit")) err.message = "I can only delete up to 100 messages at a time!"
    message.channel.send(err.message) && console.log(err)
    return;
  })
}


module.exports.help = {
  name: "purge",
  description: "Bulk delete messages.",
  aliases: ["purge", "delete"],
  category: "Mod"
}
