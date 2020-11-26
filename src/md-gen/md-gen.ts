import { iChingFileReader, IChingResult } from './iching-file-reader';
import { FullGuaFactory, FullGua } from '../full-gua-factory';
import { Gua } from '../gua.interface';
import * as fs from 'fs';

const file: IChingResult[] = iChingFileReader();

const fullGuaArray = genFullGuaArray() as Array<{ fileName: string, fullGua: FullGua }>;

for (const fullGua of fullGuaArray) {
    console.log(`markdown檔案產生中…正在產生${fullGua.fileName}.md檔案內容`);
    console.log(`卦：${fullGua.fullGua.name}`);
    let text = buildMdHeader(fullGua.fullGua, '2020-11-21');
    const fileGua = file.find(f => f.guaIndex === fullGua.fullGua.name);
    if (fileGua) {
        text += buildContent(fileGua, fullGua.fileName);
    }
    // console.log(text);
    fs.writeFileSync(`${process.cwd()}/genMdFile/${fullGua.fileName}.md`, text);
    console.log(`${fullGua.fileName}.md產生完成！`);
}


function buildMdHeader(fullGua: FullGua, date: string) {
    const TAB_SPACE = ' ';
    let text = `---\n`;
    text += `title: ${fullGua.name}\n`
    text += `date: ${date}\n`;
    text += `categories:\n`;
    text += `${TAB_SPACE}- ${fullGua.gung.name}\n`;
    text += `tags:\n`;
    text += `${TAB_SPACE}- ${fullGua.gung.name}\n`;
    if (fullGua.hint.length !== 0) {
        fullGua.hint.forEach(h => text += `${TAB_SPACE}- ${fullGua.hint}\n`);
    }
    text += `---\n\n`;
    return text;
}

function buildContent(fileGua: IChingResult, fileName: string) {
    let text = `## ${fileGua.name}\n`;
    text += `\n![](/images/gua/${fileName}.svg)\n`;
    text += `### 初爻\n${fileGua.one}\n`;
    text += `### 二爻\n${fileGua.two}\n`;
    text += `### 三爻\n${fileGua.three}\n`;
    text += `### 四爻\n${fileGua.four}\n`;
    text += `### 五爻\n${fileGua.five}\n`;
    text += `### 上爻\n${fileGua.six}\n`;
    text += `## 五路財神經\n${fileGua.fiveMoney}\n`;
    text += `## 稽首七十二天師加持世界和平共轉法輪寶誥\n`;
    if (fileGua.seventyTwoGod.length === 2) {
        text += `${fileGua.seventyTwoGod.join('\n')}\n`;
    } else {
        text += `${fileGua.seventyTwoGod[0]}\n${fileGua.seventyTwoGod[1]}\n\n`;
        text += `${fileGua.seventyTwoGod[2]}\n\n${fileGua.seventyTwoGod[3]}\n`;
    }
    text += `## 序卦傳\n${fileGua.serialGua}\n`;
    text += `## 唯心用易歌訣\n${fileGua.heartSong}\n\n`;
    if (fileGua.description) {
        text += `${fileGua.description}\n`;
    }
    return text;
}

function genFullGuaArray() {
    const guaArray: Array<{ id: number, gua: Gua }> = [
        { id: 1, gua: '天' },
        { id: 2, gua: '澤' },
        { id: 3, gua: '火' },
        { id: 4, gua: '雷' },
        { id: 5, gua: '風' },
        { id: 6, gua: '水' },
        { id: 7, gua: '山' },
        { id: 8, gua: '地' }
    ];
    const fullGuaFactory = new FullGuaFactory();
    const fullGuaList = [];
    for (const up of guaArray) {
        for (const down of guaArray) {
            const fullGua = fullGuaFactory.create(up.gua, down.gua);
            fullGuaList.push({ fileName: `${up.id}${down.id}`, fullGua });
        }
    }

    return fullGuaList;
}