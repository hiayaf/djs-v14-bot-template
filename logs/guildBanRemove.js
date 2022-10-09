const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const config = require('../config.json');

module.exports = async (client, ban) => {
    const log_channel = await client.channels.cache.get(config.channels.logs);
    if (!log_channel) return;
    const log = await ban.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanRemove });
    const fetchModerator = log.entries.first();
    const embed = new EmbedBuilder()
        .setAuthor({ name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true, format: 'png' }) })
        .setDescription(`**🔨 <@${ban.user.id}> został odbanowany**`)
        .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
        .setColor('Blue')
        .setTimestamp()
        .setFooter({ text: ban.user.tag, iconURL: ban.user.displayAvatarURL({ dynamic: true, format: 'png' })})
        .addFields(
            {
                name: "Administrator:",
                value: `<@${fetchModerator.executor.id}>`,
                inline: true
            }
        )
    log_channel.send({ embeds: [embed] })
}