import * as XLSX from 'xlsx';

export interface IChingResult {
    count: number;
    name: string; // 掛名
    fourMean: string; // 四字訣
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
    six: string;
    fiveMoney: string; // 五路財神經
    seventyTwoGod: string[]; // 72天師
    serialGua: string; // 序卦傳
    heartSong: string; // 唯心用易歌訣
    description?: string; // 天水訟用
}

export function iChingFileReader() {
    const workbook = XLSX.readFile(`${__dirname}/ii.xlsx`);
    // tslint:disable-next-line: no-string-literal
    const sheet = workbook.Sheets['易經心法入門'];

    const cols = genCol();
    cols.shift(); // 把最前面的A欄拿掉

    const result: IChingResult[] = [];
    let colIndex = 1;
    for (const c of cols) {
        const r: IChingResult = {
            count: colIndex,
            name: '', // 掛名
            fourMean: '', // 四字訣
            one: '',
            two: '',
            three: '',
            four: '',
            five: '',
            six: '',
            fiveMoney: '', // 五路財神經
            seventyTwoGod: [], // 72天師
            serialGua: '', // 序卦傳
            heartSong: '', // 唯心用易歌訣
        };
        for (let i = 1; i <= 24; i++) {
            const resObj = sheet[`${c}${i}`];
            if (!resObj) {
                continue;
            }

            // tslint:disable-next-line: no-string-literal
            const value = resObj['v'];

            switch (i) {
                case 1:
                    const name = value.split('──');
                    r.name = value;
                    r.fourMean = name[1];
                    break;
                case 2:
                    break;
                case 3:
                    r.one = value;
                    break;
                case 4:
                    r.two = value;
                    break;
                case 5:
                    r.three = value;
                    break;
                case 6:
                    r.four = value;
                    break;
                case 7:
                    r.five = value;
                    break;
                case 8:
                    r.six = value;
                    break;
                case 11:
                    r.fiveMoney = value.trim();
                    break;
                case 14:
                case 15:
                case 16:
                case 17:
                    r.seventyTwoGod.push(value.trim());
                    break;
                case 20:
                case 21:
                    r.serialGua += value.trim();
                    break;
                case 23:
                case 24:
                    r.heartSong += `${value.trim()}。`;
                    break;
            }
        }
        result.push(r);
        colIndex++;
    }
    result[5].description = '※ 奉勸善好爭論、訴訟者，切記人與人之緣份此生非親即恩人，知恩不報，知親不敬者，其人一生永無安寧之日，是世間最可憐、可恥的。';
    return result;

}

function genCol() {
    // tslint:disable-next-line: max-line-length
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const newArr = [...alphabet];
    for (const a of alphabet) {
        newArr.push(`A${a}`);
    }

    const indexM = alphabet.findIndex(a => a === 'M');
    for (let i = 0; i <= indexM; i++) {
        newArr.push(`B${alphabet[i]}`);
    }
    return newArr;
}
