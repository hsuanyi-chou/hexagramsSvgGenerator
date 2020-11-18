import { GuaGenerator } from './gua.generator';
import { FullGuaFactory } from './full-gua.factory';
export default GuaGenerator;
// const guaGen = new GuaGenerator();
// const res = guaGen.buildGua('火', '地');
// console.log(res);

const fullGuaFactory = new FullGuaFactory();
const chang = fullGuaFactory.create('天', '天');
console.log(chang);