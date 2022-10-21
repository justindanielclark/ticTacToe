const gameHeader = (root) => {
  const _self = document.createElement('div');
    _self.classList.add('gameHeader');
  const _title = document.createElement('h1')
    _title.classList.add('title');
    _title.innerHTML = '#Tic-Tac-Toe';
  const _newGameButton = document.createElement('button');
    _newGameButton.classList.add('newGameButton');
    _newGameButton.innerText = 'Create New Game';
    _newGameButton.addEventListener('click', ()=>{
      _self.removeChild(_newGameButton);
      _self.appendChild(_headerContainer);
    })
  const _headerContainer = document.createElement('div');
    _headerContainer.classList.add('headerContainer');
  const _heading = document.createElement('h2');
    _heading.innerText = 'Create New Game';
    _heading.classList.add('heading');
    _headerContainer.appendChild(_heading)

  function initialRender(){
    _self.appendChild(_title);
    _self.appendChild(_newGameButton);
    root.appendChild(_self);
  }
  return {
    initialRender
  }
}

export default gameHeader;