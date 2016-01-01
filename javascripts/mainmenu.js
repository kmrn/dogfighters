// main.js
//

BasicGame.MainMenu = function(game) {};

mainMenu.prototype = {
    preload : function() {
        this.load.image('title', 'assets/title.png');
    },

    create : function() {
        // var gameTitle = this.game.add.sprite(160, 160, "gametitle");
        // gameTitle.anchor.setTo(0.5, 0.5);
        // var playButton = this.game.add.button(160, 320, "play", this.playTheGame, this);
        // playButton.anchor.setTo(0.5, 0.5);
        this.titleName = this.add.sprite(300, 300, 'title');
    },

    playTheGame : function() {
        this.game.state.start("Brenna");
    }
}
