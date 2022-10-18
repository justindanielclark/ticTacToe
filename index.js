import gameBoard2d from './models/gameBoard2d.js';
import player from './models/player.js';

const App = (() => {
    const model = (() => {
        const _board = gameBoard2d(3,3);
        const _players = [player('John', true, 'X'), player('Patricia', true, 'O')];
        return {}
    })();
    const view = (() => {
        const _root = document.querySelector('#ticTacToe');
        return {}
    })();
    const _checkForWinner = (x,y,board) => {
        //Returns 'X', 'O', null
        let result = checkHorizontal(y);
        if(result){return result}
        result = checkVertical(x);
        if(result){return result}
        return checkDiagonal();
    
        function checkHorizontal(y){
            return areAllEqualAndNotNull(board.getTile(0,y), board.getTile(1,y), board.getTile(2,y))
        }
        function checkVertical(x){
            return areAllEqualAndNotNull(board.getTile(x,0), board.getTile(x,1), board.getTile(x,2))
        }
        function checkDiagonal(){
            let result = areAllEqualAndNotNull(board.getTile(0,0), board.getTile(1,1), board.getTile(2,2))
            if(result){return result}
            return areAllEqualAndNotNull(board.getTile(0,2), board.getTile(1,1), board.getTile(2,0))
        }
        function areAllEqualAndNotNull(...args){
            for(let i = 1; i < args.length; i++){
                if(args[i-1] === null || !(args[i-1] === args[i])){
                    return null;
                }
            }
            return args[0];
        }
    }




})()