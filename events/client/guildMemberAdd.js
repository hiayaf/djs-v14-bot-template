const config = require('../../config.json');
module.exports = async (client, member) => {
    //auto_role
    let math = Math.floor(Date.now() / 1000) - config.auto_role.account_time
    if (math >= config.auto_role.account_time) {
        member.roles.add(config.auto_role.role);
    }
    const channel = client.channels.cache.get(config.channels.join);
    if (!channel) return console.log('Nie znaleziono kanału powitań');
    channel.send(`**Witaj ${member} na serwerze!**`);
};
