// main.js
//

var mainMenu = function(game) {
    this.tf_start;
};

mainMenu.prototype = {
    create : function () {
        var startInstructions = 'Click to Start -\n\nUP arrow key for thrust.\n\nLEFT and RIGHT arrow keys to turn.\n\nSPACE key to fire.';

        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.anchor.set(0.5, 0.5);

        game.input.onDown.addOnce(this.startGame, this);
    },

    startGame : function () {
        game.state.start(states.theCore);
    }
}
