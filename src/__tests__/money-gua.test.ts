import { MoneyGuaFactory } from '../full-gua-factory/money-gua.factory';
import { FullGuaFactory } from '../full-gua-factory';

const moneyGua = new MoneyGuaFactory(new FullGuaFactory());
describe('金錢卦', () => {

    it('一秒產卦', () => {
        expect(moneyGua.instantBuild()).toBeTruthy();
    })

    it('搖卦', () => {
        moneyGua.reset();
        moneyGua.shake();
        moneyGua.shake();
        moneyGua.shake();
        moneyGua.shake();
        moneyGua.shake();
        moneyGua.shake();
        expect(moneyGua.build()).toBeTruthy();
    });

    it('搖卦，未滿 6 次', () => {
        moneyGua.reset();
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
        moneyGua.reset();
        moneyGua.shake();
        moneyGua.shake();
        moneyGua.shake();
        moneyGua.reset();
        const data = moneyGua.getInnerData();
        expect(data.yingYangArray.length).toBe(0);
        expect(data.mutual.length).toBe(0);
        expect(data.shakeCounts).toBe(1);
        expect(data.shakeRecords.length).toBe(0);
    });

    it('搖 3 次', () => {
        moneyGua.reset();
        moneyGua.shake();
        moneyGua.shake();
        moneyGua.shake();
        const data = moneyGua.getInnerData();
        expect(data.yingYangArray.length).toBe(3);
        expect(data.shakeCounts).toBe(4);
        expect(data.shakeRecords.length).toBe(3);
    });
});
