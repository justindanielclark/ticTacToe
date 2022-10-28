import gameDisplay from "./gameDisplay.js";
import gameGrid from "./gameGrid.js";
const gameSlide = (root, Model, Controller) => {
  //DECLARATIONS
  const _id = 'gameSlide';
  const _self = document.createElement('div');
  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Subscription = Controller.Subscription;
  //WIRING
  Subscriber.subscribe(
    new Subscription('slideRight_end', _destroy, {priority: 1}),
  )
  //FUNCTIONS
  function create(){
    _self.id = _id;
    _self.classList.add('slide')
    _self.append(
      gameDisplay(_self, Model, Controller).create(),
      gameGrid(_self, Model, Controller).create()
    );
    
    return _self;
  }
  function _destroy(){
    root.removeChild(_self);
    Subscriber.unsubscribeAll();
  }
  return {
    create,
  }
}

export default gameSlide;