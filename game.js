class TitleScreen extends Phaser.Scene {
    constructor() {
        super('title')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('background', 'titleBackgroundBase.png')
        this.load.image('play', 'play.png')
        this.load.image('fairy', 'fairy.png')
        this.load.image('titlecard', 'titlecard.png')
    }
    create() {
        this.cameras.main.setBackgroundColor('#67BED9');
        let backgroundImage = this.add.image(960, 540, 'background');
        let titleCard = this.add.image(960, 540, 'titlecard');

        // button clicking
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
                this.scene.start('victory');
            })

        // starting right fairy shaking animation
        let fairyImage1 = this.add.image(1350, 650, 'fairy').setAngle(15);
        let fairyImage2 = this.add.image(300, 800, 'fairy').setAngle(20);
            this.tweens.add({
                targets: [fairyImage1, fairyImage2],
                angle: -15,
                duration: 250,
                ease: 'Power1',
                loop: -1,
                yoyo: true
            })
        
        // starting left fairy shaking animation
        let fairyImage3 = this.add.image(600, 450, 'fairy').setAngle(-15);
        let fairyImage4 = this.add.image(960, 150, 'fairy').setAngle(-20);
            this.tweens.add({
                targets: [fairyImage3, fairyImage4],
                angle: 15,
                duration: 250,
                ease: 'Power1',
                loop: -1,
                yoyo: true
            })

    }
    update() {

    }
}

class VictoryScreen extends Phaser.Scene {
    constructor() {
        super('victory')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('returnText', 'ReturnText.png');
        this.load.image('returnTextBubble', 'ReturnTextBubble.png');
        this.load.image('victoryText', 'VictoryText.png');
        this.load.image('victoryTextBubble', 'VictoryTextBubble.png');
        this.load.image('rolypoly', 'RolyPolyWMedal.png');
        this.load.video('grassBlade', 'grassblade anim.mp4');
    }
    create() {
        let grassBlade = this.add.video(100, 1080, 'grassBlade');
        grassBlade.play(loop); //trying to loop simple animaiton, idea is to duplicate this a bunch of times


        this.add.image(0,1080, 'victoryTextBubble');

        const victoryText = this.add.image(0, 1080, 'victoryText');
        this.tweens.add({
            targets: victoryText,
            alpha: 0.5,
            duration: 5000,
            ease: 'Linear',
            repeat: -1
        })

        this.add.image(0, 1080, 'returnTextBubble')
            .on('pointerup', () => this.scene.start('title'));
        
        const returnText = this.add.image(0, 1080, 'returnText')
            .on('pointerover', () => returnText.setAlpha(0.5));

        this.add.image(0, 1080, 'rolypoly');
    }
}

const game = new Phaser.Game({
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
    scene: [TitleScreen, VictoryScreen],
    title: "Roly Poly: To the End!"
});