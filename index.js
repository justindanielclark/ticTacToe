import gameContainer from './components/gameContainer.js';
import gameBoard2d from './models/gameBoard2d.js';
import player from './models/player.js';
import SubPub from './utilities/SubscriberPublisherController.js';

(() => {
    const Controller = SubPub();

    //MODEL
    const Model = (() => {
        const gameStates = Object.freeze({
            PICKING_MODE: 'PICKING_MODE',
            SLIDE_TRANSITION_GAME_START: 'SLIDE_TRANSITION_GAME_START',
            GAME_ACTIVE: 'GAME_ACTIVE',
        })
        const currentGameState = gameStates.PICKING_MODE;
        const _board = gameBoard2d(3,3);
        const _players = [/*player('John', 'X', true), player('Patricia', 'O', true)*/];
        let _currentPlayer = null;
        function setPlayers(players){
            players.forEach(p =>{
                _players.push(player(p.name, p.team, p.isAI))
            })
        }
        function removeAllPlayers(){
            _players.splice(0, _players.length);
        }
        function getCurrentPlayer(){
            return _players[_currentPlayer];
        }
        function toggleCurrentPlayer(){
            _currentPlayer++;
            _currentPlayer %= 2;
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
            currentGameState,
            gameStates,
            getCurrentPlayer,
            getTile: _board.getTile,
            removeAllPlayers,
            resetBoard: _board.resetBoard,
            setPlayers: setPlayers,
            setTile: _board.setTile,
            toggleCurrentPlayer,
        }
    })();
    //VIEW
    const View = ((Model, Controller) => {
        //VIEW DECLARATIONS
        const _root = document.querySelector('#ticTacToe');
        const _title = document.createElement('h1');
            _title.classList.add('title');
            _title.innerHTML = '#Tic-Tac-Toe';
        const _gameContainer = gameContainer(_root, Model, Controller);
        //APPEND TO ROOT
        _root.appendChild(_title);
        _root.append(_gameContainer.create());
    })(Model, Controller);
})()