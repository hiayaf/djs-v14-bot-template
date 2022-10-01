const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skin')
        .setDescription('Pokazuje skin gracza')
        .addStringOption(option =>
            option.setName('nick')
                .setDescription('Wpisz nick osoby w minecraft')
                .setRequired(true)),
    async execute(interaction) {
        var request = require('request');
        const username = interaction.options.getString('nick');
        var url = 'https://api.mojang.com/users/profiles/minecraft/' + username;
        request(url, function (err, response, body) {
            try {
                body = JSON.parse(body);
            } catch (error) {
                console.log(error);
            }
            if (!err) {
                if(body.id!=undefined) {
                    const embed = new EmbedBuilder()
                    .setImage(`https://visage.surgeplay.com/frontfull/${body.id}`)
                    .setDescription(`[**Link do skórki**](https://visage.surgeplay.com/skin/${body.id}.png)`)
                    .setTitle(`Skin ${body.name}`)
                    .setFooter({ text: `${body.name}`, iconURL: `https://visage.surgeplay.com/face/${body.id}` })
                    .setTimestamp()
                    .setColor('DARK_GREEN');
                interaction.reply({ embeds: [embed], ephemeral: false });
                } else {
                    interaction.reply({ content: `**Wystąpił błąd podczas uzyskiwania skórki ${username}**`, ephemeral: true });
                };
            };
        });
    }
};
