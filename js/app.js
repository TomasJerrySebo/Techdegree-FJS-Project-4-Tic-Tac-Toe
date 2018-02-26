window.TicTacToe = {
    app: document.getElementById('app'),
    rowSize: 3,
    grid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    playerOnTurn: 1,
    currentTurn: 1,
    winningCombinations: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],
    players: [[], []],
    gameFinished: false,
    init: () => {
        TicTacToe.loadStartScreen();
    },
    loadStartScreen: () => {
        this.app.innerHTML = `
            <div class="screen screen-start" id="start">
              <header>
                <h1>Tic Tac Toe</h1>
                <a href="#" class="button" onclick="TicTacToe.loadGame(TicTacToe.playerOnTurn)">Start game</a>
              </header>
            </div>`;
    },
    loadGame: (playerToStart) => {
        console.log(TicTacToe);

        // mapping the html content and the li elements
        this.app.innerHTML = `
           <div class="board" id="board">
              <header>
                <h1>Tic Tac Toe</h1>
                <ul>
                  <li class="players player1" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
                  <li class="players player2" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
                </ul>
              </header>
              <ul class="boxes">
                ${TicTacToe.grid.map(key => `<li data-key="${key}" class="box" onclick="TicTacToe.playGame(this)" onmouseover="TicTacToe.playerHoverEffectEnter(this)" onmouseout="TicTacToe.playerHoverEffectEnter(this)"></li>`).join('')}
              </ul>
            </div>
            `;
        // set Active Player
        document.getElementById('player' + playerToStart).classList.add('active');
    },

    playGame: (li) => {
        if (!li.classList.contains('box-filled-1') && !li.classList.contains('box-filled-2')) {
            li.classList.add('box-filled-' + TicTacToe.playerOnTurn);
            TicTacToe.setPlayerClickedValues(li);
            TicTacToe.incrementTurn();
            // if it's not the last round switch player
             TicTacToe.switchPlayer();
        }
    },
    switchPlayer: () => {
        // check if it's not game over/ if div exists and swapp active players
        if(document.getElementById('player' + TicTacToe.playerOnTurn)) {
            document.getElementById('player' + TicTacToe.playerOnTurn).classList.remove('active');
            TicTacToe.playerOnTurn = (TicTacToe.playerOnTurn == 1) ? 2 : 1;
            document.getElementById('player' + TicTacToe.playerOnTurn).classList.add('active');
        }
    },
    incrementTurn: () => {
        if (TicTacToe.currentTurn >= 5) TicTacToe.checkForGameOver();
        TicTacToe.currentTurn++;
        if (TicTacToe.currentTurn == 10) TicTacToe.loadEndScreen('tie');
            },
    setPlayerClickedValues: (key) => {
        TicTacToe.players[TicTacToe.playerOnTurn - 1].push(key.dataset.key);
    },
    checkForGameOver: () => {
        // setting the selected and winning combination variables


        let winningCombinations = TicTacToe.winningCombinations;
        let selected = TicTacToe.players[TicTacToe.playerOnTurn - 1];


        for (let winArr of winningCombinations) {
            let matches = 0;
            for (let winVal of winArr) {
                if (selected.includes(winVal.toString())) matches++;
            }
            if (matches == 3) { let result = (TicTacToe.playerOnTurn == 1) ? 'one':'two'; TicTacToe.loadEndScreen(result); }

        }


    },
    loadEndScreen: (result) => {
        TicTacToe.gameFinished = true;
        let msg = (result == "tie") ? "It's a draw" : "Winner";
        this.app.innerHTML = `
            <div class="screen screen-win screen-win-${result}" id="finish">
                <header>
                    <h1>Tic Tac Toe</h1>
                    <p class="message">${msg}</p>
                    <a href="#" class="button" onclick="TicTacToe.restartGame()">New game</a>
                </header>
            </div>`;

    },
    playerHoverEffectEnter: (li) => {
        // check if box is active if so not adding hover effect anymore
        if (!li.classList.contains('box-filled-1') && !li.classList.contains('box-filled-2')) {
            // adding hover effect to box by setting special className player-1-hover or player-2-hover and setting the backgroud image with css in styles.css
            li.classList.toggle('player-' + TicTacToe.playerOnTurn + '-hover');
        }
    },
    restartGame: () => {
            TicTacToe.playerOnTurn = 1;
            TicTacToe.currentTurn = 1;
            TicTacToe.players = [[], []];
            TicTacToe.loadGame(TicTacToe.playerOnTurn);
    }

};
TicTacToe.init();