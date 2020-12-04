import { Gua, GuaConfiguration, Yao } from './gua.interface';
import { FullGuaFactory, FullGua } from './full-gua-factory';

/**
 * 把數字轉成卦，目前未用到。先留著
 * @param digit 數字1~8
 */
function transToWord(digit: number): Gua {
  let word = '';
  switch (digit) {
    case 1:
      word = '天';
      break;
    case 2:
      word = '澤';
      break;
    case 3:
      word = '火';
      break;
    case 4:
      word = '雷';
      break;
    case 5:
      word = '風';
      break;
    case 6:
      word = '水';
      break;
    case 7:
      word = '山';
      break;
    case 8:
      word = '地';
      break;
  }
  return word as Gua;
}

export class GuaGenerator {
  private readonly fullGuaFactory = new FullGuaFactory();
  private config: GuaConfiguration = {
    WIDTH: 450, // 圖片寬度
    HEIGHT: 320, // 圖片長度
    YAO_COLOR: '#000', // 爻顏色
    YAO_BOLD: 15, // 爻的粗度
    YAO_GAP: 40, // 每一爻的間距
    YANG_LENGTH: 100, // 陽爻長度
    YIN_LENGTH: 40, // 陰爻長度
    YIN_GAP: 20, // 陰爻中間的空白 (20約18點字體的空間)

    DOWN_FIRST_YAO: 290, // 下卦第一爻初始位置 (y軸)。傳入的最大值 = HEIGHT - 26 (要預留世爻位置)

    FONT_FAMILY: 'Helvetica, Arial, sans-serif', // 文字字型
    EARTHLY_BRANCH_COLOR: '#dbaa23', // 地支顏色
    HEAVENLY_STEM_COLOR: '#4b7ee3', // 天干顏色
    MUTUAL: '#000', // 動爻顏色
    HIDDEN_COLOR: '#000', // 伏藏顏色

    SHIH_YING_COLOR: '#729C62', // 世應顏色
  };

  private readonly TITLE_CONFIG = {
    y: 10
  }

  private readonly TEXT_LENGTH = 85; // 文字六親 + 地支 (如官鬼 亥)的長度距離
  private readonly HIDDEN_SPACE = 20; // 變爻跟伏藏之間的距離
  
  private readonly TEXT_Y_POSITION = this.config.DOWN_FIRST_YAO + 10;

  private readonly YAO_FONT_SIZE = 24;

  private readonly YAO_X_POSITION = 285; // 爻的X軸位置常數。用來控制整個卦的位置(本卦、變爻、伏藏、六獸、天干世應，都依此來計算相對位置)

  private readonly SHIH_FIRST_YAO_RELATIVE_POSITION = 26; // 世爻第一爻相對位置常數
  private SHIH_FIRST_YAO = this.config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION; // 世爻第一爻位置(y軸)

  constructor(config?: GuaConfiguration) {
    if (config) {
      this.config = config;
      this.SHIH_FIRST_YAO = config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION;
    }
  }

  /**
   * 產生卦象
   * @param up 上卦
   * @param down 下卦
   * @param mutual 動爻
   * @param date 日期 (六獸、空亡…等)
   * @return svg 純文字內容
   */
  buildGua(up: Gua, down: Gua, mutual?: number[], date?: Date) {
    return `<!-- Created By Hexagrams-SVG-Generator -->\n` +
           `<svg width="${this.config.WIDTH}" height="${this.config.HEIGHT}" xmlns="http://www.w3.org/2000/svg">\n` +
           `<g><title>background</title>\n<rect fill="#ffffff" id="GUA" height="${this.config.HEIGHT}" width="${this.config.WIDTH}" y="-1" x="-1"/>\n</g>\n` +
           `${this.drawFullGua(this.fullGuaFactory.create(up, down, mutual, date))}</svg>`;
  }

  /**
   * step 1: 繪製全卦
   * @param down 下卦
   * @param up 上卦
   */
  private drawFullGua(fullGua: FullGua): string {
    let gua = `<g>\n<title>Layer 1</title>\n`;
    gua += this.drawSixYao(fullGua.yao, this.YAO_X_POSITION, this.config.DOWN_FIRST_YAO);
    gua += this.drawShihYingAndHeavenlyStem(fullGua);
    gua += this.drawRelativesAndEarthlyBranches(fullGua.yao, 'yao', '本卦', this.config.EARTHLY_BRANCH_COLOR, this.YAO_X_POSITION - this.TEXT_LENGTH);
    gua += this.drawRelativesAndEarthlyBranches(fullGua.hidden, 'hidden', '伏藏', '#BBBBBB', this.YAO_X_POSITION - (this.TEXT_LENGTH * 3 + this.HIDDEN_SPACE));
    gua += this.drawRelativesAndEarthlyBranches(fullGua.mutual, 'mutual', '變爻', '#548ce8', this.YAO_X_POSITION - this.TEXT_LENGTH * 2);
    gua += this.drawMonsters(fullGua.yao);
    gua += this.drawMutual(fullGua.yao, fullGua.mutual);
    gua += this.drawVoid(fullGua);
    gua += `\n</g>\n`;
    return gua;
  }

  /**
   * step 2: 繪製天干、世應
   * @param down 下卦
   * @param up 上卦
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
   * @param 六獸
   */
  private drawMonsters(monsters: Yao[]): string {
    const x = this.YAO_X_POSITION + 105;
    const color = '#22a6b3';
    if (monsters.length === 0) {
      return '';
    }

    let text = this.genTitleTextComponent({
      id: 'monster',
      text: '六獸',
      color,
      fontSize: this.YAO_FONT_SIZE,
      x: x + 20,
      y: this.TITLE_CONFIG.y,
    });

    text += monsters.map( (yao, i) => 
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
        return this.genCircleComponent(`mutual_${m.position}`, circleX, circleY, 11, 'red');
      } else {
        return this.genCrossComponent(crossX, circleY - 10, 'red');
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
      this.genCircleComponent(`yao_void_${y.position}`, x, this.config.DOWN_FIRST_YAO - this.config.YAO_GAP * (y.position - 1), r, color) : ''
    ).join('');
    voidCircle += fullGua.yao.map(y => y.void ?
      this.genCircleComponent(`mutual_void_${y.position}`, x - this.TEXT_LENGTH, this.config.DOWN_FIRST_YAO - this.config.YAO_GAP * (y.position - 1), r, color) : ''
      ).join('');
    voidCircle += fullGua.hidden.map(y => y.void ?
      this.genCircleComponent(`hidden_void_${y.position}`, x - (this.TEXT_LENGTH * 2 + this.HIDDEN_SPACE),
        this.config.DOWN_FIRST_YAO - this.config.YAO_GAP * (y.position - 1), r, color): '').join('');
    return voidCircle;
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
   * @param titleX title X 軸
   * @param yaoX 爻X軸
   * @param isGua 是否本卦，預設false (因本卦的六親、六獸會卡在六爻棒棒之間)
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
      y: this.TITLE_CONFIG.y,
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
   * @param x 
   * @param y 
   * @param color 
   */
  private genCircleComponent(id: string, x: number, y: number, r: number, color: string): string {
    return `<circle id="${id}" cx="${x}" cy="${y}" r="${r}" stroke="${color}" stroke-width="2" fill-opacity="0" />\n`;
  }

  /**
   * 產生X (陰爻動爻)
   * @param x 
   * @param y 
   * @param color 
   */
  private genCrossComponent(x: number, y: number, color: string): string {
    return `<line x1="${x}" y1="${y}" x2="${x + 25}" y2="${y + 20}" stroke="${color}" stroke-width="2" /> ` + 
           `<line x1="${x + 25}" y1="${y}" x2="${x}" y2="${y + 20}" stroke="${color}" stroke-width="2" />\n`;
  }
}
