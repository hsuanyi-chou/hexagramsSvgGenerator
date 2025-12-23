import { FullGuaFactory } from './full-gua.factory';
import { BuildGuaData, RandomNum, ShakeRecord } from '../money-gua.interface';
import { YingYangYao } from '../gua.interface';
import { FullGua } from './full-gua';
import { MoneyGuaParams } from '../params.interface';

export class MoneyGuaFactory {
  private buildData: BuildGuaData = {
    shakeNumRecords: [],
    yingYangArray: [],
    shakeRecords: [],
    shakeCounts: 1,
    mutual: [],
    thing: '',
    date: new Date(),
  };

  private MAX_COUNT = 6;

  constructor(private fullGuaFactory: FullGuaFactory) {}

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
   * 底層產金錢卦函式，依據 buildData 產卦
   * 供 build()、buildBy() 呼叫
   */
  private buildByInnerData(): FullGua {
    const { yingYangArray, mutual, date, thing } = this.buildData;
    if (yingYangArray.length < this.MAX_COUNT) {
      throw new Error(`產卦失敗！(build)，陰陽爻數量不足`);
    }

    const downDigit = yingYangArray.slice(0, 3).join('') as YingYangYao;
    const upDigit = yingYangArray.slice(3, 6).join('') as YingYangYao;

    const down = this.fullGuaFactory.transYingYangYaoToGua(downDigit);
    const up = this.fullGuaFactory.transYingYangYaoToGua(upDigit);

    return this.fullGuaFactory.create({ up, down, mutual, date, thing });
  }

  /**
   * 產生金錢卦
   * @param thing 事由
   */
  build(thing = ''): FullGua {
    this.buildData.thing = thing;
    this.buildData.date = new Date();
    return this.buildByInnerData();
  }

  /**
   * 供網址記錄資料後，產生金錢卦
   * @param shakeNumRecords 陰陽爻陣列
   * @param date 日期
   * @param thing 事由
   */
  buildBy({ shakeNumRecords, date, thing = '' }: MoneyGuaParams): FullGua {
    this.reset();
    shakeNumRecords.forEach((randomNum) =>
      this.shakeBy(randomNum as RandomNum),
    );
    this.buildData.thing = thing;
    this.buildData.date = date;
    return this.buildByInnerData();
  }

  /**
   * 搖卦
   */
  shake(): void {
    if (this.buildData.shakeCounts > this.MAX_COUNT) {
      console.log('已滿 6 次，請 call build() 產卦');
      return;
    }
    let randomNum: RandomNum | string = '';
    for (let i = 0; i < 3; i++) {
      randomNum += this.randomNumber();
    }

    this.shakeBy(randomNum as RandomNum);
  }

  /**
   * 填充搖卦記錄
   * @param randomNum
   */
  private shakeBy(randomNum: RandomNum): void {
    this.buildData.shakeNumRecords.push(randomNum as RandomNum);
    const yao = this.transformYao(randomNum as RandomNum);
    this.buildData.shakeCounts++;
    this.buildData.yingYangArray.push(yao);
  }

  reset(): void {
    this.buildData = {
      thing: '',
      date: new Date(),
      shakeNumRecords: [],
      yingYangArray: [],
      shakeRecords: [],
      mutual: [],
      shakeCounts: 1,
    };
  }

  /**
   * 陰陽的 3 碼 0、1 數字轉換成爻
   * @param digits 陰陽爻的 3 碼 0、1 數字
   */
  private transformYao(digits: RandomNum): '0' | '1' {
    if (!digits) {
      throw new Error(
        `隨機數字轉換成爻失敗！(transformYao)，收到參數=${digits}`,
      );
    }
    this.buildData.shakeRecords.unshift({
      record: digits,
      position: this.transCountToPosition(this.buildData.shakeCounts),
    });
    // 將 randomNumber 轉成爻
    switch (digits) {
      case '000': // 陰爻動
        this.buildData.mutual.push(this.buildData.shakeCounts);
        return '0';
      case '111': // 陽爻動
        this.buildData.mutual.push(this.buildData.shakeCounts);
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
   */
  getBuildData(): BuildGuaData {
    return { ...this.buildData };
  }

  /**
   * 取得搖卦記錄
   */
  getShakeRecords(): ShakeRecord[] {
    return [...this.buildData.shakeRecords];
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
