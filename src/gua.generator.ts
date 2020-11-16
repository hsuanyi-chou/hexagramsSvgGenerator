import { Gua, GuaConfiguration, Elements, relatives, EarthlyBranch } from './gua.interface';

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

        FONT_FAMILY: 'Helvetica, Arial, sans-serif', // 文字字型
        EARTHLY_BRANCH_COLOR: '#729C62', // 地支顏色
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
        gua += this.drawEarthlyBranches(down, up);
        gua += `\n</g>\n`
        return gua;
    }

    /**
     * step 2: 裝卦：地支、六親
     */
    private drawEarthlyBranches(down: Gua, up: Gua): string {
        // TODO: 開發裝卦
        let gua = '';
        gua += this.drawEarthlyBranch(down, 'DOWN');
        gua += this.drawEarthlyBranch(up, 'UP');
        return gua;
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

    /**
     * 
     * @param gua 卦
     * @param position UP或DOWN，傳入上卦或下卦
     * @return 填寫地支
     */
    private drawEarthlyBranch(gua: Gua, position: 'UP' | 'DOWN'): string {

        let earthlyBranches: EarthlyBranch[] = [];
        switch (gua) {
            case '天':
            case '雷':
                if (position === 'DOWN') {
                    earthlyBranches = ['子', '寅', '辰'];
                } else {
                    earthlyBranches = ['午', '申', '戌'];
                }
                break;
            case '澤':
                if (position === 'DOWN') {
                    earthlyBranches = ['巳', '卯', '丑'];
                } else {
                    earthlyBranches = ['亥', '酉', '未'];
                }
                break;
            case '火':
                if (position === 'DOWN') {
                    earthlyBranches = ['卯', '丑', '亥'];
                } else {
                    earthlyBranches = ['酉', '未', '巳'];
                }
                break;
            case '風':
                if (position === 'DOWN') {
                    earthlyBranches = ['丑', '亥', '酉'];
                } else {
                    earthlyBranches = ['未', '巳', '卯'];
                }
                break;
            case '水':
                if (position === 'DOWN') {
                    earthlyBranches = ['寅', '辰', '午'];
                } else {
                    earthlyBranches = ['申', '戌', '子'];
                }
                break;
            case '山':
                if (position === 'DOWN') {
                    earthlyBranches = ['辰', '午', '申'];
                } else {
                    earthlyBranches = ['戌', '子', '寅'];
                }
                break;
            case '地':
                if (position === 'DOWN') {
                    earthlyBranches = ['未', '巳', '卯'];
                } else {
                    earthlyBranches = ['丑', '亥', '酉'];
                }
                break;
        }

        let text = '';
        let idIndex = 0;
        const xForEarthlyBranch = 240; // 地支x軸
        const xForRelative = 75; // 六親x軸

        let y = position === 'DOWN' ? this.config.DOWN_FIRST_YAO + 10 : this.config.UP_FIRST_YAO + 10;

        for (const earthlyBranch of earthlyBranches) {
            const relative = this.getRelative('木', earthlyBranch);
            text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="24" id="earthlyBranch_${idIndex++}" y="${y}" x="${xForEarthlyBranch}" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.EARTHLY_BRANCH_COLOR}">${earthlyBranch}</text>\n`;
            text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="24" id="relative_${idIndex++}" y="${y}" x="${xForRelative}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.EARTHLY_BRANCH_COLOR}">${relative}</text>\n`;
            y -= this.config.YAO_GAP;
        }
        return text;
    }

    /**
     * 根據宮與地支，取得該爻之六親
     * @param gung 宮
     * @param earthlyBranch 地支
     * @return 該爻六親
     */
    private getRelative(gung: Elements, earthlyBranch: string): relatives {
        const element = this.getElement(earthlyBranch);
        if (gung === element) {
            return '兄弟';
        }
        let text: relatives = '' as relatives;
        switch (gung) {
            case '金':
                switch (element) {
                    case '木':
                        text = '妻財';
                        break;
                    case '水':
                        text = '子孫';
                        break;
                    case '火':
                        text = '官鬼';
                        break;
                    case '土':
                        text = '父母';
                        break;
                }
                break;
            case '木':
                switch (element) {
                    case '金':
                        text = '官鬼';
                        break;
                    case '水':
                        text = '父母';
                        break;
                    case '火':
                        text = '子孫';
                        break;
                    case '土':
                        text = '妻財';
                        break;
                }
                break;
            case '水':
                switch (element) {
                    case '金':
                        text = '父母';
                        break;
                    case '木':
                        text = '子孫';
                        break;
                    case '火':
                        text = '妻財';
                        break;
                    case '土':
                        text = '官鬼';
                        break;
                }
                break;
            case '火':
                switch (element) {
                    case '金':
                        text = '妻財';
                        break;
                    case '木':
                        text = '父母';
                        break;
                    case '水':
                        text = '官鬼';
                        break;
                    case '土':
                        text = '子孫';
                        break;
                }
                break;
            case '土':
                switch (element) {
                    case '金':
                        text = '子孫';
                        break;
                    case '木':
                        text = '官鬼';
                        break;
                    case '水':
                        text = '妻財';
                        break;
                    case '火':
                        text = '父母';
                        break;
                }
                break;
        }
        return text;
    }

    /**
     * 傳入天干、地支，回傳五行 (天干還沒做，用到機會少)
     * @param type 天干/地支
     * @return 五行
     */
    private getElement(type: string): Elements {
        let text: Elements = '' as Elements;
        switch (type) {
            case '子':
            case '亥':
                text = '水';
                break;
            case '寅':
            case '卯':
                text = '木';
                break;
            case '巳':
            case '午':
                text = '火';
                break;
            case '申':
            case '酉':
                text = '金';
                break;
            case '辰':
            case '未':
            case '戌':
            case '丑':
                text = '土';
                break;
        }
        return text;
    }
    // ************************ step 2: 裝卦:地支、六親 子功能 END ************************
    // ************************ step 3: 裝卦:天干、世爻 子功能 START ************************
    // ************************ step 3: 裝卦:天干、世爻 子功能 END ************************
}