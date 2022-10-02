const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const request = require('request');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('Nasa'),
    async execute(interaction) {
        await interaction.deferReply();
        let url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
        request(url, function (err, response, body) {
            try {
                body = JSON.parse(body);
            } catch (error) {
                return interaction.reply({ content: `Wystąpił błąd podczas uzyskiwania informacji od NASA`, ephemeral: true });
            };
            if (!err) {
                const embed = new EmbedBuilder()
                    .setImage(body.url)
                    .setTitle(`Astronomy Picture of the Day`)
                    .addFields(
                        { name: `\u200B`, value: `**${body.title}**` },
                        { name: '\u200B', value: `**${body.explanation}**` }
                    )
                    .setFooter({ text: body.date })
                    .setAuthor({ name: body.copyright });
                interaction.editReply({ embeds: [embed], ephemeral: false });
            };
        });
    }
};	
