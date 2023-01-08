import { FullGuaFactory } from './full-gua.factory';

export class MoneyGuaFactory {
    private array: string[] = [];

    private MAX_COUNT = 6;
    constructor(private fullGuaFactory: FullGuaFactory) {
    }

    /**
     * 搖卦
     */
    shake(): void {
        let yao = '';
        for (let i = 0; i < 3; i++) {
            yao += String(this.randomNumber());
        }
        this.array.push(yao);
    }

    /**
     * 產生 1~100 的數字
     */
    private randomNumber(): number {
        return Math.ceil(Math.random() * 100);
    }

}