const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = (interaction) => {
        if (interaction.isCommand()) {
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)

            if (cmd) cmd.run(interaction)
        }
    }
}