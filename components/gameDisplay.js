const gameDisplay = (root, Model, Controller) => {
  //DECLARATIONS
  const _self = document.createElement('div');
  const _scoreBoard = document.createElement('div');
  const _player1Score = document.createElement('div');
  const _player2Score = document.createElement('div');
  const _resetGameButton = document.createElement('button');
  const _pickGameModeButton = document.createElement('button');
  const _backButton = document.createElement('button');
  const _forwardButton = document.createElement('button');

  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Subscription = Controller.Subscription;
  const Publish = Controller.publish;
  //WIRING
  _pickGameModeButton.addEventListener('click', _handle_pickGameModeButton_Click)
  Subscriber.subscribe(
    new Subscription('slideRight_end', _destroy),
  )
  //FUNCTIONS
  function create(){
    _self.classList.add('display');
    _resetGameButton.classList.add('displayButton');
    _resetGameButton.innerText = 'Reset Game';
    _pickGameModeButton.classList.add('displayButton');
    _pickGameModeButton.innerText = 'Pick Game Mode';
    _backButton.classList.add('displayButton');
    _backButton.innerText = '<';
    _forwardButton.classList.add('displayButton');
    _forwardButton.innerText = '>';
    _self.appendChild(_backButton);
    _self.appendChild(_resetGameButton);
    _self.appendChild(_pickGameModeButton);
    _self.appendChild(_forwardButton);
    return _self;
  }
  function _handle_resetGameButton_Click(event){

  }
  function _handle_pickGameModeButton_Click(event){
    Publish('slideRight_start', null)
  }
  function _destroy(){
    root.removeChild(_self);
    Subscriber.unsubscribeAll();
  }
  return {
    create,
  }
}

export default gameDisplay;
