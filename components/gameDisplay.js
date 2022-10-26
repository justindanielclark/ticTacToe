const gameDisplay = (root, Model, Controller) => {
  //DECLARATIONS
  const _self = document.createElement('div');
  _self.classList.add('display');
  const _scoreBoard = document.createElement('div');
  _scoreBoard.classList.add('scoreBoard');
  const _player1Score = document.createElement('div');
  _player1Score.classList.add('score');
  const _player2Score = document.createElement('div');
  _player2Score.classList.add('score');
  _scoreBoard.append(_player1Score);
  _scoreBoard.append(_player2Score);

  const _controls = document.createElement('div');
  _controls.classList.add('controls');
  const _resetGameButton = document.createElement('button');
  _resetGameButton.classList.add('displayButton');
  _resetGameButton.innerText = 'Reset Game';
  const _pickGameModeButton = document.createElement('button');
  _pickGameModeButton.classList.add('displayButton');
  _pickGameModeButton.innerText = 'Pick Game Mode';
  const _backButton = document.createElement('button');
  _backButton.classList.add('displayButton');
  _backButton.innerText = '<';
  const _forwardButton = document.createElement('button');
  _forwardButton.classList.add('displayButton');
  _forwardButton.innerText = '>';
  _controls.append(_backButton);
  _controls.append(_resetGameButton);
  _controls.append(_pickGameModeButton);
  _controls.append(_forwardButton);

  _self.append(_scoreBoard);
  _self.append(_controls);

  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Subscription = Controller.Subscription;
  const Publish = Controller.publish;
  //WIRING
  _pickGameModeButton.addEventListener('click', _handle_pickGameModeButton_Click);
  _resetGameButton.addEventListener('click', _handle_resetGameButton_Click);
  Subscriber.subscribe(
    new Subscription('slideRight_end', _destroy),
  )
  //FUNCTIONS
  function create(){
    
    
    
    
    
    
    return _self;
  }
  function _handle_resetGameButton_Click(event){
    Publish('gameBoardReset', null);
  }
  function _handle_pickGameModeButton_Click(event){
    Model.resetBoard();
    Publish('slideRight_start', null);
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
