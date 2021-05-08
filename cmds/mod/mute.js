const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  const usagembed = new Discord.MessageEmbed().setTitle("Mute Usage").setDescription("\`\`\`!!mute <member> <time>\`\`\`\nExample: `!!mute @Pbknowall#7667 30m`").setTimestamp().setColor("#007FFF")

  let tomute = message.mentions.members.first()
  if (!tomute) return message.channel.send(usagembed)
  if (tomute.hasPermission("KICK_MEMBERS")) return message.reply("That user can't be muted!");
  let muterole = message.guild.roles.cache.find(role => role.name === "muted")
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({
        data: {
          name: "Muted",
          colour: "#000000",
          permissions: []
        }
      });
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole.id, {
          SEND_MESSAGES: false,
          SPEAK: false,
          ADD_REACTIONS: false

        })
        
      })
    } catch (err) {
      console.log(err.stack);
    }
  }
  let mutetime = args[1];
  if (!mutetime) return message.channel.send("You didn't specify an amount of time for the mute!")
  await (tomute.roles.add(muterole.id));
  try {
  message.reply(`${tomute.user} has been muted for ${ms(ms(mutetime))}`);
  } catch {
    return message.channel.send(usagembed)
  }

  setTimeout(function () {
    tomute.roles.remove(muterole.id);
    message.channel.send(`${tomute} has been unmuted.`)
  }, ms(mutetime))


}

module.exports.help = {
  name: "mute",
  description: "Mute a member for a specific amount of time.",
  aliases: ["mute", "tempmute"],
  category: "Mod"
}