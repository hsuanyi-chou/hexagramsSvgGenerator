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

test('批量產生命卦', () => {
    const beginDate = new Date('2022-08-02T11:20:00.000');
    const endDate = new Date('2022-08-05T11:20:00.000');
    const fateGuas = FULL_GUA_FACTORY.createBatchFateGua(beginDate, endDate);
    expect(fateGuas.length).toEqual(4);
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