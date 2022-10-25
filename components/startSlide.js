import playerOption from "./playerOption.js";
import computerOption from "./computerOption.js";

const startSlide = (root, Controller) => {
  const _id = 'startSlide';
  const _self = document.createElement('div');
  const Subscription = Controller.Subscription;
  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Publish = Controller.publish;
  Subscriber.subscribe(new Subscription('slidingLeftAnimationEnded', _destroy))

  function create(){
    _self.id = _id;
    _self.classList.add('slide')
    const _heading = document.createElement('h2');
      _heading.innerText = 'Create New Game';
      _heading.classList.add('heading');
    _self.appendChild(_heading);
    _self.appendChild(playerOption(_self, Controller).create());
    _self.appendChild(document.createElement('hr'));
    _self.appendChild(computerOption(_self, Controller).create());
    return _self;
  }
  function _destroy(){
    const SubList = Subscriber.subscriptions.list
    Object.keys(SubList).forEach(key => {
      SubList[key].forEach(sub => {
        Subscriber.unsubscribe(sub);
      })
    })
    Publish('startSlideDestroyed', {})
    root.removeChild(_self);
  }
  return {
    create,
  }
}

export default startSlide;