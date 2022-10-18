const gameGrid = (() => {
  function init(root){
    const _tiles = [[],[],[]];
    const _self = document.createElement('div');
      _self.id = 'gameGrid';
    root.appendChild(_self);
    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 3; x++){
          const tile = document.createElement('div');
          tile.classList.add('tile');
          _tiles[x][y] = tile;
          _self.appendChild(tile);
      }
    }
  }
  return {init}
})()


export default gameGrid;