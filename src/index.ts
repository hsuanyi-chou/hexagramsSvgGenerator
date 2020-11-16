import { GuaGenerator } from './gua.generator';
export default GuaGenerator;
const guaGen = new GuaGenerator();
const res = guaGen.buildGua('火', '天');
console.log(res);