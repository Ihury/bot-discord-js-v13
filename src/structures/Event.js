class Event {
    constructor(client, options) {
        this.client = client
        this.name = options.name
    }
}

module.exports = Event