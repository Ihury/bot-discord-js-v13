const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            description: 'Faz com que o bot toque uma música no canal em que você está.',
            options: [
                {
                    name: 'música',
                    description: 'Música que você deseja que o bot toque.',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })

        const search = interaction.options.getString('música')

        let res;

        try {
            res = await this.client.manager.search(search, interaction.user)

            if (res.loadType === "LOAD_FAILED") throw res.exception
            else if (res.loadType === "PLAYLIST_LOADED") throw { message: "Playlists não são suportadas neste comando." }
        } catch (err) {
            return interaction.reply({ content: `Aconteceu um erro ao tentar buscar a música: ${err.message}`, ephemeral: true })
        }

        if (!res?.tracks?.[0]) return interaction.reply({ content: `Música não encontrada!`, ephemeral: true })

        const player = this.client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        })

        player.connect()
        player.queue.add(res.tracks[0])

        if (!player.playing && !player.paused) player.play()

        return interaction.reply({ content: `\`${res.tracks[0].title}\` adicionada à fila.` })
    }
}