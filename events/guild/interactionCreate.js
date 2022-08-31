const config = require('../../config.json');
module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({ content: 'Podczas wczytywania tej komendy wystąpił błąd', ephemeral: true });
        };
    } else if (interaction.isUserContextMenuCommand()) {
        const { commands } = client;
        const { commandName } = interaction;
        const contextCommand = commands.get(commandName);
        if (!contextCommand) return;
        try {
            await contextCommand.execute(interaction, client);
        } catch (error) {
            console.error(error)
        }
    }
};
