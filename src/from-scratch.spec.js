const path = require('path');
const ScoreCounter = require('score-tests');
const {
  measureRain,
  happyBirthdayPet,
  funTypes,
  rounder,
  fizzBuzzish,
} = require('./from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

// mock console.log with jest mock function
const log = jest.spyOn(console, 'log').mockImplementation(() => {});

describe(testSuiteName, () => {
  afterEach(jest.clearAllMocks);

  it('measureRain - logs the right message based on rain amount', () => {
    // We're logging, so one (less optimal) way is to reset our mock function with each call
    // so we always know the latest function call's arguments
    measureRain(0);
    expect(log).toHaveBeenCalledWith('drought');
    jest.clearAllMocks();
    measureRain(1);
    expect(log).toHaveBeenCalledWith('dry');
    jest.clearAllMocks();
    measureRain(2);
    expect(log).toHaveBeenCalledWith('average');
    jest.clearAllMocks();
    measureRain(3);
    expect(log).toHaveBeenCalledWith('average');
    jest.clearAllMocks();
    measureRain(4);
    expect(log).toHaveBeenCalledWith('rainy');
    jest.clearAllMocks();
    measureRain(5);
    expect(log).toHaveBeenCalledWith('rainy');
    jest.clearAllMocks();
    measureRain(6);
    expect(log).toHaveBeenCalledWith('flood');
    jest.clearAllMocks();
    measureRain(7);
    expect(log).toHaveBeenCalledWith('flood');
    jest.clearAllMocks();
    measureRain(10);
    expect(log).toHaveBeenCalledWith('flood');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('happyBirthdayPet - logs the right message based on breed and age', () => {
    const snake = 'snake'; // these string constants prevent typos
    const cat = 'cat';
    const dog = 'dog';

    // A much better way to test multiple mocks is keep track of the
    // number of calls, and check the arguments of each call directly
    // A little more thinking, but a much cleaner test
    happyBirthdayPet(snake, 0);
    expect(log).toHaveBeenNthCalledWith(1, 'Hiss hiss!');
    happyBirthdayPet(snake, 4);
    expect(log).toHaveBeenNthCalledWith(2, 'Hiss hiss!');
    happyBirthdayPet(cat, 2);
    expect(log).toHaveBeenNthCalledWith(3, 'Mew mew!');
    happyBirthdayPet(cat, 5);
    expect(log).toHaveBeenNthCalledWith(4, 'Meow meow!');
    happyBirthdayPet(cat, 10);
    expect(log).toHaveBeenNthCalledWith(5, 'Meow meow!');
    happyBirthdayPet(dog, 4);
    expect(log).toHaveBeenNthCalledWith(6, 'Arf arf!');
    happyBirthdayPet(dog, 5);
    expect(log).toHaveBeenNthCalledWith(7, 'Woof woof!');
    happyBirthdayPet(dog, 9);
    expect(log).toHaveBeenNthCalledWith(8, 'Woof woof!');
    happyBirthdayPet(dog, 10);
    expect(log).toHaveBeenNthCalledWith(9, 'Boof!');
    happyBirthdayPet(dog, 11);
    expect(log).toHaveBeenNthCalledWith(10, 'Boof!');
    happyBirthdayPet('bird', 1);
    expect(log).toHaveBeenNthCalledWith(11, 'Happy birthday!');
    happyBirthdayPet('racoon', 5);
    expect(log).toHaveBeenNthCalledWith(12, 'Happy birthday!');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('funTypes - logs the right message based on type', () => {
    funTypes('string');
    expect(log).toHaveBeenNthCalledWith(1, "That's just some text.");
    funTypes('');
    expect(log).toHaveBeenNthCalledWith(2, "That's just some text.");
    funTypes(1);
    expect(log).toHaveBeenNthCalledWith(3, "That's a good number.");
    funTypes(0);
    expect(log).toHaveBeenNthCalledWith(4, "That's a good number.");
    funTypes(true);
    expect(log).toHaveBeenNthCalledWith(5, 'To bool, or not to bool?');
    funTypes(false);
    expect(log).toHaveBeenNthCalledWith(6, 'To bool, or not to bool?');
    funTypes(undefined);
    expect(log).toHaveBeenNthCalledWith(7, "Nothing, but I didn't set that.");
    funTypes(null);
    expect(log).toHaveBeenNthCalledWith(8, 'Nothing, and I did set that.');
    funTypes({});
    expect(log).toHaveBeenNthCalledWith(9, 'Anybody got the key?');
    funTypes([]);
    expect(log).toHaveBeenNthCalledWith(10, 'I order you to indexed.');
    funTypes(NaN);
    expect(log).toHaveBeenNthCalledWith(11, "Well, now you're just showing off.");

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('rounder - returns the right number based on rounding setting', () => {
    expect(rounder(1.0, 'up')).toBe(1);
    expect(rounder(1.1, 'up')).toBe(2);
    expect(rounder(3.9, 'up')).toBe(4);
    expect(rounder(1.9, 'down')).toBe(1);
    expect(rounder(5.0, 'down')).toBe(5);
    expect(rounder(5.1, 'down')).toBe(5);
    expect(rounder(1.9, 'honest')).toBe(2);
    expect(rounder(1.5, 'honest')).toBe(2);
    expect(rounder(1.4, 'honest')).toBe(1);
    expect(rounder(1.0, 'honest')).toBe(1);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('fizzBuzzish - logs the right message based on the number', () => {
    fizzBuzzish(1);
    expect(log).toHaveBeenNthCalledWith(1, 1);
    fizzBuzzish(2);
    expect(log).toHaveBeenNthCalledWith(2, 2);
    fizzBuzzish(3);
    expect(log).toHaveBeenNthCalledWith(3, 'fizz');
    fizzBuzzish(4);
    expect(log).toHaveBeenNthCalledWith(4, 4);
    fizzBuzzish(5);
    expect(log).toHaveBeenNthCalledWith(5, 'buzz');
    fizzBuzzish(10);
    expect(log).toHaveBeenNthCalledWith(6, 'buzz');
    fizzBuzzish(12);
    expect(log).toHaveBeenNthCalledWith(7, 'fizz');
    fizzBuzzish(15);
    expect(log).toHaveBeenNthCalledWith(8, 'fizzBuzz!');
    fizzBuzzish(30);
    expect(log).toHaveBeenNthCalledWith(9, 'fizzBuzz!');
    fizzBuzzish(31);
    expect(log).toHaveBeenNthCalledWith(10, 31);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
