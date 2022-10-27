//NOTES: _resetBoard needs to be reimplemented to not be retarded.

const gameGrid = (root, Model, Controller) => {
  // DECLARATIONS
  const _self = document.createElement('div');
  _self.id = 'gameGrid';
  const _mask = document.createElement('div');
  _mask.id = 'gameGridMask';
  const _gameField = document.createElement('div');
  _gameField.id = 'gameGridField'
  _gameField.appendChild(_mask);
  _self.appendChild(_gameField);
  const _createGridLine = (orientation, placement, direction) => {
    const gridLine = document.createElement('div');
    gridLine.classList.add('gridLine', orientation, placement, direction);
    return gridLine;
  }
  const _gridLines = [];
  _gridLines.push(_createGridLine('vertical', 'first', Math.random() > .5 ? 'topToBottom' : 'bottomToTop'))
  _gridLines.push(_createGridLine('vertical', 'second', Math.random() > .5 ? 'topToBottom' : 'bottomToTop'))
  _gridLines.push(_createGridLine('horizontal', 'first', Math.random() > .5 ? 'leftToRight' : 'rightToLeft'))
  _gridLines.push(_createGridLine('horizontal', 'second', Math.random() > .5 ? 'leftToRight' : 'rightToLeft'))
  _gridLines.forEach(gridLine => {_mask.appendChild(gridLine)})
  const _tiles = [[],[],[]];
  for(let y = 0; y < 3; y++){
    for(let x = 0; x < 3; x++){
        const tile = document.createElement('div');
        tile.classList.add('tile', 'inactive');
        tile.dataset.x = x;
        tile.dataset.y = y;
        _tiles[x][y] = tile;
        _gameField.append(tile);
    }
  }

  const Subscriber = Controller.subscriberWrapper({self: _self});
  const Subscription = Controller.Subscription;
  const Publish = Controller.publish;

  //WIRING
  Subscriber.subscribe(
    new Subscription('slideLeft_end', _toggleGridLines),
    new Subscription('slideRight_end', _destroy),
    new Subscription('gameBoardReset', _resetBoard),
  )
  for(let y = 0; y < 3; y++){
    for(let x = 0; x < 3; x++){
        const tile = _tiles[x][y];
        tile.addEventListener('click', _handle_tileClicked);
    }
  }

  //FUNCTIONS
  function create(){
    return _self;
  }
  function _createCircle(){
    const svgCircle = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      svgCircle.setAttribute('viewBox', '0 0 31.424 31.425');
      svgCircle.classList.add('mark');
      svgCircle.classList.add('active');
    const svgCirclePath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      svgCirclePath.setAttribute('d', 'M15.712,3.132c6.937,0,12.581,5.644,12.581,12.58c0,6.938-5.645,12.581-12.581,12.581c-6.937,0-12.58-5.645-12.58-12.581 C3.132,8.775,8.775,3.132,15.712,3.132 M15.712,0C7.035,0,0,7.034,0,15.712c0,8.679,7.035,15.713,15.712,15.713 c8.677,0,15.712-7.034,15.712-15.713C31.425,7.034,24.389,0,15.712,0L15.712,0z')
    svgCircle.appendChild(svgCirclePath);
    return svgCircle;
  }
  function _createCross(){
    const svgCross = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      svgCross.setAttribute('viewBox', '0 0 490 490')
      svgCross.classList.add('mark');
      svgCross.classList.add('active');
    const svgCrossPath = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
      svgCrossPath.setAttribute('points', '456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 ')
    svgCross.appendChild(svgCrossPath);
    return svgCross;
  }
  function _destroy(){
    root.removeChild(_self)
    Subscriber.unsubscribeAll();
  }
  function _getTiles(){
    return [..._tiles[0], ..._tiles[1], ..._tiles[2]];
  }
  function _handle_tileClicked(event){
    const {x,y} = event.target.dataset;
    if(Model.getTile([x,y]) === null){
      const currentTeam = Model.getCurrentPlayer().team;
      _markTile([x,y], currentTeam);
      Model.setTile([x,y], currentTeam);
      Model.toggleCurrentPlayer();
    }
    Publish('tileClicked', null)
  }
  function _markTile(location, val){
    const [x,y] = location;
    const tile = _tiles[x][y];
    const mark = (val === 'X' ? _createCross() : _createCircle())
    tile.appendChild(mark);
    tile.classList.toggle('inactive');
  }
  function _removeMark(location){
    const [x,y] = location;
    const tile = _tiles[x][y];
    const svg = tile.querySelector('.mark');
    if(svg){
      svg.classList.toggle('active');
      svg.classList.toggle('inactive');
      svg.addEventListener('animationend', (event)=>{
        if(event.target === svg){
          tile.removeChild(svg);
        }
      })
    }
  }
  function _resetBoard(){
    Model.resetBoard();
    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 3; x++){
          if(!_tiles[x][y].classList.contains('inactive')){
            _tiles[x][y].classList.add('inactive');
          }
          _removeMark([x,y]);
      }
    }
  }
  function _toggleGridLines(){
    _gridLines.forEach(gridline => gridline.classList.toggle('expanded'))
  }
  return {
    create
  }
}

export default gameGrid;