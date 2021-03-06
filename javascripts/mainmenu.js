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
        multiplayerRef.auth().signInAnonymouslyAndRetrieveData().then(function(authData) {
            console.log("Authenticated successfully with payload:", authData);
            var disconnectRef = multiplayerRef.child("/players/" + authData.user.uid);
            disconnectRef.onDisconnect().remove();
            game.state.start(states.theCore);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/operation-not-allowed') {
                alert('You must enable Anonymous auth in the Firebase Console.');
            } else {
                console.log("Authentication Failed!", error);
            }
        });
    }
};
