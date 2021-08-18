const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'raw'
        })
    }

    run = async (packet) => {
        this.client.manager.updateVoiceState(packet)
    }
}