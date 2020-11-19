import {
    Gua, EarthlyBranch, Elements, Relative, IFullGua, SixYao,
    Yao, HeavenlyStems, Gung, GungName, ShihYingPosition, HeavenlyStem, PositionYao
} from './gua.interface';

class FullGua implements IFullGua {
    name!: string;
    description!: string;
    yao!: SixYao;
    hidden: PositionYao[] = [];
    HeavenlyStems!: HeavenlyStems;
    gung!: Gung;

    mutual: Yao[] = [];

    hint: string[] = [];
    constructor(name: string, description: string, yao: SixYao, heavenlyStems: HeavenlyStems, gung: Gung,
        hidden?: PositionYao[], mutual?: Yao[], hint?: string[]) {

        this.name = name;
        this.description = description;
        this.yao = yao;
        this.HeavenlyStems = heavenlyStems;
        this.gung = gung;
        if (mutual) {
            this.mutual = [...mutual];
        }

        if (hidden) {
            this.hidden = [...hidden];
        }

        if (hint) {
            this.hint = [...hint];
        }
    }

    /**
     * 增加卦的註解 (如六沖、六合、化進…等)
     * @param hint 註譯
     */
    addHint(hint: string): void {
        this.hint.push(hint);
    }
}
// tslint:disable-next-line: max-classes-per-file
export class FullGuaFactory {

    private readonly collisionHint = ['六沖卦'];
    private readonly suitHint = ['六合卦'];
    private readonly wanderHint = ['遊魂卦'];
    private readonly returnHint = ['歸魂卦'];
    /**
     * 產生全卦
     * @param up 上卦
     * @param down 下卦
     * @param mutual 動爻(數字陣列) -> 尚未開發。為便於產svg圖，在new FullGua裡會是`yao[]`。需要再增加一個function產生yao[]
     */
    create(up: Gua, down: Gua, mutual?: number[]) {
        mutual = undefined;
        switch (up) {
            case '天':
                if (down === '天') {
                    return new FullGua('乾為天', '旱象逢河', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        undefined, mutual, this.collisionHint);
                } else if (down === '澤') {
                    return new FullGua('天澤履', '如履薄冰', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }], mutual);
                } else if (down === '火') {
                    return new FullGua('天火同人', '仙人指路', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        undefined, mutual, this.returnHint);
                } else if (down === '雷') {
                    return new FullGua('天雷無妄', '宜守本份', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        undefined, mutual, this.collisionHint);
                } else if (down === '風') {
                    return new FullGua('天風垢', '他鄉遇友', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '寅', relative: '妻財', position: 2 }], mutual);
                } else if (down === '水') {
                    return new FullGua('天水訟', '兩人爭路', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }], mutual);
                } else if (down === '山') {
                    return new FullGua('天山遯', '濃雲蔽日', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }, { earthlyBranch: '寅', relative: '妻財', position: 2 }],
                        mutual);
                } else if (down === '地') {
                    return new FullGua('天地否', '虎落陷坑', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }],
                        mutual, this.suitHint);
                }
                break;
            case '澤':
                if (down === '天') {
                    return new FullGua('澤天夬', '遊蜂脫網', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                        mutual);
                } else if (down === '澤') {
                    return new FullGua('兌為澤', '趁水和泥', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        undefined, mutual, this.collisionHint);
                } else if (down === '火') {
                    return new FullGua('澤火革', '憂去喜來', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                        mutual);
                } else if (down === '雷') {
                    return new FullGua('澤雷隨', '推車靠崖', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '午', relative: '父母', position: 4 }], mutual, this.returnHint);
                } else if (down === '風') {
                    return new FullGua('澤風大過', '夜夢金銀', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '寅', relative: '兄弟', position: 2 }, { earthlyBranch: '午', relative: '子孫', position: 4 }],
                        mutual, this.wanderHint);
                } else if (down === '水') {
                    return new FullGua('澤水困', '守已待時', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        undefined, mutual, this.suitHint);
                } else if (down === '山') {
                    return new FullGua('澤山咸', '山澤通氣', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }],
                        mutual);
                } else if (down === '地') {
                    return new FullGua('澤地萃', '大有斬獲', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        undefined, mutual);
                }
                break;
            case '火':
                if (down === '天') {
                    return new FullGua('火天大有', '金玉滿堂', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        undefined, mutual, this.returnHint);
                } else if (down === '澤') {
                    return new FullGua('火澤睽', '兩情相違', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }], mutual);
                } else if (down === '火') {
                    return new FullGua('離為火', '天官賜福', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        undefined, mutual, this.collisionHint);
                } else if (down === '雷') {
                    return new FullGua('火雷噬嗑', '餓虎遇食', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        undefined, mutual);
                } else if (down === '風') {
                    return new FullGua('火風鼎', '餓人饑食', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '卯', relative: '父母', position: 2 }], mutual);
                } else if (down === '水') {
                    return new FullGua('火水未濟', '憂中望喜', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }], mutual);
                } else if (down === '山') {
                    return new FullGua('火山旅', '先甘後苦', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '卯', relative: '父母', position: 1 }, { earthlyBranch: '亥', relative: '官鬼', position: 3 }],
                        mutual, this.suitHint);
                } else if (down === '地') {
                    return new FullGua('火地晉', '鋤地得金', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }], mutual, this.wanderHint);
                }
                break;
            case '雷':
                if (down === '天') {
                    return new FullGua('雷天大壯', '先曲後順', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        undefined, mutual, this.collisionHint);
                } else if (down === '澤') {
                    return new FullGua('雷澤歸妹', '浮雲蔽日', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '亥', relative: '子孫', position: 4 }],
                        mutual, this.returnHint);
                } else if (down === '火') {
                    return new FullGua('雷火豐', '古鏡重明', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        undefined, mutual);
                } else if (down === '雷') {
                    return new FullGua('震為雷', '金鐘夜響', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        undefined, mutual, this.collisionHint);
                } else if (down === '風') {
                    return new FullGua('雷風恆', '日月常明', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '寅', relative: '兄弟', position: 2 }], mutual);
                } else if (down === '水') {
                    return new FullGua('雷水解', '困人出獄', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '子', relative: '父母', position: 1 }], mutual);
                } else if (down === '山') {
                    return new FullGua('雷山小過', '過獨木橋', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }, { earthlyBranch: '亥', relative: '子孫', position: 4 }],
                        mutual, this.wanderHint);
                } else if (down === '地') {
                    return new FullGua('雷地豫', '青龍得位', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '子', relative: '父母', position: 1 }],
                        mutual, this.suitHint);
                }
                break;
            case '風':
                if (down === '天') {
                    return new FullGua('風天小畜', '密雲不雨', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        mutual);
                } else if (down === '澤') {
                    return new FullGua('風澤中孚', '謹慎保守', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '申', relative: '子孫', position: 2 }, { earthlyBranch: '子', relative: '妻財', position: 5 }],
                        mutual, this.wanderHint);
                } else if (down === '火') {
                    return new FullGua('風火家人', '鏡中觀花', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        mutual);
                } else if (down === '雷') {
                    return new FullGua('風雷益', '枯木開花', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        mutual);
                } else if (down === '風') {
                    return new FullGua('巽為風', '動極思靜', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        undefined, mutual, this.collisionHint);
                } else if (down === '水') {
                    return new FullGua('風水渙', '隔河望金', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }, { earthlyBranch: '酉', relative: '妻財', position: 4 }],
                        mutual);
                } else if (down === '山') {
                    return new FullGua('風山漸', '飄浮不定', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '酉', relative: '妻財', position: 4 }, { earthlyBranch: '亥', relative: '官鬼', position: 3 }],
                        mutual, this.returnHint);
                } else if (down === '地') {
                    return new FullGua('風地觀', '接受觀摩', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }, { earthlyBranch: '申', relative: '兄弟', position: 5 }],
                        mutual);
                }
                break;
            case '水':
                break;
            case '山':
                break;
            case '地':
                break;
        }
    }

    /**
     * 產生六爻(地支 + 六親)
     * @param down 下卦
     * @param up 上卦
     * @param gungElement 宮的五行
     * @return 六爻(地支 + 六親)
     */
    private genSixYao(down: Gua, up: Gua, gungElement: Elements): SixYao {
        const earthlyBranches = [...this.getEarthlyBranch(down, 'DOWN'), ...this.getEarthlyBranch(up, 'UP')];
        return {
            one: {
                earthlyBranch: earthlyBranches[0],
                relative: this.getRelative(gungElement, earthlyBranches[0])
            },
            two: {
                earthlyBranch: earthlyBranches[1],
                relative: this.getRelative(gungElement, earthlyBranches[1])
            },
            three: {
                earthlyBranch: earthlyBranches[2],
                relative: this.getRelative(gungElement, earthlyBranches[2])
            },
            four: {
                earthlyBranch: earthlyBranches[3],
                relative: this.getRelative(gungElement, earthlyBranches[3])
            },
            five: {
                earthlyBranch: earthlyBranches[4],
                relative: this.getRelative(gungElement, earthlyBranches[4])
            },
            six: {
                earthlyBranch: earthlyBranches[5],
                relative: this.getRelative(gungElement, earthlyBranches[5])
            }
        };
    }

    /**
     * 產生天干、世應位置
     * @param down 下卦
     * @param up 上卦
     * @return 天干與世應位置
     */
    private genHeavenlyStems(down: Gua, up: Gua): HeavenlyStems {
        const shihYingPosition = this.calculateShinYing(down, up);
        let shih!: HeavenlyStem;
        let ying!: HeavenlyStem;
        if (shihYingPosition.shih >= 4) {
            // 世爻在上
            shih = this.getHeavenlyStem(up, 'UP');
            ying = this.getHeavenlyStem(down, 'DOWN');
        } else {
            // 世爻在下
            shih = this.getHeavenlyStem(down, 'DOWN');
            ying = this.getHeavenlyStem(up, 'UP');
        }

        return {
            shihPosition: shihYingPosition.shih,
            shih,
            yingPosition: shihYingPosition.ying,
            ying
        }
    }

    /**
     * 產生宮
     * @param gungName 宮
     * @return 宮
     */
    private genGung(gungName: GungName): Gung {
        return {
            name: gungName,
            element: this.getGungElement(gungName)
        }
    }

    /**
     *
     * @param gua 卦
     * @param position UP或DOWN，傳入上卦或下卦
     * @return 填寫地支
     */
    private getEarthlyBranch(gua: Gua, position: 'UP' | 'DOWN'): EarthlyBranch[] {

        let earthlyBranches!: EarthlyBranch[];
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

        return earthlyBranches;
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

    /**
     * 取得宮的五行
     * @param gungName 宮
     * @return 宮的五行
     */
    private getGungElement(gungName: GungName): Elements {
        let text!: Elements;
        switch (gungName) {
            case '乾':
            case '兌':
                text = '金'
                break;
            case '離':
                text = '火';
                break;
            case '震':
            case '巽':
                text = '木';
                break;
            case '坎':
                text = '水';
                break;
            case '艮':
            case '坤':
                text = '土';
                break;
        }
        return text;
    }
}