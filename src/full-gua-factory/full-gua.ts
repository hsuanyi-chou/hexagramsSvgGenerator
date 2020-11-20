import { IFullGua, SixYao, Yao, HeavenlyStems, Gung, PositionYao } from '../gua.interface';

export class FullGua implements IFullGua {
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