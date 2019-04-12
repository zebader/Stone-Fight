'use strict';

function Rock(canvas){
  this.canvas = canvas;
  this.size = 20;
  this.x = canvas.width/4;
  this.y = canvas.height - this.size;
  this.ctx = this.canvas.getContext('2d');;
  this.lives = 3;
  this.direction = 0;
  this.speed = 3;
  this.gravity = 10;
  this.deceleration = 0;
  this.shotSpeed = 0.2;
}

Rock.prototype.updatePosition = function(){
  this.x = this.x + this.direction*this.shotSpeed;
  this.y = this.y + this.direction - this.gravity;
  console.log(this.x, this.y)
}
Rock.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
  // return this.direction;
}

Rock.prototype.draw = function(){
  this.ctx.fillStyle = 'red';
  this.ctx.fillRect(this.x,this.y,this.size,this.size);
}
