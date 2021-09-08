const Event = require('../../structures/Event')
const ticketCategories = require('../../util/ticketCategories')
const { MessageButton, MessageActionRow } = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (interaction.isCommand()) {
            if (!interaction.guild) return

            const cmd = this.client.commands.find(c => c.name === interaction.commandName)

            if (cmd) {
                if (cmd.requireDatabase) {
                    interaction.guild.db =
                        await this.client.db.guilds.findById(interaction.guild.id) ||
                        new this.client.db.guilds({ _id: interaction.guild.id })
                }

                cmd.run(interaction)
            }
        } else if (interaction.isButton()) {
            if (interaction.customId.startsWith('openTicket')) {
                const categoryID = interaction.customId.split('-')[1]
                const category = ticketCategories.find(c => c.id === categoryID)

                const channel = await interaction.guild.channels.create(`${category.name}-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    parent: category.id,
                    topic: `ticket-${category.name}-${interaction.user.id}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'ADD_REACTIONS']
                        },
                        {
                            id: category.staffRole,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'ADD_REACTIONS']
                        }
                    ]
                })

                interaction.reply({ content: `Seu ticket foi aberto com sucesso no canal ${channel.toString()}!`, ephemeral: true })

                const deleteButton = new MessageButton()
                    .setLabel('Fechar ticket')
                    .setEmoji('❌')
                    .setCustomId('closeTicket')
                    .setStyle('DANGER')
                const row = new MessageActionRow().addComponents(deleteButton)

                channel.send({ content: interaction.user.toString(), embeds: [category.embed], components: [row] })
            } else if (interaction.customId === 'closeTicket') {
                interaction.message.edit({
                    content: interaction.message.content,
                    embeds: interaction.message.embeds,
                    components: [
                        new MessageActionRow().addComponents(interaction.message.components[0].components[0].setDisabled())
                    ]
                })

                interaction.reply('O ticket será fechado em 20 segundos.')

                setTimeout(() => interaction.channel.delete(), 20000)
            }
        }
    }
}