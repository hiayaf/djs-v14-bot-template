const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
module.exports = async (client, message) => {
    if (message.channel.id != config.channels.logs) {
        try {
            const logChannel = client.channels.cache.get(config.channels.logs);
            const embed = new EmbedBuilder()
                .setDescription(`🗑 **Wiadomość wysłana przez <@${message.author.id}> została usunięta na kanale ${message.channel}.**\n\`\`\`\n${message.content}\`\`\``)
                .setTimestamp()
                .setFooter({ text: `${message.guild.name}` })
            return logChannel.send({ embeds: [embed] })
        } catch (error) {
            return;
        }
    }

}