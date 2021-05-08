const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
  
}

module.exports.help = {
  name: "autorole",
  description: "Set (a) role(s) to be added automatically on a user's join.",
  aliases: ["autorole", "autoroles", "joinrole", "joinroles"],
  category: "Mod"
}