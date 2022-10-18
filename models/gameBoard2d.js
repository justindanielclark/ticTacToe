const gameBoard2d = (sizeX, sizeY) => {
    let _board = [];
    let _sizeX = sizeX;
    let _sizeY = sizeY;
    const _createBoard = (sizeX, sizeY) => {
        for(let i = 0; i < sizeX; i++){
            _board.push([]);
            for(let j = 0; j < sizeY; j++){
                _board[i].push(null);
            }
        }
    }
    const getTile = (x, y) => {
        return _board[x][y];
    }
    const printBoard = () => {
        let message = 'Game Board: [';
        for(let y = 0; y < _sizeY; y++){
            message += '\n\t'
            for(let x = 0; x < _sizeX; x++){
                message += `${_board[x][y]}, `
            }
        }
        message += '\n]'
        console.log(message);
    }
    const setSize = (newSizeX, newSizeY) => {
        [_sizeX, _sizeY] = [newSizeX, newSizeY];
        _resetBoard(_sizeX, _sizeY);
    }
    const setTile = (x, y, val) => {
        _board[x][y] = val
        return val;
    }
    const resetBoard = () => {
        _board = [];
        _createBoard(_sizeX, _sizeY);
    }
    
    _createBoard(_sizeX, _sizeY);
    
    return {
        getTile, 
        printBoard,
        resetBoard,
        setTile, 
        setSize,
    }
}

export default gameBoard2d;