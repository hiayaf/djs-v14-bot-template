const config = require('../config.json');
const { EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = async (client, ban) => {
    const log_channel = await client.channels.cache.get(config.channels.logs);
    if (!log_channel) return;
    const log = await ban.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd, limit: 1 });
    const fetchModerator = log.entries.first();
    const embed = new EmbedBuilder()
        .setAuthor({ name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true, format: 'png' }) })
        .setDescription(`**🔨 <@${ban.user.id}> został zbanowany.**`)
        .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('#bf0000')
        .setFooter({ text: ban.user.tag, iconURL: ban.user.displayAvatarURL({ dynamic: true, format: 'png' }) })
        .addFields(
            {
                name: "Administrator",
                value: `<@${fetchModerator.executor.id}>`,
                inline: true
            },
            {
                name: "Powód bana:",
                value: fetchModerator.reason || 'Brak',
                inline: true
            }
        )
    log_channel.send({ embeds: [embed] })
}