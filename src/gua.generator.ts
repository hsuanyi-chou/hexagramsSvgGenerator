import { Gua, GuaConfiguration, Elements, Relative, EarthlyBranch, ShihYingPosition, HeavenlyStem } from './gua.interface';

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
        HEIGHT: 320, // 圖片長度
        YAO_COLOR: '#000', // 爻顏色
        YAO_BOLD: 15, // 爻的粗度
        YAO_GAP: 40, // 每一爻的間距
        YANG_LENGTH: 100, // 陽爻長度
        YIN_LENGTH: 40, // 陰爻長度
        YIN_GAP: 20, // 陰爻中間的空白 (20約18點字體的空間)

        DOWN_FIRST_YAO: 290, // 下卦第一爻初始位置 (y軸)。傳入的最大值 = HEIGHT - 26 (要預留世爻位置)

        FONT_FAMILY: 'Helvetica, Arial, sans-serif', // 文字字型
        EARTHLY_BRANCH_COLOR: '#dbaa23', // 地支顏色
        HEAVENLY_STEM_COLOR: '#4b7ee3', // 天干顏色
        MUTUAL: '#000', // 動爻顏色
        HIDDEN_COLOR: '#000', // 伏藏顏色

        SHIH_YING_COLOR: '#729C62', // 世應顏色

    }

    private readonly YAO_X_POSITION = 130; // 爻的X軸位置常數

    private readonly UP_FIRST_YAO_RELATIVE_POSITION = 121; // 上卦第一爻相對位置常數
    private readonly SHIH_FIRST_YAO_RELATIVE_POSITION = 26; // 世爻第一爻相對位置常數
    private UP_FIRST_YAO = this.config.DOWN_FIRST_YAO - this.UP_FIRST_YAO_RELATIVE_POSITION; // 上卦第一爻初始位置 (y軸)
    private SHIH_FIRST_YAO = this.config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION; // 世爻第一爻位置(y軸)

    constructor(config?: GuaConfiguration) {
        if (config) {
            this.config = config;
            this.UP_FIRST_YAO = config.DOWN_FIRST_YAO - this.UP_FIRST_YAO_RELATIVE_POSITION;
            this.SHIH_FIRST_YAO = config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION;
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
        gua += this.drawGua(down, 'down', this.YAO_X_POSITION, this.config.DOWN_FIRST_YAO);
        gua += this.drawGua(up, 'up', this.YAO_X_POSITION, this.UP_FIRST_YAO);
        gua += this.drawEarthlyBranches(down, up);
        gua += this.drawShihYingAndHeavenlyStem(down, up);
        gua += `\n</g>\n`
        return gua;
    }

    /**
     * step 2: 裝卦：地支、六親
     */
    private drawEarthlyBranches(down: Gua, up: Gua): string {
        let gua = '';
        gua += this.drawEarthlyBranch(down, 'DOWN');
        gua += this.drawEarthlyBranch(up, 'UP');
        return gua;
    }

    /**
     * step 3: 繪製天干、世應
     * @param down 下卦
     * @param up 上卦
     */
    private drawShihYingAndHeavenlyStem(down: Gua, up: Gua): string {
        let text = '';
        const shihYingPosition = this.calculateShinYing(down, up);
        const x = 171;
        const shihY = this.SHIH_FIRST_YAO - this.config.YAO_GAP * (shihYingPosition.shih - 1);
        const yingY = this.SHIH_FIRST_YAO - this.config.YAO_GAP * (shihYingPosition.ying - 1);

        text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="18" id="shih" y="${shihY}" x="${x}" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.SHIH_YING_COLOR}">世</text>\n`;
        text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="18" id="ying" y="${yingY}" x="${x}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.SHIH_YING_COLOR}">應</text>\n`;

        const heavenlyStemShihY = shihY - this.config.YAO_GAP;
        const heavenlyStemYingY = yingY - this.config.YAO_GAP;
        if (shihYingPosition.shih >= 4) {
            // 世爻在上
            text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="18" id="heavenlyStem_1" y="${heavenlyStemShihY}" x="${x}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.HEAVENLY_STEM_COLOR}">${this.getHeavenlyStem(up, 'UP')}</text>\n`;
            text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="18" id="heavenlyStem_2" y="${heavenlyStemYingY}" x="${x}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.HEAVENLY_STEM_COLOR}">${this.getHeavenlyStem(down, 'DOWN')}</text>\n`;
        } else {
            // 世爻在下
            text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="18" id="heavenlyStem_1" y="${heavenlyStemShihY}" x="${x}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.HEAVENLY_STEM_COLOR}">${this.getHeavenlyStem(down, 'DOWN')}</text>\n`;
            text += `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="18" id="heavenlyStem_2" y="${heavenlyStemYingY}" x="${x}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${this.config.HEAVENLY_STEM_COLOR}">${this.getHeavenlyStem(up, 'UP')}</text>\n`;
        }
        return text;
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

        let y = position === 'DOWN' ? this.config.DOWN_FIRST_YAO + 10 : this.UP_FIRST_YAO + 10;

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
    private getRelative(gung: Elements, earthlyBranch: string): Relative {
        const element = this.getElement(earthlyBranch);
        if (gung === element) {
            return '兄弟';
        }
        let text: Relative = '' as Relative;
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
    /**
     * 計算幾世卦
     * @param down 下卦
     * @param up 上卦
     * @return 幾世卦
     */
    private calculateShinYing(down: Gua, up: Gua): ShihYingPosition {


        if (down === up) {
            return { shih: 6, ying: 3 };
        }

        if ((up === '天' && down === '風') ||
            (up === '風' && down === '天') ||
            (up === '澤' && down === '水') ||
            (up === '水' && down === '澤') ||
            (up === '火' && down === '山') ||
            (up === '山' && down === '火') ||
            (up === '雷' && down === '地') ||
            (up === '地' && down === '雷')) {
            return { shih: 1, ying: 4 };
        }

        if ((up === '天' && down === '山') ||
            (up === '山' && down === '天') ||
            (up === '澤' && down === '地') ||
            (up === '地' && down === '澤') ||
            (up === '火' && down === '風') ||
            (up === '風' && down === '火') ||
            (up === '雷' && down === '水') ||
            (up === '水' && down === '雷')) {
            return { shih: 2, ying: 5 };
        }

        if ((up === '天' && down === '地') ||
            (up === '地' && down === '天') ||
            (up === '澤' && down === '山') ||
            (up === '山' && down === '澤') ||
            (up === '火' && down === '水') ||
            (up === '水' && down === '火') ||
            (up === '雷' && down === '風') ||
            (up === '風' && down === '雷') ||
            (up === '天' && down === '火') ||
            (up === '火' && down === '天') ||
            (up === '澤' && down === '雷') ||
            (up === '雷' && down === '澤') ||
            (up === '風' && down === '山') ||
            (up === '山' && down === '風') ||
            (up === '地' && down === '水') ||
            (up === '水' && down === '地')) {
            return { shih: 3, ying: 6 };
        }

        if ((up === '天' && down === '雷') ||
            (up === '雷' && down === '天') ||
            (up === '澤' && down === '火') ||
            (up === '火' && down === '澤') ||
            (up === '地' && down === '風') ||
            (up === '風' && down === '地') ||
            (up === '山' && down === '水') ||
            (up === '水' && down === '山') ||
            (up === '天' && down === '水') ||
            (up === '水' && down === '天') ||
            (up === '澤' && down === '風') ||
            (up === '風' && down === '澤') ||
            (up === '火' && down === '地') ||
            (up === '地' && down === '火') ||
            (up === '雷' && down === '山') ||
            (up === '山' && down === '雷')) {
            return { shih: 4, ying: 1 };
        }

        if ((up === '天' && down === '澤') ||
            (up === '澤' && down === '天') ||
            (up === '火' && down === '雷') ||
            (up === '雷' && down === '火') ||
            (up === '風' && down === '水') ||
            (up === '水' && down === '風') ||
            (up === '山' && down === '地') ||
            (up === '地' && down === '山')) {
            return { shih: 5, ying: 2 };
        }

        return { shih: 0, ying: 0 };
    }

    /**
     * 取得天干
     * @param gua 卦
     * @param type 上或下卦 (僅坤使用)
     */
    private getHeavenlyStem(gua: Gua, type: 'UP' | 'DOWN'): HeavenlyStem {
        let text = '' as HeavenlyStem;
        switch (gua) {
            case '天':
                text = '甲';
                break;
            case '澤':
                text = '丁';
                break;
            case '火':
                text = '己';
                break;
            case '雷':
                text = '庚';
                break;
            case '風':
                text = '辛';
                break;
            case '水':
                text = '戊';
                break;
            case '山':
                text = '丙';
                break;
            case '地':
                switch (type) {
                    case 'UP':
                        text = '癸';
                        break;
                    case 'DOWN':
                        text = '乙';
                        break;
                }
                break;
        }
        return text;
    }
    // ************************ step 3: 裝卦:天干、世爻 子功能 END ************************
}