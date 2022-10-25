const computerOption = (root, Controller) => {
  const _self = document.createElement('div');
  function create(){}
  return {
    create
  }
}

export default computerOption;



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
  const button = _createComputerGameButton;
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