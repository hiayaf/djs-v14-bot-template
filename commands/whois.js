const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const flags = {
    DiscordEmployee: 'Pracownik Discorda',
    Partner: 'Właściciel serwera partnerskiego',
    BugHunterLevel1: 'Bug Hunter (Level 1)',
    BugHunterLevel2: 'Bug Hunter (Level 2)',
    HypeSquadEvents: 'Eventy HypeSquadu',
    HypeSquadOnlineHouse1: 'House of Bravery',
    HypeSquadOnlineHouse2: 'House of Brilliance',
    HypeSquadOnlineHouse3: 'House of Balance',
    PremiumEarlySupporter: 'Wczesny sympatyk',
    CertifiedModerator: 'Absolwent Akademii moderatorów',
    System: 'System',
    VerifiedBot: 'Zweryfikowany bot',
    VerifiedDeveloper: 'Wcześnie zweryfikowany deweloper bota',
};
module.exports = {
    data: new SlashCommandBuilder()
        .setName("whois")
        .setDescription("Wyświetla informacje o podanym użytkowniku")
        .addUserOption((option) =>
            option
                .setName("nick")
                .setDescription("Wpisz nick osoby o której chcesz poznać informacje")
                .setRequired(false)
        ),
    async execute(interaction) {
        if (interaction.isUserContextMenuCommand()) {
            const user = interaction.targetUser;
            const member = interaction.guild.members.cache.get(user.id);
            const userFlags = user.flags.toArray();
            const embed = new EmbedBuilder()
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png" }))
                .setAuthor({
                    name: `Informacje o ${user.tag}`,
                    iconURL: user.displayAvatarURL({ dynamic: true, format: "png" }),
                })
                .setColor(member.displayHexColor)
                .addFields(
                    { name: "ID Użytkownika:", value: user.id, inline: false },
                    { name: "Utworzenie konta:", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>` },
                    { name: "Dołączenie na serwer:", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` },
                    { name: "Odznaka:", value: userFlags.length ? userFlags.map((flag) => flags[flag]).join(", ") : "Brak" },
                    { name: "Link do avataru:", value: `[Avatar.gif/1024](${user.displayAvatarURL({ dynamic: true, size: 1024 })}) | [Avatar.png/1024](${user.displayAvatarURL({ dynamic: false, size: 1024, format: "png" })})` },
                );
            if (!user.bot) embed.addFields({ name: "Ranga:", value: member.roles.highest.id === interaction.guild.id ? 'Brak' : member.roles.highest },)
            interaction.reply({ embeds: [embed], ephemeral: false });
        } else {
            const user = interaction.options.getUser("nick") ?? interaction.user;
            const member = interaction.guild.members.cache.get(user.id);
            if (member) {
                const userFlags = user.flags.toArray();
                const embed = new EmbedBuilder()
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png" }))
                    .setAuthor({
                        name: `Informacje o ${user.tag}`,
                        iconURL: user.displayAvatarURL({ dynamic: true, format: "png" }),
                    })
                    .setColor(member.displayHexColor)
                    .addFields(
                        { name: "ID Użytkownika:", value: user.id, inline: false },
                        { name: "Utworzenie konta:", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>` },
                        { name: "Dołączenie na serwer:", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` },
                        { name: "Odznaka:", value: userFlags.length ? userFlags.map((flag) => flags[flag]).join(", ") : "Brak" },
                        { name: "Link do avataru:", value: `[Avatar.gif/1024](${user.displayAvatarURL({ dynamic: true, size: 1024 })}) | [Avatar.png/1024](${user.displayAvatarURL({ dynamic: false, size: 1024, format: "png" })})` },
                    );
                if (!user.bot) embed.addFields({ name: "Ranga:", value: member.roles.highest.id === interaction.guild.id ? 'Brak' : member.roles.highest },)
                interaction.reply({ embeds: [embed], ephemeral: false });
            } else {
                const userFlags = user.flags.toArray();
                const embed = new EmbedBuilder()
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png" }))
                    .setAuthor({
                        name: `Informacje o ${user.tag}`,
                        iconURL: user.displayAvatarURL({ dynamic: true, format: "png" }),
                    })
                    .addFields(
                        { name: "ID Użytkownika:", value: user.id, inline: false },
                        { name: "Utworzenie konta:", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>` },
                        { name: "Odznaka:", value: userFlags.length ? userFlags.map((flag) => flags[flag]).join(", ") : "Brak" },
                        { name: "Link do avataru:", value: `[Avatar.gif/1024](${user.displayAvatarURL({ dynamic: true, size: 1024 })}) | [Avatar.png/1024](${user.displayAvatarURL({ dynamic: false, size: 1024, format: "png" })})` },
                    );
                interaction.reply({ embeds: [embed], ephemeral: false });
            }
        }
    },
};
