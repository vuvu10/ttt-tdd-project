
class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    const validMoves = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col <  grid[row].length; col++) {
        if (grid[row][col] === ' ') {
          validMoves.push({row, col});
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid) {

    // Your code here
    const validMoves = this.getValidMoves(grid);
    const randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];
  }

  static getWinningMoves(grid, symbol) {

    // Your code here
    const winningMoves = [];
    const lines = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      const cells = [grid[a[0]][a[1]], grid[b[0]][b[1]], grid[c[0]][c[1]]];
      const count = cells.filter(cell => cell === symbol).length;
      const empty = cells.indexOf(' ');

      if (count === 2 && empty !== -1) {
        winningMoves.push({row: line[empty][0], col: line[empty][1]});
      }
    }

    return winningMoves;

  }

  static getSmartMove(grid, symbol) {

    // Your code here
      const bestMove = this.minimax(grid, symbol, symbol);
      return bestMove;
    }
  
    static minimax(grid, player, aiPlayer, depth = 0) {
      const opponent = player === 'X' ? 'O' : 'X';
      const availableMoves = this.getValidMoves(grid);
  
      // Check for terminal states
      const winner = TTT.checkWin(grid);
      if (winner === aiPlayer) return { score: 10 - depth };
      if (winner === opponent) return { score: depth - 10 };
      if (winner === 'T') return { score: 0 };
      if (availableMoves.length === 0) return { score: 0 };
  
      const moves = [];
  
      for (let move of availableMoves) {
        const newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[move.row][move.col] = player;
  
        const result = this.minimax(newGrid, opponent, aiPlayer, depth + 1);
        moves.push({ move, score: result.score });
      }
  
      if (player === aiPlayer) {
        const bestMove = moves.reduce((best, move) => move.score > best.score ? move : best);
        return depth === 0 ? bestMove.move : bestMove;
      } else {
        const bestMove = moves.reduce((best, move) => move.score < best.score ? move : best);
        return bestMove;
      }
    }

}

module.exports = ComputerPlayer;
