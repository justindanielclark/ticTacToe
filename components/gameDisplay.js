const gameDisplay = (root, Model, Controller) => {
  //DECLARATIONS
  const _self = document.createElement('div');
  _self.classList.add('display');
  //Setup Scoreboard
  const _scoreBoard = document.createElement('div');
  _scoreBoard.classList.add('scoreBoard');
  const _player1Score = document.createElement('div');
    _player1Score.classList.add('score');
  const _player1Info = document.createElement('div');
  _player1Info.classList.add('playerInfo');
  _player1Info.innerText = `[X]: ${Model.getPlayers()[0].name}`
  const _player1Indicator = document.createElement('div');
  _player1Indicator.classList.add('indicator', 'expanded');
  _player1Score.append(_player1Info, _player1Indicator);

  const _player2Score = document.createElement('div');
  _player2Score.classList.add('score');
  const _player2Info = document.createElement('div');
  _player2Info.classList.add('playerInfo');
  _player2Info.innerText = `[O]: ${Model.getPlayers()[1].name}`
  const _player2Indicator = document.createElement('div');
  _player2Indicator.classList.add('indicator', 'retracted');
  _player2Score.append(_player2Info, _player2Indicator);

  _scoreBoard.append(_player1Score, _player2Score);

  //Setup Controls
  const _controls = document.createElement('div');
  _controls.classList.add('controls');
  const _resetGameButton = document.createElement('button');
  _resetGameButton.classList.add('displayButton');
  _resetGameButton.innerText = 'Reset Game';
  const _pickGameModeButton = document.createElement('button');
  _pickGameModeButton.classList.add('displayButton');
  _pickGameModeButton.innerText = 'Pick Game Mode';
  _controls.append(_resetGameButton, _pickGameModeButton);

  _self.append(_scoreBoard, _controls);

  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Subscription = Controller.Subscription;
  const Publish = Controller.publish;

  //WIRING
  _pickGameModeButton.addEventListener('click', _handle_pickGameModeButton_Click);
  _resetGameButton.addEventListener('click', _handle_resetGameButton_Click);
  Subscriber.subscribe(
    new Subscription('slideRight_end', _destroy),
    new Subscription('toggleIndicators', _toggleIndicators)
  )
  //FUNCTIONS
  function create(){
    return _self;
  }
  function _destroy(){
    root.removeChild(_self);
    Subscriber.unsubscribeAll();
    _pickGameModeButton.removeEventListener('click', _handle_pickGameModeButton_Click);
    _resetGameButton.removeEventListener('click', _handle_resetGameButton_Click);
  }
  function _handle_resetGameButton_Click(event){
    Publish('gameBoardReset', null);
  }
  function _handle_pickGameModeButton_Click(event){
    Model.resetBoard();
    Model.setCurrentPlayer(0);
    Publish('slideRight_start', null);
  }
  function _toggleIndicators(){
    _toggleIndicator(_player1Indicator);
    _toggleIndicator(_player2Indicator);
    function _toggleIndicator(indicator){
      indicator.classList.toggle('expanded');
      indicator.classList.toggle('retracted');
    }
  }

  return {
    create,
  }
}

export default gameDisplay;
