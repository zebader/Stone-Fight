'use strict';

function Player(canvas,posX){
  this.canvas = canvas;
  this.size = 100;
  this.x = posX;
  this.y = canvas.height - this.size;
  this.ctx = this.canvas.getContext('2d');;
  this.lives = 3;
  this.direction = 0;
  this.speed = 3;
}

Player.prototype.updateXPosition = function(){
  this.x = this.x + this.direction*this.speed;
  if(this.x < 0){
    this.x = 0
  }
  return this.x
}
Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
}

Player.prototype.draw = function(color){
  this.ctx.fillStyle = color;
  this.ctx.fillRect(this.x,this.y,this.size,this.size);
}
Player.prototype.setLives = function(){
  this.lives--;
}

Player.prototype.blockPlayer = function(fixedPos){
  this.direction = 0;
}

Player.prototype.checkCollisionWithWall = function(wall){
  const collisionRight = this.x + this.size > wall.x;
  return collisionRight;
}
