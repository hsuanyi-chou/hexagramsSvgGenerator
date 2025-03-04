import { FullGuaFactory, guaWords } from '../full-gua-factory';
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
        cutAt2300: false,
        expectedResult: {
            guaName: '火風鼎之大有',
            LunarDate: '庚午 年 壬午 月 辛酉 日 午 時'
            }
        },
        {
            date: new Date('2022-02-27T10:20:00.000'),
            cutAt2300: false,
            expectedResult: {
                guaName: '火天大有之大壯',
                LunarDate: '壬寅 年 壬寅 月 辛亥 日 巳 時'
            }
        },
        {
            date: new Date('2022-02-27T23:20:00.000'), // 23:00 後換日的 case 。應爸爸以節氣來看，應仍以 00:00 換日
            cutAt2300: false,
            expectedResult: {
                guaName: '火天大有之鼎',
                LunarDate: '壬寅 年 壬寅 月 辛亥 日 子 時'
            }
        },
        {
            date: new Date('2022-02-27T23:20:00.000'), // 23:00 後換日的 case
            cutAt2300: true,
            expectedResult: {
                guaName: '雷天大壯之恆',
                LunarDate: '壬寅 年 壬寅 月 壬子 日 子 時'
            }
        },
    ].forEach(situation => {
        const fateGua = FULL_GUA_FACTORY.createFateGua({ date: situation.date, cutAt2300: situation.cutAt2300 });
        test(`生日: ${situation.date.toLocaleString()} 產命卦: ${situation.expectedResult.guaName}`, () => {
            expect(fateGua.name).toBe(situation.expectedResult.guaName);
            expect(fateGua.getChineseLunarDate()).toBe(situation.expectedResult.LunarDate);
        });
    })
});

test('命卦個性', () => {
    const date = new Date('1990-06-25T11:20:00.000');

    const fateGua = FULL_GUA_FACTORY.createFateGua({ date });
    const personality = fateGua.getPersonality();
    expect(personality.length).not.toEqual(0);
});

test('批量產生命卦', () => {
    const beginDate = new Date('2022-08-02T11:20:00.000');
    const endDate = new Date('2022-08-05T11:20:00.000');
    const fateGuas = FULL_GUA_FACTORY.createBatchFateGua({ beginDate, endDate });
    expect(fateGuas.length).toEqual(4);
});

describe('產生卦象', () => {
   [
       {
           up: '天' as Gua,
           down: '天' as Gua,
           mutual: [1],
           date: new Date(),
           expectedResult: {
               guaName: '乾為天之姤',
               gung: '乾',
               scripturesLength: 6,
               guaMean: guaWords.find(p => p.guaIndex === '乾為天')?.guaMean,
               guaMeanDetail: guaWords.find(p => p.guaIndex === '乾為天')?.guaMeanDetail,
               guaMeanDetailMutual: guaWords.find(p => p.guaIndex === '天風姤')?.guaMeanDetail,
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
               scripturesLength: 6,
               guaMean: guaWords.find(p => p.guaIndex === '雷天大壯')?.guaMean,
               guaMeanDetail: guaWords.find(p => p.guaIndex === '雷天大壯')?.guaMeanDetail,
               guaMeanDetailMutual: guaWords.find(p => p.guaIndex === '雷火豐')?.guaMeanDetail,
           }
       },
       {
           up: '火' as Gua,
           down: '地' as Gua,
           mutual: [],
           date: new Date(),
           expectedResult: {
               guaName: '火地晉',
               gung: '乾',
               scripturesLength: 5,
               guaMean: guaWords.find(p => p.guaIndex === '火地晉')?.guaMean,
               guaMeanDetail: guaWords.find(p => p.guaIndex === '火地晉')?.guaMeanDetail,
               guaMeanDetailMutual: '',
           }
       },
   ].forEach(situation => {
       const { up, down, mutual, date, expectedResult } = situation;
       const res = FULL_GUA_FACTORY.create({up, down, mutual, date});

       test(`輸入:${up}, ${down}, ${mutual}，產生卦象: ${expectedResult.guaName}`, () => {
           expect(res.name).toBe(expectedResult.guaName);
       });
       test(`卦象: ${expectedResult.guaName}，宮應為${expectedResult.gung}`, () => {
           expect(res.gung.name).toBe(expectedResult.gung);
       });
       test(`卦象: ${expectedResult.guaName}，經書長度應為${expectedResult.scripturesLength}`, () => {
           expect(res.scriptures.length).toEqual(expectedResult.scripturesLength);
       });
       test(`卦象: ${expectedResult.guaName}，卦象解釋應為${expectedResult.guaMean}`, () => {
           expect(res.guaMean).toBe(expectedResult.guaMean);
       });
       test(`卦象: ${expectedResult.guaName}，卦象詳解應為${expectedResult.guaMeanDetail}`, () => {
           expect(res.guaMeanDetail).toBe(expectedResult.guaMeanDetail);
       });
       test(`卦象: ${expectedResult.guaName}，變卦詳解應為${expectedResult.guaMeanDetailMutual}`, () => {
           expect(res.guaMeanDetailMutual).toBe(expectedResult.guaMeanDetailMutual);
       });

   });
});

describe('節氣轉換', () => {
    it('立春，提醒轉換年、月', () => {
        const res = FULL_GUA_FACTORY.createFateGua({ date: new Date('2024-02-04T11:20:00.000') });
        expect(res.hints.includes('今日屬24節氣「立春」，節氣轉換時間為「2024-02-04 16:27:05」。若占卦時間為轉換之後，則年、月令須調整為下一年、月份。')).toBeTruthy();
    });

    it('驚蟄，提醒轉換月', () => {
        const res = FULL_GUA_FACTORY.createFateGua({ date: new Date('2024-03-05T11:20:00.000') });
        expect(res.hints.includes('今日屬24節氣「驚蟄」，節氣轉換時間為「2024-03-05 10:22:43」。若占卦時間為轉換之後，月令須調整為下一月份。')).toBeTruthy();
    });


    it('清明，提醒轉換月', () => {
        const res = FULL_GUA_FACTORY.createFateGua({ date: new Date('2024-04-04T11:20:00.000') });
        expect(res.hints.includes('今日屬24節氣「清明」，節氣轉換時間為「2024-04-04 15:02:15」。若占卦時間為轉換之後，月令須調整為下一月份。')).toBeTruthy();
    });

    it('春分，不應提示轉換', () => {
        const res = FULL_GUA_FACTORY.createFateGua({ date: new Date('2024-03-20T11:20:00.000') });
        expect(res.hints.includes('今日屬24節氣「春分」')).toBeFalsy();
    });
})

xdescribe('天乙貴人', () => {
    [
        {
            dates: [
                new Date('2022-11-07T13:00:00.000'),
                new Date('2022-11-11T13:00:00.000'),
                new Date('2022-11-13T13:00:00.000'),
            ],
            expectedResult: `天乙貴人：丑、未`,
        },
        {
            dates: [
                new Date('2022-11-08T13:00:00.000'),
                new Date('2022-11-12T13:00:00.000'),
            ],
            expectedResult: `天乙貴人：子、申`,
        },
        {
            dates: [
                new Date('2022-11-09T13:00:00.000'),
                new Date('2022-11-10T13:00:00.000'),
            ],
            expectedResult: `天乙貴人：亥、酉`,
        },
        {
            dates: [
                new Date('2022-11-15T13:00:00.000'),
                new Date('2022-11-16T13:00:00.000'),
            ],
            expectedResult: `天乙貴人：卯、巳`,
        },
        {
            dates: [
                new Date('2022-11-14T13:00:00.000'),
            ],
            expectedResult: `天乙貴人：午、寅`,
        },
    ].forEach(situation => {
        const { dates, expectedResult } = situation;
        for (const date of dates) {
            const res = FULL_GUA_FACTORY.createFateGua({ date });
            test(`日干支: ${res.lunarDay}`, () => {
                expect(res.hints.includes(expectedResult)).toBeTruthy();
            });
        }
    });
});
