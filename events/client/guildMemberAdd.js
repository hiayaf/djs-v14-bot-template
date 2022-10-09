const config = require('../../config.json');
module.exports = async (client, member) => {
    const channel = client.channels.cache.get(config.channels.join);
    if (!channel) return console.log('Nie znaleziono kanału powitań');
    channel.send(`**Witaj ${member} na serwerze!**`);

    //auto_role

    const user = await client.users.fetch(member.id);
    let timestamp = Math.floor(Date.now() / 1000);
    if (timestamp - user.createdTimestamp <= config.auto_role.account_time) return member.roles.add(config.auto_role.role);
};
