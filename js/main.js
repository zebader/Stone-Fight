'use strict';

function main(){
  
  //===========CREATE SCREENS============================================================

  const mainElement = document.querySelector('main');

  function buildDom(html){
    mainElement.innerHTML = html;
    return mainElement;
  }

   //===========SPLASH SCREEN

  function buildSplashScreen(){
    buildDom(`
    <section class="game-container">
    <h1>STONE FIGHT</h1>
    <button>PLAY</button>
    </section>
    `)
    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen);
  }

  //===========GAME SCREEN

  function buildGameScreen(){
    buildDom(`
    <section class="game-container">
     <canvas></canvas>
    </section>
    `)

  //start game----------

    const containerElement = document.querySelector('.game-container');
    const gameWidth = containerElement.offsetWidth;
    const gameHeight = containerElement.offsetHeight;
    
    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',gameWidth);
    canvasElement.setAttribute('height',gameHeight);

    const game = new Game(canvasElement);
    game.start();
    game.startLoop();
    game.setGameOverCallBack(buildGameOverScreen);

  //Event listeners ----------

  document.addEventListener('keyup', playerStopMovement);
  document.addEventListener('mouseup', throwRock);

    function playerStopMovement(event){
      const key = event.keyCode;
      if(key !== 37 || key !== 39){
        game.player.setDirection(0)
        game.player2.setDirection(0)
      }
    }

    function throwRock(event){

      game.rock.ifStart = true;
      game.rock.setDirection(1);
      game.rock.setThrowRockValues()

    }

  }
  //===========GAMEOVER SCREEN
  function buildGameOverScreen(){
    buildDom(`
    <section class="game-container">
    <h1>Game Over</h1>
    <button>PLAY AGAIN</button>
    </section>
    `)
    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen)
  }
  buildSplashScreen();
}

window.addEventListener('load',main);