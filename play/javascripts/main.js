// main.js
//

var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var gameProperties = {
    screenWidth: windowWidth,
    screenHeight: windowHeight,
    worldWidth: 5000,
    worldHeight: 5000
};

var states = {
    mainMenu: "mainMenu",
    theCore: "theCore",
};

var graphicAssets = {
    ship:{URL:'assets/ship_small.png', name:'ship'},
    bullet:{URL:'assets/bullet.png', name:'bullet'},

    asteroidLarge:{URL:'assets/asteroidLarge.png', name:'asteroidLarge'},
    asteroidMedium:{URL:'assets/asteroidMedium.png', name:'asteroidMedium'},
    asteroidSmall:{URL:'assets/asteroidSmall.png', name:'asteroidSmall'},
};

var randomX = Math.random() * gameProperties.worldWidth;
var randomY = Math.random() * gameProperties.worldHeight;

var shipProperties = {
    startX: randomX,
    startY: randomY,
    acceleration: 300,
    drag: 50,
    maxVelocity: 300,
    angularVelocity: 200
};

var bulletProperties = {
    speed: 800,
    interval: 250,
    lifeSpan: 8000,
    maxCount: 100
};

var multiplayerRef = new Firebase("https://dogfighters.firebaseio.com/");

function shipControl(game) {
    this.shipSprite;

    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;

    this.bulletGroup;
    this.bulletInterval = 1;
}

function initGraphics(game) {
    this.game.world.setBounds(0, 0, gameProperties.worldWidth, gameProperties.worldHeight);

    this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
    this.shipSprite.angle = -90;
    this.shipSprite.anchor.set(0.5, 0.5);

    this.allShips = {};

    this.bulletGroup = game.add.group();

    this.game.camera.follow(this.shipSprite);
}

function initPlayers(game, ref) {
    // playerRef = ref.child("/players");
    // playerRef.on("value", function(snapshot) {
    //     snapshot.forEach(function(playerSnapshot) {
    //         this.allShips[playerSnapshot.key()] = game.add.sprite(playerSnapshot.val().x, playerSnapshot.val().y, graphicAssets.ship.name);
    //         console.log(playerSnapshot.val());
    //     });
    // }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    // });
}

function initPhysics(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);
    this.shipSprite.body.drag.set(shipProperties.drag);
    this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);

    this.bulletGroup.enableBody = true;
    this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.bulletGroup.createMultiple(30, graphicAssets.bullet.name);
    this.bulletGroup.setAll('anchor.x', 0.5);
    this.bulletGroup.setAll('anchor.y', 0.5);
    this.bulletGroup.setAll('lifespan', bulletProperties.lifeSpan);
}

function initKeyboard(game) {
    this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key_fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function checkPlayerInput(game) {
    if (this.key_left.isDown) {
        this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity;
    } else if (this.key_right.isDown) {
        this.shipSprite.body.angularVelocity = shipProperties.angularVelocity;
    } else {
        this.shipSprite.body.angularVelocity = 0;
    }

    if (this.key_thrust.isDown) {
        game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, shipProperties.acceleration, this.shipSprite.body.acceleration);
    } else {
        this.shipSprite.body.acceleration.set(0);
    }

    if (this.key_fire.isDown) {
        this.fire();
    }
}

function updatePlayers(game, ref) {
    playerRef = ref.child("/players/");
    playerRef.on("value", function(snapshot) {
        snapshot.forEach(function(playerSnapshot) {
            if (playerSnapshot.key() !== ref.getAuth().uid) {
                if (typeof this.allShips[playerSnapshot.key()] === 'undefined') {
                    this.allShips[playerSnapshot.key()] = game.add.sprite(playerSnapshot.val().x, playerSnapshot.val().y, graphicAssets.ship.name);
                    this.allShips[playerSnapshot.key()].anchor.set(0.5, 0.5);
                }
                this.allShips[playerSnapshot.key()].x = playerSnapshot.val().x;
                this.allShips[playerSnapshot.key()].y = playerSnapshot.val().y;
                this.allShips[playerSnapshot.key()].angle = playerSnapshot.val().rot;
            }
        });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    playerRef.child(ref.getAuth().uid).set({
        rot: this.shipSprite.angle,
        x: this.shipSprite.x,
        y: this.shipSprite.y
    });
}

function fire() {
    if (game.time.now > this.bulletInterval) {
        var bullet = this.bulletGroup.getFirstExists(false);

        if (bullet) {
            var length = this.shipSprite.width * 0.5;
            var x = this.shipSprite.x + (Math.cos(this.shipSprite.rotation) * length);
            var y = this.shipSprite.y + (Math.sin(this.shipSprite.rotation) * length);

            bullet.reset(x, y);
            bullet.lifespan = bulletProperties.lifeSpan;
            bullet.rotation = this.shipSprite.rotation;

            game.physics.arcade.velocityFromRotation(this.shipSprite.rotation, bulletProperties.speed, bullet.body.velocity);
            this.bulletInterval = game.time.now + bulletProperties.interval;
        }
    }
}

function destroyShip() {

}
