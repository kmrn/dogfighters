// main.js
//

var mainMenu = function(game) {
    this.tf_start;
};

mainMenu.prototype = {
    create : function () {
        var startInstructions = 'Click to Start -\n\nUP arrow key for thrust.\n\nLEFT and RIGHT arrow keys to turn.\n\nSPACE key to fire.';

        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, {font: '24px Arial', fill: '#FFFFFF', align: 'center'});
        this.tf_start.anchor.set(0.5, 0.5);

        game.input.onDown.addOnce(this.startGame, this);
    },

    startGame : function () {
        multiplayerRef.authAnonymously(function(error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                var disconnectRef = multiplayerRef.child("/players/" + multiplayerRef.getAuth().uid);
                disconnectRef.onDisconnect().remove();
                game.state.start(states.theCore);
            }
        });
    }
};
