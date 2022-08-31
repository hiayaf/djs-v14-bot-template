const config = require('../../config.json');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require('discord.js');
module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId == 'ticketclose') {
            if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                interaction.reply({ content: 'Usuwanie zgłoszenia...', ephemeral: true });
                interaction.channel.delete();
            } else {
                interaction.reply({ content: 'Nie posiadasz odpowiednich uprawnień', ephemeral: true });
            }
        } else if (interaction.customId == 'ver133picr') {
            await interaction.reply({ content: `Pomyślnie zakończono proces weryfikacji`, ephemeral: true });
            interaction.member.roles.add(config.roles.default_role);
        } else if (interaction.customId == 'ticketclose2') {
            if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                const channelt = interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.username}`);
                if (channelt) {
                    await channelt.delete();
                    interaction.reply({ content: `Pomyślnie usunięto zgłoszenie`, ephemeral: true });
                } else {
                    interaction.reply({ ephemeral: true, content: `Nie posiadasz aktywnych zgłoszeń.` });
                }
            } else {
                interaction.reply({ content: 'Nie posiadasz odpowiednich uprawnień.', ephemeral: true });
            }
        } else if (interaction.customId == 'ticketclosebackup') {

            const user = await client.users.fetch(interaction.message.embeds[0].footer.text);
            user.send('**Twoje zgłoszenie o zwrot itemów zostało odrzucone.**');
            interaction.channel.delete();
        } else if (interaction.customId == 'accepted') {
            const user = await client.users.fetch(interaction.message.embeds[0].footer.text);
            user.send('**Wbijaj na mc, administrator zatwierdził twojego backupa!**');
            interaction.channel.delete();
        }
    }
    if (interaction.isSelectMenu()) {
        if (interaction.customId == 'ticketreason') {
            const channelt = interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.username}`);
            if (channelt) {
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('ticketclose2')
                            .setLabel('Usuń zgłoszenie')
                            .setStyle(ButtonStyle.Danger),
                    );
                await interaction.reply({ content: `**Wystąpił błąd:** \`Nie możesz stworzyć więcej niż jednego zgłoszenia\`\nKliknij na przycisk poniżej aby usunąć jedno.`, ephemeral: true, components: [row2] })
            } else {
                const channel = await interaction.guild.channels.create({
                    name: `ticket-` + interaction.user.username,
                    type: ChannelType.GuildForum,
                    parent: config.channels.ticket_parent,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        }, {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                            deny: [PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.MentionEveryone]
                        }, {
                            id: client.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageChannels],
                        }
                    ]
                });
                const closeembed = new EmbedBuilder()
                    .setColor('LightGrey')
                    .setAuthor({ name: `Temat zgłoszenia: ${interaction.values[0]}` })
                    .setDescription(`**Opisz swój problem i poczekaj na \nodpowiedź administracji serwera.**`)
                    .setTimestamp()
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }) });
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('ticketclose')
                            .setLabel('Zamknij zgłoszenie')
                            .setEmoji('🔒')
                            .setStyle(ButtonStyle.Secondary),
                    );
                await channel.setTopic(`**Temat zgłoszenia: ${interaction.values[0]}**`);
                await channel.send({ components: [row], content: `<@${interaction.user.id}>`, embeds: [closeembed], allowedMentions: { users: [`${interaction.user.id}`] } });
                interaction.reply({ content: `Pomyślnie utworzono zgłoszenie o nazwie \`#ticket-${interaction.user.username}\``, ephemeral: true });
            }
        }
    }

    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({ content: 'Podczas wczytywania tej komendy wystąpił błąd', ephemeral: true });
        };
    } else if (interaction.isUserContextMenuCommand()) {
        const { commands } = client;
        const { commandName } = interaction;
        const contextCommand = commands.get(commandName);
        if (!contextCommand) return;
        try {
            await contextCommand.execute(interaction, client);
        } catch (error) {
            console.error(error)
        }
    }
};