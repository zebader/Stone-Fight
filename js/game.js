'use strict';

function Game(canvas){
  this.player = null;
  this.rock = null;
  this.wall = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.gameOver = false;
}

Game.prototype.startLoop = function(){

  const loop = () => { // por el scope con set timers hay que utilizar binding o arrow functions

    this.clearCanvas();
    this.updateCanvas();
    this.ctx.drawImage(image, 0,0);
    this.drawCanvas();
    this.checkCollision();
    if (this.gameOver === false){
      window.requestAnimationFrame(loop);
    }
    
  }

  window.requestAnimationFrame(loop);

};

Game.prototype.clearCanvas = function(){

}
Game.prototype.updateCanvas = function(){
  
}
Game.prototype.drawCanvas = function(){
  
}
Game.prototype.checkCollision = function(){
  
}
