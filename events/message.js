const Discord = require("discord.js")
const db = require("quick.db")
const fs = require("fs");
const moment = require("moment");
const { settings } = require("cluster");
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const words = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
const map = new Map()
let cooldown = new Set();
let cdseconds = 3;

module.exports = async (bot, message) => {
    const userset = new db.table("usersettings")
    const guildset = new db.table("guildSettings")

    if (message.author.bot) return;

    if (message.channel.type === "dm" && message.content.length > 1) {
        let guild = bot.guilds.cache.get('392718661099585537');//("431417925744984085")//vs
        let dmlog = guild.channels.cache.get('438034747965440003');//("461518928309387275")//azurelogs chl
        let dmeventembed = new Discord.MessageEmbed()
            .setTitle("New DM")
            .setDescription(`From: ${message.author} - **${message.author.tag}** (${message.author.id})`)
            .addField(`\"${message}\"`, moment(message.createdAt))
            .setColor("#007FFF")
        dmlog.send(dmeventembed)
    }


    if (message.channel.type === "dm") return;

    if (userset.has(`status_${message.author.id}.afk`)) {
        userset.delete(`status_${message.author.id}`)
        let backembed = new Discord.MessageEmbed()
            .setTitle("Welcome Back")
            .setDescription("I have removed your AFK status.")
            .setColor("#00FF00")
            .setTimestamp(new Date())
        message.channel.send(backembed)
    }
    let setafk = message.guild.member(message.mentions.users.first() || message.mentions.users.get(1));
    if (setafk) {
        userset.get(`status_${setafk.id}.afk`)
        if (userset.get(`status_${setafk.id}.afk`)) {
            const res = userset.get(`status_${setafk.id}`, { target: '.reason' })
            const time = userset.get(`status_${setafk.id}`, { target: ".time" })
            let awayembed = new Discord.MessageEmbed()
                .setTitle(setafk.user.username + " is currently AFK")
                .addField('Reason', `${res}`)
                .addField("Since", `${moment(time).calendar()} (${moment(time).fromNow()})`)
                .setColor('RANDOM')
            message.channel.send(awayembed);
        }
    }


    let antinvitestat = guildset.get(`antiinvite_${message.guild.id}`)
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        if (antinvitestat === true) {
            let invitedeletembed = new Discord.MessageEmbed()
                .setTitle("Message Deleted")
                .setDescription(`Message by ${message.author} contained a Discord invite link.`)
                .setFooter("Use !!settings to toggle this feature.")
                .setTimestamp()
            if (message.content.includes('discord.gg')) {
                message.delete()
                message.channel.send(invitedeletembed)
            } else if (message.content.includes('discord.io')) {
                message.delete()
                message.channel.send(invitedeletembed)
            } else if (message.content.includes('discord.me')) {
                message.delete()
                message.channel.send(invitedeletembed)
            } else if (message.content.includes('top.gg/servers')) {
                message.delete()
                message.channel.send(invitedeletembed)
            }
        }
    }

    const limit = 10
    const time = 3600000
    const diff = 2000

   /* if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        if (map.has(message.author.id)) {
            const userData = map.get(message.author.id)
            const { lastMessage, timer } = userData
            const difference = message.createdTimestamp - lastMessage.createdTimestamp
            let msgCount = map.msgCount
            if (difference > diff) {
                clearTimeout(timer)
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    map.delete(message.author.id)
                }, time)
                map.set(message.author.id, userData)
            } else {
                ++msgCount
                console.log(msgCount)
                if (parseInt(msgCount) === limit) {
                    message.channel.send("muted boi k")
                    setTimeout(() => {
                        console.log("unmuted now")
                    }, time)
                } else {
                    userData.msgCount = msgCount
                    map.set(message.author.id, userData)
                }
            }
        } else {
            let fn = setTimeout(() => {
                map.delete(message.author.id)
            }, time)
            map.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn
            })
        }
    }*/



    const filterstat = guildset.get(`filtering_${message.guild.id}`)
    let logstat;
    if (guildset.get(`logging_${message.guild.id}.logch`)) logstat = guildset.get(`logging_${message.guild.id}.logch`)

    if (filterstat === true) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            if (words.some(word => message.content.includes(word))) {
                message.delete().then(async () => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Azure Filtering")
                        .setColor("#FF0000")
                        .setTimestamp()
                    if (logstat) {
                        embed.setDescription(`${message.author} sent a message in ${message.channel} containing a word in my filter. Check <#${logstat}> for more info.`)
                        message.channel.send(embed)
                        const logembed = new Discord.MessageEmbed()
                            .setTitle("Azure Filtering")
                            .setDescription(`Message Deleted - ${message.author} sent a message in ${message.channel} containing a word in my filter. View the message below for more information.`)
                            .setColor("#FF0000")
                            .setTimestamp()
                        await message.guild.channels.cache.get(logstat).send(logembed).catch(_ => { return })
                    } else {
                        embed.setDescription(`${message.author} sent a message in ${message.channel} containing a word in my filter.`)
                        message.channel.send(embed)
                    }
                })
            }
        }
    }




    let prefix;
    if (guildset.has(`prefix_${message.guild.id}.prefix`)) {
        prefix = guildset.get(`prefix_${message.guild.id}.prefix`)
    } else {
        prefix = "!!"
    }





    if (!message.guild) return;
    if (guildset.get(`levelling_${message.guild.id}`) === true) {
        let beforeAddXp = userset.get(`${message.author.id}_${message.guild.id}.xp`)
        let currentLevel = 0
        if (beforeAddXp < 200 && beforeAddXp >= 0) currentLevel = 0
        if (beforeAddXp >= 200 && beforeAddXp < 800) currentLevel = 1
        if (beforeAddXp >= 800 && beforeAddXp < 1500) currentLevel = 2
        if (beforeAddXp >= 1500 && beforeAddXp < 3000) currentLevel = 3
        if (beforeAddXp >= 3000 && beforeAddXp < 5000) currentLevel = 4
        if (beforeAddXp >= 5000 && beforeAddXp < 8000) currentLevel = 5
        if (beforeAddXp >= 8000 && beforeAddXp < 12000) currentLevel = 6
        if (beforeAddXp >= 12000 && beforeAddXp < 14000) currentLevel = 7
        if (beforeAddXp >= 14000 && beforeAddXp < 15500) currentLevel = 8
        if (beforeAddXp >= 15500 && beforeAddXp < 17200) currentLevel = 9
        if (beforeAddXp >= 17200 && beforeAddXp < 18000) currentLevel = 10
        if (beforeAddXp >= 18000 && beforeAddXp < 20000) currentLevel = 11
        if (beforeAddXp >= 20000 && beforeAddXp < 21000) currentLevel = 12
        if (beforeAddXp >= 21000 && beforeAddXp < 21900) currentLevel = 13
        if (beforeAddXp >= 21900 && beforeAddXp < 22750) currentLevel = 14
        if (beforeAddXp >= 22750 && beforeAddXp < 23600) currentLevel = 15
        if (beforeAddXp > 23600) currentLevel = 16


        const xptoadd = Math.floor(Math.random() * 10) + 15
        if (!userset.has(`${message.author.id}_${message.guild.id}.xp`)) {
            userset.set(`${message.author.id}_${message.guild.id}`, { xp: 0 })
        }
        userset.add(`${message.author.id}_${message.guild.id}.xp`, xptoadd)


        let afterAddXp = userset.get(`${message.author.id}_${message.guild.id}.xp`)
        let levelAfter = 0
        if (afterAddXp < 200 && afterAddXp >= 0) levelAfter = 0
        if (afterAddXp >= 200 && afterAddXp < 800) levelAfter = 1
        if (afterAddXp >= 800 && afterAddXp < 1500) levelAfter = 2
        if (afterAddXp >= 1500 && afterAddXp < 3000) levelAfter = 3
        if (afterAddXp >= 3000 && afterAddXp < 5000) levelAfter = 4
        if (afterAddXp >= 5000 && afterAddXp < 8000) levelAfter = 5
        if (afterAddXp >= 8000 && afterAddXp < 12000) levelAfter = 6
        if (afterAddXp >= 12000 && afterAddXp < 14000) levelAfter = 7
        if (afterAddXp >= 14000 && afterAddXp < 15500) levelAfter = 8
        if (afterAddXp >= 15500 && afterAddXp < 17200) levelAfter = 9
        if (afterAddXp >= 17200 && afterAddXp < 18000) levelAfter = 10
        if (afterAddXp >= 18000 && afterAddXp < 20000) levelAfter = 11
        if (afterAddXp >= 20000 && afterAddXp < 21000) levelAfter = 12
        if (afterAddXp >= 21000 && afterAddXp < 21900) levelAfter = 13
        if (afterAddXp >= 21900 && afterAddXp < 22750) levelAfter = 14
        if (afterAddXp >= 22750 && afterAddXp < 23600) levelAfter = 15
        if (afterAddXp > 23600) levelAfter = 16

        if (currentLevel !== levelAfter) {
            if (guildset.get(`lvlmsgs_${message.guild.id}.lvlmsgs`) === true) {
                let levelupembed = new Discord.MessageEmbed()
                    .setAuthor("Level Up!", message.author.displayAvatarURL())
                    .setDescription(`${message.author}, You've just levelled up from **Lvl ${currentLevel}** :arrow_right: **Lvl ${levelAfter}**!`)
                    .setTimestamp()
                    .setColor("#007FFF")
                    .setThumbnail(message.author.avatarURL())
                message.channel.send(levelupembed).then(msg => msg.delete({ timeout: 5000 }))
            }
        }
    }





    /* if (cooldown.has(message.author.id)) {
         message.delete()
         return message.reply("You have to wait at least 3 seconds between commands.")
     }
     if (!message.member.hasPermission("MANAGE_GUILD")) {
         cooldown.add(message.author.id);
     }
 
 
     setTimeout(() => {
         cooldown.delete(message.author.id)
     }, cdseconds * 3000)*/

    const mentionRegex = new RegExp(`^(<@!?${bot.user.id}>)s*`)
    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);//message.content.slice(prefix.length).split(/ +/) || message.content.slice(mention.length) || message.content.slice(mention.length).split(/ +/)
    if (!args.join(" ") && mentionRegex.test(message.content)) return message.channel.send(`My current prefix in this server is \`${prefix}\``)
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    try {
        command.run(bot, message, args);
        console.log(`!!${command.help.name} ran by "${message.author.tag}" in ${message.guild.name}`)
    } catch (error) {
        console.error(error);
        message.channel.send('An error occured whilst executing that command. Please use **!!bugreport** to report this issue.')
    }





}