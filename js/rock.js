'use strict';

function Rock(canvas,shotSpeed,shotAngle){
  this.canvas = canvas;
  this.size = 20;
  this.startX = 0;
  this.startY = canvas.height - this.size;
  this.x= 0;
  this.y = 0;
  this.ctx = this.canvas.getContext('2d');
  this.direction = 0;
  this.gravity = 9.8;
  this.velocityX = shotSpeed*(Math.cos(shotAngle*Math.PI/180));
  this.velocityY = shotSpeed*(Math.sin(shotAngle*Math.PI/180));
  this.time = 0;
}

Rock.prototype.updatePosition = function(){

  console.log('inicial time', this.time)
  console.log('inicial', this.x, this.y)
  
  this.x = this.startX + this.velocityX*this.time;
  this.y = this.startY - (this.velocityY*this.time - (1/2 * this.gravity*Math.pow(this.time,2)));

  this.time += 1;
  console.log('triggered',this.x, this.y)
}
Rock.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
  // return this.direction;
}

Rock.prototype.draw = function(){
  this.ctx.fillStyle = 'red';
  this.ctx.fillRect(this.x,this.y,this.size,this.size);
}
