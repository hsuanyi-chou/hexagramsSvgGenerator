import { FullGuaFactory } from './full-gua.factory';
import { RandomNum, ShakeRecord } from '../money-gua.interface';
import { YingYangYao } from '../gua.interface';
import { FullGua } from './full-gua';

export class MoneyGuaFactory {
    /** 目前每爻之陰陽，陰 = 0；陽 = 1 */
    private yingYangArray: string[] = [];

    /** 目前第幾爻，供記錄動爻位置。1~6 */
    private shakeCounts = 1;

    /** 目前動爻，依搖到的位置記錄 */
    private mutual: number[] = [];

    /** 搖卦記錄，供 UI 呈現過程。反向順序存入資料，由六爻~初爻儲存。利於 UI 直接使用 */
    private shakeRecords: ShakeRecord[] = [];
    private MAX_COUNT = 6;
    constructor(private fullGuaFactory: FullGuaFactory) { }

    /**
     * 一秒產卦
     * @param thing 事由
     */
    instantBuild(thing = ''): FullGua {
        this.reset();
        for (let i = 0; i < 6; i++) {
            this.shake();
        }
        return this.build(thing);
    }

    /**
     * 產生金錢卦
     * @param thing 事由
     */
    build(thing = ''): FullGua {
        if (this.yingYangArray.length < this.MAX_COUNT) {
            throw new Error(`產卦失敗！(build)，陰陽爻數量不足`);
        }

        const downDigit = this.yingYangArray.slice(0, 3).join('') as YingYangYao;
        const upDigit = this.yingYangArray.slice(3, 6).join('') as YingYangYao;

        const down = this.fullGuaFactory.transYingYangYaoToGua(downDigit);
        const up = this.fullGuaFactory.transYingYangYaoToGua(upDigit);

        return this.fullGuaFactory.create({ up, down, mutual: this.mutual, date: new Date(), thing });
    }

    /**
     * 搖卦
     */
    shake(): void {
        if (this.shakeCounts > this.MAX_COUNT) {
            console.log('已滿 6 次，請 call build() 產卦');
            return;
        }
        let randomNum: RandomNum | string = '';
        for (let i = 0; i < 3; i++) {
            randomNum += this.randomNumber();
        }
        const yao = this.transformYao(randomNum as RandomNum);
        this.shakeCounts++;
        this.yingYangArray.push(yao);
    }

    reset(): void {
        this.shakeCounts = 1;
        this.yingYangArray = [];
        this.mutual = [];
        this.shakeRecords = [];
    }

    /**
     * 陰陽的 3 碼 0、1 數字轉換成爻
     * @param digits 陰陽爻的 3 碼 0、1 數字
     */
    private transformYao(digits: RandomNum): '0' | '1' {
        if (!digits) {
            throw new Error(`隨機數字轉換成爻失敗！(transformYao)，收到參數=${digits}`);
        }
        this.shakeRecords.unshift({
            record: digits,
            position: this.transCountToPosition(this.shakeCounts)
        });
        // 將 randomNumber 轉成爻
        switch (digits) {
            case '000': // 陰爻動
                this.mutual.push(this.shakeCounts);
                return '0';
            case '111': // 陽爻動
                this.mutual.push(this.shakeCounts);
                return '1';
            case '001': // 陽爻
            case '010':
            case '100':
                return '1';
            case '011': // 陰爻
            case '110':
            case '101':
                return '0';
        }

    }

    /**
     * 將搖卦爻位轉成文字
     * @param count
     */
    private transCountToPosition(count: number): string {
        switch (count) {
            case 1:
                return '初爻';
            case 2:
                return '二爻';
            case 3:
                return '三爻';
            case 4:
                return '四爻';
            case 5:
                return '五爻';
            case 6:
                return '上爻';
            default:
                throw new Error(`傳入錯誤爻位，僅可傳入數字1~6。收到的是${count}`);
        }
    }

    /**
     * 取得目前內部資料
     * 供單元測試檢核使用
     */
    getInnerData() {
        return {
            yingYangArray: this.yingYangArray,
            mutual: this.mutual,
            shakeCounts: this.shakeCounts,
            shakeRecords: this.shakeRecords,
        };
    }

    /**
     * 取得搖卦記錄
     */
    getShakeRecords(): ShakeRecord[] {
        return [...this.shakeRecords];
    }

    /**
     * 產生 1~100 的數字
     * 奇數為陽爻(1)，偶數為陰爻(0)
     */
    private randomNumber(): string {
        const num = Math.ceil(Math.random() * 100);
        return num % 2 === 0 ? '0' : '1';
    }

}
