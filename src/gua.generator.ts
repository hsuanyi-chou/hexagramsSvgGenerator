import { Gua, GuaConfiguration, Yao, GuaResult } from './gua.interface';
import { FullGuaFactory, FullGua } from './full-gua-factory';
import dayjs from 'dayjs';
import { MoneyGuaFactory } from './full-gua-factory/money-gua.factory';
import { BuildGuaData, ShakeRecord } from './money-gua.interface';
import {
  BatchFateGuaParams,
  BuildFateGuaParams,
  BuildGuaByTimeParams,
  CreateParams,
  MoneyGuaParams
} from './params.interface';
import zhTW from 'dayjs/locale/zh-tw';

enum REGEXP_TIME_PATTERN {
  YEAR = 1,
  MONTH = 2,
  DAY = 3,
  HOUR = 4,
  MINUTE = 5,
  SECOND = 6,
}

export class GuaGenerator {
  private readonly fullGuaFactory = new FullGuaFactory();

  private readonly moneyGuaFactory = new MoneyGuaFactory(this.fullGuaFactory);
  private TOP_GAP = 25; // 上方留白間距 (Y軸)
  private LEFT_GAP = 10; // 左邊留白間距 (X軸)

  private showGenTime = true; // 是否顯示占卦時間

  private config: GuaConfiguration = {
    WIDTH: 600, // 圖片寬度
    HEIGHT: 800, // 圖片長度
    YAO_COLOR: '#000', // 爻顏色
    YAO_BOLD: 15, // 爻的粗度
    YAO_GAP: 40, // 每一爻的間距
    YANG_LENGTH: 100, // 陽爻長度
    YIN_LENGTH: 40, // 陰爻長度
    YIN_GAP: 20, // 陰爻中間的空白 (20約18點字體的空間)

    // 下卦第一爻初始位置 (y軸)。傳入的最大值 = HEIGHT - 26 (要預留世爻位置)
    // 200 為六爻到初爻的距離；145 為 title 高度
    DOWN_FIRST_YAO: this.TOP_GAP + 145 + 200,

    RIGHT_INFO_POSITION: 290, // 右邊資訊的初始位置 (x軸)

    FONT_FAMILY: `Roboto, Helvetica, Arial, sans-serif`, // 文字字型
    EARTHLY_BRANCH_COLOR: '#7f5618', // 本卦顏色(地支)
    HEAVENLY_STEM_COLOR: '#4b7ee3', // 天干顏色 (暫未使用，與世應同色)
    MUTUAL_COLOR: '#2265f3', // 變爻顏色
    HIDDEN_COLOR: '#6f6f6f', // 伏藏顏色
    MONSTER_COLOR: '#00747b', // 六獸顏色
    SHIH_YING_COLOR: '#276c11', // 世應顏色
    SIDE_INFO_COLOR: '#484a6d', // 側邊資訊顏色
  };

  /**
   * 上方資訊
   */
  private readonly TOP_INFO_CONFIG = {
    GAP: 15, // 每行間距
    FONT_SIZE: 19, // 文字大小
    FONT_COLOR: '#3b3a3a', // 文字顏色
  }

  private readonly TITLE_TOP_Y = this.TOP_GAP + 50; // 標題上方的高度
  private readonly TEXT_LENGTH = 85; // 文字六親 + 地支 (如官鬼 亥)的長度距離
  private readonly HIDDEN_SPACE = 20; // 變爻跟伏藏之間的距離
  
  private readonly TEXT_Y_POSITION = this.config.DOWN_FIRST_YAO + 10;

  private readonly YAO_FONT_SIZE = 24;

  private readonly YAO_X_POSITION = 285; // 爻的X軸位置常數。用來控制整個卦的位置(本卦、變爻、伏藏、六獸、天干世應，都依此來計算相對位置)

  private readonly SHIH_FIRST_YAO_RELATIVE_POSITION = 26; // 世爻第一爻相對位置常數
  private readonly SHIH_FIRST_YAO = this.config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION; // 世爻第一爻位置(y軸)

  constructor(config?: GuaConfiguration) {
    if (config) {
      this.config = config;
      this.SHIH_FIRST_YAO = config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION;
    }
    dayjs.locale({
      ...zhTW,
      weekStart: 1,
    });
  }

  /**
   * 金錢卦搖卦
   */
  shakeMoneyGua(): void {
    this.moneyGuaFactory.shake();
  }

  /**
   * 搖卦記錄
   */
  shakeRecords(): ShakeRecord[] {
    return this.moneyGuaFactory.getShakeRecords();
  }

  /**
   * 重置金錢卦
   */
  resetMoneyGua(): void {
    this.moneyGuaFactory.reset();
  }

  /**
   * 手動搖卦以產生金錢卦
   * @param thing 事由
   */
  buildMoneyGua(thing = ''): GuaResult {
    const fullGua = this.moneyGuaFactory.build(thing);
    return { fullGua, svg: this.createSvg(fullGua, fullGua.genGuaBase.date) };
  }

  /**
   * 取得金錢卦產卦資料
   */
  getMoneyGuaBuildData(): BuildGuaData {
    return this.moneyGuaFactory.getBuildData();
  }

  /**
   * 網址參數產生金錢卦
   * @param params
   */
  buildMoneyGuaBy(params: MoneyGuaParams): GuaResult {
    const fullGua = this.moneyGuaFactory.buildBy(params);
    return { fullGua, svg: this.createSvg(fullGua, fullGua.genGuaBase.date) };
  }

  /**
   * 一秒產金錢卦
   * @param thing 事由
   */
  instantBuildMoneyGua(thing = ''): GuaResult {
    const fullGua = this.moneyGuaFactory.instantBuild(thing);

    return {
      fullGua,
      svg: this.createSvg(fullGua, fullGua.genGuaBase.date)
    };
  }

  /**
   * 產生卦象
   * @param param 卦象參數
   */
  buildGua(param: CreateParams): GuaResult {
    const fullGua = this.fullGuaFactory.create(param);
    this.showGenTime = param.showGenTime ?? true;
    return { fullGua, svg: this.createSvg(fullGua, param.date) };
  }

  /**
   * 產生命卦
   * @param params 命卦參數
   */
  buildFateGua(params: BuildFateGuaParams): GuaResult {
    const fullGua = this.fullGuaFactory.createFateGua({ ...params });
    return { fullGua, svg: this.createSvg(fullGua, params.date) };
  }

  /**
   * 批量產生命卦，無動爻
   * @param param 日期區間
   */
  buildBatchFateGua(param: BatchFateGuaParams): GuaResult[] {
    this.showGenTime = param.showGenTime ?? true;
    return this.fullGuaFactory.createBatchFateGua(param)
        .map(fullGua => ({ fullGua, svg: this.createSvg(fullGua, fullGua.genGuaBase.date) }));
  }

  /**
   * 時間取卦。格式: YYYYMMDDHHmmss
   * 1. 傳入時間以24H制
   * 2. 若僅傳入6碼，則作為(HH:mm:ss)，自動補上當天日期
   * 3. 前3碼為下卦；後3碼為上卦；全部加起來為動爻
   * @param time 格式: YYYYMMDDHHmmss
   * @param thing 事由
   */
  buildGuaByTime({ time, thing = '' }: BuildGuaByTimeParams): GuaResult {
    if (!time.match(/^\d{14}$/)) {
      throw new Error('傳入時間錯誤！僅支援年月日時分秒(YYYYMMDDHHmmss) 14碼數字！');
    }

    const pattern = new RegExp(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    const matched = pattern.exec(time)
    if (!matched) {
      throw new Error('14碼日期錯誤!')
    }

    const year = parseInt(matched[REGEXP_TIME_PATTERN.YEAR], 10);
    const month = parseInt(matched[REGEXP_TIME_PATTERN.MONTH], 10);
    const day = parseInt(matched[REGEXP_TIME_PATTERN.DAY], 10);
    const HH = parseInt(matched[REGEXP_TIME_PATTERN.HOUR], 10);
    const mm = parseInt(matched[REGEXP_TIME_PATTERN.MINUTE], 10);
    const ss = parseInt(matched[REGEXP_TIME_PATTERN.SECOND], 10);

    // console.log(`${year} ${month} ${day} ${HH} ${mm} ${ss}`);
    const buildTime = dayjs().locale('zh-TW')
      .set('year', year).set('month', month - 1).set('date', day)
      .set('hour', HH).set('minute', mm).set('second', ss);

    const basic = this.genGuaBasisByTime(time.substring(8));
    return this.buildGua({
      date: buildTime.toDate(),
      thing,
      ...basic
    });
  }

  /**
   * 傳入6碼時間，回傳上卦、下卦、動爻
   * @param time
   */
  private genGuaBasisByTime(time: string): {up: Gua, down: Gua, mutual: number[]} {
    if (!time.match(/^\d{6}$/)) {
      throw new Error('僅能傳入6碼數字時間');
    }
    const timeArray: number[] = time.split('').map(t => parseInt(t, 10));
    const downCounts = timeArray[0] + timeArray[1] + timeArray[2];
    const upCounts = timeArray[3] + timeArray[4] + timeArray[5];

    return {
      up: this.fullGuaFactory.transDigitToGua(upCounts % 8),
      down: this.fullGuaFactory.transDigitToGua(downCounts % 8),
      mutual: [(downCounts + upCounts) % 6 || 6] // 當整除為0時，實為動六爻，用JS語法糖直接轉成6 (0轉型false，故變6)
    };
  }

  /**
   * 產生SVG外層骨架
   * @param fullGua 全卦
   * @param date 日期
   */
  private createSvg(fullGua: FullGua, date?: Date): string {
    return `<!-- Created By Hexagrams-SVG-Generator -->\n` +
           `<svg width="${this.config.WIDTH}" height="${this.config.HEIGHT}" xmlns="http://www.w3.org/2000/svg">\n` +
           `<defs><style type="text/css">
              @import url('https://fonts.google.com/specimen/Roboto+Condensed?selection.family=Roboto+Condensed');
            </style></defs>` +
           `<g><title>background</title>\n<rect fill="#ffffff" id="GUA" height="${this.config.HEIGHT}" width="${this.config.WIDTH}" y="-1" x="-1"/>\n</g>\n` +
           `${this.drawFullGua(fullGua, date)}</svg>`;
  }


  /**
   * step 1: 繪製全卦
   * @param fullGua 全卦
   * @param date 日期
   */
  private drawFullGua(fullGua: FullGua, date?: Date): string {
    let gua = `<g>\n<title>Layer 1</title>\n`;
    gua += this.drawTopInfo(fullGua);
    gua += this.drawSixYao(fullGua.yao, this.YAO_X_POSITION, this.config.DOWN_FIRST_YAO);
    gua += this.drawShihYingAndHeavenlyStem(fullGua);
    gua += this.drawRelativesAndEarthlyBranches(fullGua.yao, 'yao', '本卦', this.config.EARTHLY_BRANCH_COLOR, this.YAO_X_POSITION - this.TEXT_LENGTH);
    gua += this.drawRelativesAndEarthlyBranches(fullGua.hidden, 'hidden', '伏藏', this.config.HIDDEN_COLOR, this.YAO_X_POSITION - (this.TEXT_LENGTH * 3 + this.HIDDEN_SPACE));
    gua += this.drawRelativesAndEarthlyBranches(fullGua.mutual, 'mutual', '變爻', this.config.MUTUAL_COLOR, this.YAO_X_POSITION - this.TEXT_LENGTH * 2);
    gua += this.drawMonsters(fullGua.yao, this.config.MONSTER_COLOR);
    gua += this.drawMutual(fullGua.yao, fullGua.mutual);
    gua += this.drawVoid(fullGua);
    gua += this.drawSideInfo(fullGua, date);
    gua += `\n</g>\n`;
    return gua;
  }

  /**
   * step 1.5: 上方基礎資訊
   * @param fullGua
   */
  private drawTopInfo(fullGua: FullGua): string {
    let text = '';
    const base = {
      fontSize: this.TOP_INFO_CONFIG.FONT_SIZE,
      color: this.TOP_INFO_CONFIG.FONT_COLOR,
      x: this.LEFT_GAP,
    };

   if (this.showGenTime) {
      text += this.genSvgTextComponent({
        id: 'genTime',
        text: `時間：${dayjs(fullGua.genGuaBase.date).format('YYYY/MM/DD HH:mm:ss (dd)')}`,
        y: this.TOP_GAP,
          ...base
      });
   }

    if (fullGua.genGuaBase.thing) {
      text += this.genSvgTextComponent({
        id: 'thing',
        text: `事由：${fullGua.genGuaBase.thing}`,
        y: this.TOP_GAP + (this.TOP_INFO_CONFIG.GAP * 2),
        ...base
      });
    }

    return text;
  }

  /**
   * step 2: 繪製天干、世應
   * @param fullGua 全卦
   */
  private drawShihYingAndHeavenlyStem(fullGua: FullGua): string {
    let text = '';
    const x = this.YAO_X_POSITION + 42;
    const shihY = this.SHIH_FIRST_YAO - this.config.YAO_GAP * (fullGua.HeavenlyStems.shihPosition - 1);
    const yingY = this.SHIH_FIRST_YAO - this.config.YAO_GAP * (fullGua.HeavenlyStems.yingPosition - 1);

    text += this.genSvgTextComponent({
      id: `shih`,
      text: '世',
      color: this.config.SHIH_YING_COLOR,
      fontSize: 18,
      x,
      y: shihY,
    });
    text += this.genSvgTextComponent({
      id: `ying`,
      text: '應',
      color: this.config.SHIH_YING_COLOR,
      fontSize: 18,
      x,
      y: yingY,
    });

    const heavenlyStemShihY = shihY - this.config.YAO_GAP;
    const heavenlyStemYingY = yingY - this.config.YAO_GAP;

    text += this.genSvgTextComponent({
      id: `heavenlyStem_1`,
      text: fullGua.HeavenlyStems.shih,
      color: this.config.SHIH_YING_COLOR,
      fontSize: 18,
      x,
      y: heavenlyStemShihY,
    });
    text += this.genSvgTextComponent({
      id: `heavenlyStem_2`,
      text: fullGua.HeavenlyStems.ying,
      color: this.config.SHIH_YING_COLOR,
      fontSize: 18,
      x,
      y: heavenlyStemYingY,
    });

    return text;
  }

  /**
   * step 3: 繪製六獸
   * @param yaos 爻
   * @param color 顏色
   */
  private drawMonsters(yaos: Yao[], color: string): string {
    if (!yaos[0].monster) {
      return '';
    }

    const x = this.YAO_X_POSITION + 105;

    let text = this.genTitleTextComponent({
      id: 'monster',
      text: '六獸',
      color,
      fontSize: this.YAO_FONT_SIZE,
      x: x + 20,
      y: this.TITLE_TOP_Y,
    });

    text += yaos.map( (yao, i) => 
      this.genSvgTextComponent({
        id: `monster_${i}`, 
        text: `${yao.monster}`,
        color,
        fontSize: this.YAO_FONT_SIZE,
        x,
        y: this.TEXT_Y_POSITION - (yao.position - 1) * this.config.YAO_GAP,
      })
    ).join('');
    return text;
  }

  /**
   * step 4: 繪製動爻OX
   * @param yaos 六爻
   * @param mutual 動爻
   */
  private drawMutual(yaos: Yao[], mutual: Yao[]): string {
    const circleX = this.YAO_X_POSITION + 50;
    const crossX = this.YAO_X_POSITION + 38;
    
    return mutual.map(m => {
      const circleY = this.config.DOWN_FIRST_YAO - (m.position - 1) * this.config.YAO_GAP;
      if (yaos[m.position - 1].isYangYao) {
        return GuaGenerator.genCircleComponent(`mutual_${m.position}`, circleX, circleY, 11, 'red');
      } else {
        return GuaGenerator.genCrossComponent(crossX, circleY - 10, 'red');
      }
    }).join('');
  }

  /**
   * step 5: 空亡打圈
   * @param fullGua 全卦
   */
  private drawVoid(fullGua: FullGua): string {
    const x = 267;
    const r = 14;
    const color = '#858585';
    let voidCircle = '';
    voidCircle += fullGua.yao.map(y => y.void ? 
      GuaGenerator.genCircleComponent(`yao_void_${y.position}`, x, this.config.DOWN_FIRST_YAO - this.config.YAO_GAP * (y.position - 1), r, color) : ''
    ).join('');
    voidCircle += fullGua.mutual.map(y => y.void ?
      GuaGenerator.genCircleComponent(`mutual_void_${y.position}`, x - this.TEXT_LENGTH, this.config.DOWN_FIRST_YAO - this.config.YAO_GAP * (y.position - 1), r, color) : ''
      ).join('');
    voidCircle += fullGua.hidden.map(y => y.void ?
      GuaGenerator.genCircleComponent(`hidden_void_${y.position}`, x - (this.TEXT_LENGTH * 2 + this.HIDDEN_SPACE),
        this.config.DOWN_FIRST_YAO - this.config.YAO_GAP * (y.position - 1), r, color): '').join('');
    return voidCircle;
  }

  /**
   * step 6: 繪製側邊基本資訊
   * @param fullGua 全卦
   * @param date 占期
   */
  private drawSideInfo(fullGua: FullGua, date?: Date): string {
    let text = '';
    const TITLE_GAP = 40;
    let leftSideX = this.config.RIGHT_INFO_POSITION + 150; // 無六獸的位置
    let count = 0;
    let voidText = '';
    const COMMON_CONFIG = {
      color: this.config.SIDE_INFO_COLOR,
      fontSize: this.YAO_FONT_SIZE,
      y: this.TITLE_TOP_Y
    };
    if (date) {
      leftSideX += 50;
      text += this.genTitleTextComponent({id: 'side_date', text:`占期：${fullGua.getChineseLunarDate()}`, x: leftSideX,  ...COMMON_CONFIG});
      count++;
      voidText = `空：${fullGua.void.join('、')}`;
    }
    text += this.genTitleTextComponent({id:'side_gung', text:`宮：${fullGua.gung.name}︵${fullGua.gung.element}︶   ${voidText}`,
            x: leftSideX + TITLE_GAP * count, ...COMMON_CONFIG});
    count++;
    text += this.genTitleTextComponent({id: 'side_gua_name', text:`卦名：${fullGua.name}︵${fullGua.description}︶`,
            x: leftSideX + TITLE_GAP * count, ...COMMON_CONFIG});
    count++;
    return text;
  }

  /**
   * step 1.1: 繪製六爻
   * @param yaos 爻
   * @param x
   * @param y
   */
  private drawSixYao(yaos: Yao[], x: number, y: number): string {
    return yaos.map( (yao, i) => yao.isYangYao ? 
      this.drawYangYao(`yao_${i}`, x, y - this.config.YAO_GAP * i) : 
      this.drawYinYao(`yao_${i}`, x, y - this.config.YAO_GAP * i)
    ).join('');
  }

  /**
   * step 1.2: 繪製陰爻
   * @param id SVG圖片id
   * @param x 起始爻的x
   * @param y 起始爻的y
   */
  private drawYinYao(id: string, x: number, y: number) {
    const x2 = x + this.config.YIN_LENGTH;
    return `<line stroke="${this.config.YAO_COLOR}" id="${id + '-1'}" x1="${x}" y1="${y}" x2="${x2}" y2="${y}" stroke-width="${this.config.YAO_BOLD}" fill="none"/>\n` + 
           `<line stroke="${this.config.YAO_COLOR}" id="${id + '-2'}" x1="${x2 + this.config.YIN_GAP}" y1="${y}" x2="${x2 + this.config.YIN_GAP + this.config.YIN_LENGTH}" y2="${y}" stroke-width="${this.config.YAO_BOLD}" fill="none"/>\n`;
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

  /**
   * @param yaos 要繪製的爻
   * @param id id
   * @param titleText 標題文字
   * @param color 顏色
   * @param x X 軸
   * @return 繪製出來的svg
   */
  private drawRelativesAndEarthlyBranches(yaos: Yao[], id: string, titleText: string, color: string, x: number) {
    if (yaos.length === 0) {
      return '';
    }

    let text = this.genTitleTextComponent({
      id,
      text: titleText,
      color,
      fontSize: this.YAO_FONT_SIZE,
      x: x + 45,
      y: this.TITLE_TOP_Y,
    });

    text += yaos.map( (yao, i) => 
      this.genSvgTextComponent({
        id: `${id}_${i}`, 
        text: `${yao.relative} ${yao.earthlyBranch}`,
        color,
        fontSize: this.YAO_FONT_SIZE,
        x,
        y: this.TEXT_Y_POSITION - (yao.position - 1) * this.config.YAO_GAP,
      })
    ).join('');
    return text;
  }

  /**
   * 產生svg text 元件
   * @param svgTextConfig
   */
  private genSvgTextComponent(svgTextConfig: {id: string, text: string, color: string, fontSize: number, x: number, y: number}): string {
    return `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="${svgTextConfig.fontSize}" id="${svgTextConfig.id}" ` +
           `y="${svgTextConfig.y}" x="${svgTextConfig.x}" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${svgTextConfig.color}">${svgTextConfig.text}</text>\n`;
    
  }

  /**
   * 產生svg text 元件
   * @param svgTextConfig
   */
  private genTitleTextComponent(svgTextConfig: {id: string, text: string, color: string, fontSize: number, x: number, y: number}): string {
    return `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="${svgTextConfig.fontSize}" id="title_${svgTextConfig.id}" style="writing-mode: tb; glyph-orientation-vertical: 0;" ` +
           `y="${svgTextConfig.y}" x="${svgTextConfig.x}" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${svgTextConfig.color}">${svgTextConfig.text}</text>\n`;
  }

  /**
   * 產生O (陽爻動爻)
   * @param id id
   * @param x x軸
   * @param y y軸
   * @param r 半徑
   * @param color 顏色
   */
  private static genCircleComponent(id: string, x: number, y: number, r: number, color: string): string {
    return `<circle id="${id}" cx="${x}" cy="${y}" r="${r}" stroke="${color}" stroke-width="2" fill-opacity="0" />\n`;
  }

  /**
   * 產生X (陰爻動爻)
   * @param x x軸
   * @param y y軸
   * @param color 顏色
   */
  private static genCrossComponent(x: number, y: number, color: string): string {
    return `<line x1="${x}" y1="${y}" x2="${x + 25}" y2="${y + 20}" stroke="${color}" stroke-width="2" /> ` + 
           `<line x1="${x + 25}" y1="${y}" x2="${x}" y2="${y + 20}" stroke="${color}" stroke-width="2" />\n`;
  }
}
