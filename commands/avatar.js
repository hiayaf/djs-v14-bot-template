const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Pokazuje avatar użytkownika')
        .addUserOption(option =>
            option.setName('nick')
                .setDescription('kogo avatar chcesz zobaczyć?')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('nick');
        const embed = new EmbedBuilder()
            .setTimestamp()
            .setColor('DARK_BLUE')
        if (user) {
            embed.setImage(user.displayAvatarURL({ dynamic: true, format: "png" }))
                .setTitle(`Avatar ${user.tag}`)
                .setURL(`${user.displayAvatarURL({ dynamic: true, format: "png" })}`)
                .setFooter({ text: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true, format: "png" })}` });
        } else {
            embed.setImage(interaction.user.displayAvatarURL({ dynamic: true, format: "png" }))
                .setTitle(`Avatar ${interaction.user.tag}`)
                .setURL(`${interaction.user.displayAvatarURL({ dynamic: true, format: "png" })}`)
                .setFooter({ text: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, format: "png" })}` });
        }
        interaction.reply({ embeds: [embed], ephemeral: false });
    }
};	
