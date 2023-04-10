const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../config.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('Nasa'),
    async execute(interaction) {
        await interaction.deferReply();
        const url = "https://api.nasa.gov/planetary/apod?api_key=" + config.api_keys.NASA;
        try {
            const response = await axios.get(url);
            const body = response.data;
            const embed = new EmbedBuilder()
                .setImage(body.url)
                .setTitle(`Astronomy Picture of the Day`)
                .addFields(
                    { name: `Title`, value: `${body.title}` },
                    { name: 'Explanation', value: `${body.explanation}` }
                )
                .setFooter(`${body.date}`)
            await interaction.editReply({ embeds: [embed], ephemeral: false });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `Wystąpił błąd podczas uzyskiwania informacji od NASA`, ephemeral: true });
        }
    }
};	
