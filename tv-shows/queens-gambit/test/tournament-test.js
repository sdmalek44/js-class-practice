const assert = require('chai').assert;
const Tournament = require('../src/tournament');
const ChessPlayer = require('../src/chess-player');

describe('Tournament', function() {
  it.skip('should be a function', function() {
    assert.isFunction(Tournament);
  });

  it.skip('should instantiate a tournament', function() {
    const tournament = new Tournament({});
    assert.isObject(tournament);
  });

  it.skip('should have a name, entry fee, prize, and players', function() {
    const player1 = new ChessPlayer({ name: 'Beth Harmon', age: 15, wins: 0, funds: 25.0, country: 'USA' });
    const player2 = new ChessPlayer({ name: 'D.L. Townes', age: 19, wins: 3, funds: 100.0, country: 'Russia' });
    const player3 = new ChessPlayer({ name: 'Harry Beltic', age: 18, wins: 5, funds: 140.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Kentucky State Championship',
      entryFee: 25.0,
      prize: 100.0,
      players: [player1, player2, player3]
    });

    assert.equal(tournament.name, 'Kentucky State Championship');
    assert.equal(tournament.entryFee, 25.0);
    assert.equal(tournament.prize, 100.0);
    assert.deepEqual(tournament.players, [player1, player2, player3]);
  });

  it.skip('should be able to greet each player by name', function() {
    const player1 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 6, funds: 25.0, country: 'USA' });
    const player2 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 100.0, country: 'Russia' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 56, funds: 140.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Ohio U.S. Championship',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    var greetings = tournament.greetPlayers();

    assert.equal(greetings, "Welcome Beth Harmon. Welcome IM R. Uljanov. Welcome Vasily Borgov.");
  });

  it.skip('should be able to return all players above the age of 21', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 50.0, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 6, funds: 25.0, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 56, funds: 135.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Ohio U.S. Championship',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    var malePlayers = tournament.aboveDrinkingAge();

    assert.deepEqual(malePlayers, ['IM R. Uljanov', 'Vasily Borgov']);
  });

  it.skip('should be able to return all players who are from Russia', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 50.0, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 6, funds: 25.0, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Georgi Girev', age: 13, wins: 13, funds: 45.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Ohio U.S. Championship',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    var malePlayers = tournament.fromRussia();

    assert.deepEqual(malePlayers, ['IM R. Uljanov', 'Georgi Girev']);
  });

  it.skip('should be able to calculate the total past tournament wins of all players in tournament', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 10, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 55, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Moscow Invitational',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    var playerWins = tournament.totalPlayerWins();

    assert.equal(playerWins, 100)
  });

  it.skip('should be able to charge entry fee to players', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 75.0, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 10, funds: 50.0, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 55, funds: 140.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Moscow Invitational',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    tournament.chargeEntryFees();

    assert.equal(player1.funds, 25.0);
    assert.equal(player2.funds, 0.0);
    assert.equal(player3.funds, 90.0);
  });

  it.skip('should be able to declare a tournament winner', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 25.0, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 10, funds: 0.0, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 55, funds: 90.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Moscow Invitational',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    assert.equal(player1.funds, 25.0);
    assert.equal(player2.funds, 0.0);
    assert.equal(player3.funds, 90.0);

    var result = tournament.declareWinner('Beth Harmon');

    assert.equal(player1.funds, 25.0);
    assert.equal(player2.funds, 500.0);
    assert.equal(player3.funds, 90.0);

    assert.equal(result, 'And the winner is Beth Harmon from USA!');
  });

  it.skip('should be able to declare a different tournament winner', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 25.0, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 10, funds: 0.0, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 55, funds: 90.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Moscow Invitational',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    assert.equal(player1.funds, 25.0);
    assert.equal(player2.funds, 0.0);
    assert.equal(player3.funds, 90.0);

    var result = tournament.declareWinner('Vasily Borgov');

    assert.equal(player1.funds, 25.0);
    assert.equal(player2.funds, 0.0);
    assert.equal(player3.funds, 590.0);

    assert.equal(result, 'And the winner is Vasily Borgov from Russia!');
  });

  it.skip('should add a win to the tournament winners record', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 25.0, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 10, funds: 0.0, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 55, funds: 90.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Moscow Invitational',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    assert.equal(player1.wins, 35);
    assert.equal(player2.wins, 10);
    assert.equal(player3.wins, 55);

    var result = tournament.declareWinner('Beth Harmon');

    assert.equal(player1.wins, 35);
    assert.equal(player2.wins, 11);
    assert.equal(player3.wins, 55);
  });

  it.skip('should add a win to the different tournament winners record', function() {
    const player1 = new ChessPlayer({ name: 'IM R. Uljanov', age: 38, wins: 35, funds: 25.0, country: 'Russia' });
    const player2 = new ChessPlayer({ name: 'Beth Harmon', age: 18, wins: 10, funds: 0.0, country: 'USA' });
    const player3 = new ChessPlayer({ name: 'Vasily Borgov', age: 45, wins: 55, funds: 90.0, country: 'Russia' });

    const tournament = new Tournament({
      name: 'Moscow Invitational',
      entryFee: 50.0,
      prize: 500.0,
      players: [player1, player2, player3]
    });

    assert.equal(player1.wins, 35);
    assert.equal(player2.wins, 10);
    assert.equal(player3.wins, 55);

    var result = tournament.declareWinner('Vasily Borgov');

    assert.equal(player1.wins, 35);
    assert.equal(player2.wins, 10);
    assert.equal(player3.wins, 56);
  });
});
