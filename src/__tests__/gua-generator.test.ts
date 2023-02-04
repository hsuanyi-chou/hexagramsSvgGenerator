import GuaGenerator from '../index';

const GUA_GENERATOR = new GuaGenerator();
describe('產生命卦', () => {
  [
    {
      birth: new Date('2021-05-27T11:20:00.000'),
      thing: undefined,
      expectedResult: {
        date: new Date('2021-05-27T11:20:00.000'),
        lunarDate: '辛丑 年 癸巳 月 乙亥 日 午 時',
        void: ['申', '酉'],
        name: '地雷復之坤',
        thing: undefined,
      },
    },
    {
      birth: new Date('2021-05-27T11:20:00.000'),
      thing: '王小明 男命',
      expectedResult: {
        date: new Date('2021-05-27T11:20:00.000'),
        lunarDate: '辛丑 年 癸巳 月 乙亥 日 午 時',
        void: ['申', '酉'],
        name: '地雷復之坤',
        thing: '王小明 男命',
      }
    }
  ].forEach(situation => {
    test(`輸入:${situation.birth}, ${situation.thing}，產生命卦: ${situation.expectedResult.name}`, () => {
      const res = GUA_GENERATOR.buildFateGua({ date: situation.birth, thing: situation.thing });
      expect(res.fullGua.genGuaBase.date).toEqual(situation.expectedResult.date);
      expect(res.fullGua.getChineseLunarDate()).toEqual(situation.expectedResult.lunarDate);
      expect(res.fullGua.void).toEqual(situation.expectedResult.void);
      expect(res.fullGua.name).toEqual(situation.expectedResult.name);
      expect(res.fullGua.genGuaBase.thing).toEqual(situation.expectedResult.thing);
    });
  });
});

test('批量產生命卦', () => {
  const beginDate = new Date('2022-08-02T11:20:00.000');
  const endDate = new Date('2022-08-05T11:20:00.000');
  const res = GUA_GENERATOR.buildBatchFateGua({ beginDate, endDate });
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

describe('時間取卦', () => {
  test('時間取卦，傳入非14碼數字', () => {
    try {
      GUA_GENERATOR.buildGuaByTime({ time: '12345' });
    } catch(e: any) {
      expect(e.message).toEqual('傳入時間錯誤！僅支援年月日時分秒(YYYYMMDDHHmmss) 14碼數字！');
    }
  });

  test('時間取卦(年月日時分秒)', () => {
    const res = GUA_GENERATOR.buildGuaByTime({ time: '20220226134521' });
    expect(res.fullGua.genGuaBase.date!.toLocaleString('zh-TW')).toBe('2022/2/26 下午1:45:21');
    expect(res.fullGua.getChineseLunarDate()).toBe('壬寅 年 壬寅 月 庚戌 日 未 時')
    expect(res.fullGua.name).toBe('坤為地之豫');
  });

  test('時間取卦(年月日時分秒)，當時分秒有0時，轉換數字會變成單一的0', () => {
    const res = GUA_GENERATOR.buildGuaByTime({ time: '19900625120000' });
    expect(res.fullGua.genGuaBase.date!.toLocaleString('zh-TW')).toBe('1990/6/25 下午12:00:00');
    expect(res.fullGua.getChineseLunarDate()).toBe('庚午 年 壬午 月 辛酉 日 午 時')
    expect(res.fullGua.name).toBe('地火明夷之復');
  });

  test('時間取卦(年月日時分秒)，當整除0時，會傳入動0爻', () => {
    const res = GUA_GENERATOR.buildGuaByTime({ time: '20220124170301' });
    expect(res.fullGua.genGuaBase.date!.toLocaleString('zh-TW')).toBe('2022/1/24 下午5:03:01');
    expect(res.fullGua.getChineseLunarDate()).toBe('辛丑 年 辛丑 月 丁丑 日 酉 時')
    expect(res.fullGua.name).toBe('雷地豫之晉');
  });
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
