const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const request = require('request');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-status')
        .setNameLocalizations({ pl: 'status-serwera' })
        .setDescription('Shows the current status of the minecraft server')
        .setDescriptionLocalizations({ pl: 'Pokazuje aktualny status serwera minecraft' })
        .addStringOption(option =>
            option.setName('address')
                .setNameLocalizations({ pl: 'adres' })
                .setDescription('Enter the address of the minecraft server')
                .setDescriptionLocalizations({ pl: 'Wpisz adres serwera Minecraft' })
                .setRequired(true)),
    async execute(interaction) {
        const server = interaction.options.getString('address');
        if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(server)) {
            var url = 'https://api.mcsrvstat.us/2/' + server;
            request(url, function (err, response, body) {
                try {
                    body = JSON.parse(body);
                    if (err) return;
                    var status = '**Wyłączony**';
                    if (body.online) {
                        status = '**Włączony**';
                    };
                    const embed = new EmbedBuilder()
                        .setThumbnail(`https://mc-api.net/v3/server/favicon/${server}`)
                        .setTitle(`Status serwera ${server}`)
                        .setDescription(`${status}\n${body.players.online}/${body.players.max}\nWersja: ${body.version}`)
                        .setColor('DARK_BLUE');
                    interaction.reply({ embeds: [embed], ephemeral: false });
                } catch (err) {
                    if (interaction.deferred || interaction.replied) return;
                    interaction.reply({ content: `**Wystąpił błąd podczas uzyskiwania statusu serwera ${server}**`, ephemeral: true });
                };
            });
        } else {
            if (interaction.deferred || interaction.replied) return;
            interaction.reply({ content: `**Wprowadź prawidłową nazwę domeny**`, ephemeral: true })
        };
    }
};
