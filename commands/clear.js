const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Czyści chat')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages | PermissionFlagsBits.ModerateMembers)
        .addIntegerOption(option =>
            option.setName('ilość')
                .setDescription('Ilość wiadomości do usunięcia (wartość od 1 do 100)')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const count = interaction.options.getInteger('ilość');
        if (count < 101 && count > 0) {
            await interaction.channel.bulkDelete(count, true).then(msg => { interaction.followUp({ content: `**Pomyślnie usunięto \`${msg.size}\` wiadomości.**`, ephemeral: true }); })
        } else {
            await interaction.followUp({ content: `**Nieprawidłowa wartość...** \`${count}\``, ephemeral: true });
        };
    }
};
