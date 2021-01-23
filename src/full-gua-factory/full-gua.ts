import { IFullGua, Yao, HeavenlyStems, Gung, EarthlyBranch } from '../gua.interface';
export class FullGua implements IFullGua {
    originalName!: string; // 原本卦名(用來取得經文內容用)
    name!: string; // 卦名
    description!: string; // 四字偈-描述
    yao: Yao[] = []; // 六爻
    hidden: Yao[] = []; // 伏藏
    HeavenlyStems!: HeavenlyStems; // 天干
    gung!: Gung; // 宮

    mutual: Yao[] = []; // 動爻

    hint: string[] = []; // 提示

    solarDate = ''; // 國曆日期
    lunarDate = ''; // 農曆數字日期
    timePeriod = ''; // 時辰
    lunarYear = ''; // 年干支
    lunarMonth = ''; // 月干支
    lunarDay = ''; // 日干支
    void: EarthlyBranch[] = []; // 空亡

    constructor(name: string, description: string, yao: Yao[], heavenlyStems: HeavenlyStems, gung: Gung,
        hidden?: Yao[], hint?: string[]) {

        this.name = name;
        this.originalName = name;
        this.description = description;
        this.yao = yao;
        this.HeavenlyStems = heavenlyStems;
        this.gung = gung;

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

    /**
     * 取得農曆完整日期
     */
    getFullLunarDate() {
        return `${this.lunarDate}(${this.lunarYear}-${this.lunarMonth}-${this.lunarDay})`;
    }

    /**
     * 取得干支年月日
     */
    getChineseLunarDate() {
        return `${this.lunarYear} 年 ${this.lunarMonth} 月 ${this.lunarDay} 日 ${this.timePeriod} 時`;
    }
}