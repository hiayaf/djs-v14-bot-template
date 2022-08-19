const config = require('../../config.json');
module.exports = async (client, member) => {
    const leaveChannel = client.channels.cache.get(config.channels.leave);
    if (!leaveChannel) return console.log('Nie znaleziono leave channel');
    leaveChannel.send(`Niestety ${member.user.tag} wyszedł z naszego serwera :(`);
};