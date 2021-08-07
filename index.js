require('dotenv').config()

const Client = require('./src/structures/Client')

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'
    ]
})

client.once('ready', function () {
    console.log(`Bot ${client.user.tag} logado com sucesso com ${client.guilds.cache.size} servidores.`)
})

client.on('messageCreate', function (message) {
    if (message.content === 'oi') {
        message.reply('Oi!')
    }
})

client.login(process.env.BOT_TOKEN)