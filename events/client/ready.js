const config = require('../../config.json');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
module.exports = async (client) => {
    client.commands = new Collection();
    for (const file of commandFiles) {
        const command = require(`../../commands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
        console.log(`[Komendy] Pomyślnie wyczytano folder ${file}`);
    }
    const guildId = config.guildId;
    const clientId = client.user.id;
    const rest = new REST({ version: '10' }).setToken(config.token);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();

    //presence
    const guild = client.guilds.cache.get(config.guildId);
    const activities = [
        { name: `/help`, type: 'LISTENING' },
        { name: guild.name, type: 'LISTENING' }
    ];
    await client.user.setPresence({ status: 'online', activity: activities[0] });
    let activity = 1;
    setInterval(() => {
        activities[2] = { name: `${guild?.memberCount} użytkowników`, type: 'WATCHING' };
        if (activity > 2) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 90000);
    client.user.setActivity("/help", { type: "LISTENING" });
    console.log(`Pomyślnie uruchomiono bota`);
    console.log(`Zalogowano jako ${client.user.tag}`);
};