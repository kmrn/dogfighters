// TheCore.js
//

var theCore = function() {

};

theCore.prototype = {

    preload : function () {
        game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);
        game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
        game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);

        game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
        game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
    },

    create : function () {
        initGraphics(this);
        initPhysics(this);
        initKeyboard(this);
    },

    update : function () {
        checkPlayerInput(this);
    }
};
