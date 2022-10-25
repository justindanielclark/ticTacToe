import playerOption from "./playerOption.js";

const startSlide = (root, Controller) => {
  const _id = 'startSlide';
  const _self = document.createElement('div');
    _self.id = _id;
    _self.classList.add('slide')
  const _heading = document.createElement('h2');
    _heading.innerText = 'Create New Game';
    _heading.classList.add('heading');
  const _playerOption = playerOption(_self, Controller);
  _self.appendChild(_heading);
  _self.appendChild(_playerOption.create());
  _self.appendChild(document.createElement('hr'));
  // _self.appendChild(_createComputerOption());
  
  function create(){
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

export default startSlide;