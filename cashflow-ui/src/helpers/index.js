export default {
    randomColors() {
        let colors = ['#FF0000',
            '#00FF00',
            '#0000FF',
            '#FF00FF',
            '#FFFF00',
            '#00FFFF',
        ]

        for (let i = 0; i < 40; i++) {
            colors.push("#" + Math.floor(Math.random() * 16777215).toString(16))
        }

        return colors
    },
    randomCleanColor() {
        let colors = ['#FF0000',
            '#00FF00',
            '#0000FF',
            '#FF00FF',
            '#FFFF00',
            '#00FFFF',
        ]

        return colors[Math.floor(Math.random() * (colors.length - 1))]
    },
}