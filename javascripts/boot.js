//boot.js
//

var boot = function(game) {
  console.log("%cStarting DOGFIGHTERS", "color: white; background: black");
};

boot.prototype = {
    preload : function() {
        this.game.load.image("loading", "../assets/loading.gif");
    },
    create : function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.game.state.start("Preload");
    }
}
