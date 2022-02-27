import { FullGuaFactory } from '../full-gua-factory';

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

