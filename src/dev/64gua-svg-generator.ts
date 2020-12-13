import { GuaGenerator } from '../gua.generator';
import * as fs from 'fs';
import { Gua } from '../gua.interface';
svgGenerator();

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
      const gua = guaGen.buildGua(i.gua, j.gua);
      fs.writeFileSync(`${process.cwd()}/genSVGFile/${i.id}${j.id}.svg`, gua.svg);
    }
  }
  console.log(`產生svg完成！`);
}