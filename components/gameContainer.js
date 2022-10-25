import gameGrid from './gameGrid.js';
import startSlide from './startSlide.js';

const gameContainer = (root) => {
  function create(){
    const _self = document.createElement('div');
    _self.classList.add('slideContainer');
    const _startSlide = startSlide();
    _self.appendChild(_startSlide.create());
    return _self;
  }
  function slideLeft(){
    if(!_self.classList.contains('slidingLeft')){
      _self.classList.add('slidingLeft');
    }
  }
  function slideRight(){
    if(!_self.classList.contains('slidingRight')){
      _self.classList.add('slidingRight');
    }
  }
  return {
    create,
    slideLeft,
    slideRight,
  }
}

export default gameContainer;