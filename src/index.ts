import { GuaGenerator } from './gua.generator';
import { FullGuaFactory } from './full-gua-factory';
import * as fs from 'fs';
import { Gua } from './gua.interface';

// 測試區
export default GuaGenerator;
// const guaGen = new GuaGenerator();
// const res = guaGen.buildGua('風', '澤');
// console.log(res);

const fullGuaFactory = new FullGuaFactory();
const date = new Date();

const chang = fullGuaFactory.create('地', '水', [3], date);
console.log(chang);
// console.log(chang.solarDate);
// console.log(chang.getFullLunarDate());



// 正式產圖區。要產時放開註解
// svgGenerator();

function svgGenerator() {
  const guaArray: Array<{ id: number; gua: Gua }> = [
    { id: 1, gua: '天' },
    { id: 2, gua: '澤' },
    { id: 3, gua: '火' },
    { id: 4, gua: '雷' },
    { id: 5, gua: '風' },
    { id: 6, gua: '水' },
    { id: 7, gua: '山' },
    { id: 8, gua: '地' },
  ];
  const guaGen = new GuaGenerator();
  console.log(`產生svg中…`);
  for (const i of guaArray) {
    for (const j of guaArray) {
      console.log(`目前產生的卦：${i.gua}${j.gua}`);
      const svg = guaGen.buildGua(i.gua, j.gua);
      fs.writeFileSync(`${process.cwd()}/genSVGFile/${i.id}${j.id}.svg`, svg);
    }
  }
  console.log(`產生svg完成！`);
}
