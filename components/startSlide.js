const startSlide = (root) => {
  const _id = 'startSlide';
  const _textInputMaxLength = 15;
  
  function create(){
    const _self = document.createElement('div');
      _self.id = _id;
      _self.classList.add('slide')
    const _heading = document.createElement('h2');
      _heading.innerText = 'Create New Game';
      _heading.classList.add('heading');
    _self.appendChild(_heading);
    _self.appendChild(_createPlayerOption());
    _self.appendChild(document.createElement('hr'));
    _self.appendChild(_createComputerOption());
    return _self;

    function _createPlayerOption(){
      const option = document.createElement('div');
        option.classList.add('option', 'playerOption');
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
      option.appendChild(optionTitle);
      option.appendChild(SVG);
      option.appendChild(rightPanel);
      rightPanel.appendChild(optionsForm);
      optionsForm.appendChild(player1Label);
      optionsForm.appendChild(player1Input);
      optionsForm.appendChild(player2Label);
      optionsForm.appendChild(player2Input);
      rightPanel.appendChild(button);
      
      return option;
  
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
    }
    function _createComputerOption(){
      const option = document.createElement('div');
        option.classList.add('option', 'computerOption');
      const optionTitle = document.createElement('h3');
        optionTitle.classList.add('optionTitle');
        optionTitle.innerText = 'Player Vs. Computer';
      const SVG = _createComputerIconSVG();
      const rightPanel = document.createElement('div');
        rightPanel.classList.add('rightPanel');
      const optionsForm = document.createElement('div');
        optionsForm.classList.add('optionsForm');
      const difficultyLabel = document.createElement('label');
        difficultyLabel.innerText = 'Difficulty';
      const difficultyRange = document.createElement('input');
        Object.assign(difficultyRange, {
          type: 'range',
          id: 'computerDifficulty',
          min: '0',
          max: '2',
          step: '1',
          value: '0',
        });
      const rangeOptions = document.createElement('div');
        rangeOptions.classList.add('rangeOptions');
      const difficultyOptions = [
        _createRangeOption('Easy'),
        _createRangeOption('Hard'),
        _createRangeOption('Impossible'),
      ];
      const button = document.createElement('button');
        button.classList.add('optionsButton');
        button.innerText = 'Start';
  
      option.appendChild(optionTitle);
      option.appendChild(SVG);
      option.appendChild(rightPanel);
      rightPanel.appendChild(optionsForm);
      optionsForm.appendChild(difficultyLabel);
      optionsForm.appendChild(difficultyRange);
      optionsForm.appendChild(rangeOptions);
      rangeOptions.appendChild(difficultyOptions[0]);
      rangeOptions.appendChild(difficultyOptions[1]);
      rangeOptions.appendChild(difficultyOptions[2]);
      rightPanel.appendChild(button);
      
      return option;
  
      function _createComputerIconSVG(){
        const SVGComputer = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
          SVGComputer.setAttribute('viewBox', '0 0 364 364');
        const SVGComputerPath1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
          SVGComputerPath1.setAttribute('d', 'M350,60.5h-50c-7.72,0-14,6.28-14,14v225c0,7.72,6.28,14,14,14h50c7.72,0,14-6.28,14-14v-225 C364,66.78,357.72,60.5,350,60.5z M325.864,166.5c-11.23,0-20.333-9.104-20.333-20.333s9.104-20.333,20.333-20.333 s20.333,9.104,20.333,20.333S337.094,166.5,325.864,166.5z')
        const SVGComputerPath2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
          SVGComputerPath2.setAttribute('d', 'M230,50.5H30c-16.542,0-30,13.458-30,30v149c0,16.542,13.458,30,30,30h79v21.765c0,0.665-0.466,1.235-0.847,1.235H52.351 C46.092,282.5,41,287.329,41,293.265v9.235c0,5.962,5.198,11,11.351,11h156.604c6.091,0,11.046-4.935,11.046-11v-9.235 c0-6.037-4.852-10.765-11.046-10.765h-55.803c-0.517,0-1.151-0.681-1.151-1.235V259.5h78c16.542,0,30-13.458,30-30v-149 C260,63.958,246.542,50.5,230,50.5z M230,80.5l0.017,133H30v-133H230z')
        SVGComputer.appendChild(SVGComputerPath1);
        SVGComputer.appendChild(SVGComputerPath2);
        return SVGComputer;
      }
      function _createRangeOption(type){
        const rangeOption = document.createElement('p');
          rangeOption.classList.add('difficultyOption');
          rangeOption.innerText = type;
        return rangeOption;
      }
    }
  }
  function destroy(){
    const _self = document.querySelector(`#${_id}`)
    root.removeChild(_self);
  }
  return {
    create,
    destroy
  }
}

export default startSlide;