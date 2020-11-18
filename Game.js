const Game = {
  display: null,
  map: {},
  numOfBoxes: 10,
  player: null,
  pedro: null,
  engine: null,
  loot: null,
  init: function () {
    this.display = new ROT.Display();
    document.body.appendChild(this.display.getContainer());
    this.generateMap();

    let scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this.player, true);
    scheduler.add(this.pedro, true);
    this.engine = new ROT.Engine(scheduler);
    this.engine.start();
  },

  generateMap: function () {
    let digger = new ROT.Map.Digger();
    let freeCells = [];

    let digCallback = (x, y, value) => {
      if (value) {
        return;
      }
      let key = x + "," + y;
      freeCells.push(key);
      this.map[key] = ".";
    };
    digger.create(digCallback.bind(this));
    this.generateBoxes(freeCells);
    this.drawWholeMap();

    this.player = this.createBeing(Player, freeCells);
    this.pedro = this.createBeing(Pedro, freeCells);
  },

  drawWholeMap: function () {
    for (let key in this.map) {
      let parts = key.split(",");
      let x = parseInt(parts[0]);
      let y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key]);
    }
  },

  generateBoxes: function (freeCells) {
    for (let i = 0; i < this.numOfBoxes; i++) {
      let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      let key = freeCells.splice(index, 1)[0];
      this.map[key] = "*";
      if(!i) {
        this.loot = key;
      }
    }
  },

  createBeing: function (what, freeCells) {
    let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    let key = freeCells.splice(index, 1)[0];
    let parts = key.split(",");
    let x = parseInt(parts[0]);
    let y = parseInt(parts[1]);
    return new what(x, y);
  }
};



