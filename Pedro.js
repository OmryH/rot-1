let Pedro = function (x, y) {
  this.x = x;
  this.y = y;
  this.draw();
};

Pedro.prototype.draw = function () {
  Game.display.draw(this.x, this.y, "P", "red");
};

Pedro.prototype.act = function () {
  let x = Game.player.getX();
  let y = Game.player.getY();
  let passableCallback = function (x, y) {
    return (x + "," + y in Game.map);
  };
  let astar = new ROT.Path.AStar(x, y, passableCallback, {topology:4});

  let path = [];
  let pathCallback = function (x, y) {
    path.push([x, y]);
  };
  astar.compute(this.x, this.y, pathCallback);

  path.shift();
  if (path.length <= 1) {
    Game.engine.lock();
    alert("You were captured! Game over!");
  } else {
    x = path[0][0];
    y = path[0][1];
    Game.display.draw(this.x, this.y, Game.map[this.x + "," + this.y]);
    this.x = x;
    this.y = y;
    this.draw();
  }
};
