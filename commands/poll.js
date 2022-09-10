const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Wysyła ankietę')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Jaki tytuł ma mieć ankieta?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('opis ankiety (/n/ aby rozpocząć nową linijkę)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('emoji')
				.setDescription('💜 jakie emoji mam dodać pod ankietą?')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('emoji_1')
				.setDescription('💙 jakie emoji mam dodać pod ankietą?')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('emoji_2')
				.setDescription('💚 jakie emoji mam dodać pod ankietą?')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('emoji_3')
				.setDescription('💛 jakie emoji mam dodać pod ankietą?')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('emoji_4')
				.setDescription('❤ jakie emoji mam dodać pod ankietą?')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('emoji_5')
				.setDescription('💚 jakie emoji mam dodać pod ankietą?')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('emoji_6')
				.setDescription('💛 jakie emoji mam dodać pod ankietą?')
				.setRequired(false)),
	async execute(interaction) {
		const desc = interaction.options.getString('description');
		const emoji = interaction.options.getString('emoji');
		const emoji_1 = interaction.options.getString('emoji1');
		const emoji_2 = interaction.options.getString('emoji2');
		const emoji_3 = interaction.options.getString('emoji3');
		const emoji_4 = interaction.options.getString('emoji4');
		const emoji_5 = interaction.options.getString('emoji5');
		const emoji_6 = interaction.options.getString('emoji6');
		const embed_tile = interaction.options.getString('title');
		const embed = new EmbedBuilder()
			.setTitle(embed_tile)
			.setDescription(String(desc).substr(0, 2048).split("/n/").join("\n"))
			.setColor('DarkGreen')
			.setFooter({ text: interaction.guild.name })
			.setTimestamp()
		const message = await interaction.reply({ embeds: [embed], ephemeral: false });
		if (emoji) { message.react(emojis); };
		if (emoji_1) { message.react(emoji_1); };
		if (emoji_2) { message.react(emoji_2); };
		if (emoji_3) { message.react(emoji_3); };
		if (emoji_4) { message.react(emoji_4); };
		if (emoji_5) { message.react(emoji_5); };
		if (emoji_6) { message.react(emoji_6); };
	}
};
