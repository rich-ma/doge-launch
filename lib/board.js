const Game = require('./game.js');
const Doge = require("./dogeball.js");
const Util = require('./util.js');
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector('canvas');
    const restart = document.getElementById('restart');
    const retry = document.getElementById('retry');
    const modal = document.getElementById('myModal');
    const helpButton = document.getElementById('help-button');
    const span = document.getElementsByClassName("close")[0];
    const help = document.getElementById("help");
    const win = document.getElementById("win");
    const died = document.getElementById("died");


    help.style.display = 'block';
    modal.style.display = "block";

    canvas.width = 1000;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    const doge = new Doge(ctx);


    
    addEventListener('mousedown', event => {
        if (doge.x !== 15 || doge.y !== 700) return null;
        if (modal.style.display === "block") return null;
        const distance = Util.distance(event.offsetX, event.offsetY, doge.x, doge.y + 50);
        if (distance < 100) {
            doge.clicked = true;
        }
    });
    addEventListener('mousemove', event => {
        if(doge.clicked){
            doge.lineX = event.offsetX;
            doge.lineY = event.offsetY;
        }
    });
    addEventListener('mouseup', event => {
        if (doge.x !== 15 || doge.y !== 700) return null;
        if (modal.style.display === "block") return null;
        if (doge.clicked === false) return null;
        doge.clicked = false; 
        if(doge.lineX && doge.lineY) doge.shoot();            
    });
    
    let game = new Game(doge, ctx);
    
    retry.addEventListener('click', () => {
        game.retry();
    });

    helpButton.addEventListener('click', () => {
        help.style.display = 'block';
        modal.style.display = "block";
    });

    restart.addEventListener('click', () => {
        game.restart();
    });

    span.onclick = function () {
        modal.style.display = "none";
        help.style.display = 'none';
        win.style.display = 'none';
        died.style.display = 'none';
        
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            help.style.display = 'none';
            win.style.display = 'none';
            died.style.display = 'none';

        }
    }
});

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


