const config = require('../../config.json');
module.exports = async (client, member) => {
    const joinChannel = client.channels.cache.get(config.channels.join);
    if (!joinChannel) return console.log('Nie znaleziono join channel');
    joinChannel.send(`**Witaj ${member} na serwerze!**`);
    //autorole
    const user = await client.users.fetch(member.id);
    let timestamp = Math.floor(Date.now() / 1000);
    if(timestamp-user.createdTimestamp<=config.auto_role.account_time) {
        member.roles.add(config.auto_role.role)
    }
};
};
