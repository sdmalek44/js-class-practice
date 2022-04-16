const assert = require('chai').assert;
const ChessPlayer = require('../src/chess-player');

describe('ChessPlayer', function() {
  it.skip('should be a function', function() {
    assert.isFunction(ChessPlayer);
  });

  it.skip('should instantiate a chess player', function() {
    const player = new ChessPlayer({});
    assert.isObject(player);
  });

  it.skip('should have a name, age, wins, country, and funds', function() {
    const player = new ChessPlayer({ name: 'Beth Harmon', age: 15, wins: 0, funds: 20.0, country: 'USA' });

    assert.equal(player.name, 'Beth Harmon');
    assert.equal(player.age, 15);
    assert.equal(player.wins, 0);
    assert.equal(player.funds, 20.0);
    assert.equal(player.country, 'USA');
  });
})
