const Discord = require("discord.js")
const db = require("quick.db")
const regex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/
const numbers = require("./../../RegEx.js")

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to manage Reaction Roles.")
    const guildset = new db.table("guildSettings")
    const prompter = message.author;
    const createEmbed = new Discord.MessageEmbed().setTitle("Azure Reaction Roles").setDescription("It seems like there is no Reaction-Roles Message in the server yet. Use `!!rr create` to create one.").setColor("#007FFF").setTimestamp()
    const usage = new Discord.MessageEmbed().setTitle("Azure Reaction Roles - BETA").setDescription("❯ Usage:\n\n`!!rr create` - Creates a New Message\n`!!rr add` - Add a New Role Option\n`!!rr remove` - Remove a Role Option").setColor("#007FFF").setTimestamp().setThumbnail(message.guild.iconURL()).setFooter("BETA Feature - Use !!bugreport to report bugs.")

    if (!args[0]) { return message.channel.send(usage) }

    else if (args[0] === "add") {

        const dbChannel = message.guild.channels.cache.get(guildset.get(`rr_${message.guild.id}.1.channel`)) ||
            message.guild.channels.cache.get(guildset.get(`rr_${message.guild.id}.2.channel`)) ||
            message.guild.channels.cache.get(guildset.get(`rr_${message.guild.id}.3.channel`)) ||
            message.guild.channels.cache.get(guildset.get(`rr_${message.guild.id}.4.channel`)) ||
            message.guild.channels.cache.get(guildset.get(`rr_${message.guild.id}.5.channel`))
        if (!dbChannel) return message.channel.send(createEmbed)
        const titles = []
        if (guildset.get(`rr_${message.guild.id}.1`)) titles.push(guildset.get(`rr_${message.guild.id}.1`))
        if (guildset.get(`rr_${message.guild.id}.2`)) titles.push(guildset.get(`rr_${message.guild.id}.2`))
        if (guildset.get(`rr_${message.guild.id}.3`)) titles.push(guildset.get(`rr_${message.guild.id}.3`))
        if (guildset.get(`rr_${message.guild.id}.4`)) titles.push(guildset.get(`rr_${message.guild.id}.4`))
        if (guildset.get(`rr_${message.guild.id}.5`)) titles.push(guildset.get(`rr_${message.guild.id}.5`))

        //have to map these for the title and then + 1 to not have a 0 listing

        const prompt = new Discord.MessageEmbed()
            .setTitle("Reaction Roles")
            .setDescription("**Pick an Item on the List to Add an Item To:**")
            .setDescription(`${titles.map(i => `${numbers[titles.indexOf(i) + 1]} - "**${i.title}**" in  ${message.guild.channels.cache.get(i.channel)}`).join("\n")}\n\nChoose an item from the list by their item number.`)
            .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 15 seconds.")
            .setColor("#007FFF")
        message.channel.send(prompt)
        const prompt1 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 15000 })
            .then(async m => {
                m = m.first()
                if (m.author.id !== prompter.id) return;
                if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                const option = m.content
                if (isNaN(option) || option > titles.length || option === 0 || !titles[option - 1]) return message.channel.send("Invalid List Item - Prompt Cancelled")
                /*let roles = []
                let arra = roles.push(guildset.get(`rr_${message.guild.id}.${option}.roles`))
                roles = roles*/
                let roles = guildset.get(`rr_${message.guild.id}.${option}.roles`)
                const dbTitle = guildset.get(`rr_${message.guild.id}.${option}.title`)
                const dbMessage = dbChannel.messages.fetch(guildset.get(`rr_${message.guild.id}.${option}.id`)).then(mesg => {
                    if (!mesg) return message.channel.send("It seems the Reaction-Roles message you are trying to edit was deleted...")
                })
                const prompt2 = new Discord.MessageEmbed()
                    .setTitle("Add Role to Reaction Roles")
                    .setDescription("**What role would you like to add to the list? (You don't have to mention the role, id or name work too.)**")
                    .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 20 seconds.")
                    .setColor("#007FFF")
                const add = await message.channel.send(prompt2)
                const prompt3 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 20000 })
                    .then(async m => {
                        m = m.first()
                        if (m.author.id !== prompter.id) return;
                        if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                        const role = m.mentions.roles.first() || m.guild.roles.cache.find(r => r.name === m.content) || m.guild.roles.cache.get(m.content)
                        if (role) {
                            if (roles) {
                                if (roles[0]) {
                                    let map = (roles.map(r => r.role === role.id))
                                    if (map.includes(true)) return message.channel.send(":x: You already have a listing associated to that role - Prompt Cancelled")
                                }
                            }
                            const addemote = new Discord.MessageEmbed()
                                .setTitle("Add Emoji to Reaction Roles")
                                .setDescription(`Now, what emoji would you like to associate to the role ${role}?`)
                                .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 20 seconds.")
                                .setColor("#007FFF")
                            await add.edit(addemote)
                            const prompt3 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 20000 })
                                .then(async m => {
                                    m = m.first()
                                    if (m.author.id !== prompter.id) return;
                                    if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                                    let match = m.content.match(regex)
                                    let emote;
                                    if (match && message.guild.emojis.cache.find(e => e.name === match[2])) {
                                        const emot = message.guild.emojis.cache.find(e => e.name === match[2])/*(Finds by emoji name)*/ || message.guild.emojis.cache.get(match[3])// Finds by ID
                                        emote = emot.id
                                    } else if (match && !message.guild.emojis.cache.find(e => e.name === match[2])) { //If it's a match but it's part of the current guild
                                    } else {
                                        emote = m.content
                                    }
                                    if (!emote) {
                                        message.channel.send("Unknown Emoji (This Could be Because the Emoji Provided is Not a Server Emoji) - Prompt Cancelled.")
                                    } else {
                                        if (roles) {
                                            if (roles[0]) {
                                                let map = (roles.map(r => r.emote === emote))
                                                if (map.includes(true)) return message.channel.send(":x: You already have a listing associated to that emote - Prompt Cancelled")
                                            }
                                        }
                                        const titleOrNone = dbTitle || "Reaction Roles"
                                        if (!guildset.has(`rr_${message.guild.id}.${option}.roles`)) guildset.set(`rr_${message.guild.id}.${option}.roles`, [])
                                        const added = guildset.push(`rr_${message.guild.id}.${option}.roles`, { 'role': role.id, 'emote': emote })
                                        roles = guildset.get(`rr_${message.guild.id}.${option}.roles`)

                                        const list = roles.map(r => {
                                            let emoji;
                                            if (!isNaN(r.emote)) {
                                                let emoj = message.guild.emojis.cache.get(r.emote)
                                                emoji = `${emoj}`
                                            } else {
                                                emoji = r.emote
                                            }
                                            return `${emoji} - \`${message.guild.roles.cache.get(r.role).name}\``
                                        }).join("\n")
                                        const edited = new Discord.MessageEmbed().setTitle(titleOrNone).setDescription(`- React to Get a Role -\n\n${list}`).setColor("#007FFF").setFooter("Azure Reaction Roles", message.guild.iconURL()).setTimestamp()
                                        const dbMessage = dbChannel.messages.fetch(guildset.get(`rr_${message.guild.id}.${option}.id`)).then(mesg => {
                                            mesg.edit(edited)
                                            mesg.reactions.removeAll()
                                            roles.map(r => {
                                                let emoji;
                                                if (!isNaN(r.emote)) {
                                                    emoji = message.guild.emojis.cache.get(r.emote)
                                                    mesg.react(message.guild.emojis.cache.get(r.emote)).catch(err => {
                                                        console.log(err)
                                                    })
                                                } else {
                                                    emoji = r.emote
                                                    mesg.react(r.emote).catch(err => {
                                                        console.log(err)
                                                    })
                                                }
                                            })
                                            let emoji;
                                            if (!isNaN(emote)) {
                                                let emoj = message.guild.emojis.cache.get(emote)
                                                emoji = `${emoj}`
                                            } else {
                                                emoji = emote
                                            }
                                            let added = new Discord.MessageEmbed()
                                                .setTitle("Item Added")
                                                .setDescription(`Role ${role} was added to message "**${guildset.get(`rr_${message.guild.id}.${option}.title`)}**" associated to the emoji ${emoji}\n[Jump to Message](${mesg.url})`)
                                                .setColor("#007FFF")
                                                .setFooter("Azure Reaction Roles", message.guild.iconURL())
                                                .setTimestamp()
                                            message.channel.send(added)
                                        }).catch(err => {
                                            console.log(err)
                                            message.channel.send("It seems the Reaction-Roles message you are trying to edit was deleted...")
                                            //guildset.delete(`rr_${message.guild.id}.${option}`)
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    message.channel.send("Prompt Cancelled")
                                })
                        } else {
                            message.channel.send("Unknown Role - Prompt Cancelled.")
                        }
                    }).catch(err => {
                        console.log(err)
                        message.channel.send("Prompt Cancelled")
                    })
            }).catch(err => {
                console.log(err)
                message.channel.send("Prompt Cancelled")
            })


    } else if (args[0] === "delete" || args[0] === "remove") {
        const titles = []
        if (guildset.get(`rr_${message.guild.id}.1`)) titles.push(guildset.get(`rr_${message.guild.id}.1`))
        if (guildset.get(`rr_${message.guild.id}.2`)) titles.push(guildset.get(`rr_${message.guild.id}.2`))
        if (guildset.get(`rr_${message.guild.id}.3`)) titles.push(guildset.get(`rr_${message.guild.id}.3`))
        if (guildset.get(`rr_${message.guild.id}.4`)) titles.push(guildset.get(`rr_${message.guild.id}.4`))
        if (guildset.get(`rr_${message.guild.id}.5`)) titles.push(guildset.get(`rr_${message.guild.id}.5`))
        const prompt = new Discord.MessageEmbed()
            .setTitle("Reaction Roles")
            .setDescription("**Pick an Item From Which You Want to Delete an Item**")
            .setDescription(`${titles.map(i => `${numbers[titles.indexOf(i) + 1]} - "**${i.title}**" in  ${message.guild.channels.cache.get(i.channel)}`).join("\n")}\n\nChoose an item from the list by their item number.`)
            .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 15 seconds.")
            .setColor("#007FFF")
        message.channel.send(prompt)
        const prompt1 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 15000 })
            .then(async m => {
                m = m.first()
                if (m.author.id !== prompter.id) return;
                if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                const option = m.content
                if (isNaN(option) || option > titles.length || option === 0 || !titles[option - 1]) return message.channel.send("Invalid List Item - Prompt Cancelled")
                let roles = guildset.get(`rr_${message.guild.id}.${option}.roles`)
                const prompt2 = new Discord.MessageEmbed()
                    .setTitle("Remove Role to Reaction Roles")
                    .setDescription("**What role would you like to remove from the list? (You don't have to mention the role, id or name work too.)**")
                    .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 20 seconds.")
                    .setColor("#007FFF")
                const add = await message.channel.send(prompt2)
                const prompt3 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 20000 })
                    .then(async m => {
                        m = m.first()
                        if (m.author.id !== prompter.id) return;
                        if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                        let role = m.mentions.roles.first() || m.guild.roles.cache.find(r => r.name === m.content) || m.guild.roles.cache.get(m.content)
                        if (role) {
                            if (roles[0]) {
                                let map = roles.map(r => r.role === role.id)
                                if (!map.includes(true)) return message.channel.send(":x: You don't have a listing associated to that role - Prompt Cancelled")
                            }
                        }
                        role = role.id
                        const arr = [];
                        roles.map(r => arr.push(r.role))
                        const item = arr.indexOf(role)
                        const associatedEmoji = roles[item].emote
                        const associatedRole = roles[item].role
                        const spliced = roles.splice(item, 1)
                        guildset.set(`rr_${message.guild.id}.${option}.roles`, roles)
                        roles = guildset.get(`rr_${message.guild.id}.${option}.roles`)
                        const dbTitle = guildset.get(`rr_${message.guild.id}.${option}.title`)
                        const dbChannel = message.guild.channels.cache.get(guildset.get(`rr_${message.guild.id}.${option}.channel`))
                        const titleOrNone = dbTitle || "Reaction Roles"
                        const list = roles.map(r => {
                            let emoji;
                            if (!isNaN(r.emote)) {
                                let emoj = message.guild.emojis.cache.get(r.emote)
                                emoji = `${emoj}`
                            } else {
                                emoji = r.emote
                            }
                            return `${emoji} - \`${message.guild.roles.cache.get(r.role).name}\``
                        }).join("\n")
                        const edited = new Discord.MessageEmbed().setTitle(titleOrNone).setDescription(`- React to Get a Role -\n\n${list}`).setColor("#007FFF").setFooter("Azure Reaction Roles", message.guild.iconURL()).setTimestamp()
                        const dbMessage = dbChannel.messages.fetch(guildset.get(`rr_${message.guild.id}.${option}.id`)).then(mesg => {
                            mesg.edit(edited)
                            mesg.reactions.removeAll()
                            roles.map(r => {
                                let emoji;
                                if (!isNaN(r.emote)) {
                                    emoji = message.guild.emojis.cache.get(r.emote)
                                    mesg.react(message.guild.emojis.cache.get(r.emote)).catch(err => {
                                        console.log(err)
                                    })
                                } else {
                                    emoji = r.emote
                                    mesg.react(r.emote).catch(err => {
                                        console.log(err)
                                    })
                                }
                            })
                            let added = new Discord.MessageEmbed()
                                .setTitle("Item Removed")
                                .setDescription(`Role ${message.guild.roles.cache.get(associatedRole)} was removed from message "**${guildset.get(`rr_${message.guild.id}.${option}.title`)}**" associated to the emoji ${associatedEmoji}\n[Jump to Message](${mesg.url})`)
                                .setColor("#007FFF")
                                .setFooter("Azure Reaction Roles", message.guild.iconURL())
                                .setTimestamp()
                            message.channel.send(added)
                        })
                    }).catch(err => {
                        console.log(err)
                        message.channel.send("Prompt Cancelled")
                    })
            }).catch(err => {
                console.log(err)
                message.channel.send("Prompt Cancelled")
            })



    } else if (args[0] === "create") {
        const logprompt = new Discord.MessageEmbed()
            .setTitle("Create Reaction Roles | Channel")
            .setDescription("**Please Choose a Channel Where You Want the Reaction-Role Message to be Sent To.**")
            .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 20 seconds.")
            .setColor("#007FFF")
        message.channel.send(logprompt)
        const prompt = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 20000 })
            .then(async m => {
                m = m.first()
                if (m.author.id !== prompter.id) return;
                if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") return message.channel.send("Prompt Cancelled")
                const channel = m.mentions.channels.first() || m.guild.channels.cache.find(ch => ch.name === m.content) || m.guild.channels.cache.get(m.content)
                if (!channel) {
                    message.channel.send("Channel Not Found - Prompt Cancelled")
                }

                const logprompt2 = new Discord.MessageEmbed()
                    .setTitle("Reaction Roles | Title")
                    .setDescription("**Now, Input a Title for Your Reaction-Roles Message.**")
                    .setFooter("Type \"cancel\" to cancel this prompt - It will be automatically cancelled in 20 seconds.")
                    .setColor("#007FFF")
                message.channel.send(logprompt2)
                const prompt2 = await message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 20000 })
                    .then(m => {
                        m = m.first()
                        if (m.author.id !== prompter.id) return;
                        let title;
                        if (m.content === "cancel" || m.content === "Cancel" || m.content === "CANCEL") {
                            return message.channel.send("Prompt Cancelled")
                        } else {
                            title = m.content
                        }
                        if (title) {
                            const rr = new Discord.MessageEmbed().setTitle(title).setColor("#007FFF").setFooter("Azure Reaction Roles", message.guild.iconURL()).setTimestamp()
                            channel.send(rr).then(msg => {
                                const embed = new Discord.MessageEmbed().setTitle("✅ Reaction Roles Message Created").setDescription(`Reaction Role Message Set - [Jump](${msg.url}) \nUse \`!!rr add\` to add items to the list.`).setColor("#007FFF").setFooter("BETA Feature - Use !!bugreport to report bugs.").setTimestamp()
                                message.channel.send(embed)
                                if (!guildset.has(`rr_${message.guild.id}.1`)) {
                                    guildset.set(`rr_${message.guild.id}.1`, { title: title, channel: msg.channel.id, id: msg.id })
                                } else if (guildset.has(`rr_${message.guild.id}.1`) && !guildset.has(`rr_${message.guild.id}.2`)) {
                                    guildset.set(`rr_${message.guild.id}.2`, { title: title, channel: msg.channel.id, id: msg.id })
                                } else if (guildset.has(`rr_${message.guild.id}.1`) && guildset.has(`rr_${message.guild.id}.2`) && !guildset.has(`rr_${message.guild.id}.3`)) {
                                    guildset.set(`rr_${message.guild.id}.3`, { title: title, channel: msg.channel.id, id: msg.id })
                                } else if (guildset.has(`rr_${message.guild.id}.1`) && guildset.has(`rr_${message.guild.id}.2`) && guildset.has(`rr_${message.guild.id}.3`) && !guildset.has(`rr_${message.guild.id}.4`)) {
                                    guildset.set(`rr_${message.guild.id}.4`, { title: title, channel: msg.channel.id, id: msg.id })
                                } else if (guildset.has(`rr_${message.guild.id}.1`) && guildset.has(`rr_${message.guild.id}.2`) && guildset.has(`rr_${message.guild.id}.3`) && guildset.has(`rr_${message.guild.id}.4`) && !guildset.has(`rr_${message.guild.id}.5`)) {
                                    guildset.set(`rr_${message.guild.id}.5`, { title: title, channel: msg.channel.id, id: msg.id })
                                } else if (guildset.has(`rr_${message.guild.id}.1`) && guildset.has(`rr_${message.guild.id}.2`) && guildset.has(`rr_${message.guild.id}.3`) && guildset.has(`rr_${message.guild.id}.4`) && guildset.has(`rr_${message.guild.id}.5`)) {
                                    return message.channel.send("Maximum amount of Reaction Role Messages Achieved - 5\nPlease remove any unused messages to create new ones.")
                                }

                            }).catch(message.channel.send("An error occurred while sending the message to the provided channel."))
                        }
                    }).catch(() => {
                        message.channel.send("Prompt Cancelled")
                    })
            }).catch(() => {
                message.channel.send("Prompt Cancelled")
            })
    }
}

module.exports.help = {
    name: "reactionroles",
    description: "Create a message associated to emojis, to get roles based on reactions.",
    aliases: ["rr", "rrs", "rroles", "rrole", "reactionsrole", "reactionroles"],
    category: "Mod"
}