import gameSlide from './gameSlide.js';
import startSlide from './startSlide.js';

const gameContainer = (root, Controller) => {
  //DECLARATIONS
  const _self = document.createElement('div');
  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Publish = Controller.publish;
  const Subscription = Controller.Subscription;
  //SUBSCRIPTIONS / WIRING
  Subscriber.subscribe(
    new Subscription('playersAdded', _slideLeft),
    new Subscription('playersAdded', _createGameSlide)
  );
  _self.addEventListener('animationend', (event)=>{
    if(event.animationName === 'slidingLeft'){
      _self.classList.remove('slidingLeft');
      Publish('slidingLeftAnimationEnded');
    }
  })

  //FUNCTIONS
  function create(){
    _self.classList.add('slideContainer');
    _createStartSlide();
    return _self;
  }
  function _createStartSlide(){
    _self.appendChild(startSlide(_self, Controller).create());
  }
  function _createGameSlide(){
    _self.appendChild(gameSlide(_self, Controller).create())
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