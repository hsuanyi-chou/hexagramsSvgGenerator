import { GuaGenerator } from '../gua.generator';
import {FullGuaFactory } from '../full-gua-factory';

// 測試產svg
const date = new Date('2021-05-27T11:20:00.000');
console.log(date);
console.log('zh-tw dateString', date.toLocaleString('zh-tw'));
const guaGen = new GuaGenerator();
const res = guaGen.buildFateGua({ date });
// const res = guaGen.buildGua('澤', '雷', [3], date);
// console.log(res.fullGua);
console.log(res.svg);

// 測試 產卦工廠 (當卦的內容有問題)
// const factory = new FullGuaFactory();
// const gg = factory.create('風', '雷', [1], date);
// console.log(gg);
// const fate = factory.createFateGua(date);
// console.log(fate);