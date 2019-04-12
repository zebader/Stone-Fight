# SKULL JUMPER

## Description
Stone Fight it's a game where 2 players throws stones by turns to each other across a wall placed in the middle of the screen, the objective is to kill the other player by decreasing the HP.


## MVP (DOM - CANVAS)
*CANVAS*, The mvp is a game where at least one player can throw a stone and hit the other player.

## Backlog
- Strenght and angle dynamic modulator
- Sprites
- Multiple leves with random wall 


## Data structure

## main.js - States y States Transitions
```
- splashScreen()
  - destroyGameOver(if)
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - destroySplash()
  - destroyGameOver()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - destroyGame()
  - buildGameOver()
  - addEventListener( if splashScreen, else startGame) 
```

### game.js
```
Game(){
  this.canvas;
  this.ctx;
}

Game.prototype.startGame(){
}

Game.prototype.startLoop(){
  loop()
}

Game.prototype.updateAll(){
}

Game.prototype.clearAll(){
}

Game.prototype.renderAll(){
}

Game.prototype.checkAllCollisons(){
}

Game.prototype.finishGameCallback(){
}
```

### player.js
```
Player(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
  this.lives;
  this.direction;
  this.speed;
}

Player.prototype.update(){
}

Player.prototype.draw(){
}

Player.prototype.move(){
}

Player.prototype.block(){
}

Player.prototype.checkCollisionWithBlock(block){
}
```

### rock.js
```
Rock(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
}

Character.prototype.update(){
}

Character.prototype.draw(){
}

Character.prototype.throw(){
}

```

### wall.js
```
Wall(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
}

Wall.prototype.render(){
}
```


## Task
- Main - buildDom
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Main - 3 states transitions
- Game - buildDom
- Game - TimeOut test
- Game - 3 states transitions
- Main - GameWon
- Main - destroy Game
- Main - GameWon RESTART
- Main - removeGameWon
- Game - restartGame
- Game - addEventListener
- Wall - create
- Game - create player
- Player - create
- Player - move
- Player - collision
- Rock - create
- Rock - throw (physics)
- Rock - collision
- Game - check win

## Links


### Trello
[Link url](https://trello.com/b/7AltuuZb/stone-fight-kanban)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/Gabriel0liver/skull-jumper)
[Link Deploy]()


### Slides
URls for the project presentation (slides)
[Link Slides.com]()