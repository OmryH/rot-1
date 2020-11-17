let Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.draw();
};

Player.prototype.draw = function() {
  Game.display.draw(this.x, this.y, "@", "#ff0");
};

Player.prototype.act = function() {
  Game.engine.lock();
  window.addEventListener("keydown", this);
};

Player.prototype.handleEvent = function (e) {
  let keyMap = {
    38: 0,
    33: 1,
    39: 2,
    34: 3,
    40: 4,
    35: 5,
    37: 6,
    36: 7,
  };

  let code = e.keyCode;
  if (!(code in keyMap)) {
    return;
  }

  let diff = ROT.DIRS[8][keyMap[code]];
  let newX = this.x + diff[0];
  let newY = this.y + diff[1];

  let newKey = newX + "," + newY;
  if (!(newKey in Game.map)) {
    return;
  }

  Game.display.draw(this.x, this.y, Game.map[this.x + "," + this.y]);
  this.x = newX;
  this.y = newY;
  this.draw();
  window.removeEventListener("keydown", this);
  Game.engine.unlock();
};
