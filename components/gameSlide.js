import gameGrid from "./gameGrid.js";
const gameSlide = (root, Model, Controller) => {
  const _id = 'gameSlide';
  const _self = document.createElement('div');

  function create(){
    _self.id = _id;
    _self.classList.add('slide')
    _self.appendChild(gameGrid(_self, Model).create())
    
    return _self;
  }
  function destroy(){
    root.removeChild(_self);
  }
  return {
    create,
    destroy
  }
}

export default gameSlide;