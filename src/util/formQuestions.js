module.exports = [
    {
        question: 'Qual o seu nome?',
        name: 'Nome'
    },
    {
        question: 'Em qual região do país você mora?',
        placeholder: 'Selecione a região',
        customId: 'Região',
        minValues: 1,
        maxValues: 1,
        options: [
            {
                label: 'Norte',
                value: 'Norte',
                description: 'Amazonas, Acre, Rondônia, Pará, Amapá, Roraima e Tocantins.',
                emoji: '🌻'
            },
            {
                label: 'Nordeste',
                value: 'Nordeste',
                description: 'Maranhão, Piauí, Ceará, Bahia, Pernambuco, Rio Grande do Norte, Sergipe, Alagoas e Paraíba.',
                emoji: '🥵'
            },
            {
                label: 'Centro-Oeste',
                value: 'Centro-Oeste',
                description: 'Mato Grosso, Goiás, Mato Grosso do Sul e Distrito Federal.',
                emoji: '💼'
            },
            {
                label: 'Sudeste',
                value: 'Sudeste',
                description: 'Minas Gerais, São Paulo, Rio de Janeiro e Espírito Santo.',
                emoji: '🧀'
            },
            {
                label: 'Sul',
                value: 'Sul',
                description: 'Paraná, Santa Catarina e Rio Grande do Sul.',
                emoji: '🥶'
            }
        ]
    },
    {
        question: 'Qual a sua idade?',
        name: 'Idade'
    }
]