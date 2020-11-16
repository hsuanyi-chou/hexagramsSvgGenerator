import { Gua, GuaConfiguration } from './gua.interface';

/**
 * 把數字轉成卦，目前未用到。先留著
 * @param digit 數字1~8
 */
function transToWord(digit: number): Gua {
    let word = '';
    switch (digit) {
        case 1:
            word = '天';
            break;
        case 2:
            word = '澤';
            break;
        case 3:
            word = '火';
            break;
        case 4:
            word = '雷';
            break;
        case 5:
            word = '風';
            break;
        case 6:
            word = '水';
            break;
        case 7:
            word = '山';
            break;
        case 8:
            word = '地';
            break;
    }
    return word as Gua;
}

export class GuaGenerator {
    private config: GuaConfiguration = {
        WIDTH: 290,  // 圖片寬度
        HEIGHT: 250, // 圖片長度
        YAO_COLOR: '#000', // 爻顏色
        YAO_BOLD: 15, // 爻的粗度
        YAO_GAP: 40, // 每一爻的間距
        YANG_LENGTH: 100, // 陽爻長度
        YIN_LENGTH: 40, // 陰爻長度
        YIN_GAP: 20, // 陰爻中間的空白 (20約18點字體的空間)

        DOWN_FIRST_YAO: 227, // 下卦第一爻初始位置 (y軸)
        UP_FIRST_YAO: 106, // 上卦第一爻初始位置 (y軸)

        EARTHLY_BRANCH_COLOR: '#000', // 地支顏色
        HEAVENLY_STEM_COLOR: '#000', // 天干顏色
        MUTUAL: '#000', // 動爻顏色
        HIDDEN_COLOR: '#000', // 伏藏顏色
    }
    constructor(config?: GuaConfiguration) {
        if (config) {
            this.config = config;
        }
    }

    /**
     * 產生卦象
     * @param up 上卦
     * @param down 下卦
     * @return svg 純文字內容
     */
    buildGua(up: Gua, down: Gua) {
        let svg = `<!-- Created By Hexagrams-SVG-Generator -->
            <svg width="${this.config.WIDTH}" height="${this.config.HEIGHT}" xmlns="http://www.w3.org/2000/svg">
            <g>
                <title>background</title>
                <rect fill="#ffffff" id="GUA" height="252" width="292" y="-1" x="-1"/>
            </g>`;
        svg += this.drawFullGua(down, up);
        svg += '</svg>';
        return svg;
    }

    /**
     * step 1: 繪製全卦
     * @param down 下卦
     * @param up 上卦
     */
    private drawFullGua(down: Gua, up: Gua): string {
        let gua = `<g>
            <title>Layer 1</title>\n`;
        gua += this.drawGua(down, 'down', 130, this.config.DOWN_FIRST_YAO);
        gua += this.drawGua(up, 'up', 130, this.config.UP_FIRST_YAO);
        gua += this.drawEarthlyBranches();
        gua += `\n</g>\n`
        return gua;
    }

    /**
     * step 2: 裝卦：地支、六親
     */
    private drawEarthlyBranches(): string {
        // TODO: 開發裝卦
        return '';
    }

    /**
     * step 3: 裝卦：天干、世應
     */
    private drawHeavenlyStem(): string {
        // TODO: 開發裝卦
        return '';
    }

    // ************************ step 1: 繪製全卦子功能 START ************************
    /**
     * step 1.1: 繪製全卦的子功能
     * @param gua 卦
     * @param idPrefix id前置名稱
     * @param x 起始爻的x
     * @param y 起始爻的y
     */
    private drawGua(gua: Gua, idPrefix: string, x: number, y: number): string {
        let yao = '';
        let idIndex = 0;
        switch (gua) {
            case '天':
                for (let i = 1; i <= 3; i++) {
                    yao += this.drawYangYao(`${idPrefix}_${i}`, x, y);
                    y -= this.config.YAO_GAP;
                }
                break;
            case '澤':
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                break;
            case '火':
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                break;
            case '雷':
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);

                y -= this.config.YAO_GAP;
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);

                y -= this.config.YAO_GAP;
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                break;
            case '風':
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                break;
            case '水':
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                break;
            case '山':
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
                y -= this.config.YAO_GAP;
                yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
                break;
            case '地':
                for (let i = 1; i <= 3; i++) {
                    yao += this.drawYinYao(`${idPrefix}_${i}`, x, y);
                    y -= this.config.YAO_GAP;
                }
                break;
        }
        return yao;
    }

    /**
     * step 1.2: 繪製陰爻
     * @param id SVG圖片id
     * @param x 起始爻的x
     * @param y 起始爻的y
     */
    private drawYinYao(id: string, x: number, y: number) {
        const x2 = x + this.config.YIN_LENGTH;
        return `<line stroke="${this.config.YAO_COLOR}" id="${id + '-1'}" x1="${x}" y1="${y}" x2="${x2}" y2="${y}" stroke-width="${this.config.YAO_BOLD}" fill="none"/>
                <line stroke="${this.config.YAO_COLOR}" id="${id + '-2'}" x1="${x2 + this.config.YIN_GAP}" y1="${y}" x2="${x2 + this.config.YIN_GAP + this.config.YIN_LENGTH}" y2="${y}" stroke-width="${this.config.YAO_BOLD}" fill="none"/>\n`;
    }

    /**
     * step 1.2: 繪製陽爻
     * @param id SVG圖片id
     * @param x 起始爻的x
     * @param y 起始爻的y
     */
    private drawYangYao(id: string, x: number, y: number) {
        return `<line stroke="${this.config.YAO_COLOR}" id="${id}" x1="${x}" y1="${y}" x2="${x + this.config.YANG_LENGTH}" y2="${y}" stroke-width="${this.config.YAO_BOLD}" fill="none"/>\n`;
    }
    // ************************ step 1: 繪製全卦子功能 END ************************
    // ************************ step 2: 裝卦:地支、六親 子功能 START ************************
    // ************************ step 2: 裝卦:地支、六親 子功能 END ************************
}