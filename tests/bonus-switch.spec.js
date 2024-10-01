const {
  measureRainSwitch,
  rounderSwitch,
} = require('../src/bonus-switch');

// mock console.log with jest mock function
const log = jest.spyOn(console, 'log').mockImplementation(() => { });

describe('Bonus tests - No Scores', () => {
  afterEach(jest.clearAllMocks);

  it('measureRainSwitch - logs the right message based on rain amount', () => {
    measureRainSwitch(0);
    expect(log).toHaveBeenNthCalledWith(1, 'drought');
    measureRainSwitch(1);
    expect(log).toHaveBeenNthCalledWith(2, 'dry');
    measureRainSwitch(2);
    expect(log).toHaveBeenNthCalledWith(3, 'average');
    measureRainSwitch(3);
    expect(log).toHaveBeenNthCalledWith(4, 'average');
    measureRainSwitch(4);
    expect(log).toHaveBeenNthCalledWith(5, 'rainy');
    measureRainSwitch(5);
    expect(log).toHaveBeenNthCalledWith(6, 'rainy');
    measureRainSwitch(6);
    expect(log).toHaveBeenNthCalledWith(7, 'flood');
    measureRainSwitch(7);
    expect(log).toHaveBeenNthCalledWith(8, 'flood');
    measureRainSwitch(10);
    expect(log).toHaveBeenNthCalledWith(9, 'flood');
  });

  it('rounder - returns the right number based on rounding setting', () => {
    expect(rounderSwitch(1.0, 'up')).toBe(1);
    expect(rounderSwitch(1.1, 'up')).toBe(2);
    expect(rounderSwitch(3.9, 'up')).toBe(4);
    expect(rounderSwitch(1.9, 'down')).toBe(1);
    expect(rounderSwitch(5.0, 'down')).toBe(5);
    expect(rounderSwitch(5.1, 'down')).toBe(5);
    expect(rounderSwitch(1.9, 'honest')).toBe(2);
    expect(rounderSwitch(1.5, 'honest')).toBe(2);
    expect(rounderSwitch(1.4, 'honest')).toBe(1);
    expect(rounderSwitch(1.0, 'honest')).toBe(1);
  });
});
