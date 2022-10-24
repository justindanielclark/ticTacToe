import gameGrid from './components/gameGrid.js';
import gameHeader from './components/gameHeader.js';
import gameBoard2d from './models/gameBoard2d.js';
import player from './models/player.js';
import SubscriberPublisherController from './utilities/SubscriberPublisherController.js';

let App = (() => {
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
            console.log(getCurrentPlayer())
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
            getCurrentPlayer,
            getTile: _board.getTile,
            setTile: _board.setTile,
            toggleCurrentPlayer
        }
    })();
    //VIEW
    const view = (() => {
        const _root = document.querySelector('#ticTacToe');
        const _gameHeader = gameHeader(_root);
        const _gameGrid = gameGrid(_root);
        _gameHeader.initialRender()
        // _gameGrid.initialRender();
        // _gameGrid.toggleGridLines();
        return {
            getTiles: _gameGrid.getTiles,
            markTile: _gameGrid.markTile,
            toggleGridLines: _gameGrid.toggleGridLines,
        }
    })();
    //CONTROLLER
    const SubPub = SubscriberPublisherController();
    const Subscription = SubPub.subscription;
    const Publish = SubPub.publish;
    const EventsList = {
        tileMarked: 'tileMarked',
        toggleCurrentPlayer: 'toggleCurrentPlayer'
    }
    SubPub.subscriberWrapper(model);
    SubPub.subscriberWrapper(view);
    model.subscribe(
        new Subscription(EventsList.tileMarked, model.setTile, 0),
        new Subscription(EventsList.toggleCurrentPlayer, model.toggleCurrentPlayer, 0)
    )
    view.subscribe(
        new Subscription(EventsList.tileMarked, view.markTile, 1),
    )
    view.getTiles().forEach(tile => {
        tile.addEventListener('click', ()=>{
            const {x,y} = {...tile.dataset};
            if(model.getTile({location: [x,y]}) === null){
                Publish(
                    EventsList.tileMarked, 
                    {location: [x,y], val: model.getCurrentPlayer().team}
                );
                Publish(
                    EventsList.toggleCurrentPlayer
                )
            }
        })
    })
    return {};
})()

window.App = App;