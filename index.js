import gameContainer from './components/gameContainer.js';
import gameBoard2d from './models/gameBoard2d.js';
import PlayerCreator from './models/PlayerCreator.js';
import SubPub from './utilities/SubscriberPublisherController.js';

(() => {
    const Controller = SubPub();

    //MODEL
    const Model = (() => {
        const Player = PlayerCreator;
        const _board = gameBoard2d(3,3);
        const _players = [/*player('John', 'X', true), player('Patricia', 'O', true)*/];
        let _currentPlayer = 0;
        function setPlayers(players){
            removeAllPlayers();
            players.forEach(p =>{
                _players.push(new Player(p.name, p.team, p.AiDifficulty))
            })
        }
        function removeAllPlayers(){
            _players.splice(0, _players.length);
        }
        function getCurrentPlayer(){
            return _players[_currentPlayer];
        }
        function getPlayers(){
            return _players;
        }
        function setCurrentPlayer(val){
            if(val > 1){
                val = 1;
            } else if(val <= 0){
                val = 0
            }
            _currentPlayer = val;
        }
        function toggleCurrentPlayer(){
            _currentPlayer++;
            _currentPlayer %= 2;
        }
        function checkForWinner(x,y){
            let result;
            let returnable = {
                value: null,
                winningTiles: [],
            }
            
            result = checkHorizontal(y);
            if(result.value){
                returnable.value = result.value;
                returnable.winningTiles = [...returnable.winningTiles, ...result.winningTiles];
            }

            result = checkVertical(x);
            if(result.value){
                returnable.value = result.value;
                returnable.winningTiles = [...returnable.winningTiles, ...result.winningTiles];
            }
            result = checkDiagonal();
            if(result.value){
                returnable.value = result.value;
                returnable.winningTiles = [...returnable.winningTiles, ...result.winningTiles];
            }
            return returnable;
          
            function checkHorizontal(y){
                return {
                    value: areAllEqualAndNotNull(_board.getTile(0,y), _board.getTile(1,y), _board.getTile(2,y)),
                    winningTiles: [[0,y],[1,y],[2,y]],
                };
            }
            function checkVertical(x){
                return {
                    value: areAllEqualAndNotNull(_board.getTile(x,0), _board.getTile(x,1), _board.getTile(x,2)),
                    winningTiles: [[x,0], [x,1], [x,2]],
                };
            }
            function checkDiagonal(){
                let result;
                let returnable = {
                    value: null,
                    winningTiles: [],
                }

                result = areAllEqualAndNotNull(_board.getTile(0,0), _board.getTile(1,1), _board.getTile(2,2));
                if(result){
                    returnable.value = result
                    returnable.winningTiles = [...returnable.winningTiles, [0,0],[1,1],[2,2]];
                }

                result = areAllEqualAndNotNull(_board.getTile(0,2), _board.getTile(1,1), _board.getTile(2,0));
                if(result){
                    returnable.value = result
                    returnable.winningTiles = [...returnable.winningTiles, [0,2],[1,1],[2,0]];
                }
                
                return returnable;
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
            getPlayers,
            getTile: _board.getTile,
            printBoard: _board.printBoard,
            removeAllPlayers,
            resetBoard: _board.resetBoard,
            setCurrentPlayer,
            setPlayers,
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
    //AI
    const AI = ((Model, Controller) => {
        const Subscriber = Controller.subscriberWrapper({self: 'AI'});
        const Subscription = Controller.Subscription;
        const Publish = Controller.publish;

        Subscriber.subscribe(
            new Subscription('easyAiToMove', _makeEasyChoice),
        )

        function _makeEasyChoice(){
            const remainingTiles = [];
            for(let y = 0; y < 3; y++){
                for(let x = 0; x < 3; x++){
                    if(Model.getTile(x,y) === null){
                        remainingTiles.push([x,y]);
                    }
                }
            }
            console.log(remainingTiles);
            const move = remainingTiles[Math.floor(Math.random()*remainingTiles.length)]
            Publish('AiMove', move);
        }
        function _makeHardChoice(){
            const remainingTiles = [];
            for(let y = 0; y < 3; y++){
                for(let x = 0; x < 3; x++){
                    if(Model.getTile(x,y) === null){
                        remainingTiles.push([x,y]);
                    }
                }
            }
        }
    })(Model, Controller)
})()