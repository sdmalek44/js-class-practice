const assert = require('chai').assert;
const Viking = require('../exercises/viking');

describe('Viking', function() {
  it.skip('should be a function', function() {
    assert.isFunction(Viking);
  });

  it.skip('should instantiate a viking', function() {
    const viking = new Viking();
    assert.isObject(viking);
  });

  it.skip('should have a name', function() {
    const viking = new Viking('Ragnar', 'Lothbrok');

    assert.equal(viking.name, 'Ragnar Lothbrok');
    assert.equal(viking.firstName, 'Ragnar');
    assert.equal(viking.lastName, 'Lothbrok');
  });

  it.skip('should have a default home of unknown', function() {
    const viking = new Viking('Bjorn', 'Lothbrok');

    assert.equal(viking.name, 'Bjorn Lothbrok');
    assert.equal(viking.home, 'Unknown');
  });

  it.skip('should be able to have other homes', function() {
    const details = { home: 'Hedeby' }
    const viking = new Viking('Lagertha', 'Lothbrok', details);

    assert.equal(viking.home, 'Hedeby');
  });

  it.skip('should be able to have a gender', function() {
    const details1 = { home: 'Kattegat', gender: 'male' }
    const viking1 = new Viking('Floki', 'Vilgerðarson', details1);

    const details2 = { home: 'Kattegat', gender: 'female' }
    const viking2 = new Viking('Helga', 'Vilgerðarson', details2)

    assert.equal(viking1.gender, 'male');
    assert.equal(viking2.gender, 'female');
  });

  it.skip('should default to a male child with age of zero', function() {
    const viking = new Viking('Bjorn', 'Lothbrok');

    assert.equal(viking.name, 'Bjorn Lothbrok');
    assert.equal(viking.gender, 'male');
    assert.equal(viking.age, 0)
    assert.equal(viking.child, true)
  });

  it.skip('should be able to have a birthday', function() {
    const viking = new Viking('Bjorn', 'Lothbrok');

    assert.equal(viking.age, 0)

    viking.happyBirthday()

    assert.equal(viking.age, 1)
  });

  function fastForwardAge(viking, years) {
    for (var i = 0; i < years; i++) {
      viking.happyBirthday()
    }
  }

  it.skip('should not have an arm ring by default', function() {
    const viking = new Viking('Bjorn', 'Lothbrok');

    assert.equal(viking.hasArmRing, false);
  });

  it.skip('should be able to receive an arm ring at age 10', function() {
    const viking = new Viking('Bjorn', 'Lothbrok');

    fastForwardAge(viking, 10)

    const result = viking.receiveArmRing()

    assert.equal(result, 'Received arm ring')
    assert.equal(viking.hasArmRing, true);
  });

  it.skip('should not be able to receive arm ring unless male', function() {
    const details = { gender: 'female' }
    const viking = new Viking('Porunn', 'Lothbrok', details);

    fastForwardAge(viking, 18)

    const result = viking.receiveArmRing()

    assert.equal(result, 'Sorry, you can\'t have it')
    assert.equal(viking.hasArmRing, false);
  });

  it.skip('should not be able to receive arm ring when under 10', function() {
    const viking = new Viking('Bjorn', 'Lothbrok');

    fastForwardAge(viking, 9)

    const result = viking.receiveArmRing()

    assert.equal(result, 'Sorry, you can\'t have it')
    assert.equal(viking.hasArmRing, false);
  })

  it.skip('should be able to set an initial age', function() {
    const details = { age: 20 }
    const viking = new Viking('Bjorn', 'Lothbrok', details);

    assert.equal(viking.age, 20);
  })

  it.skip('should not be a child if inital age is greater than 10', function() {
    const details = { age: 20 }
    const viking = new Viking('Bjorn', 'Lothbrok', details);

    assert.equal(viking.child, false);
  })

  it.skip('should be able to add a role', function() {
    const viking = new Viking('Floki', 'Vilgerðarson');

    assert.deepEqual(viking.roles, []);

    viking.addRole('boat builder')

    assert.deepEqual(viking.roles, ['boat builder']);
  });

  it.skip('should be able to have multiple roles', function() {
    const viking = new Viking('Aslaug', 'Lothbrok');

    assert.deepEqual(viking.roles, []);

    viking.addRole('wife')
    viking.addRole('mother')

    assert.deepEqual(viking.roles, ['wife', 'mother']);
  });

  it.skip('should be able to add a lover', function() {
    const details1 = { age: 25, gender: 'male' }
    const details2 = { age: 25, gender: 'female' }
    const viking = new Viking('Ragnar', 'Lothbrok', details1);
    const lover = new Viking('Lagertha', 'Lothbrok', details2);

    viking.addLover(lover)

    assert.deepEqual(viking.lovers, [lover]);
  });

  it.skip('should be able to more than one lover', function() {
    const details1 = { age: 30, gender: 'male' }
    const viking = new Viking('Ragnar', 'Lothbrok', details1);

    const details2 = { age: 25, gender: 'female' }
    const lover1 = new Viking('Lagertha', 'Lothbrok', details2);
    const lover2 = new Viking('Aslaug', 'Lothbrok', details2);

    viking.addLover(lover1)
    viking.addLover(lover2)

    assert.deepEqual(viking.lovers, [lover1, lover2]);
  });

  it.skip('should be able to remove a lover based on first name', function() {
    const details1 = { age: 35, gender: 'male' }
    const viking = new Viking('Ragnar', 'Lothbrok', details1);

    const details2 = { age: 30, gender: 'female' }
    const lover1 = new Viking('Lagertha', 'Lothbrok', details2);
    const lover2 = new Viking('Aslaug', 'Lothbrok', details2);
    const lover3 = new Viking('Yidu', 'Shanghai', details2);

    viking.addLover(lover2)
    viking.addLover(lover1)
    viking.addLover(lover3)

    assert.deepEqual(viking.lovers, [lover2, lover1, lover3]);

    viking.removeLover('Lagertha')

    assert.deepEqual(viking.lovers, [lover2, lover3]);
  });

  it.skip('should be able to retrieve all mistress names', function() {
    const details1 = { age: 35, gender: 'male' }
    const viking = new Viking('Ragnar', 'Lothbrok', details1);

    const details2 = { age: 30, gender: 'female' }
    const lover1 = new Viking('Lagertha', 'Lothbrok', details2);
    lover1.addRole('wife')
    const lover2 = new Viking('Aslaug', 'Lothbrok', details2);
    lover2.addRole('wife')
    const lover3 = new Viking('Yidu', 'Shanghai', details2);
    lover3.addRole('mistress')
    const lover4 = new Viking('Queen', 'Kwenthrith', details2);
    lover4.addRole('mistress')

    viking.addLover(lover3)
    viking.addLover(lover2)
    viking.addLover(lover1)
    viking.addLover(lover4)

    assert.deepEqual(viking.lovers, [lover3, lover2, lover1, lover4]);

    const mistressNames = viking.getMistressNames()

    assert.deepEqual(mistressNames, ['Yidu Shanghai', 'Queen Kwenthrith']);
  });
});