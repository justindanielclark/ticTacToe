import gameGrid from './gameGrid.js';
import startSlide from './startSlide.js';

const gameContainer = (root, Controller) => {
  //DECLARATIONS
  const _self = document.createElement('div');
  const Subscriber = Controller.subscriberWrapper({});
  const Publish = Controller.Publish;
  const Subscription = Controller.Subscription;
  //SUBSCRIPTIONS
  Subscriber.subscribe(new Subscription('playersAdded', _slideLeft, {priority: 1}));
  //FUNCTIONS
  function create(){
    _self.classList.add('slideContainer');
    const _startSlide = startSlide(_self, Controller);
    _self.appendChild(_startSlide.create());
    return _self;
  }
  function _readyGameGrid(){
    const _gameGrid = gameGrid(_self, Controller);
    _self.appendChild()

  }
  function _slideLeft(){
    if(!_self.classList.contains('slidingLeft')){
      _self.classList.add('slidingLeft');
    }
  }
  function _slideRight(){
    if(!_self.classList.contains('slidingRight')){
      _self.classList.add('slidingRight');
    }
  }
  return {
    create
  }
}

export default gameContainer;