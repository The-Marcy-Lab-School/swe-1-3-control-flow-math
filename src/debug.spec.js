const path = require('path');
const ScoreCounter = require('score-tests');
const {
  getRandomIntInRange,
  coolnessGauge,
  funkoPopAddictionLevel,
  getWeatherReport,
  returnPositiveNegativeZero,
} = require('./debug');

const testSuiteName = 'Debug Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const log = jest.spyOn(console, 'log').mockImplementation(() => {});

describe(testSuiteName, () => {
  afterEach(jest.clearAllMocks);

  it('getRandomIntInRange - returns a random number between min and max', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.0);
    expect(getRandomIntInRange(5, 10)).toBe(5);
    expect(getRandomIntInRange(0, 1)).toBe(0);
    expect(getRandomIntInRange(100, 115)).toBe(100);

    jest.spyOn(global.Math, 'random').mockReturnValue(0.99999999999);
    expect(getRandomIntInRange(3, 117)).toBe(116);
    expect(getRandomIntInRange(0, 2)).toBe(1);
    expect(getRandomIntInRange(31, 42)).toBe(41);
    expect(getRandomIntInRange(0, 1)).toBe(0); // no possible range, just returns min
    jest.spyOn(global.Math, 'random').mockRestore();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('coolnessGauge - returns the right message based on a number', () => {
    expect(coolnessGauge(0)).toBe('You need more fridges.');
    expect(coolnessGauge(1)).toBe('You need more fridges.');
    expect(coolnessGauge(2)).toBe('You need more fridges.');
    expect(coolnessGauge(3)).toBe('You need more fridges.');
    expect(coolnessGauge(4)).toBe('You are downright chilly!');
    expect(coolnessGauge(5)).toBe('You are downright chilly!');
    expect(coolnessGauge(6)).toBe('You are downright chilly!');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('funkoPopAddictionLevel - returns the right message based on a number', () => {
    expect(funkoPopAddictionLevel(0));
    expect(log).toHaveBeenNthCalledWith(1, 'No pops? Maybe try one.');
    expect(funkoPopAddictionLevel(1));
    expect(log).toHaveBeenNthCalledWith(2, 'Only a few? Keep having fun!');
    expect(funkoPopAddictionLevel(10));
    expect(log).toHaveBeenNthCalledWith(3, 'Only a few? Keep having fun!');
    expect(funkoPopAddictionLevel(11));
    expect(log).toHaveBeenNthCalledWith(4, 'You have a problem.');
    expect(funkoPopAddictionLevel(20));
    expect(log).toHaveBeenNthCalledWith(5, 'You have a problem.');
    expect(funkoPopAddictionLevel(21));
    expect(log).toHaveBeenNthCalledWith(6, 'You need help!');
    expect(funkoPopAddictionLevel(30));
    expect(log).toHaveBeenNthCalledWith(7, 'You need help!');
    expect(funkoPopAddictionLevel(31));
    expect(log).toHaveBeenNthCalledWith(8, 'You need an intervention!!!');
    expect(funkoPopAddictionLevel(100));
    expect(log).toHaveBeenNthCalledWith(9, 'You need an intervention!!!');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('getWeatherReport - lifts scope properly', () => {
    const textContent = getWeatherReport.toString();

    expect(textContent.includes('let weatherReport')).toBeTruthy();
    expect(textContent.includes('const weatherReport')).toBeFalsy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('getWeatherReport - returns the right message based on a number', () => {
    const cold = "Wow, it's cold out.";
    const dryHeat = "At least it's a dry heat.";
    const hotGross = "It's hot and gross out.";
    const notTooBad = "It's not too bad!";
    const report = "And that's your report!";

    expect(getWeatherReport(100)).toBe(hotGross);
    expect(log).toHaveBeenNthCalledWith(1, hotGross);
    expect(log).toHaveBeenNthCalledWith(2, report);

    expect(getWeatherReport(31)).toBe(cold);
    expect(log).toHaveBeenNthCalledWith(3, cold);
    expect(log).toHaveBeenNthCalledWith(4, report);

    expect(getWeatherReport(71)).toBe(dryHeat);
    expect(log).toHaveBeenNthCalledWith(5, dryHeat);
    expect(log).toHaveBeenNthCalledWith(6, report);

    expect(getWeatherReport(32)).toBe(notTooBad);
    expect(log).toHaveBeenNthCalledWith(7, notTooBad);
    expect(log).toHaveBeenNthCalledWith(8, report);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('returnPositiveNegativeZero - only uses one ternary (if any)', () => {
    const textContent = returnPositiveNegativeZero.toString();
    expect(textContent.indexOf('?') === textContent.lastIndexOf('?')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('returnPositiveNegativeZero - returns the right message based on a number', () => {
    expect(returnPositiveNegativeZero(0)).toBe('Zero');
    expect(returnPositiveNegativeZero(1)).toBe('Positive');
    expect(returnPositiveNegativeZero(2)).toBe('Positive');
    expect(returnPositiveNegativeZero(-1)).toBe('Negative');
    expect(returnPositiveNegativeZero(-2)).toBe('Negative');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
