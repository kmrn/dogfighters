// preload.js
//

var preload = function(game){}

preload.prototype = {
	preload : function(){
        var loadingBar = this.add.sprite(128, 128, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
        //this.game.load.
        //load game assets here
    },

    create : function() {
        this.game.state.start("MainMenu");
    }
}
