const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = (bot, message, args) => {
  const xp = new db.table("usersettings")
  let xpuser = message.mentions.users.first() || message.author
  let currentxp = xp.get(`${xpuser.id}_${message.guild.id}.xp`)
  if (!xp.has(`${xpuser.id}_${message.guild.id}.xp`)) currentxp = 0
  if (currentxp == "null") currentxp = 0

  let currentLevel = 0
  if (currentxp < 200 && currentxp >= 0) currentLevel = 0
  if (currentxp >= 200 && currentxp < 800) currentLevel = 1
  if (currentxp >= 800 && currentxp < 1500) currentLevel = 2
  if (currentxp >= 1500 && currentxp < 3000) currentLevel = 3
  if (currentxp >= 3000 && currentxp < 5000) currentLevel = 4
  if (currentxp >= 5000 && currentxp < 8000) currentLevel = 5
  if (currentxp >= 8000 && currentxp < 12000) currentLevel = 6
  if (currentxp >= 12000 && currentxp < 14000) currentLevel = 7
  if (currentxp >= 14000 && currentxp < 15500) currentLevel = 8
  if (currentxp >= 15500 && currentxp < 17200) currentLevel = 9
  if (currentxp >= 17200 && currentxp < 18000) currentLevel = 10
  if (currentxp >= 18000 && currentxp < 20000) currentLevel = 11
  if (currentxp >= 20000 && currentxp < 21000) currentLevel = 12
  if (currentxp >= 21000 && currentxp < 21900) currentLevel = 13
  if (currentxp >= 21900 && currentxp < 22750) currentLevel = 14
  if (currentxp >= 22750 && currentxp < 23600) currentLevel = 15
  if (currentxp > 23600) currentLevel = 16

  let nextLevelXP = 0
  if (currentxp < 200 && currentxp >= 0) nextLevelXP = 200
  if (currentxp >= 200 && currentxp < 800) nextLevelXP = 800
  if (currentxp >= 800 && currentxp < 1500) nextLevelXP = 1500
  if (currentxp >= 1500 && currentxp < 3000) nextLevelXP = 3000
  if (currentxp >= 3000 && currentxp < 5000) nextLevelXP = 5000
  if (currentxp >= 5000 && currentxp < 8000) nextLevelXP = 8000
  if (currentxp >= 8000 && currentxp < 12000) nextLevelXP = 12000
  if (currentxp >= 12000 && currentxp < 14000) nextLevelXP = 14000
  if (currentxp >= 14000 && currentxp < 15500) nextLevelXP = 15500
  if (currentxp >= 15500 && currentxp < 17200) nextLevelXP = 17200
  if (currentxp >= 17200 && currentxp < 18000) nextLevelXP = 18000
  if (currentxp >= 18000 && currentxp < 20000) nextLevelXP = 20000
  if (currentxp >= 20000 && currentxp < 21000) nextLevelXP = 21000
  if (currentxp >= 21000 && currentxp < 21900) nextLevelXP = 21900
  if (currentxp >= 21900 && currentxp < 22750) nextLevelXP = 22750
  if (currentxp >= 22750 && currentxp < 23600) nextLevelXP = 23600


  let ToLevelUp = nextLevelXP - currentxp
  let nextLevel = currentLevel + 1

  /*
  200xp - level 1
  800xp - level 2
  1500xp - level 3
  3000xp - level 4
  5000xp - level 5
  8000xp - level 6
  12000xp - level 7
  14000xp - level 8
  15500xp - level 9
  17200xp - level 10
  18000xp - level 11
  20000xp - level 12
  21000xp - level 13
  21900xp - level 14
  22750xp - level 14
  23600xp - level 15
  */

  const currentembed = new Discord.MessageEmbed()
    .setAuthor("Current Experience Level", xpuser.displayAvatarURL())
    .setTitle(`${ToLevelUp} XP until level ${nextLevel}`)
    .addField("Level", `Lvl ${currentLevel}`, true)
    .addField("Experience", `${currentxp} XP / ${nextLevelXP} XP`, true)
    .setColor("#007FFF")
    .setTimestamp(message.createdAt)
    .setFooter(message.author.tag)

  message.channel.send(currentembed)
}
module.exports.help = {
  name: "xp",
  description: "View your/a user's experience level.",
  aliases: ["xp", "level", "experience", "lvl", "rank"],
  category: "Info"
}