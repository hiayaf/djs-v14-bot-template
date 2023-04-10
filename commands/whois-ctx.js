const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('whois')
        .setType(ApplicationCommandType.User),
}