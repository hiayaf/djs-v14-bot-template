const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const config = require('../config.json');
module.exports = async (client, message) => {
    if (message.channel.id == config.channels.logs) return;
    const log_channel = client.channels.cache.get(config.channels.logs);
    const log = await message.guild.fetchAuditLogs({ type: AuditLogEvent.MessageDelete });
    const fetchModerator = log.entries.first();
    const embed = new EmbedBuilder()
        .setDescription(`🗑 **Wiadomość wysłana przez <@${message.author.id}> została usunięta na kanale ${message.channel}.**\n\`\`\`\n${message.content}\`\`\``)
        .setTimestamp()
        .setColor('#71a832')
        .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true, format: 'png' }) })
    if (fetchModerator) {
        embed.addFields(
            { name: `Przez:`, value: `<@${fetchModerator.executor.id}>`, inline: true }
        )
    }
    log_channel.send({ embeds: [embed] });
}
