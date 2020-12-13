import { GuaGenerator } from '../gua.generator';
import {FullGuaFactory } from '../full-gua-factory';
const date = new Date('1990-06-25T00:00:00.000');
// const date = new Date();
console.log(date);
// const guaGen = new GuaGenerator();
// const res = guaGen.buildGua('雷', '澤', [3], date);
// console.log(res.fullGua);
// console.log(res.svg);

const factory = new FullGuaFactory();
const gg = factory.create('風', '雷', [1], date);
console.log(gg);
// const fate = factory.createFateGua(date);
// console.log(fate);