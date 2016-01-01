// main.js
//

var gameProperties = {
    sreenWidth: 800,
    screenHeight: 600
};

var states = {
    game: "game"
};

var graphicAssets = {
    ship: { url: 'assets/playerShip1_blue.png', name: 'ship' },
    bullet: { url: 'assets/bullet.png', name: 'bullet' },

    asteroid
}

var gameState = function(game) {

};

gameState.prototype = {
    preload : function() {

    },

    create : function() {

    },

    update : function() {

    }
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.game, gameState);
game.state.start(states.game);
