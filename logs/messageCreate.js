const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const config = require('../config.json');
const index = require('../index');
module.exports = async (client, message) => {
    const database = index.database;
    const channel = await client.channels.cache.get(message.channelId);
    if(channel.parentId == config.channels.ticket_parent) {
        if(message.author.bot) return;
        database.query(`INSERT INTO bot(message, user, channel, timestamp) VALUES ('${message.content}','${message.author.username}','${message.channel.id}','${Math.floor(Date.now() / 1000)}')`)
    }   
}