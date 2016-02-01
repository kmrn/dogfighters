// TheCore.js
//

var theCore = function() {
    shipControl(this);
};

theCore.prototype = {

    preload : function () {
        game.load.image("background", "assets/backgrounds/dogfightersbgFT.png");
        game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);
        game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
        game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);

        game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
        game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);

        multiplayerRef = multiplayerRef.child("theCore");
    },

    create : function () {
        this.game.add.tileSprite(0, 0, gameProperties.worldWidth, gameProperties.worldHeight, "background");

        initGraphics(this);
        initPlayers(this, multiplayerRef);
        initPhysics(this);
        initKeyboard(this);
    },

    update : function () {
        checkPlayerInput(this);
        updatePlayers(this, multiplayerRef);
    }
};
