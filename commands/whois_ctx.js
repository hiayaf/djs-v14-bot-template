








const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('user-info')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        if (!user) { user = interaction.user } else { user = interaction.targetUser };
        const member = interaction.guild.members.cache.get(user.id);
        const flags = {
            DiscordEmployee: 'Pracownik Discorda',
            DiscordPartner: 'Partner Discorda',
            BughunterLevel1: 'Bug Hunter (Level 1)',
            BughunterLevel2: 'Bug Hunter (Level 2)',
            HypeSquadEvents: 'Eventy HypeSquadu',
            HypeSquadOnlineHouse1: 'House of Bravery',
            HypeSquadOnlineHouse2: 'House of Brilliance',
            HypeSquadOnlineHouse3: 'House of Balance',
            EarlySupporter: 'Early supporter',
            TeamUser: 'Użytkownik zespołu',
            System: 'System',
            VerifiedBot: 'Zweryfikowany bot',
            VerifiedDeveloper: 'Wcześnie zweryfikowany deweloper bota',
        };
        const userFlags = user.flags.toArray()
        const embed = new EmbedBuilder()
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png" }))
            .setAuthor({ name: `Informacje o ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: false, format: "png" }) })
            .setColor(member.displayHexColor)
            .addFields(
                { name: 'ID Użytkownika:', value: user.id, inline: false },
                { name: 'Utworzenie konta:', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>` },
                { name: 'Dołączenie na serwer:', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` },
                { name: "Odznaka:", value: userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Brak' },
                { name: "Link do avataru:", value: `[Avatar.gif/1024](${user.displayAvatarURL({ dynamic: true, size: 1024 })})` + ` | [Avatar.png/1024](${user.displayAvatarURL({ dynamic: false, size: 1024, format: "png" })})` },
                { name: "Ranga:", value: member.roles.highest.id === interaction.guild.id ? 'Brak' : member.roles.highest },
            )
        interaction.reply({ embeds: [embed], ephemeral: false });
    }
};
