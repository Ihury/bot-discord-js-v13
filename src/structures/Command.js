class Command {
    constructor(client, options) {
        this.client = client
        Object.assign(this, options)
    }
}

module.exports = Command