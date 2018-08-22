const Util = require("./util");
const Blackhole = require('./blackhole');
const Target = require('./target');

class Game {
  constructor(doge, ctx){
    this.level = 0;
    this.doge = doge;
    this.ctx = ctx;
    this.win = false;
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 15),
      new Blackhole(ctx, 100, 220, 70, 35, 8),
      new Blackhole(ctx, 700, 300, 75, 60, 15),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 6)
    ];
    this.bumpers = [];
    this.target = new Target(ctx, 950, 0, 50);
    this.animate = this.animate.bind(this);
    this.checkAttraction = this.checkAttraction.bind(this);
    this.updateDoge = this.updateDoge.bind(this);
    this.checkWin = this.checkWin.bind(this);
    window.requestAnimationFrame(this.animate);
  }

  animate(){
    console.log(this.doge.lineX, this.doge.lineY);
    this.ctx.clearRect(0,0, 1000, 800);
    this.target.draw();
    this.blackholes.forEach(blackhole => blackhole.draw());
    this.checkWin();
    this.updateDoge();
    this.checkAttraction();
    window.requestAnimationFrame(this.animate);
  }

  updateDoge(){
    this.doge.updatePos();
    this.doge.draw();
  }

  checkWin(){
    const distance = Util.distance(this.doge.x, this.doge.y, this.target.x, this.target.y);
    if (distance < this.target.size && !this.win){
      this.win = true;
      this.doge.win();
      alert("win!");
    }
  }

  checkAttraction(){
    this.blackholes.forEach(blackhole => {
      const distance = Util.distance(this.doge.x, this.doge.y, blackhole.x, blackhole.y);
      if (blackhole.range >= distance){
        blackhole.applyGravity(this.doge, distance);
      }
    })
  }
}

module.exports = Game;