import { FullGuaFactory } from '../full-gua-factory';
import { Gua } from '../gua.interface';

const FULL_GUA_FACTORY = new FullGuaFactory();

describe('數字轉成卦', () => {
    const guaText = ['地', '天', '澤', '火', '雷', '風', '水', '山'];
    const testSituation = [];
    for (let i = 0; i <= 100; i++) {
        testSituation.push({digit: i, expectedResult: guaText[i % 8]});
    }
    testSituation.forEach(testCase => {
        test(`將 ${testCase.digit} 轉換成 ${testCase.expectedResult}`, () => {
            expect(FULL_GUA_FACTORY.transDigitToGua(testCase.digit)).toBe(testCase.expectedResult);
        });
    })
});

describe('產生命卦', () => {
    [
        {
        date: new Date('1990-06-25T11:20:00.000'),
        expectedResult: {
            guaName: '火風鼎之大有',
            LunarDate: '庚午 年 壬午 月 辛酉 日 午 時'
            }
        },
        {
            date: new Date('2022-02-27T10:20:00.000'),
            expectedResult: {
                guaName: '火天大有之大壯',
                LunarDate: '壬寅 年 壬寅 月 辛亥 日 巳 時'
            }
        },
        {
            date: new Date('2022-02-27T23:20:00.000'), // 23:00 後換日的case
            expectedResult: {
                guaName: '雷天大壯之恆',
                LunarDate: '壬寅 年 壬寅 月 壬子 日 子 時'
            }
        },
    ].forEach(situation => {
        const fateGua = FULL_GUA_FACTORY.createFateGua(situation.date);
        test(`生日: ${situation.date.toLocaleString()} 產命卦: ${situation.expectedResult.guaName}`, () => {
            expect(fateGua.name).toBe(situation.expectedResult.guaName);
            expect(fateGua.getChineseLunarDate()).toBe(situation.expectedResult.LunarDate);
        });
    })
});

describe('產生卦象', ()=> {
   [
       {
           up: '天' as Gua,
           down: '天' as Gua,
           mutual: [1],
           date: new Date(),
           expectedResult: {
               guaName: '乾為天之姤',
               gung: '乾',
           }
       },
       {
           up: '雷' as Gua,
           down: '天' as Gua,
           mutual: [2],
           date: new Date(),
           expectedResult: {
               guaName: '雷天大壯之豐',
               gung: '坤',
           }
       },
   ].forEach(situation => {
       const { up, down, mutual, date, expectedResult } = situation;
       const res = FULL_GUA_FACTORY.create(up, down, mutual, date);
       test(`輸入:${up}, ${down}, ${mutual}，產生卦象: ${expectedResult.guaName}`, () => {
           expect(res.name).toBe(expectedResult.guaName);
       });
       test(`卦象: ${expectedResult.guaName}，宮應為${expectedResult.gung}`, () => {
           expect(res.gung.name).toBe(expectedResult.gung);
       });
   });
});

describe('動爻提示', () => {
    test('動化合' , () => {
        const date = new Date('2022-04-02 12:00:00');
        const res = FULL_GUA_FACTORY.create('雷', '天', [1], date);
        expect(res.hints[1]).toBe('合的兩者一定有關係，有曖昧、絆住、脫不了困、捨不得的心態、下不了決心。不可全以吉論。合須待沖：事情才會呈現出現，才會捨得、下定決心');
        expect(res.hints[2]).toBe('剋合：我與你合作是有條件、有目的、有好處但不一定雙方面互利。與對方合作有壓力但又不得不合作 (巳申、卯戌、子丑)');
        expect(res.hints[3]).toBe('第1爻動爻(子)與變爻(丑)相合！合的類型：剋合');
    });
    test('動爻與日相合' , () => {
        const date = new Date('2022-04-06 12:00:00');
        const res = FULL_GUA_FACTORY.create('雷', '天', [1], date);
        expect(res.hints[1]).toBe('合的兩者一定有關係，有曖昧、絆住、脫不了困、捨不得的心態、下不了決心。不可全以吉論。合須待沖：事情才會呈現出現，才會捨得、下定決心');
        expect(res.hints[2]).toBe('剋合：我與你合作是有條件、有目的、有好處但不一定雙方面互利。與對方合作有壓力但又不得不合作 (巳申、卯戌、子丑)');
        expect(res.hints[3]).toBe('第1爻動爻(子)與日(丑)相合！合的類型：剋合');
        expect(res.hints[4]).toBe('第1爻動爻(子)與變爻(丑)相合！合的類型：剋合');
    });
})