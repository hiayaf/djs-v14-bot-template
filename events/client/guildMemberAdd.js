const config = require('../../config.json');
module.exports = async (client, member) => {
    const joinChannel = client.channels.cache.get(config.channels.join);
    if (!joinChannel) return console.log('Nie znaleziono join channel');
    joinChannel.send(`**Witaj ${member} na serwerze!**`);
};