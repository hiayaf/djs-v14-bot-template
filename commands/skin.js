const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skin')
        .setDescription('Shows a Minecraft player\'s skin')
        .addStringOption(option =>
            option.setName('nick')
                .setDescription('Enter a Minecraft player\'s username')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const uuid = interaction.options.getString('nick');
            const { data } = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${uuid}`);
            const { id, name } = data;
            if (id) {
                const embed = new EmbedBuilder()
                    .setImage(`https://visage.surgeplay.com/full/1024/${id}?y=-37`)
                    .setDescription(`[**Skin link**](https://visage.surgeplay.com/skin/${id}.png)`)
                    .setTitle(`Skin for ${name}`)
                    .setFooter({ text: name, iconURL: `https://visage.surgeplay.com/face/${id}` })
                    .setTimestamp()
                    .setColor('DARK_GREEN')
                await interaction.reply({ embeds: [embed], ephemeral: false });
            } else {
                await interaction.reply({ content: `Error getting skin for ${uuid}`, ephemeral: true });
            }
        } catch (error) {
            await interaction.reply({ content: 'An error occurred', ephemeral: true });
        }
    }
};
