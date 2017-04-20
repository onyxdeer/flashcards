var game = new Game();

function init () {
  if(game.init()) {
    game.start();
  }
}

var imageRepository = function () {
  this.background = new Image();
  this.background.src = "imgs/bg.png"
}

function Drawable () {
  this.init = function(x, y) {
    this.x = x;
    this.y = y;
  }
  this.speed = 0;
  this.canvasWidth = 0;
  this.canasHeight = 0;

  this.draw = function () {
    
  }
}