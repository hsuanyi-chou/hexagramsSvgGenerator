import GuaGenerator from '../index';

const GUA_GENERATOR = new GuaGenerator();

test('產生命卦', () => {
  const date = new Date('2021-05-27T11:20:00.000');

  const res = GUA_GENERATOR.buildFateGua(date);
  expect(res.fullGua.genGuaBase.date).toBe(date);
  expect(res.fullGua.getChineseLunarDate()).toBe('辛丑 年 癸巳 月 乙亥 日 午 時')
  expect(res.fullGua.void).toEqual(['申', '酉']);
  expect(res.fullGua.name).toBe('地雷復之坤');
});

test('批量產生命卦', () => {
  const beginDate = new Date('2022-08-02T11:20:00.000');
  const endDate = new Date('2022-08-05T11:20:00.000');
  const res = GUA_GENERATOR.buildBatchFateGua(beginDate, endDate);
  expect(res.length).toEqual(4);

});

test('產生卦象', () => {
  const date = new Date('1990-06-25T11:20:00.000');
  const res = GUA_GENERATOR.buildGua('火', '風', [1], date);

  expect(res.fullGua.genGuaBase.date).toBe(date);
  expect(res.fullGua.getChineseLunarDate()).toBe('庚午 年 壬午 月 辛酉 日 午 時')
  expect(res.fullGua.void).toEqual(['子', '丑']);
  expect(res.fullGua.name).toBe('火風鼎之大有');
});

test('時間取卦，傳入非6碼或非14碼數字', () => {
  const time = '12345';
  try {
    GUA_GENERATOR.buildGuaByTime(time);
  } catch(e: any) {
    expect(e.message).toEqual('傳入時間錯誤！僅支援6碼時分秒(HHmmss)或年月日時分秒(YYYYMMDDHHmmss)');
  }
});

test('時間取卦，傳入帶:的時間', () => {
  const time = '12:34:56';
  try {
    GUA_GENERATOR.buildGuaByTime(time);
  } catch(e: any) {
    expect(e.message).toEqual('僅能傳入純數字時間');
  }
});

test('時間取卦(時分秒)', () => {
  const time = '134521';
  const res = GUA_GENERATOR.buildGuaByTime(time);
  const expectedDate = new Date(new Date().setHours(13, 45, 21)).toLocaleString('zh-TW');

  expect(res.fullGua.genGuaBase.date!.toLocaleString('zh-TW')).toBe(expectedDate);
  expect(res.fullGua.name).toBe('坤為地之豫');
});

test('時間取卦(年月日時分秒)', () => {
  const time = '20220226134521';
  const res = GUA_GENERATOR.buildGuaByTime(time);

  expect(res.fullGua.genGuaBase.date!.toLocaleString('zh-TW')).toBe('2022/2/26 下午1:45:21');
  expect(res.fullGua.getChineseLunarDate()).toBe('壬寅 年 壬寅 月 庚戌 日 未 時')
  expect(res.fullGua.name).toBe('坤為地之豫');
});

test('時間取卦(年月日時分秒)，當時分秒有0時，轉換數字會變成單一的0', () => {
  const time = '19900625120000';
  const res = GUA_GENERATOR.buildGuaByTime(time);
  expect(res.fullGua.genGuaBase.date!.toLocaleString('zh-TW')).toBe('1990/6/25 下午12:00:00');
  expect(res.fullGua.getChineseLunarDate()).toBe('庚午 年 壬午 月 辛酉 日 午 時')
  expect(res.fullGua.name).toBe('地火明夷之復');
});

test('時間取卦(年月日時分秒)，當整除0時，會傳入動0爻', () => {
  const time = '20220124170301';
  const res = GUA_GENERATOR.buildGuaByTime(time);
  expect(res.fullGua.genGuaBase.date!.toLocaleString('zh-TW')).toBe('2022/1/24 下午5:03:01');
  expect(res.fullGua.getChineseLunarDate()).toBe('辛丑 年 辛丑 月 丁丑 日 酉 時')
  expect(res.fullGua.name).toBe('雷地豫之晉');
});

describe('金錢卦(含圖)', () => {
  test('一秒產卦', () => {
    const res = GUA_GENERATOR.instantBuildMoneyGua();
    expect(res).toBeTruthy();
  });

  test('手動搖卦以產金錢卦', () => {
    GUA_GENERATOR.resetMoneyGua();
    for (let i = 0; i < 6; i++) {
      GUA_GENERATOR.shakeMoneyGua();
    }
    const res = GUA_GENERATOR.buildMoneyGua();
    expect(res).toBeTruthy();
  });

});
