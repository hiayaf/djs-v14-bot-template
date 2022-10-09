const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const config = require('../config.json');
module.exports = async (client, invite) => {
    const log_channel = await client.channels.cache.get(config.channels.logs);
    if (!log_channel) return;
    const log = await invite.guild.fetchAuditLogs({ type: AuditLogEvent.InviteCreate, limit: 1 });
    const fetchModerator = log.entries.first();
    const embed = new EmbedBuilder()
        .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }) })
        .setTitle('Nowe zaproszenie')
        .setColor('#71a832')
        .setDescription(`**<@${fetchModerator.executor.id}> utworzył nowe zaproszenie na kanał ${invite.channel}**`)
        .setTimestamp()
        .setFooter({ text: invite.inviter.tag, iconURL: invite.inviter.displayAvatarURL({ dynamic: true }) })
        .addFields(
            {
                name: "Zaproszenie utworzone w dniu:",
                value: `<t:${Math.floor(invite.createdTimestamp / 1000)}:f>`,
                inline: true
            },
            {
                name: "Wygasa:",
                value: `<t:${Math.floor(invite._expiresTimestamp / 1000)}:f>`,
                inline: true
            },
            {
                name: "Kod zaproszenia:",
                value: `https://discord.gg/${invite.code}`,
                inline: false
            },
            {
                name: "Max użyć:",
                value: invite.maxUses.toString(),
                inline: true
            },
        );
    log_channel.send({ embeds: [embed] });
}