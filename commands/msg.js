const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('msg')
        .setDescription('send a message')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('message content')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('channel')
                .setRequired(false))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('user')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const msg = interaction.options.getString('content');
        const user = interaction.options.getUser('user');
        let channel = interaction.options.getChannel('channel');
        if (channel) {
            if (!user) return channel.send({ content: msg });

        } else {
            if (!user) {
                interaction.channel.send({ content: msg });
                channel = interaction.channel;
            }
        }
        if (user) return user.send(msg);
        interaction.reply({
            content: `Pomyślnie wysłano wiadomość o treści ${msg}` + function () {
                if (channel) return `na kanał ` + channel;
            },
            ephemeral: true
        });
    }
};
