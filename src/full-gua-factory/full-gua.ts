import { IFullGua, Yao, HeavenlyStems, Gung, EarthlyBranch, Scripture, GenGuaBase } from '../gua.interface';
import { RELATIVE_PERSONALITY, EARTHLY_BRANCHES_PERSONALITY, MONSTER_PERSONALITY } from '../constant/fate-gua-personality';

export class FullGua implements IFullGua {
    genGuaBase!: GenGuaBase;
    originalName!: string; // 原本卦名(用來取得經文內容用)
    name!: string; // 卦名
    description!: string; // 四字偈-描述
    yao: Yao[] = []; // 六爻
    hidden: Yao[] = []; // 伏藏
    HeavenlyStems!: HeavenlyStems; // 天干
    gung!: Gung; // 宮

    mutual: Yao[] = []; // 動爻

    hints: string[] = []; // 提示
    scriptures: Scripture[] = []; // 經書內容

    solarDate = ''; // 國曆日期
    lunarDate = ''; // 農曆數字日期
    timePeriod = ''; // 時辰
    lunarYear = ''; // 年干支
    lunarMonth = ''; // 月干支
    lunarDay = ''; // 日干支
    void: EarthlyBranch[] = []; // 空亡

    solver: any[] = [];

    /**
     * 命卦用，個性
     * 非命卦則為空陣列
     */
    personality: string[] = [];

    constructor(name: string, description: string, yao: Yao[], heavenlyStems: HeavenlyStems, gung: Gung,
        hidden?: Yao[], hints?: string[]) {
        this.name = name;
        this.originalName = name;
        this.description = description;
        this.yao = yao;
        this.HeavenlyStems = heavenlyStems;
        this.gung = gung;

        if (hidden) {
            this.hidden = [...hidden];
        }

        if (hints) {
            this.hints = [...hints];
        }
    }

    /**
     * 增加卦的註解 (如六沖、六合、化進…等)
     * @param hint 註譯
     */
    addHint(hint: string): void {
        this.hints.push(hint);
    }

    addScripture(scripture: Scripture): void {
        this.scriptures.push(scripture);
    }

    /**
     * 增加產卦基本資料
     * @param base
     */
    addGenGuaBase(base: GenGuaBase): void {
        this.genGuaBase = base;
    }

    /**
     * 取得農曆完整日期
     */
    getFullLunarDate(): string {
        return `${this.lunarDate}(${this.lunarYear}-${this.lunarMonth}-${this.lunarDay})`;
    }

    /**
     * 取得干支年月日
     */
    getChineseLunarDate(): string {
        return `${this.lunarYear} 年 ${this.lunarMonth} 月 ${this.lunarDay} 日 ${this.timePeriod} 時`;
    }

    getPersonality(): string[] {
        return this.personality;
    }

    genPersonality(): void {
        const shih = this.yao[this.HeavenlyStems.shihPosition - 1];

        const relative = RELATIVE_PERSONALITY.find(p => shih.relative === p.relative)?.personality || [];
        const earthBranch = EARTHLY_BRANCHES_PERSONALITY.find(p => shih.earthlyBranch === p.earthlyBranch)?.personality || [];
        const monster = MONSTER_PERSONALITY.find(p => shih.monster === p.monster)?.personality || [];

        this.personality = [...relative, ...earthBranch, ...monster];
    }

}
