import { Gua, GuaConfiguration, PositionYao, SixYaoArray } from './gua.interface';
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
private readonly SIX_YAO_ARRAY: SixYaoArray[] = ['one', 'two', 'three', 'four', 'five', 'six'];
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

  private readonly YAO_FONT_SIZE = 24;

  private readonly YAO_X_POSITION = 190; // 爻的X軸位置常數

  private readonly SHIH_FIRST_YAO_RELATIVE_POSITION = 26; // 世爻第一爻相對位置常數
  private SHIH_FIRST_YAO =
    this.config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION; // 世爻第一爻位置(y軸)

  constructor(config?: GuaConfiguration) {
    if (config) {
      this.config = config;
      this.SHIH_FIRST_YAO =
        config.DOWN_FIRST_YAO + this.SHIH_FIRST_YAO_RELATIVE_POSITION;
    }
  }

  /**
   * 產生卦象
   * @param up 上卦
   * @param down 下卦
   * @return svg 純文字內容
   */
  buildGua(up: Gua, down: Gua) {
    const gua = this.fullGuaFactory.create(up, down) as FullGua;

    let svg = `<!-- Created By Hexagrams-SVG-Generator -->
            <svg width="${this.config.WIDTH}" height="${this.config.HEIGHT}" xmlns="http://www.w3.org/2000/svg">
            <g>
                <title>background</title>
                <rect fill="#ffffff" id="GUA" height="${this.config.HEIGHT}" width="${this.config.WIDTH}" y="-1" x="-1"/>
            </g>`;
    svg += this.drawFullGua(down, up, gua);
    svg += '</svg>';
    return svg;
  }

  /**
   * step 1: 繪製全卦
   * @param down 下卦
   * @param up 上卦
   */
  private drawFullGua(down: Gua, up: Gua, fullGua: FullGua): string {
    let gua = `<g>
            <title>Layer 1</title>\n`;
    gua += this.drawGua(
      down,
      'down',
      this.YAO_X_POSITION,
      this.config.DOWN_FIRST_YAO,
    );
    gua += this.drawGua(
      up,
      'up',
      this.YAO_X_POSITION,
      this.config.DOWN_FIRST_YAO - this.config.YAO_GAP * 3,
    );
    gua += this.drawEarthlyBranchesAndRelatives(fullGua);
    gua += this.drawShihYingAndHeavenlyStem(fullGua);
    gua += this.drawHidden(fullGua.hidden);
    gua += `\n</g>\n`;
    return gua;
  }

  /**
   * step 2: 裝卦：地支、六親
   * @param fullGua 全卦
   * @return 填寫地支、六親
   */
  private drawEarthlyBranchesAndRelatives(fullGua: FullGua): string {
    let text = '';
    let idIndex = 0;
    const xForEarthlyBranch = 300; // 地支x軸
    const xForRelative = 135; // 六親x軸

    let y = this.config.DOWN_FIRST_YAO + 10;

    for (const yao of this.SIX_YAO_ARRAY) {
      const earthlyBranch = fullGua.yao[yao].earthlyBranch;
      const relative = fullGua.yao[yao].relative;
      // 地支
      text += this.genSvgTextComponent({
        id: `earthlyBranch_${idIndex++}`,
        text: earthlyBranch,
        color: this.config.EARTHLY_BRANCH_COLOR,
        fontSize: this.YAO_FONT_SIZE,
        x: xForEarthlyBranch,
        y,
      });
      // 六親
      text += this.genSvgTextComponent({
        id: `relative_${idIndex++}`,
        text: relative,
        color: this.config.EARTHLY_BRANCH_COLOR,
        fontSize: this.YAO_FONT_SIZE,
        x: xForRelative,
        y,
      });
      y -= this.config.YAO_GAP;
    }

    return text;
  }

  /**
   * step 3: 繪製天干、世應
   * @param down 下卦
   * @param up 上卦
   */
  private drawShihYingAndHeavenlyStem(fullGua: FullGua): string {
    let text = '';
    const x = 232;
    const shihY =
      this.SHIH_FIRST_YAO -
      this.config.YAO_GAP * (fullGua.HeavenlyStems.shihPosition - 1);
    const yingY =
      this.SHIH_FIRST_YAO -
      this.config.YAO_GAP * (fullGua.HeavenlyStems.yingPosition - 1);

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
   * step 1.1: 繪製全卦的子功能
   * @param gua 卦
   * @param idPrefix id前置名稱
   * @param x 起始爻的x
   * @param y 起始爻的y
   */
  private drawGua(gua: Gua, idPrefix: string, x: number, y: number): string {
    let yao = '';
    let idIndex = 0;
    switch (gua) {
      case '天':
        for (let i = 1; i <= 3; i++) {
          yao += this.drawYangYao(`${idPrefix}_${i}`, x, y);
          y -= this.config.YAO_GAP;
        }
        break;
      case '澤':
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        break;
      case '火':
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        break;
      case '雷':
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        break;
      case '風':
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        break;
      case '水':
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        break;
      case '山':
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYinYao(`${idPrefix}_${idIndex++}`, x, y);
        y -= this.config.YAO_GAP;
        yao += this.drawYangYao(`${idPrefix}_${idIndex++}`, x, y);
        break;
      case '地':
        for (let i = 1; i <= 3; i++) {
          yao += this.drawYinYao(`${idPrefix}_${i}`, x, y);
          y -= this.config.YAO_GAP;
        }
        break;
    }
    return yao;
  }

  /**
   * step 1.2: 繪製陰爻
   * @param id SVG圖片id
   * @param x 起始爻的x
   * @param y 起始爻的y
   */
  private drawYinYao(id: string, x: number, y: number) {
    const x2 = x + this.config.YIN_LENGTH;
    return `<line stroke="${this.config.YAO_COLOR}" id="${
      id + '-1'
    }" x1="${x}" y1="${y}" x2="${x2}" y2="${y}" stroke-width="${
      this.config.YAO_BOLD
    }" fill="none"/>
                <line stroke="${this.config.YAO_COLOR}" id="${id + '-2'}" x1="${
      x2 + this.config.YIN_GAP
    }" y1="${y}" x2="${
      x2 + this.config.YIN_GAP + this.config.YIN_LENGTH
    }" y2="${y}" stroke-width="${this.config.YAO_BOLD}" fill="none"/>\n`;
  }

  /**
   * step 1.2: 繪製陽爻
   * @param id SVG圖片id
   * @param x 起始爻的x
   * @param y 起始爻的y
   */
  private drawYangYao(id: string, x: number, y: number) {
    return `<line stroke="${
      this.config.YAO_COLOR
    }" id="${id}" x1="${x}" y1="${y}" x2="${
      x + this.config.YANG_LENGTH
    }" y2="${y}" stroke-width="${this.config.YAO_BOLD}" fill="none"/>\n`;
  }

  /**
   * step 2: 繪製伏藏
   * @param hidden 伏藏
   */
  private drawHidden(hidden: PositionYao[]): string {
    const y = this.config.DOWN_FIRST_YAO + 10;

    if (hidden.length === 0) {
      return '';
    }

    let text = this.genSvgTextComponent({
      id: `hidden_tittle`,
      text: '伏藏',
      color: '#BBBBBB',
      fontSize: this.YAO_FONT_SIZE,
      x: 20,
      y: 25,
    });
    text += hidden
      .map((h, index) =>
        this.genSvgTextComponent({
          id: `hidden_${index}`,
          text: `${h.relative} ${h.earthlyBranch}`,
          color: '#BBBBBB',
          fontSize: this.YAO_FONT_SIZE,
          x: 5,
          y: y - (h.position - 1) * this.config.YAO_GAP,
        }),
      )
      .join('');

    return text;
  }

  /**
   * 產生svg text 元件
   * @param svgTextConfig
   */
  private genSvgTextComponent(svgTextConfig: {
    id: string;
    text: string;
    color: string;
    fontSize: number;
    x: number;
    y: number;
  }) {
    return (
      `<text xml:space="preserve" text-anchor="start" font-family="${this.config.FONT_FAMILY}" font-size="${svgTextConfig.fontSize}" id="${svgTextConfig.id}" ` +
      `y="${svgTextConfig.y}" x="${svgTextConfig.x}" stroke-opacity="null" stroke-width="0" stroke="#000" fill="${svgTextConfig.color}">${svgTextConfig.text}</text>\n`
    );
  }
}
