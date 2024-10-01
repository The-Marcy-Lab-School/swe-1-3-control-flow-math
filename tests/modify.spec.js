const path = require('path');
const ScoreCounter = require('score-tests'); // eslint-disable-line import/no-extraneous-dependencies
const { wildlyBiasedReview } = require('../src/modify');

const testSuiteName = 'Modify Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const log = jest.spyOn(console, 'log').mockImplementation(() => { });

describe(testSuiteName, () => {
  it('wildlyBiasedReview - uses a guard clause', () => {
    const textContent = wildlyBiasedReview.toString();

    expect(textContent.includes('return')).toBeTruthy();
    expect(textContent.includes('if')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('wildlyBiasedReview - logs the right message based on location', () => {
    wildlyBiasedReview('NYC');
    expect(log).toHaveBeenCalledTimes(3);
    expect(log).toHaveBeenNthCalledWith(1, 'THE GREATEST CITY IN THE WORLD');
    expect(log).toHaveBeenNthCalledWith(2, 'THE CITY THAT NEVER SLEEPS');
    expect(log).toHaveBeenNthCalledWith(3, 'WOW WHAT A CITY');
    jest.clearAllMocks();
    wildlyBiasedReview('LA');
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith('Yea that place is cool I guess');
    jest.clearAllMocks();

    wildlyBiasedReview(`place_${Math.random()}`);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith('Yea that place is cool I guess');
    jest.clearAllMocks();

    // only included to prevent automatically passing test
    // would not see this section copied in real world
    const textContent = wildlyBiasedReview.toString();
    expect(textContent.includes('return')).toBeTruthy();
    expect(textContent.includes('if')).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
