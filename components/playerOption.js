const playerOption = (root, Controller) => {
  //DECLARATIONS
  const Publish = Controller.publish;
  const _textInputMaxLength = 15;
  const _self = document.createElement('div');
    _self.classList.add('option', 'playerOption');
  const optionTitle = document.createElement('h3');
    optionTitle.classList.add('optionTitle');
    optionTitle.innerText = 'Player Vs. Player';
  const SVG = _createPlayerIconSVG();
  const rightPanel = document.createElement('div');
    rightPanel.classList.add('rightPanel');
  const optionsForm = document.createElement('div');
    optionsForm.classList.add('optionsForm');
  const player1Label = document.createElement('label');
    player1Label.classList.add('playerNameLabel');
    player1Label.innerText = 'Player X:';
  const player1Input = document.createElement('input');
    Object.assign(player1Input, {
      type: 'text',
      id: 'playerX',
      value: 'John Doe',
      placeholder: 'John Doe',
      maxLength: _textInputMaxLength,
    });
  const player2Label = document.createElement('label');
    player2Label.classList.add('playerNameLabel');
    player2Label.innerText = 'Player O:'
  const player2Input = document.createElement('input');
    Object.assign(player2Input, {
      type: 'text',
      id: 'playerO',
      value: 'Jane Doe',
      placeholder: 'Jane Doe',
      maxLength: _textInputMaxLength,
    });
  const button = document.createElement('button');
    button.classList.add('optionsButton');
    button.innerText = 'Start';
  _self.appendChild(optionTitle);
  _self.appendChild(SVG);
  _self.appendChild(rightPanel);
  rightPanel.appendChild(optionsForm);
  optionsForm.appendChild(player1Label);
  optionsForm.appendChild(player1Input);
  optionsForm.appendChild(player2Label);
  optionsForm.appendChild(player2Input);
  rightPanel.appendChild(button);
  //WIRING
  button.addEventListener('click', ()=>{
    Publish('playersAdded', [
      {
        name: player1Input.value,
        team: 'X',
        isAI: false
      },
      {
        name: player2Input.value,
        team: 'O',
        isAI: false
      }]
    )
  })
  //FUNCTIONS
  function create(){
    return _self;
  }
  function destroy(){
    root.removeChild(_self);
  }
  function _createPlayerIconSVG(){
    const SVGPlayer = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    SVGPlayer.setAttribute('viewBox', '0 0 490.1 490.1');
    const SVGPlayerPath1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      SVGPlayerPath1.setAttribute('d', 'M245,261.75c71.9,0,131.4-57.3,131.4-130.3S316.9,0.05,245,0.05s-131.4,57.3-131.4,130.3S173.1,261.75,245,261.75z M245,40.75c50,0,90.7,40.7,90.7,89.7s-40.7,89.6-90.7,89.6s-90.7-40.7-90.7-89.7S195,40.75,245,40.75z')
    const SVGPlayerPath2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      SVGPlayerPath2.setAttribute('d', 'M333.6,274.25c-8.3-2.1-16.7,0-21.9,6.3l-66.7,76.1l-66.7-76.1c-5.2-6.3-14.6-8.3-21.9-6.3C61.5,305.55,0,382.65,0,469.15 c0,11.5,9.4,20.9,20.9,20.9h448.3c11.5,0,20.9-9.4,20.9-20.9C490,382.65,428.5,305.55,333.6,274.25z M42.7,449.35 c8.4-57.3,50.1-106.3,114.7-131.3l73,83.4c7.3,9.4,22.9,9.4,30.2,0l73-83.4c63.6,25,106.4,75,114.7,131.3H42.7z')
    SVGPlayer.appendChild(SVGPlayerPath1);
    SVGPlayer.appendChild(SVGPlayerPath2);
    return SVGPlayer;
  }
  return {
    create,
    destroy,
  }
}
export default playerOption;