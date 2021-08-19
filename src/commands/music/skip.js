const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            description: 'Pula a música que está tocando.'
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: 'Não estou tocando neste servidor.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: 'Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: 'Você precisa estar no mesmo canal de voz que eu.', ephemeral: true })

        if (!player.queue.current) return interaction.reply({ content: 'Não tem nenhuma música tocando.', ephemeral: true })

        const title = player.queue.current.title

        player.stop()
        interaction.reply({ content: `Música \`${title}\` pulada por ${interaction.user.toString()}.` })
    }
}