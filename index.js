import gameContainer from './components/gameContainer.js';
import gameBoard2d from './models/gameBoard2d.js';
import player from './models/player.js';
import SubscriberPublisherController from './utilities/SubscriberPublisherController.js';

const App = (() => {
    //MODEL
    const model = (() => {
        const _board = gameBoard2d(3,3);
        const _players = [player('John', 'X', true), player('Patricia', 'O', true)];
        let currentPlayer = 0;
        function getCurrentPlayer(){
            return _players[currentPlayer];
        }
        function toggleCurrentPlayer(){
            currentPlayer++;
            currentPlayer %= 2;
        }
        function checkForWinner(x,y,board){
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
        return {
            checkForWinner,
            getCurrentPlayer,
            getTile: _board.getTile,
            printBoard: _board.printBoard,
            resetBoard: _board.resetBoard,
            setTile: _board.setTile,
            toggleCurrentPlayer,
        }
    })();
    //VIEW
    const view = (() => {
        //VIEW DECLARATIONS
        const _root = document.querySelector('#ticTacToe');
        const _title = document.createElement('h1')
            _title.classList.add('title');
            _title.innerHTML = '#Tic-Tac-Toe';
        const _gameContainer = gameContainer(_root);

        //APPEND TO ROOT
        _root.appendChild(_title);
        _root.append(_gameContainer.create());

        return {
            
        }
    })();
    
    
    return {
        
    }
})()

window.App = App;