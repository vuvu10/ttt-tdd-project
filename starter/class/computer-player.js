
class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    const validMoves = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col <  3; col++) {
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
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  static getWinningMoves(grid, symbol) {

    // Your code here
    const winningMoves = [];
    const validMoves = this.getValidMoves(grid);

    for (const move of validMoves) {
      const newGrid = grid.map(row => [...row]);
      newGrid[move.row][move.col] = symbol;
      if (TTT.checkWin(newGrid) === symbol) {
        winningMoves.push(move);
      }
    }
    return winningMoves;

  }

  static getSmartMove(grid, symbol) {

    // Your code here
    const opponent = symbol === 'X' ? 'O' : 'X';

    // check for winning move
    const winningMoves = this.getWinningMoves(grid, symbol);
    if (winningMoves.length > 0) {
      return winningMoves[0];
    }

    // check for fork opportunity
    const forkMoves = this.getForkMoves(grid, symbol);
    if (forkMoves.length > 0) {
      return forkMoves[0];
    }

    // check for blocking opponent' fork
    const blockForkMoves = this.getBlockForkMoves(grid, symbol);
    if (blockForkMoves.length > 0) {
      return blockForkMoves[0]
    }
    if (grid[1][1] === ' ') {
      return { row: 1, col: 1};
    }

    // Play a corner 
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 },
    ];
    for (const corner of corners) {
      if (grid[corner.row][corner.col] === ' ') {
        return corner;
      }
    }

    // play any available move 
    return this.randomMove(grid);
  }

  static getForkMoves(grid, symbol) {
    const forkMoves = [];
    const validMoves = this.getValidMoves(grid);

    for (const move of validMoves) {
      const newGrid = grid.map(row => [...row]);
      newGrid[move.row][move.col] = symbol;
      const winningMoves = this.getWinningMoves(newGrid, symbol);
      if (winningMoves.length >= 2) {
        forkMoves.push(move);
      }
    }
    return forkMoves;
  }

  static getBlockForkMoves(grid, symbol) {
    const opponent = symbol === 'X' ? 'O' : 'X';
    const opponentForkMoves = this.getForkMoves(grid, opponent);

    if (opponentForkMoves.length === 0) {
      return [];
    }

    if (opponentForkMoves.length === 1) {
      return opponentForkMoves;
    }

    const validMoves = this.getValidMoves(grid);
    for (const move of validMoves) {
      const newGrid = grid.map(row => [...row]);
      newGrid[move.row][move.col] = symbol;
      if (this.getWinningMoves(newGrid, symbol).length === 1 && this.getForkMoves(newGrid, opponent).length === 0) {
        return [move];
      }
    }

    return [this.randomMove(grid)];
  }

}

module.exports = ComputerPlayer;
