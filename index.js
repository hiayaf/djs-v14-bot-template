const config = require('./config.json');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ], partials: [
        Partials.Channel, 
        Partials.GuildMember, 
        Partials.GuildScheduledEvent, 
        Partials.Message, 
        Partials.Reaction, 
        Partials.ThreadMember, 
        Partials.User
    ]
});
const mysql = require('mysql');
const database = mysql.createConnection({ host: config.database.host, user: config.database.user, password: config.database.password, database: config.database.name, pool: config.database.pool, ssl: config.database.ssl });
database.connect(function (err) { if (err) { console.log(err) } else { console.log('Pomyślnie połączono z bazą danych'); } });
["events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
    console.log(`Załadowano event handler`);
});

client.on('ready', async client => {
    if (config.database.CREATE_IF_NOT_EXISTS) {
        //database.query(`CREATE TABLE IF NOT EXISTS bot (message text)`)
    }
})

client.on('messageCreate', async message => {
    //database.query(`INSERT INTO bot (message) VALUES ('${message.content}')`)
    if (message.channel.type !== 'DM') {
        const prefix = config.prefix
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        if (message.content.startsWith(config.prefix)) {
            if (command === "reload") {
                if (message.member.roles.cache.has(config.roles.admin)) {
                    client.destroy()
                    client.login(config.token)
                    message.channel.send("Pomyślnie przeładowano bota!")
                }
            }
        }
    }
});
client.on('error', async err=> {
    console.log('Wystąpił nieoczekiwany error: ' + err)
    client.destroy();
    client.login(config.token);
})
client.login(config.token);
