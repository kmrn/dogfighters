//init.js
//
// All game states are added and initialized in this file.
// New states should be added to this file in order to function properly.

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.WEBGL);

//********
// STATES
//
// Add all states to the game here
//
game.state.add(states.mainMenu, mainMenu);
game.state.add(states.theCore, theCore);
//


// Call mainMenu state to start the game
game.state.start(states.mainMenu);
