import GuaGenerator from '../index';

let GUA_GENERATOR: GuaGenerator;

beforeAll(() => {
  GUA_GENERATOR = new GuaGenerator();
});

test('產生命卦', () => {
  const date = new Date('2021-05-27T11:20:00.000');

  const res = GUA_GENERATOR.buildFateGua(date);
  expect(res.fullGua.inputDate).toBe(date);
  expect(res.fullGua.getChineseLunarDate()).toBe('辛丑 年 癸巳 月 乙亥 日 午 時')
  expect(res.fullGua.void).toEqual(['申', '酉']);
  expect(res.fullGua.name).toBe('地雷復之坤');
});

test('產生卦象', () => {
  const date = new Date('1990-06-25T11:20:00.000');
  const res = GUA_GENERATOR.buildGua('火', '風', [1], date);
  expect(res.fullGua.inputDate).toBe(date);
  expect(res.fullGua.getChineseLunarDate()).toBe('庚午 年 壬午 月 辛酉 日 午 時')
  expect(res.fullGua.void).toEqual(['子', '丑']);
  expect(res.fullGua.name).toBe('火風鼎之大有');
});

test('時間取卦，傳入非6碼或非14碼數字', () => {
  const time = '12345';
  try {
    GUA_GENERATOR.buildGuaByTime(time);
  } catch(e) {
    expect(e.message).toEqual('傳入時間錯誤！僅支援6碼時分秒(HHmmss)或年月日時分秒(YYYYMMDDHHmmss)');
  }
});

test('時間取卦，傳入帶:的時間', () => {
  const time = '12:34:56';
  try {
    GUA_GENERATOR.buildGuaByTime(time);
  } catch(e) {
    expect(e.message).toEqual('僅能傳入純數字時間');
  }
});

test('時間取卦(時分秒)', () => {
  const time = '134521';
  const res = GUA_GENERATOR.buildGuaByTime(time);
  expect(res.fullGua.name).toBe('坤為地之豫');
});

test('時間取卦(年月日時分秒)', () => {
  const time = '20220226134521';
  const res = GUA_GENERATOR.buildGuaByTime(time);

  expect(res.fullGua.getChineseLunarDate()).toBe('壬寅 年 壬寅 月 庚戌 日 未 時')
  expect(res.fullGua.name).toBe('坤為地之豫');
});