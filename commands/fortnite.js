const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
	.setName('fortnite')
	.setDescription('i love fortnite')
	.addStringOption(option =>
		option.setName('opcje')
			.setDescription('Wybierz cos')
			.setRequired(true)
			.addChoices(
				{ name: 'Mapa', value: 'map' },
			)),
    async execute(interaction) {
        const string = interaction.options.getString('opcje');
        if(string=="map") {
            const embed = new EmbedBuilder()
            .setImage('https://fortnite-api.com/images/map_en.png')
            .setTitle("Aktualna mapa Fortnite:")
            .setColor('Gold')
            .setAuthor({ name: 'Fortnite', iconURL: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png", url: "https://www.epicgames.com/fortnite/"})
            interaction.reply({ embeds: [embed]})
        }
    }
};	
