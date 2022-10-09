const config = require('../../config.json');
module.exports = async (client, member) => {
    const channel = client.channels.cache.get(config.channels.leave);
    if (!channel) return console.log('Nie znaleziono leave channel');
    channel.send(`Niestety ${member.user.tag} wyszedł z naszego serwera :(`);
};
