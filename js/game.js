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

  this.player = new Player(this.canvas);
  this.rock = new Rock(this.canvas,100,60);

  const loop = () => { // por el scope con set timers hay que utilizar binding o arrow functions

    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    this.checkCollision();
    if (this.gameOver === false){
      window.requestAnimationFrame(loop);
    }
    if(this.rock.y > this.canvas.height){
      this.gameOver = true;
      this.onGameOver();
    }
  }

  window.requestAnimationFrame(loop);

};

Game.prototype.clearCanvas = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}
Game.prototype.updateCanvas = function(){

  this.player.updateXPosition();
  this.rock.updatePosition();

}
Game.prototype.drawCanvas = function(){
  this.player.draw();
  this.rock.draw();
}
Game.prototype.checkCollision = function(){
  
}

Game.prototype.setGameOverCallBack = function(callback){
  this.onGameOver = callback;
} 

