const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'config',
            description: 'Configurar dados do servidor no bot.',
            requireDatabase: true,
            options: [
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'welcome',
                    description: 'Configuração do sistema de boas-vindas.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'canal_entrada',
                            description: 'Configurar o canal onde a mensagem de boas-vindas será enviada.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'ticket',
                    description: 'Configuração do sistema de tickets.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'mensagem',
                            description: 'Mensagem onde o usuário irá clicar para abrir o ticket.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'Você não tem permissão para utilizar este comando!', ephemeral: true })

        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/config/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}