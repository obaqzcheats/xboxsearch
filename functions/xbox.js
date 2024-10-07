const { EmbedBuilder } = require('discord.js')
const axl = require("app-xbox-live")
const { Authflow } = require('prismarine-auth')

async function user(interaction, user) {
    try {
        const auth = new Authflow("xboxsearch", "./authcache")
        const token = await auth.getXboxToken()
        if (!token) return await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#ffffff')
                    .setTitle('Error')
                    .setDescription('Couldnt fetch the token used to get xbox data. Please link another account or try this command again.')
                    .addFields({ name: 'User', value: user, inline: true })
                    .setTimestamp()
                    .setFooter({ text: 'XLookup Command' })
            ]
        })

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#ffffff')
                    .setTitle('Xlookup Template')
                    .setDescription('Fetched Xbox token and hash for login.')
                    .addFields({ name: 'User', value: user, inline: true })
                    .setTimestamp()
                    .setFooter({ text: 'XLookup Command' })
            ]
        })

        const xl = new axl.Account(`XBL3.0 x=${token.userHash};${token.XSTSToken}`)
        const user2 = await xl.people.find(user, 1)
        if (!user2) return await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#ffffff')
                    .setTitle('Error')
                    .setDescription('Couldnt find user.')
                    .addFields({ name: 'User', value: user, inline: true })
                    .setTimestamp()
                    .setFooter({ text: 'XLookup Command' })
            ]
        })

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#ffffff')
                    .setTitle('Xlookup Result')
                     // .setDescription('Found user') just looks clean without it...
                    .addFields(
                        { name: 'User', value: user, inline: true },
                        { name: 'Gamerscore', value: user2.people[0].gamerScore, inline: true },
                        { name: 'Presence', value: user2.people[0].presenceText || 'Not found', inline: true },
                        { name: 'State', value: user2.people[0].presenceState || 'Not found', inline: true },
                        { name: 'xuid', value: user2.people[0].xuid || 'Not found', inline: true },
                        { name: 'real name', value: user2.people[0].realName || 'Not found', inline: true },
                        { name: 'xbox rep', value: user2.people[0].xboxOneRep || 'Not found', inline: true },
                        { name: 'theme', value: user2.people[0].colorTheme || 'Not found', inline: true },
                        { name: 'display name', value: user2.people[0].displayName || 'Not found', inline: true }
                    )
                    .setThumbnail(user2.people[0].displayPicRaw)
                    .setTimestamp()
                    .setFooter({ text: 'XLookup Command' })
            ]
        })
    } catch (error) {
        console.log(error)
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#ffffff')
                    .setTitle('Error')
                    .setDescription('Error has happened report to a dev!')
                    .addFields({ name: 'User', value: user, inline: true })
                    .setTimestamp()
                    .setFooter({ text: 'XLookup Command' })
            ]
        })
    }
}

module.exports = { user }
