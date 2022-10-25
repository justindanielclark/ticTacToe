const computerOption = (root, Controller) => {
  //DECLARATIONS
  const _self = document.createElement('div');

  function create(){
    _self.classList.add('option', 'computerOption');
    const _optionTitle = document.createElement('h3');
      _optionTitle.classList.add('optionTitle');
      _optionTitle.innerText = 'Player Vs. Computer';
    const _SVG = _createComputerIconSVG();
    const _rightPanel = document.createElement('div');
      _rightPanel.classList.add('rightPanel');
    const _optionsForm = document.createElement('div');
      _optionsForm.classList.add('optionsForm');
    const _difficultyLabel = document.createElement('label');
      _difficultyLabel.innerText = 'Difficulty';
    const _difficultyRange = document.createElement('input');
      Object.assign(_difficultyRange, {
        type: 'range',
        id: 'computerDifficulty',
        min: '0',
        max: '2',
        step: '1',
        value: '0',
      });
    const _rangeOptions = document.createElement('div');
      _rangeOptions.classList.add('rangeOptions');
    const _difficultyOptions = [
      _createRangeOption('Easy'),
      _createRangeOption('Hard'),
      _createRangeOption('Impossible'),
    ];
    const _button = document.createElement('button');
      _button.classList.add('optionsButton');
      _button.innerText = 'Start';

    _self.appendChild(_optionTitle);
    _self.appendChild(_SVG);
    _self.appendChild(_rightPanel);
    _rightPanel.appendChild(_optionsForm);
    _optionsForm.appendChild(_difficultyLabel);
    _optionsForm.appendChild(_difficultyRange);
    _optionsForm.appendChild(_rangeOptions);
    _rangeOptions.appendChild(_difficultyOptions[0]);
    _rangeOptions.appendChild(_difficultyOptions[1]);
    _rangeOptions.appendChild(_difficultyOptions[2]);
    _rightPanel.appendChild(_button);
    return _self;
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
  function destroy(){
    root.removeChild(_self);
  }
  return {
    create,
    destroy
  }
}

export default computerOption;