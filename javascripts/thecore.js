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

        //multiplayerRef = multiplayerRef.child("theCore");

    },

    create : function () {
        this.game.add.tileSprite(0, 0, gameProperties.worldWidth, gameProperties.worldHeight, "background");

        var playerRef = multiplayerRef.child("/players/");
        playerRef.on("value", function(snapshot) {
            snapshot.forEach(function(playerSnapshot) {
                if (playerSnapshot.key() !== multiplayerRef.getAuth().uid) {
                    if (typeof onlineShips[playerSnapshot.key()] === 'undefined') {
                        onlineShips[playerSnapshot.key()] = game.add.sprite(playerSnapshot.val().x, playerSnapshot.val().y, graphicAssets.ship.name);
                        onlineShips[playerSnapshot.key()].anchor.set(0.5, 0.5);
                    }
                    onlineShips[playerSnapshot.key()].x = playerSnapshot.val().x;
                    onlineShips[playerSnapshot.key()].y = playerSnapshot.val().y;
                    onlineShips[playerSnapshot.key()].angle = playerSnapshot.val().rot;
                }
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        initGraphics(this);
        initPlayers(this, multiplayerRef);
        initPhysics(this);
        initKeyboard(this);
    },

    update : function () {
        checkPlayerInput(this);
        updatePlayers(this, multiplayerRef.child("/players"));
    }
};
