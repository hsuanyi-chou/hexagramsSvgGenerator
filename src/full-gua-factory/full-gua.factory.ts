import {
    Gua, EarthlyBranch, Elements, Relative,
    HeavenlyStems, Gung, GungName, ShihYingPosition, HeavenlyStem, Yao, YingYangYao
} from '../gua.interface';
import { FullGua } from './full-gua';

// tslint:disable-next-line: no-var-requires
const lunarCalendar = require('lunar-calendar-zh');

enum MONSTER {
    DRAGON = 0, // 青龍
    LINNET = 1, // 朱雀
    GOU_CHEN = 2, // 勾陳
    SNAKE = 3, // 呈蛇
    TIGER = 4, // 白虎
    TORTOISE = 5, // 玄武
}

export class FullGuaFactory {

    private readonly collisionHint = ['六沖卦'];
    private readonly suitHint = ['六合卦'];
    private readonly wanderHint = ['遊魂卦'];
    private readonly returnHint = ['歸魂卦'];

    private readonly MONSTERS_ARRAY = ['青龍', '朱雀', '勾陳', '呈蛇', '白虎', '玄武'];
    private readonly HEAVENLY_STEMS: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    private readonly EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    private readonly lunarCalendar = lunarCalendar;
    /**
     * 產生全卦
     * @param up 上卦
     * @param down 下卦
     * @param mutual 動爻(數字陣列)
     */
    create(up: Gua, down: Gua, mutual?: number[], date?: Date): FullGua {
        if (up !== '天' && up !== '澤' && up !== '火' && up !== '雷' &&
            up !== '風' && up !== '水' && up !== '山' && up !== '地') {
            throw new Error('上爻(up)僅能傳入：天、澤、火、雷、風、水、山、地');
        }
        
        if (down !== '天' && down !== '澤' && down !== '火' && down !== '雷' &&
            down !== '風' && down !== '水' && down !== '山' && down !== '地') {
            throw new Error('下爻(down)僅能傳入：天、澤、火、雷、風、水、山、地');
        }
        let fullGua: FullGua = new FullGua('乾為天', '旱象逢河', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        undefined, this.collisionHint);
        switch (up) {
            case '天':
                if (down === '天') {
                    fullGua = new FullGua('乾為天', '旱象逢河', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        undefined, this.collisionHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('天澤履', '行走薄冰', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }], );
                } else if (down === '火') {
                    fullGua = new FullGua('天火同人', '仙人指路', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        undefined, this.returnHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('天雷無妄', '宜守本分', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        undefined, this.collisionHint);
                } else if (down === '風') {
                    fullGua = new FullGua('天風姤', '他鄉遇友', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '寅', relative: '妻財', position: 2 }], );
                } else if (down === '水') {
                    fullGua = new FullGua('天水訟', '二人爭路', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }], );
                } else if (down === '山') {
                    fullGua = new FullGua('天山遯', '濃雲蔽日', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }, { earthlyBranch: '寅', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('天地否', '虎落陷坑', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }],
                     this.suitHint);
                }
                break;
            case '澤':
                if (down === '天') {
                    fullGua = new FullGua('澤天夬', '遊蜂脫網', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('兌為澤', '趁水和泥', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        undefined, this.collisionHint);
                } else if (down === '火') {
                    fullGua = new FullGua('澤火革', '憂去喜來', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                        );
                } else if (down === '雷') {
                    fullGua = new FullGua('澤雷隨', '推車靠崖', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '午', relative: '父母', position: 4 }], this.returnHint);
                } else if (down === '風') {
                    fullGua = new FullGua('澤風大過', '夜夢金銀', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '寅', relative: '兄弟', position: 2 }, { earthlyBranch: '午', relative: '子孫', position: 4 }],
                     this.wanderHint);
                } else if (down === '水') {
                    fullGua = new FullGua('澤水困', '守己待時', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        undefined, this.suitHint);
                } else if (down === '山') {
                    fullGua = new FullGua('澤山咸', '山澤通氣', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('澤地萃', '大有斬獲', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        undefined, );
                }
                break;
            case '火':
                if (down === '天') {
                    fullGua = new FullGua('火天大有', '金玉滿堂', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        undefined, this.returnHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('火澤睽', '兩情相違', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }], );
                } else if (down === '火') {
                    fullGua = new FullGua('離為火', '天官賜福', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        undefined, this.collisionHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('火雷噬嗑', '餓虎遇食', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        undefined, );
                } else if (down === '風') {
                    fullGua = new FullGua('火風鼎', '餓人饑食', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '卯', relative: '父母', position: 2 }], );
                } else if (down === '水') {
                    fullGua = new FullGua('火水未濟', '憂中望喜', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }], );
                } else if (down === '山') {
                    fullGua = new FullGua('火山旅', '先甘後苦', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '卯', relative: '父母', position: 1 }, { earthlyBranch: '亥', relative: '官鬼', position: 3 }],
                     this.suitHint);
                } else if (down === '地') {
                    fullGua = new FullGua('火地晉', '鋤地得金', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }], this.wanderHint);
                }
                break;
            case '雷':
                if (down === '天') {
                    fullGua = new FullGua('雷天大壯', '先曲後順', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        undefined, this.collisionHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('雷澤歸妹', '浮雲蔽日', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '亥', relative: '子孫', position: 4 }],
                     this.returnHint);
                } else if (down === '火') {
                    fullGua = new FullGua('雷火豐', '古鏡重明', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        undefined, );
                } else if (down === '雷') {
                    fullGua = new FullGua('震為雷', '金鐘夜響', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        undefined, this.collisionHint);
                } else if (down === '風') {
                    fullGua = new FullGua('雷風恆', '日月常明', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '寅', relative: '兄弟', position: 2 }], );
                } else if (down === '水') {
                    fullGua = new FullGua('雷水解', '困人出獄', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '子', relative: '父母', position: 1 }], );
                } else if (down === '山') {
                    fullGua = new FullGua('雷山小過', '過獨木橋', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }, { earthlyBranch: '亥', relative: '子孫', position: 4 }],
                     this.wanderHint);
                } else if (down === '地') {
                    fullGua = new FullGua('雷地豫', '青龍得位', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '子', relative: '父母', position: 1 }],
                     this.suitHint);
                }
                break;
            case '風':
                if (down === '天') {
                    fullGua = new FullGua('風天小畜', '密雲不雨', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('風澤中孚', '謹慎保守', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '申', relative: '子孫', position: 3 }, { earthlyBranch: '子', relative: '妻財', position: 5 }],
                     this.wanderHint);
                } else if (down === '火') {
                    fullGua = new FullGua('風火家人', '鏡中觀花', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        );
                } else if (down === '雷') {
                    fullGua = new FullGua('風雷益', '枯木開花', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        );
                } else if (down === '風') {
                    fullGua = new FullGua('巽為風', '動極思靜', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        undefined, this.collisionHint);
                } else if (down === '水') {
                    fullGua = new FullGua('風水渙', '隔河望金', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }, { earthlyBranch: '酉', relative: '妻財', position: 4 }],
                        );
                } else if (down === '山') {
                    fullGua = new FullGua('風山漸', '飄浮不定', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }],
                     this.returnHint);
                } else if (down === '地') {
                    fullGua = new FullGua('風地觀', '接受觀摩', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }, { earthlyBranch: '申', relative: '兄弟', position: 5 }],
                        );
                }
                break;
            case '水':
                if (down === '天') {
                    fullGua = new FullGua('水天需', '明珠出土', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('水澤節', '封神斬將', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        undefined, this.suitHint);
                } else if (down === '火') {
                    fullGua = new FullGua('水火既濟', '金榜題名', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                        );
                } else if (down === '雷') {
                    fullGua = new FullGua('水雷屯', '亂絲無頭', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                        );
                } else if (down === '風') {
                    fullGua = new FullGua('水風井', '枯井生泉', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '午', relative: '子孫', position: 4 }, { earthlyBranch: '寅', relative: '兄弟', position: 2 }],
                        );
                } else if (down === '水') {
                    fullGua = new FullGua('坎為水', '水中撈月', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        undefined, this.collisionHint);
                } else if (down === '山') {
                    fullGua = new FullGua('水山蹇', '跛腳走路', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('水地比', '船得順風', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        undefined, this.returnHint);
                }
                break;
            case '山':
                if (down === '天') {
                    fullGua = new FullGua('山天大畜', '陣勢得開', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '午', relative: '父母', position: 2 }, { earthlyBranch: '申', relative: '子孫', position: 3 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('山澤損', '勞心苦戰', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '申', relative: '子孫', position: 3 }],
                        );
                } else if (down === '火') {
                    fullGua = new FullGua('山火賁', '萌芽出土', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        [{ earthlyBranch: '申', relative: '子孫', position: 3 }, { earthlyBranch: '午', relative: '父母', position: 2 }],
                     this.suitHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('山雷頤', '渭水訪賢', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }, { earthlyBranch: '巳', relative: '子孫', position: 5 }],
                     this.wanderHint);
                } else if (down === '風') {
                    fullGua = new FullGua('山風蠱', '百事不順', this.genSixYao(down, up, this.getGungElement('巽')),
                        this.genHeavenlyStems(down, up), this.genGung('巽'),
                        [{ earthlyBranch: '巳', relative: '子孫', position: 5 }],
                     this.returnHint);
                } else if (down === '水') {
                    fullGua = new FullGua('山水蒙', '小鬼偷錢', this.genSixYao(down, up, this.getGungElement('離')),
                        this.genHeavenlyStems(down, up), this.genGung('離'),
                        [{ earthlyBranch: '酉', relative: '妻財', position: 4 }],
                        );
                } else if (down === '山') {
                    fullGua = new FullGua('艮為山', '安靜無虧', this.genSixYao(down, up, this.getGungElement('艮')),
                        this.genHeavenlyStems(down, up), this.genGung('艮'),
                        undefined, this.collisionHint);
                } else if (down === '地') {
                    fullGua = new FullGua('山地剝', '瑣碎事多', this.genSixYao(down, up, this.getGungElement('乾')),
                        this.genHeavenlyStems(down, up), this.genGung('乾'),
                        [{ earthlyBranch: '申', relative: '兄弟', position: 5 }],
                        );
                }
                break;
            case '地':
                if (down === '天') {
                    fullGua = new FullGua('地天泰', '喜抱三元', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                     this.suitHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('地澤臨', '發政施仁', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        undefined, );
                } else if (down === '火') {
                    fullGua = new FullGua('地火明夷', '謹慎保守', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                     this.wanderHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('地雷復', '夫妻反目', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                     this.suitHint);
                } else if (down === '風') {
                    fullGua = new FullGua('地風升', '指日高升', this.genSixYao(down, up, this.getGungElement('震')),
                        this.genHeavenlyStems(down, up), this.genGung('震'),
                        [{ earthlyBranch: '午', relative: '子孫', position: 4 }, { earthlyBranch: '寅', relative: '兄弟', position: 2 }],
                        );
                } else if (down === '水') {
                    fullGua = new FullGua('地水師', '馬到成功', this.genSixYao(down, up, this.getGungElement('坎')),
                        this.genHeavenlyStems(down, up), this.genGung('坎'),
                        undefined, this.returnHint);
                } else if (down === '山') {
                    fullGua = new FullGua('地山謙', '二人分金', this.genSixYao(down, up, this.getGungElement('兌')),
                        this.genHeavenlyStems(down, up), this.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('坤為地', '包容萬象', this.genSixYao(down, up, this.getGungElement('坤')),
                        this.genHeavenlyStems(down, up), this.genGung('坤'),
                        undefined, this.collisionHint);
                }
                break;
        }

        if (mutual && mutual.length !== 0) {
            this.genMutual(up, down, mutual, fullGua);
        }

        if (date) {
            this.genDate(fullGua, date);
            this.genMonster(fullGua);
        }
        return fullGua;
    }

    /**
     * 產生六爻(地支 + 六親)
     * @param down 下卦
     * @param up 上卦
     * @param gungElement 宮的五行
     * @return 六爻(地支 + 六親)
     */
    private genSixYao(down: Gua, up: Gua, gungElement: Elements): Yao[] {
        const earthlyBranches = [...this.getEarthlyBranch(down, 'DOWN'), ...this.getEarthlyBranch(up, 'UP')];
        const isYangYao = [...this.genIsYangYao(down), ...this.genIsYangYao(up)];
        return earthlyBranches.map((e, i) => ({earthlyBranch: e, relative: this.getRelative(gungElement, e), position: i + 1, isYangYao: isYangYao[i], void: false}))
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
     * 增加日期
     * @param date 國曆日期
     */
    private genDate(fullGua: FullGua, date: Date): void {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        fullGua.solarDate = `${year}-${month}-${day}`;
        const fullLunar = this.lunarCalendar.solarToLunar(year, month, day);
        fullGua.lunarDate = `${fullLunar.lunarYear}-${fullLunar.lunarMonth}-${fullLunar.lunarDay}`;
        fullGua.lunarYear = fullLunar.GanZhiYear;
        fullGua.lunarMonth = fullLunar.GanZhiMonth;
        fullGua.lunarDay = fullLunar.GanZhiDay;
        fullGua.void = this.calculateVoid(fullLunar.GanZhiDay.charAt(0), fullLunar.GanZhiDay.charAt(1));
        this.filledVoid(fullGua);
    }

    /**
     * 增加六獸
     * @param fullGua 卦
     */
    private genMonster(fullGua: FullGua): void {
        const stem: HeavenlyStem = fullGua.lunarDay.charAt(0) as HeavenlyStem;
        switch (stem) {
            case '甲':
            case '乙':
                this.filledMonster(fullGua, MONSTER.DRAGON);
                break;
            case '丙':
            case '丁':
                this.filledMonster(fullGua, MONSTER.LINNET);
                break;
            case '戊':
                this.filledMonster(fullGua, MONSTER.GOU_CHEN);
                break;
            case '己':
                this.filledMonster(fullGua, MONSTER.SNAKE);
                break;
            case '庚':
            case '辛':
                this.filledMonster(fullGua, MONSTER.TIGER);
                break;
            case '壬':
            case '癸':
                this.filledMonster(fullGua, MONSTER.TORTOISE);
                break;
        }
    }

    private genMutual(up: Gua, down: Gua, mutual: number[], fullGua: FullGua) {
        const mutualFullGua = this.getMutualFullGua(up, down, mutual);
        fullGua.mutual = mutual.map( n => ({
            earthlyBranch: mutualFullGua.yao[n - 1].earthlyBranch,
            position: mutualFullGua.yao[n - 1].position,
            relative: this.getRelative(fullGua.gung.element, mutualFullGua.yao[n - 1].earthlyBranch),
            void: false
            })
        );

        if (mutualFullGua.name.search('為') > 0) {
            fullGua.name += `之${mutualFullGua.name.charAt(0)}`;
        } else {
            fullGua.name += `之${mutualFullGua.name.substring(2)}`;
        }
        fullGua.description += `，${mutualFullGua.description}`;
    }

    /**
     * 每一爻填上六獸
     */
    private filledMonster(fullGua: FullGua, begin: number): void {
        fullGua.yao.forEach( y => {
            y.monster = this.MONSTERS_ARRAY[begin];
            begin = (begin + 1) % 6;
        });
    }

    /**
     * 每一爻填上空亡
     * @param fullGua 卦
     */
    private filledVoid(fullGua: FullGua): void {
        fullGua.yao.forEach(y => {
            y.void = fullGua.void.includes(y.earthlyBranch);
        });

        fullGua.mutual.forEach(y => {
            y.void = fullGua.void.includes(y.earthlyBranch);
        });

        fullGua.hidden.forEach(y => {
            y.void = fullGua.void.includes(y.earthlyBranch);
        });
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
     * @param gua 卦
     * @return 是否陽爻陣列
     */
    private genIsYangYao(gua: Gua): boolean[] {
        let isYangYao: boolean[];
        switch (gua) {
            case '天':
                isYangYao = [true, true, true];
                break;
            case '澤':
                isYangYao = [true, true, false];
                break;
            case '火':
                isYangYao = [true, false, true];
                break;
            case '雷':
                isYangYao = [true, false, false];
                break;
            case '風':
                isYangYao = [false, true, true];
                break;
            case '水':
                isYangYao = [false, true, false];
                break;
            case '山':
                isYangYao = [false, false, true];
                break;
            case '地':
                isYangYao = [false, false, false];
                break;
        }

        return isYangYao!;
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
     * 計算空亡
     * @param 日天干
     * @param 日地支
     * @return 空亡陣列
     */
    private calculateVoid(stem: HeavenlyStem, earthly: EarthlyBranch): EarthlyBranch[] {
        const beginIndex = this.EARTHLY_BRANCHES.findIndex(e => e === earthly); // 找到地支起點
        const backwardCount = this.HEAVENLY_STEMS.findIndex(s => s === stem); // 往後數天干

        const voidIndex = beginIndex - backwardCount - 2;
        const voidBegin = voidIndex < 0 ? 12 - Math.abs(voidIndex) : voidIndex;
        return [this.EARTHLY_BRANCHES[voidBegin], this.EARTHLY_BRANCHES[voidBegin + 1]];
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

    /**
     * 取得變卦
     * @param up 上卦
     * @param down 下卦
     * @param mutual 動爻陣列
     * @return 變卦全卦
     */
    private getMutualFullGua(up: Gua, down: Gua, mutual: number[]): FullGua {
        let mutualGuaYingYang = this.transGuaToYingYangYao(down) + this.transGuaToYingYangYao(up);
        
        for (const n of mutual) {
            switch (mutualGuaYingYang.charAt(n - 1)) {
                case '0':
                    mutualGuaYingYang = this.replaceAt(mutualGuaYingYang, n - 1, '1');
                    break;
                case '1':
                    mutualGuaYingYang = this.replaceAt(mutualGuaYingYang, n - 1, '0');
                    break;
            }
        }

        const mutualDown = this.transYingYangYaoToGua(mutualGuaYingYang.substring(0, 3) as YingYangYao);
        const mutualUp = this.transYingYangYaoToGua(mutualGuaYingYang.substring(3, 6) as YingYangYao);
        return this.create(mutualUp, mutualDown);
    }

    /**
     * 將半卦轉成數字，用於做動爻轉換
     * @param gua 卦
     */
    private transGuaToYingYangYao(gua: Gua): YingYangYao {
        let yao: YingYangYao = '111';
        switch (gua) {
            case '天':
                yao = '111';
                break;
            case '澤':
                yao = '110';
                break;
            case '火':
                yao = '101';
                break;
            case '雷':
                yao = '100';
                break;
            case '風':
                yao = '011';
                break;
            case '水':
                yao = '010';
                break;
            case '山':
                yao = '001';
                break;
            case '地':
                yao = '000';
                break;
        }
        return yao;
    }

    /**
     * 將數字半卦轉換回爻，方可使用create產卦
     * @param 陰陽爻
     */
    private transYingYangYaoToGua(yingYangYao: YingYangYao): Gua {
        let gua: Gua = '天';
        switch (yingYangYao) {
            case '111':
                gua = '天'
                break;
            case '110':
                gua = '澤';
                break;
            case '101':
                gua = '火';
                break;
            case '100':
                gua = '雷';
                break;
            case '011':
                gua = '風';
                break;
            case '010':
                gua = '水';
                break;
            case '001':
                gua = '山';
                break;
            case '000':
                gua = '地';
                break;
        }
        return gua;
    }

    /**
     * 
     * @param str 原始字串
     * @param index 位置
     * @param replacement 取代的內容
     */
    private replaceAt(str: string, index: number, replacement: string): string {
        return str.substr(0, index) + replacement + str.substr(index + replacement.length);
    }
}