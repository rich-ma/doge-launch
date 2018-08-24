const Util = require("./util");
const Blackhole = require('./blackhole');
const Asteroid = require('./asteroid');
const Target = require('./target');


class Game {
  constructor(doge, ctx){
    this.level = 0;
    this.deaths = 0;
    this.doge = doge;
    this.ctx = ctx;
    this.win = false;
    this.lose = false;
    this.blackholes = null;
    this.target = null;
    this.asteroids = [];
    this.animate = this.animate.bind(this);
    this.checkAttraction = this.checkAttraction.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.updateDoge = this.updateDoge.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.checkLose = this.checkLose.bind(this);
    this.restart = this.restart.bind(this);
    this.retry = this.retry.bind(this);
    this.level1 = this.level1.bind(this);
    window.requestAnimationFrame(this.animate);
  }

  checkLose(){
    if (this.lose === true) return null;
    if(this.doge.x > 1050 || this.doge.y > 850 || this.doge.x < -100 || this.doge.y < -200) {
      this.deaths += 1;
      this.lose = true;
      alert('you lost');
      this.doge.reset();
    };
  }

  restart(){
    this.level = 0;
    this.deaths = 0;
    this.lose = false;
    this.doge.reset();
  }

  retry(){
    this.lose = false;
    this.doge.reset();
  }

  animate(){
    if(this.level <= 5) this.changeLevel(this.ctx);
    this.ctx.clearRect(0,0, 1000, 800);
    this.target.draw();
    this.blackholes.forEach(blackhole => blackhole.draw());
    this.asteroids.forEach(asteroid => asteroid.draw());
    this.checkWin();
    this.updateDoge();
    this.checkAttraction();
    this.checkCollision();
    window.requestAnimationFrame(this.animate);
    this.checkLose();
  }

  updateDoge(){
    this.doge.updatePos();
    this.doge.draw();
  }

  checkWin(){
    const distance = Util.distance(this.doge.x, this.doge.y, this.target.x-this.target.size/2, this.target.y-this.target.size/2);
    if (distance < this.target.size){
      this.doge.win(); 
      alert(`Wow such win! Click to go to level ${this.level + 1}!\n\nYou have died ${this.deaths} ${this.deaths === 1 ? 'time' : 'times'}.`);
      this.doge.reset();
      this.level += 1;
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

  checkCollision(){
    this.asteroids.forEach(asteroid => {
      const distance = Util.distance(this.doge.x, this.doge.y, asteroid.x, asteroid.y);
      if (distance <= asteroid.radius){
        asteroid.collision(this.doge);
      }
    })
  }

  changeLevel(ctx){
    if (this.level === 0) this.level0(ctx);
    if (this.level === 1) this.level1(ctx);
    if (this.level === 2) this.level2(ctx);
    if (this.level === 3) this.level3(ctx);
    if (this.level === 4) this.level4(ctx);
    if (this.level === 5) this.level5(ctx);
  }

  level0(ctx){
    this.blackholes = [];
    this.asteroids = [
    ];
    this.target = new Target(ctx, 450, 350, 50);
  }
  level1(ctx){
    this.blackholes = [new Blackhole(ctx, 200, 350, 50, 50, 50)];
    this.asteroids = [
      new Asteroid(ctx, 500, 350, 50)
    ];
    this.target = new Target(ctx, 950, 50, 50);
  }

  level2(ctx) {
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 15),
      new Blackhole(ctx, 100, 220, 70, 35, 8),
      new Blackhole(ctx, 700, 300, 75, 60, 15),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 6)
    ];
    this.target = new Target(ctx, 950, 50, 50);
  }
  
  level3(ctx) {
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 15),
      new Blackhole(ctx, 100, 220, 70, 35, 8),
      new Blackhole(ctx, 700, 300, 75, 60, 15),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 6)
    ];
    this.target = new Target(ctx, 950, 50, 50);
  }

  level4(ctx) {
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 15),
      new Blackhole(ctx, 100, 220, 70, 35, 8),
      new Blackhole(ctx, 700, 300, 75, 60, 15),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 6)
    ];
    this.target = new Target(ctx, 950, 50, 50);
  }

  level5(ctx) {
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 15),
      new Blackhole(ctx, 100, 220, 70, 35, 8),
      new Blackhole(ctx, 700, 300, 75, 60, 15),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 6)
    ];
    this.target = new Target(ctx, 950, 50, 50);
  }
}

module.exports = Game;