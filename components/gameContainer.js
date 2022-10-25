import gameSlide from './gameSlide.js';
import startSlide from './startSlide.js';

const gameContainer = (root, Model, Controller) => {
  //DECLARATIONS
  const _self = document.createElement('div');
  const Publish = Controller.publish;
  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Subscription = Controller.Subscription;
  
  //WIRING
  //Subscriptions
  Subscriber.subscribe(
    new Subscription('slideLeft_start', _handle_slideLeft_start),
    new Subscription('slideRight_start', _handle_slideRight_start)
  );
  //Publishes
  _self.addEventListener('animationend', (event) => {
    if(event.animationName === 'slidingLeft'){
      Publish('slideLeft_end', null);
      _self.classList.toggle('slidingLeft');
    }
    if(event.animationName === 'slidingRight'){
      Publish('slideRight_end', null);
      _self.classList.toggle('slidingRight');
    }
  })

  //FUNCTIONS
  function create(){
    _self.classList.add('slideContainer');
    _createStartSlide();
    return _self;
  }
  function _createStartSlide(){
    _self.prepend(startSlide(_self, Model, Controller).create());
  }
  function _createGameSlide(){
    _self.append(gameSlide(_self, Model, Controller).create())
  }
  function _handle_slideLeft_start(event){
    _slideLeft();
    _createGameSlide();
  }
  function _handle_slideRight_start(event){
    _slideRight();
    _createStartSlide();
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