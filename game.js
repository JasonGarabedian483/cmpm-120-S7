class TitleScreen extends Phaser.Scene {
    constructor() {
        super('title')
    }
    preload() {
        this.load.path = 'assets/'
        //this.load.image('background', 'background.png')
        this.load.image('play', 'play.png')
    }
    create() {
        //let backgroundImage = this.add.image(960, 540, 'background');
        let titleText = this.add.text(960, 540, "Roly Poly: To the End", {
            fontSize: '72px',
        }).setOrigin(0.5);

        let playButton = this.add.image(960, 700, 'play').setScale(3).setInteractive({useHandCursor: true});
            playButton.on('pointerdown', () => {
                this.tweens.add({
                    targets: playButton,
                    scaleX: playButton.scaleX - 0.5,
                    scaleY: playButton.scaleY - 0.5,
                    duration: 100,
                    ease: 'Power1'
                })
            })
            playButton.on('pointerup', () => {
                this.tweens.add({
                    targets: playButton,
                    scaleX: playButton.scaleX + 0.5,
                    scaleY: playButton.scaleY + 0.5,
                    duration: 100,
                    ease: 'Power1'
                })
            })
    }
    update() {

    }
}

const game = new Phaser.Game({
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
    scene: [TitleScreen],
    title: "Roly Poly: To the End"
});