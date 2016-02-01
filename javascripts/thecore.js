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
    },

    create : function () {
        var h = 10000;
        var w = 10000;
        this.game.add.tileSprite(0, 0, w, h, "background");
        initGraphics(this);
        initPhysics(this);
        initKeyboard(this);
    },

    update : function () {
        checkPlayerInput(this);
    }
};
