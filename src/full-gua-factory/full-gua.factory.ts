import {
    Gua, EarthlyBranch, Elements, Relative,
    HeavenlyStems, Gung, GungName, ShihYingPosition, HeavenlyStem, Yao, YingYangYao,
} from '../gua.interface';
import { BatchFateGuaParams, CreateFateGuaParams, CreateParams, GenFateGuaParams } from '../params.interface';
import { FullGua } from './full-gua';
import dayjs from 'dayjs';
import { Lunar, I18n } from 'lunar-typescript';
import { BatchFateGuaSolver } from '../solvers/solver.batch-fate-gua';
import { getElement } from '../util/util';
import { guaWords } from './guaWords';
import { CHT } from '../config/lunar-typescript/lunar.cht';
import { isChangeJeiQi } from '../config/lunar-typescript/jei-qi.config';
import { GOD_72, GOD_OF_WEALTH, GUA_SERIAL_SONG, HEART_SONG } from './scripture-content.constant';


enum MONSTER {
    DRAGON = 0,     // 青龍
    LINNET = 1,     // 朱雀
    GOU_CHEN = 2,   // 勾陳
    SNAKE = 3,      // 呈蛇
    TIGER = 4,      // 白虎
    TORTOISE = 5,   // 玄武
}

export class FullGuaFactory {

    private readonly collisionHint = ['六沖卦'];
    private readonly suitHint = ['六合卦'];
    private readonly wanderHint = ['遊魂卦'];
    private readonly returnHint = ['歸魂卦'];

    private readonly MONSTERS_ARRAY = ['青龍', '朱雀', '勾陳', '呈蛇', '白虎', '玄武'];
    private readonly HEAVENLY_STEMS: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    private readonly EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    constructor() {
        I18n.setMessages('cht', CHT);
        I18n.setLanguage('cht');
    }
    /**
     * 產生全卦
     * @param up 上卦
     * @param down 下卦
     * @param mutual 動爻(數字陣列)
     * @param date 時間
     * @param cutAt2300 是否 23:00 換日
     * @param thing 事由
     * @return 全卦
     */
    create({ up, down, mutual, date, cutAt2300, thing }: CreateParams): FullGua {
        if (up !== '天' && up !== '澤' && up !== '火' && up !== '雷' &&
            up !== '風' && up !== '水' && up !== '山' && up !== '地') {
            throw new Error('上爻(up)僅能傳入：天、澤、火、雷、風、水、山、地');
        }
        
        if (down !== '天' && down !== '澤' && down !== '火' && down !== '雷' &&
            down !== '風' && down !== '水' && down !== '山' && down !== '地') {
            throw new Error('下爻(down)僅能傳入：天、澤、火、雷、風、水、山、地');
        }
        let fullGua: FullGua = new FullGua('乾為天', '旱象逢河', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        undefined, this.collisionHint);
        switch (up) {
            case '天':
                if (down === '天') {
                    fullGua = new FullGua('乾為天', '旱象逢河', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        undefined, this.collisionHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('天澤履', '行走薄冰', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }], );
                } else if (down === '火') {
                    fullGua = new FullGua('天火同人', '仙人指路', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        undefined, this.returnHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('天雷無妄', '宜守本分', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        undefined, this.collisionHint);
                } else if (down === '風') {
                    fullGua = new FullGua('天風姤', '他鄉遇友', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        [{ earthlyBranch: '寅', relative: '妻財', position: 2 }], );
                } else if (down === '水') {
                    fullGua = new FullGua('天水訟', '二人爭路', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }], );
                } else if (down === '山') {
                    fullGua = new FullGua('天山遯', '濃雲蔽日', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }, { earthlyBranch: '寅', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('天地否', '虎落陷坑', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }],
                     this.suitHint);
                }
                break;
            case '澤':
                if (down === '天') {
                    fullGua = new FullGua('澤天夬', '遊蜂脫網', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('兌為澤', '趁水和泥', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        undefined, this.collisionHint);
                } else if (down === '火') {
                    fullGua = new FullGua('澤火革', '憂去喜來', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                        );
                } else if (down === '雷') {
                    fullGua = new FullGua('澤雷隨', '推車靠崖', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        [{ earthlyBranch: '午', relative: '子孫', position: 4 }], this.returnHint);
                } else if (down === '風') {
                    fullGua = new FullGua('澤風大過', '夜夢金銀', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        [{ earthlyBranch: '寅', relative: '兄弟', position: 2 }, { earthlyBranch: '午', relative: '子孫', position: 4 }],
                     this.wanderHint);
                } else if (down === '水') {
                    fullGua = new FullGua('澤水困', '守己待時', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        undefined, this.suitHint);
                } else if (down === '山') {
                    fullGua = new FullGua('澤山咸', '山澤通氣', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('澤地萃', '大有斬獲', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        undefined, );
                }
                break;
            case '火':
                if (down === '天') {
                    fullGua = new FullGua('火天大有', '金玉滿堂', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        undefined, this.returnHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('火澤睽', '兩情相違', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }], );
                } else if (down === '火') {
                    fullGua = new FullGua('離為火', '天官賜福', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        undefined, this.collisionHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('火雷噬嗑', '餓虎遇食', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        undefined, );
                } else if (down === '風') {
                    fullGua = new FullGua('火風鼎', '餓人饑食', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        [{ earthlyBranch: '卯', relative: '父母', position: 2 }], );
                } else if (down === '水') {
                    fullGua = new FullGua('火水未濟', '憂中望喜', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }], );
                } else if (down === '山') {
                    fullGua = new FullGua('火山旅', '先甘後苦', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        [{ earthlyBranch: '卯', relative: '父母', position: 1 }, { earthlyBranch: '亥', relative: '官鬼', position: 3 }],
                     this.suitHint);
                } else if (down === '地') {
                    fullGua = new FullGua('火地晉', '鋤地得金', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }], this.wanderHint);
                }
                break;
            case '雷':
                if (down === '天') {
                    fullGua = new FullGua('雷天大壯', '先曲後順', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        undefined, this.collisionHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('雷澤歸妹', '浮雲蔽日', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        [{ earthlyBranch: '亥', relative: '子孫', position: 4 }],
                     this.returnHint);
                } else if (down === '火') {
                    fullGua = new FullGua('雷火豐', '古鏡重明', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        undefined, );
                } else if (down === '雷') {
                    fullGua = new FullGua('震為雷', '金鐘夜響', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        undefined, this.collisionHint);
                } else if (down === '風') {
                    fullGua = new FullGua('雷風恆', '日月常明', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        [{ earthlyBranch: '寅', relative: '兄弟', position: 2 }], );
                } else if (down === '水') {
                    fullGua = new FullGua('雷水解', '困人出獄', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        [{ earthlyBranch: '子', relative: '父母', position: 1 }], );
                } else if (down === '山') {
                    fullGua = new FullGua('雷山小過', '過獨木橋', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }, { earthlyBranch: '亥', relative: '子孫', position: 4 }],
                     this.wanderHint);
                } else if (down === '地') {
                    fullGua = new FullGua('雷地豫', '青龍得位', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        [{ earthlyBranch: '子', relative: '父母', position: 1 }],
                     this.suitHint);
                }
                break;
            case '風':
                if (down === '天') {
                    fullGua = new FullGua('風天小畜', '密雲不雨', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('風澤中孚', '謹慎保守', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        [{ earthlyBranch: '申', relative: '子孫', position: 3 }, { earthlyBranch: '子', relative: '妻財', position: 5 }],
                     this.wanderHint);
                } else if (down === '火') {
                    fullGua = new FullGua('風火家人', '鏡中觀花', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        );
                } else if (down === '雷') {
                    fullGua = new FullGua('風雷益', '枯木開花', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }],
                        );
                } else if (down === '風') {
                    fullGua = new FullGua('巽為風', '動極思靜', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        undefined, this.collisionHint);
                } else if (down === '水') {
                    fullGua = new FullGua('風水渙', '隔河望金', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        [{ earthlyBranch: '亥', relative: '官鬼', position: 3 }, { earthlyBranch: '酉', relative: '妻財', position: 4 }],
                        );
                } else if (down === '山') {
                    fullGua = new FullGua('風山漸', '飄浮不定', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        [{ earthlyBranch: '子', relative: '妻財', position: 5 }],
                     this.returnHint);
                } else if (down === '地') {
                    fullGua = new FullGua('風地觀', '接受觀摩', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        [{ earthlyBranch: '子', relative: '子孫', position: 1 }, { earthlyBranch: '申', relative: '兄弟', position: 5 }],
                        );
                }
                break;
            case '水':
                if (down === '天') {
                    fullGua = new FullGua('水天需', '明珠出土', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('水澤節', '封神斬將', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        undefined, this.suitHint);
                } else if (down === '火') {
                    fullGua = new FullGua('水火既濟', '金榜題名', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                        );
                } else if (down === '雷') {
                    fullGua = new FullGua('水雷屯', '亂絲無頭', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                        );
                } else if (down === '風') {
                    fullGua = new FullGua('水風井', '枯井生泉', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        [{ earthlyBranch: '午', relative: '子孫', position: 4 }, { earthlyBranch: '寅', relative: '兄弟', position: 2 }],
                        );
                } else if (down === '水') {
                    fullGua = new FullGua('坎為水', '水中撈月', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        undefined, this.collisionHint);
                } else if (down === '山') {
                    fullGua = new FullGua('水山蹇', '跛腳走路', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('水地比', '船得順風', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        undefined, this.returnHint);
                }
                break;
            case '山':
                if (down === '天') {
                    fullGua = new FullGua('山天大畜', '陣勢得開', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        [{ earthlyBranch: '午', relative: '父母', position: 2 }, { earthlyBranch: '申', relative: '子孫', position: 3 }],
                        );
                } else if (down === '澤') {
                    fullGua = new FullGua('山澤損', '勞心苦戰', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        [{ earthlyBranch: '申', relative: '子孫', position: 3 }],
                        );
                } else if (down === '火') {
                    fullGua = new FullGua('山火賁', '萌芽出土', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        [{ earthlyBranch: '申', relative: '子孫', position: 3 }, { earthlyBranch: '午', relative: '父母', position: 2 }],
                     this.suitHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('山雷頤', '渭水訪賢', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        [{ earthlyBranch: '酉', relative: '官鬼', position: 3 }, { earthlyBranch: '巳', relative: '子孫', position: 5 }],
                     this.wanderHint);
                } else if (down === '風') {
                    fullGua = new FullGua('山風蠱', '百事不順', this.genSixYao(down, up, FullGuaFactory.getGungElement('巽')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('巽'),
                        [{ earthlyBranch: '巳', relative: '子孫', position: 5 }],
                     this.returnHint);
                } else if (down === '水') {
                    fullGua = new FullGua('山水蒙', '小鬼偷錢', this.genSixYao(down, up, FullGuaFactory.getGungElement('離')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('離'),
                        [{ earthlyBranch: '酉', relative: '妻財', position: 4 }],
                        );
                } else if (down === '山') {
                    fullGua = new FullGua('艮為山', '安靜無虧', this.genSixYao(down, up, FullGuaFactory.getGungElement('艮')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('艮'),
                        undefined, this.collisionHint);
                } else if (down === '地') {
                    fullGua = new FullGua('山地剝', '瑣碎事多', this.genSixYao(down, up, FullGuaFactory.getGungElement('乾')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('乾'),
                        [{ earthlyBranch: '申', relative: '兄弟', position: 5 }],
                        );
                }
                break;
            case '地':
                if (down === '天') {
                    fullGua = new FullGua('地天泰', '喜抱三元', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                     this.suitHint);
                } else if (down === '澤') {
                    fullGua = new FullGua('地澤臨', '發政施仁', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        undefined, );
                } else if (down === '火') {
                    fullGua = new FullGua('地火明夷', '謹慎保守', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        [{ earthlyBranch: '午', relative: '妻財', position: 3 }],
                     this.wanderHint);
                } else if (down === '雷') {
                    fullGua = new FullGua('地雷復', '夫妻反目', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        [{ earthlyBranch: '巳', relative: '父母', position: 2 }],
                     this.suitHint);
                } else if (down === '風') {
                    fullGua = new FullGua('地風升', '指日高升', this.genSixYao(down, up, FullGuaFactory.getGungElement('震')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('震'),
                        [{ earthlyBranch: '午', relative: '子孫', position: 4 }, { earthlyBranch: '寅', relative: '兄弟', position: 2 }],
                        );
                } else if (down === '水') {
                    fullGua = new FullGua('地水師', '馬到成功', this.genSixYao(down, up, FullGuaFactory.getGungElement('坎')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坎'),
                        undefined, this.returnHint);
                } else if (down === '山') {
                    fullGua = new FullGua('地山謙', '二人分金', this.genSixYao(down, up, FullGuaFactory.getGungElement('兌')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('兌'),
                        [{ earthlyBranch: '卯', relative: '妻財', position: 2 }],
                        );
                } else if (down === '地') {
                    fullGua = new FullGua('坤為地', '包容萬象', this.genSixYao(down, up, FullGuaFactory.getGungElement('坤')),
                        FullGuaFactory.genHeavenlyStems(down, up), FullGuaFactory.genGung('坤'),
                        undefined, this.collisionHint);
                }
                break;
        }

        if (mutual.length !== 0) {
            this.genMutual(up, down, mutual, fullGua);
            this.addMutualScripture(fullGua, mutual);
        }
        this.addScriptures(fullGua);

        fullGua.addGenGuaBase({ up, down, date, mutual, thing });
        if (date) {
            this.genDate(fullGua, date, !!cutAt2300);
            this.genMonster(fullGua);
            fullGua.getIsDarkMutual();
            fullGua.genSixYaoDescription();
        }
        return fullGua;
    }

    /**
     * 產生命卦
     * @param date 日期
     * @param cutAt2300 23:00 換日。預設為 true
     * @return 命卦
     */
    createFateGua({ cutAt2300 = true, ...params }: CreateFateGuaParams): FullGua {
        return this.genFateGua({ ...params, withMutual: true, cutAt2300 });
    }

    /**
     * 產生命卦公共函式
     * @param date 日期
     * @param withMutual 是否需要動爻 (批量產生命卦時無動爻)
     * @param cutAt2300 23:00 換日
     * @param thing 事由
     * @private
     */
    private genFateGua({ date, withMutual, cutAt2300, thing }: GenFateGuaParams): FullGua {
        const fullDate = FullGuaFactory.transLunarDate(cutAt2300 ? FullGuaFactory.transDateAfter2300(date) : date);


        // 潤月會是負值= =. 所以要用絕對值來包
        const fullGua = this.create({
            up: this.transDigitToGua(Math.abs(fullDate.lunar.getDay())),
            down: this.transDigitToGua(Math.abs(fullDate.lunar.getMonth())),
            mutual: withMutual ? this.timeToMutual(date): [],
            date,
            cutAt2300,
            thing,
        });
        fullGua.genPersonality();
        return fullGua;
    }

    /**
     * 批量產生命卦，不含動爻
     * @param beginDate 起始日期
     * @param endDate 結束日期
     * @param cutAt2300 23:00 換日。預設為 false
     */
    createBatchFateGua({ beginDate, endDate, cutAt2300 = false }: BatchFateGuaParams): FullGua[] {
        const solver = new BatchFateGuaSolver();
        return this.getDatesBetween(new Date(beginDate), new Date(endDate))
            .map(date => this.genFateGua({ date, withMutual: false, cutAt2300 }))
            .map((fullGua: FullGua) => {
                fullGua.solver.push({
                    description: '世爻旺相',
                    result: solver.shihWang(fullGua)
                });
                return fullGua;
            });
    }

    /**
     * 產生日期區間每一個日期
     * @param startDate 起始日期
     * @param endDate 結束日期
     * @private
     */
    private getDatesBetween(startDate: Date, endDate: Date) {
        const dates = [];
        const currentDate = startDate;
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    /**
     * 產生六爻(地支 + 六親)
     * @param down 下卦
     * @param up 上卦
     * @param gungElement 宮的五行
     * @return 六爻(地支 + 六親)
     */
    private genSixYao(down: Gua, up: Gua, gungElement: Elements): Yao[] {
        const earthlyBranches = [...FullGuaFactory.getEarthlyBranch(down, 'DOWN'), ...FullGuaFactory.getEarthlyBranch(up, 'UP')];
        const isYangYao = [...FullGuaFactory.genIsYangYao(down), ...FullGuaFactory.genIsYangYao(up)];
        return earthlyBranches.map((e, i) => ({earthlyBranch: e, relative: this.getRelative(gungElement, e), position: i + 1, isYangYao: isYangYao[i], void: false}))
    }

    /**
     * 產生天干、世應位置
     * @param down 下卦
     * @param up 上卦
     * @return 天干與世應位置
     */
    private static genHeavenlyStems(down: Gua, up: Gua): HeavenlyStems {
        const shihYingPosition = FullGuaFactory.calculateShinYing(down, up);
        let shih!: HeavenlyStem;
        let ying!: HeavenlyStem;
        if (shihYingPosition.shih >= 4) {
            // 世爻在上
            shih = FullGuaFactory.getHeavenlyStem(up, 'UP');
            ying = FullGuaFactory.getHeavenlyStem(down, 'DOWN');
        } else {
            // 世爻在下
            shih = FullGuaFactory.getHeavenlyStem(down, 'DOWN');
            ying = FullGuaFactory.getHeavenlyStem(up, 'UP');
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
    private static genGung(gungName: GungName): Gung {
        return {
            name: gungName,
            element: FullGuaFactory.getGungElement(gungName)
        }
    }

    /**
     * 增加日期
     * @param fullGua 全卦
     * @param date 國曆日期
     * @param cutAt2300 23:00 換日
     */
    private genDate(fullGua: FullGua, date: Date, cutAt2300: boolean): void {
        const fullDate = FullGuaFactory.transLunarDate(cutAt2300 ? FullGuaFactory.transDateAfter2300(date) : date);
        fullGua.solarDate = fullDate.solarDate;
        fullGua.lunarDate = fullDate.lunarDate;
        fullGua.lunarYear = fullDate.lunar.getYearInGanZhi();
        fullGua.lunarMonth = fullDate.lunar.getMonthInGanZhi();
        fullGua.lunarDay = fullDate.lunar.getDayInGanZhi();
        const table = fullDate.lunar.getJieQiTable();
        const dayJeiQi = fullDate.lunar.getJieQi();

        if (dayJeiQi && isChangeJeiQi(dayJeiQi)) {
            let solarTermHint = `今日屬24節氣「${dayJeiQi}」，節氣轉換時間為「${table[dayJeiQi].toYmdHms()}」。若占卦時間為轉換之後，`;
            if (dayJeiQi === '立春') {
                solarTermHint += '則年、月令須調整為下一年、月份。';
            } else {
                solarTermHint += '月令須調整為下一月份。';
            }
            fullGua.addHint(solarTermHint);
        }

        // this.benefactor(fullGua);
        fullGua.timePeriod = this.getTimePeriod(date);
        fullGua.void = this.calculateVoid(fullDate.lunar.getDayGan() as HeavenlyStem, fullDate.lunar.getDayZhi() as EarthlyBranch);
        this.filledVoid(fullGua);
    }

    /**
     * 天乙貴人
     * @deprecated 書上說不看天乙貴人
     * @param fullGua
     * @private
     */
    private benefactor(fullGua: FullGua): void {
        const d = fullGua.lunarDay.charAt(0) as unknown as HeavenlyStem;
        let earthlyBranches: EarthlyBranch[] = [];
        switch (d) {
            case '甲':
            case '戊':
            case '庚':
                earthlyBranches = ['丑', '未'];
                break;
            case '乙':
            case '己':
                earthlyBranches = ['子', '申'];
                break;
            case '丙':
            case '丁':
                earthlyBranches = ['亥', '酉'];
                break;
            case '壬':
            case '癸':
                earthlyBranches = ['卯', '巳'];
                break;
            case '辛':
                earthlyBranches = ['午', '寅'];
                break;
        }

        fullGua.addHint(`天乙貴人：${earthlyBranches.join('、')}`);
    }

    /**
     * @param d 日期
     */
    private static transLunarDate(d: Date): { lunarDate:string, solarDate: string, lunar: Lunar } {
        const date = dayjs(d);
        const year = date.year();
        const month = date.month() + 1;
        const day = date.date();
        const lunar = Lunar.fromDate(d);
        const lunarDate = `${lunar.getYearInGanZhiExact()}-${lunar.getMonthInGanZhiExact()}-${lunar.getDayInGanZhiExact()}`;
        const solarDate = `${year}-${month}-${day}`;
        return { lunar, lunarDate, solarDate };
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

    /**
     * 產生動爻
     * @param up 上卦
     * @param down 下卦
     * @param mutual 動爻
     * @param fullGua 全卦資訊
     * @private
     */
    private genMutual(up: Gua, down: Gua, mutual: number[], fullGua: FullGua) {
        const mutualFullGua = this.getMutualFullGua(up, down, mutual);

        if (mutual.length > 0) {
            fullGua.mutual = mutual.map( n => ({
                earthlyBranch: mutualFullGua.yao[n - 1].earthlyBranch,
                position: mutualFullGua.yao[n - 1].position,
                relative: this.getRelative(fullGua.gung.element, mutualFullGua.yao[n - 1].earthlyBranch),
                void: false
            }));
        }

        if (mutualFullGua.name.search('為') > 0) {
            fullGua.name += `之${mutualFullGua.name.charAt(0)}`;
        } else {
            fullGua.name += `之${mutualFullGua.name.substring(2)}`;
        }
        fullGua.description += `，${mutualFullGua.description}`;

        if (mutual.length > 0) {
            const guaWord = guaWords.find(g => g.guaIndex === mutualFullGua.originalName)
            fullGua.genGuaMeaningMutual(`${guaWord?.guaMean}${guaWord?.guaMeanDetail}`)
        }
        if (fullGua.hints.find(h => h.includes('六合卦')) && mutualFullGua.hints.find(h => h.includes('六沖卦'))) {
            fullGua.addHint('大卦合化沖');
        }
        if (fullGua.hints.find(h => h.includes('六沖卦')) && mutualFullGua.hints.find(h => h.includes('六合卦'))) {
            fullGua.addHint('大卦沖化合');
        }

    }

    /**
     * 增加動爻經書
     * @param fullGua 卦
     * @param mutual 動爻
     */
    private addMutualScripture(fullGua: FullGua, mutual: number[]): void {
        const guaWord = guaWords.find(g => g.guaIndex === fullGua.originalName);
        if (!guaWord) {
            throw new Error(`找不到經書(addScriptures)，卦名：${fullGua.originalName}`);
        }
        if (mutual && mutual.length !== 0) {

            const fullYaoContent = `
        初爻：${guaWord.one}
        二爻：${guaWord.two}
        三爻：${guaWord.three}
        四爻：${guaWord.four}
        五爻：${guaWord.five}
        上爻：${guaWord.six}`;

            const mutualContent = mutual.map(m => {
                switch (m) {
                    case 1:
                        return `初爻：${guaWord.one}`;
                    case 2:
                        return `二爻：${guaWord.two}`;
                    case 3:
                        return `三爻：${guaWord.three}`;
                    case 4:
                        return `四爻：${guaWord.four}`;
                    case 5:
                        return `五爻：${guaWord.five}`;
                    case 6:
                        return `上爻：${guaWord.six}`;
                }
            }).join('\n');
            fullGua.addScripture({title: '動爻解析', content: mutualContent, scripture: fullYaoContent});
        }
    }

    /**
     * 增加經書的文字解釋
     * @param fullGua 卦
     */
    private addScriptures(fullGua: FullGua): void {
        const guaWord = guaWords.find(g => g.guaIndex === fullGua.originalName);
        if (!guaWord) {
            throw new Error(`找不到經書(addScriptures)，卦名：${fullGua.originalName}`);
        }
        fullGua.addScripture({ title: '釋', content: guaWord.mean });
        fullGua.addScripture({ title: '五路財神經', content: guaWord.fiveMoney, scripture:GOD_OF_WEALTH });
        fullGua.addScripture({ title: '稽首七十二天師加持世界和平共轉法輪寶誥', content: guaWord.seventyTwoGod.join(''), scripture: GOD_72 });
        fullGua.addScripture({ title: '序卦傳', content: guaWord.serialGua, scripture: GUA_SERIAL_SONG });
        fullGua.addScripture({ title: '唯心用易歌訣', content: guaWord.heartSong, scripture: HEART_SONG });
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
    private static getEarthlyBranch(gua: Gua, position: 'UP' | 'DOWN'): EarthlyBranch[] {

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
    private static genIsYangYao(gua: Gua): boolean[] {
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
    private getRelative(gung: Elements, earthlyBranch: EarthlyBranch): Relative {
        const element = getElement(earthlyBranch as EarthlyBranch);
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
     * 計算幾世卦
     * @param down 下卦
     * @param up 上卦
     * @return 幾世卦
     */
    private static calculateShinYing(down: Gua, up: Gua): ShihYingPosition {

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
     * @param stem 日天干
     * @param earthly 日地支
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
    private static getHeavenlyStem(gua: Gua, type: 'UP' | 'DOWN'): HeavenlyStem {
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
    private static getGungElement(gungName: GungName): Elements {
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
        let mutualGuaYingYang = FullGuaFactory.transGuaToYingYangYao(down) + FullGuaFactory.transGuaToYingYangYao(up);
        
        for (const n of mutual) {
            switch (mutualGuaYingYang.charAt(n - 1)) {
                case '0':
                    mutualGuaYingYang = FullGuaFactory.replaceAt(mutualGuaYingYang, n - 1, '1');
                    break;
                case '1':
                    mutualGuaYingYang = FullGuaFactory.replaceAt(mutualGuaYingYang, n - 1, '0');
                    break;
            }
        }

        const mutualDown = this.transYingYangYaoToGua(mutualGuaYingYang.substring(0, 3) as YingYangYao);
        const mutualUp = this.transYingYangYaoToGua(mutualGuaYingYang.substring(3, 6) as YingYangYao);
        return this.create({up: mutualUp, down: mutualDown, mutual: []});
    }

    /**
     * 將半卦轉成數字，用於做動爻轉換
     * @param gua 卦
     */
    private static transGuaToYingYangYao(gua: Gua): YingYangYao {
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
     * @param yingYangYao 陰陽爻
     */
    public transYingYangYaoToGua(yingYangYao: YingYangYao): Gua {
        let gua: Gua | '' = '';
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
            default:
                throw new Error(`傳入陰陽爻格式錯誤！yingYangYao = ${yingYangYao}`);
        }
        return gua;
    }

    /**
     * 數字 轉換 卦 (命卦用)
     * @param digit 數字
     * @return 卦
     */
    public transDigitToGua(digit: number): Gua {
        let gua: Gua = '天';
        digit %= 8;
        switch (digit) {
            case 0:
                gua = '地';
                break;
            case 1:
                gua = '天';
                break;
            case 2:
                gua = '澤';
                break;
            case 3:
                gua = '火';
                break;
            case 4:
                gua = '雷';
                break;
            case 5:
                gua = '風';
                break;
            case 6:
                gua = '水';
                break;
            case 7:
                gua = '山';
                break;
            default:
                throw new Error(`傳入數字格式錯誤！digit = ${digit}`);
        }
        return gua;
    }

    /**
     * 取得命卦、裝卦使用日期 (以子時為主)
     * 如06-25 23:00以後，日期要以06-26來排命卦、裝六獸、空亡
     * @param date
     * @return Date
     */
    private static transDateAfter2300(date: Date): Date {
        const currentDate = dayjs(date);
        const cutTime = currentDate.hour(23).minute(0).second(0);
        return currentDate.isSame(cutTime) || currentDate.isAfter(cutTime) ? 
               currentDate.add(1, 'day').toDate() : currentDate.toDate();
    }

    /**
     * 時間 轉換 時辰動爻
     * @param date 時間
     * @return 動爻陣列
     */
    private timeToMutual(date: Date): number[] {
        const mutual: number[]= [];
        switch(this.getTimePeriod(date)) {
            case '子':
            case '午':
                mutual.push(1);
                break;
            case '丑':
            case '未':
                mutual.push(2);
                break;
            case '寅':
            case '申':
                mutual.push(3);
                break;
            case '卯':
            case '酉':
                mutual.push(4);
                break;
            case '辰':
            case '戌':
                mutual.push(5);
                break;
            case '巳':
            case '亥':
                mutual.push(6);
                break;   
        }

        if (mutual.length === 0) {
            console.error('時辰轉換動爻失敗。')
            throw new Error('時辰轉換動爻失敗。');
        }
        return mutual;
    }

    /**
     * 時間 轉換 時辰
     * @param date 日期
     * @return 時辰
     */
    private getTimePeriod(date: Date): EarthlyBranch {
        const time = dayjs(date).format('HH:mm');
        for (const earthlyBranch of this.EARTHLY_BRANCHES) {
            if (time.match(FullGuaFactory.genTimeRegExp(earthlyBranch))) {
                return earthlyBranch;
            }
        }
        console.error('無法取得時辰。')
        throw new Error('無法取得時辰。');
    }

    /**
     * 依據想要的時辰，產生相應時辰的RegExp
     * @param earthlyBranch 地支
     */
    private static genTimeRegExp(earthlyBranch: EarthlyBranch): RegExp {
        let regExp: RegExp;
        switch(earthlyBranch) {
            case '子':
                regExp = /(23|00):\d{2}/;
                break;
            case '丑':
                regExp = /(01|02):\d{2}/;
                break;
            case '寅':
                regExp = /(03|04):\d{2}/;
                break;
            case '卯':
                regExp = /(05|06):\d{2}/;
                break;
            case '辰':
                regExp = /(07|08):\d{2}/;
                break;
            case '巳':
                regExp = /(09|10):\d{2}/;
                break;
            case '午':
                regExp = /(11|12):\d{2}/;
                break;
            case '未':
                regExp = /(13|14):\d{2}/;
                break;
            case '申':
                regExp = /(15|16):\d{2}/;
                break;
            case '酉':
                regExp = /(17|18):\d{2}/;
                break;
            case '戌':
                regExp = /(19|20):\d{2}/;
                break;
            case '亥':
                regExp = /(21|22):\d{2}/;
                break;
        }
        return regExp!;
    }

    /**
     * 
     * @param str 原始字串
     * @param index 位置
     * @param replacement 取代的內容
     */
    private static replaceAt(str: string, index: number, replacement: string): string {
        return str.substr(0, index) + replacement + str.substr(index + replacement.length);
    }
}
