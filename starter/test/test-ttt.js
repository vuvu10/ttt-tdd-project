const TTT = require('../class/ttt');

test('TTT.checkWin should return the correct winner', () => {
  const grid = [
    ['X', 'X', 'X'],
    ['O', 'O', ' '],
    [' ', ' ', ' ']
  ];
  expect(TTT.checkWin(grid)).toBe('X');
});

test('TTT.checkWin should return false if there is no winner', () => {
  const grid = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['O', 'X', 'O']
  ];
  expect(TTT.checkWin(grid)).toBe('T');
});

test('TTT.checkWin should return "T" if the game is a tie', () => {
  const grid = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['O', 'X', 'O']
  ];
  expect(TTT.checkWin(grid)).toBe('T');
});
