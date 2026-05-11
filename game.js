class TitleScreen extends Phaser.Scene {
    constructor() {
        super('title')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('background', 'titleBackgroundBase.png')
        this.load.image('play', 'play.png')
        this.load.image('fairy', 'fairy.png')
        this.load.image('titlecard', 'titleCard.png')
    }
    create() {
        this.cameras.main.setBackgroundColor('#67BED9');
        let backgroundImage = this.add.image(480, 270, 'background').setScale(.5);
        let titleCard = this.add.image(480, 270, 'titlecard').setScale(.5);

        // button clicking
        let playButton = this.add.image(480, 350, 'play').setScale(1.5).setInteractive({useHandCursor: true});
            playButton.on('pointerdown', () => {
                this.tweens.add({
                    targets: playButton,
                    scaleX: playButton.scaleX - 0.25,
                    scaleY: playButton.scaleY - 0.25,
                    duration: 100,
                    ease: 'Power1'
                })
            })
            playButton.on('pointerup', () => {
                this.tweens.add({
                    targets: playButton,
                    scaleX: playButton.scaleX + 0.25,
                    scaleY: playButton.scaleY + 0.25,
                    duration: 100,
                    ease: 'Power1'
                })
                this.scene.start('victory');
            })

        // starting right fairy shaking animation
        let fairyImage1 = this.add.image(675, 325, 'fairy').setAngle(15).setScale(.5);
        let fairyImage2 = this.add.image(150, 400, 'fairy').setAngle(20).setScale(.5);
            this.tweens.add({
                targets: [fairyImage1, fairyImage2],
                angle: -15,
                duration: 250,
                ease: 'Power1',
                loop: -1,
                yoyo: true
            })
        
        // starting left fairy shaking animation
        let fairyImage3 = this.add.image(300, 225, 'fairy').setAngle(-15).setScale(.5);
        let fairyImage4 = this.add.image(480, 75, 'fairy').setAngle(-20).setScale(.5);
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
    width: 1920 * .5,
    height: 1080 * .5,
    scene: [TitleScreen, VictoryScreen],
    title: "Roly Poly: To the End!"
});