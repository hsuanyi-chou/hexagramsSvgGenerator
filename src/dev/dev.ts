import { GuaGenerator } from '../gua.generator';

const date = new Date('2020-12-04T00:00:00.000+08:00');
console.log(date);
const guaGen = new GuaGenerator();
const res = guaGen.buildGua('雷', '澤', [3], date);
console.log(res.fullGua);
console.log(res.svg);