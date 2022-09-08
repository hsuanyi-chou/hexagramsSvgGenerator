import { FullGuaFactory } from '../full-gua-factory';
import { BatchFateGuaSolver } from '../solvers/solver.batch-fate-gua';


const FULL_GUA_FACTORY = new FullGuaFactory();
const solver = new BatchFateGuaSolver();

describe('BatchFateGuaSolver - 批量產生命卦 - 解卦', () => {

    describe(`世爻是否旺相(僅依年、空亡判)`, () => {
        [
            {
                date: new Date('2025-10-02T11:20:00.000'),
                guaName: '火地晉',
                description: '世爻: 酉、年: 巳、月: 酉',
                expectResult: true,
            },
            {
                date: new Date('2022-09-01T11:20:00.000'),
                guaName: '水地比',
                description: '世爻: 卯、年: 寅、月: 酉',
                expectResult: true,
            },
            {
                date: new Date('2022-09-02T11:20:00.000'),
                guaName: '山地剝',
                description: '世爻: 水、年: 寅、月: 酉',
                expectResult: false,
            },
            {
                date: new Date('2022-09-03T11:20:00.000'),
                guaName: '坤為地',
                description: '世爻: 酉、年: 寅、月: 酉',
                expectResult: false,
            },
            {
                date: new Date('2022-09-07T11:20:00.000'),
                guaName: '雷地豫',
                description: '世爻: 末、年: 寅、月: 酉',
                expectResult: false,
            }
        ].forEach(situation => {
            test(`${situation.guaName} / ${situation.description}`, () => {
                const gua = FULL_GUA_FACTORY.createFateGua(situation.date);
                expect(gua.originalName).toEqual(situation.guaName);
                const res = solver.shihWang(gua);
                expect(res).toEqual(situation.expectResult);
            });
        });
    });


});