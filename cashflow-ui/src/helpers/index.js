export default {
    randomColors() {
        let colors = ['#FF0000',
            '#00FF00',
            '#0000FF',
            '#FF00FF',
            '#FFFF00',
            '#00FFFF',
            '#0000CC',
            '#0099FF',
            '#339999',
            '#FF0099',
            '#990033',
            '#FFFF99',
            '#666633',
            '#CCCCCC',
            '#99FFCC',
            '#99CCFF',
            '#663399',
            '#330000',
            '#FF6600',
            '#663300',
        ]

        for (let i = 0; i < 40; i++) {
            colors.push("#" + Math.floor(Math.random() * 16777215).toString(16))
        }

        return colors
    },
    randomCleanColor() {
        const colors = this.randomColors();
        return colors[Math.floor(Math.random() * 8)]
    },
}