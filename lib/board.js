const Game = require('./game.js');
const Doge = require("./dogeball.js");
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    const doge = new Doge(ctx);

    addEventListener('mousedown', event => {
        doge.clicked = true;
    });
    addEventListener('mousemove', event => {
        if(doge.clicked){
            doge.lineX = event.pageX;
            doge.lineY = event.pageY;
        }
    });
    addEventListener('mouseup', event => {
        doge.clicked = false; 
        if(doge.lineX && doge.lineY) doge.shoot();            
    });

    let game = new Game(doge, ctx);
});

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


