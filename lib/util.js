const Util = {
 randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  
 randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)]
  },

 distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  },

  angle(x2, y2, x1, y1) {
    const dy = y1 - y2;
    const dx = x1 - x2;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI; 
    return theta;
  },

  angle360(start, end) {
    var theta = this.angle(start[0], start[1], end[0], end[1]);
    if (theta < 0) theta = 360 + theta;
    return theta;
  }
}


module.exports = Util;