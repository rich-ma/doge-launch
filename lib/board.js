const Game = require('./game.js');
const Doge = require("./dogeball.js");
const Util = require('./util.js');
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    const doge = new Doge(ctx);

    addEventListener('mousedown', event => {
        const distance = Util.distance(event.offsetX, event.offsetY, doge.x, doge.y + 50);
        if (distance < 100) {
            doge.clicked = true;
        }
    });
    addEventListener('mousemove', event => {
        if(doge.clicked){
            debugger
            doge.lineX = event.offsetX;
            doge.lineY = event.offsetY;
        }
    });
    addEventListener('mouseup', event => {
        doge.clicked = false; 
        if(doge.lineX && doge.lineY) doge.shoot();            
    });

    let game = new Game(doge, ctx);
});

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


