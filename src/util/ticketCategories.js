const { MessageButton, MessageEmbed } = require('discord.js')
/*
    {
        button: MessageButton,
        embed: MessageEmbed,
        name: String,
        id: String
    }
*/

module.exports = [
    {
        button: new MessageButton().setCustomId(`openTicket-885161395761606776`).setLabel(`Compra`).setEmoji('🛒').setStyle('PRIMARY'),
        embed: new MessageEmbed().setDescription('Bem vindo ao setor de compras'),
        name: 'compra',
        id: '885161395761606776',
        staffRole: '859794530161393694'
    },
    {
        button: new MessageButton().setCustomId(`openTicket-885161434038800434`).setLabel(`Suporte`).setEmoji('📞').setStyle('PRIMARY'),
        embed: new MessageEmbed().setDescription('Bem vindo ao suporte ao suporte do servidor'),
        name: 'suporte',
        id: '885161434038800434',
        staffRole: '859851911468285982'
    }
]