const Command = require('../../structures/Command')
const questions = require('../../util/formQuestions')
const { once } = require('events')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'form',
            description: 'Realiza um formulário.'
        })
    }

    run = (interaction) => {
        interaction.reply({ content: 'Fromulário iniciado. Responda às perguntas abaixo:', ephemeral: true })

        createForm()
            .then(answers => {
                const embed = new MessageEmbed()
                    .setTitle('Respostas do formulário:')
                    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter(`ID do usuário: ${interaction.user.id}`)
                    .setColor('BLUE')
                    .addFields(answers)

                interaction.channel.send({ embeds: [embed] })
            })
            .catch((erro) => {
                const embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(erro)

                interaction.channel.send({ content: interaction.user.toString(), embeds: [embed] })
            })

        async function createForm() {
            const answers = []
            const channel = interaction.channel 

            for (const question of questions) {
                const embed = new MessageEmbed()
                    .setTitle(question.question)
                    .setFooter('Você tem 5 minutos para responder a esta pergunta.')

                if (question.options) {
                    const actionRow = new MessageActionRow()
                        .addComponents(new MessageSelectMenu(question))

                    const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed], components: [actionRow] })

                    const filter = (i) => i.user.id = interaction.user.id
                    const collector = msg.createMessageComponentCollector({ filter, max: 1, time: (5 * 60000)})

                    const [collected, reason] = await once(collector, 'end')            

                    if (reason === 'limit') {
                        msg.delete().catch(() => {})
                        answers.push({
                            name: collected.first().customId,
                            value: collected.first().values.join(', ')
                        })
                    }
                    else if (reason === 'time') throw ('O tempo para responder à pergunta se esgotou e o fomulário foi cancelado.')
                    else throw ('Ocorreu um erro durante a realização do formulário e este foi finalizado.')
                } else {
                    const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed] })

                    const filter = (m) => m.author.id === interaction.user.id && m.content?.length
                    const collector = channel.createMessageCollector({ filter, max: 1, time: (5 * 60000) })
                    
                    const [collected, reason] = await once(collector, 'end')
                    
                    if (reason === 'limit') {
                        channel.bulkDelete([msg.id, collected.first().id]).catch(() => {})
                        answers.push({
                            name: question.name,
                            value: collected.first().content
                        })
                    }
                    else if (reason === 'time') throw ('O tempo para responder à pergunta se esgotou e o fomulário foi cancelado.')
                    else throw ('Ocorreu um erro durante a realização do formulário e este foi finalizado.')
                }
            }

            return answers
        }
    }
}