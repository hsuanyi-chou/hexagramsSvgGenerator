import GuaGenerator from '../index';

let GUA_GENERATOR: GuaGenerator;
beforeAll(() => GUA_GENERATOR = new GuaGenerator());

test('產生命卦', () => {
  const date = new Date('2021-05-27T11:20:00.000');

  const res = GUA_GENERATOR.buildFateGua(date);
  expect(res.fullGua.void).toEqual(['申', '酉']);
  expect(res.fullGua.name).toBe('地雷復之坤');
});

test('產生卦象', () => {
  const date = new Date('1990-06-25T11:20:00.000');
  const res = GUA_GENERATOR.buildGua('火', '風', [1], date);
  expect(res.fullGua.void).toEqual(['子', '丑']);
  expect(res.fullGua.name).toBe('火風鼎之大有');
});