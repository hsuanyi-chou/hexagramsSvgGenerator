import { MoneyGuaFactory } from '../full-gua-factory/money-gua.factory';
import { FullGuaFactory } from '../full-gua-factory';

const moneyGua = new MoneyGuaFactory(new FullGuaFactory());
describe('金錢卦', () => {
  beforeEach(() => {
    moneyGua.reset();
  });
  it('一秒產卦', () => {
    expect(moneyGua.instantBuild()).toBeTruthy();
  });

  it('搖卦', () => {
    for (let i = 0; i < 6; i++) {
      moneyGua.shake();
    }
    expect(moneyGua.build()).toBeTruthy();
  });

  it('搖卦，未滿 6 次', () => {
    moneyGua.shake();
    moneyGua.shake();
    moneyGua.shake();
    try {
      moneyGua.build();
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  it('重置', () => {
    moneyGua.shake();
    moneyGua.shake();
    moneyGua.shake();
    moneyGua.reset();
    const data = moneyGua.getBuildData();
    expect(data.yingYangArray.length).toBe(0);
    expect(data.mutual.length).toBe(0);
    expect(data.shakeCounts).toBe(1);
    expect(data.shakeRecords.length).toBe(0);
  });

  it('搖 3 次', () => {
    moneyGua.shake();
    moneyGua.shake();
    moneyGua.shake();
    const data = moneyGua.getBuildData();
    expect(data.yingYangArray.length).toBe(3);
    expect(data.shakeCounts).toBe(4);
    expect(data.shakeRecords.length).toBe(3);
  });

  it('給予參數(如網址列)產金錢卦(buildBy)', () => {
    const res = moneyGua.instantBuild('測試卦例');
    const { shakeNumRecords, thing, date } = moneyGua.getBuildData();
    const expectedRes = moneyGua.buildBy({ shakeNumRecords, thing, date });
    expect(res).toEqual(expectedRes);
  });
});
