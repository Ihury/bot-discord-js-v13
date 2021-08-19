const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            description: 'Retorna a música pausada.'
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: 'Não estou tocando neste servidor.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: 'Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: 'Você precisa estar no mesmo canal de voz que eu.', ephemeral: true })

        if (!player.paused) return interaction.reply({ content: 'A música não está pausada!' })

        player.pause(false)
        interaction.reply({ content: 'Música resumida!' })
    }
}