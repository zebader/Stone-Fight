'use strict';

function main(){

  const mainElement = document.querySelector('main');

  function buildDom(html){
    mainElement.innerHTML = html;
    return mainElement;
  }
  function buildSplashScreen(){
    buildDom(`
    <section class="game-container">
    <h1>STONE FIGHT</h1>
    <button>PLAY</button>
    </section>
    `)
    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen)
  }
  function buildGameScreen(){
    buildDom(`
    <section class="game-container">
     <canvas></canvas>
    </section>
    `)

    const containerElement = document.querySelector('.game-container');
    const gameWidth = containerElement.offsetWidth;
    const gameHeight = containerElement.offsetHeight;

    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',gameWidth);
    canvasElement.setAttribute('height',gameHeight);

    const game = new Game(canvasElement);
    game.startLoop();

    document.addEventListener('keydown', function(event){
      const key = event.keyCode;
      if(key === 37){
        game.player.setDirection(-1);}
      else if (key === 39){
        game.player.setDirection(1);
      }
      });
    document.addEventListener('keyup', function(event){
      const key = event.keyCode;
      if(key !== 37 || key !== 39){
        game.player.setDirection(0)
      }
      });
    document.addEventListener('click', function(event){
      game.rock.setDirection(1);
        });
    

    

   // setTimeout(buildGameOverScreen, 3000);
  }
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