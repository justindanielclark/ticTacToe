import playerOption from "./playerOption.js";
import computerOption from "./computerOption.js";

const startSlide = (root, Model, Controller) => {
  //DECLARATIONS
  const _id = 'startSlide';
  const _self = document.createElement('div');
  const Publish = Controller.publish;
  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Subscription = Controller.Subscription;

  //WIRING
  Subscriber.subscribe(new Subscription('slideLeft_end', _destroy, {priority: 1}))

  //FUNCTIONS
  function create(){
    _self.id = _id;
    _self.classList.add('slide')
    const _heading = document.createElement('h2');
      _heading.innerText = 'Create New Game';
      _heading.classList.add('heading');
    _self.appendChild(_heading);
    _self.appendChild(playerOption(_self, Model, Controller).create());
    _self.appendChild(document.createElement('hr'));
    _self.appendChild(computerOption(_self, Model, Controller).create());
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

export default startSlide;