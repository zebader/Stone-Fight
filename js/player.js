'use strict';

function Player(canvas){
  this.canvas = canvas;
  this.size = 100;
  this.x = canvas.width/4;
  this.y = canvas.height - this.size;
  this.ctx = this.canvas.getContext('2d');;
  this.lives = 3;
  this.direction = 0;
  this.speed = 3;
}

Player.prototype.updateXPosition = function(){
  this.x = this.x + this.direction*this.speed;
}
Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
  // return this.direction;
}

Player.prototype.draw = function(){
  this.ctx.fillStyle = 'purple';
  this.ctx.fillRect(this.x,this.y,this.size,this.size);
}
Player.prototype.setLives = function(){
  this.lives--;
}

Player.prototype.blockPlayer = function(){
}

Player.prototype.checkCollisionWithWall = function(wall){
}