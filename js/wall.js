'use strict';

function Wall(canvas){
  this.canvas = canvas;
  this.sizeX = canvas.width/12;
  this.sizeY = canvas.height/1.4;
  this.x = canvas.width/2 - this.sizeX/2;
  this.y = canvas.height-this.sizeY;
  this.ctx = this.canvas.getContext('2d');;
}

Wall.prototype.draw = function(){
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(this.x,this.y,this.sizeX,this.sizeY);

  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
  this.ctx.stroke();
}