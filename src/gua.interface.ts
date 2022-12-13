import { FullGua } from './full-gua-factory';

export type Gua = '天' | '澤' | '火' | '雷' | '風' | '水' | '山' | '地';

export type Elements = '金' | '木' | '水' | '火' | '土';

export type Relative = '官鬼' | '父母' | '兄弟' | '子孫' | '妻財';

export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

export type GungName = '乾' | '兌' | '離' | '震' | '巽' | '坎' | '艮' | '坤';

export type YingYangYao = '000' | '001' | '010' | '011' | '100' | '101' | '110' | '111';
export interface Yao {
    earthlyBranch: EarthlyBranch; // 地支
    relative: Relative; // 六親
    monster?: string; // 六獸
    void?: boolean; // 空亡
    position: number; // 位置 (配合陣列，由0開始)
    isYangYao?: boolean // 陰陽爻 (true = 陽；false = 陰)
}

export interface HeavenlyStems {
    shih: HeavenlyStem;
    shihPosition: number;
    ying: HeavenlyStem;
    yingPosition: number;
}
export interface Gung {
    name: GungName;
    element: Elements;
}

// 產出此卦的基本傳入資料，供之後確認時間是否有問題
export interface GenGuaBase {
    up: Gua,
    down: Gua,
    date: Date | undefined,
    mutual: number[]
}

export interface IFullGua {
    originalName: string // 原本卦名(用來取得經文內容用)
    name: string; // 卦名
    description: string; // 四字卦辭
    yao: Yao[];  // 六爻 - 地支、六親
    hidden: Yao[]; // 伏藏
    HeavenlyStems: HeavenlyStems // 天干、世應位置
    gung: Gung; // 宮
    hints?: string[]; // 提示
    scriptures?: Scripture[]; // 經書內容
    genGuaBase: GenGuaBase; // 產出此卦的基本傳入資料，供之後確認時間是否有問題
    solver: { description: string; result: boolean }[]; // 目前只有世爻旺相使用(格式為世爻旺相)。在卦象產生器裡是寫any[]
}

export interface Scripture {
    title: string; // 書名
    content: string; // 內容
}

export interface ShihYingPosition {
    shih: number; // 世爻位置
    ying: number; // 應爻位置
}
export interface GuaConfiguration {
    WIDTH: number; // 圖片寬度
    HEIGHT: number; // 圖片長度

    YAO_COLOR: string; // 爻顏色
    YAO_BOLD: number; // 爻的粗度
    YAO_GAP: number; // 每一爻的間距
    YANG_LENGTH: number; // 陽爻長度
    YIN_LENGTH: number; // 陰爻長度
    YIN_GAP: number; // 陰爻中間的空白 (20約18點字體的空間)
    DOWN_FIRST_YAO: number; // 下卦第一爻初始位置 (y軸)。傳入的最大值 = HEIGHT - 26 (要預留世爻位置)

    FONT_FAMILY: string; // 文字字型
    EARTHLY_BRANCH_COLOR: string; // 地支顏色
    HEAVENLY_STEM_COLOR: string; // 天干顏色
    MUTUAL_COLOR: string; // 動爻顏色
    HIDDEN_COLOR: string; // 伏藏顏色
    MONSTER_COLOR: string; // 六獸顏色
    SHIH_YING_COLOR: string; // 世應顏色
    SIDE_INFO_COLOR: string; // 側邊資訊處顏色
}

export interface SolarLunarData {
    lYear: number,      // 農曆年(數字)
    lMonth: number,     // 農曆月(數字)
    lDay: number,       // 農曆日(數字)
    animal: string,     // 生肖
    yearCn: string,     // 西元年(中文)
    monthCn: string,    // 農曆月(中文)
    dayCn: string,      // 農曆日(中文)
    cYear: number,      // 國曆年(數字)
    cMonth: number,     // 國曆月(數字)
    cDay: number,       // 國曆日(數字)
    gzYear: string,     // 干支年
    gzMonth: string,    // 千支月
    gzDay: string,      // 干支日
    isToday: boolean,   // 是否今日
    isLeap: boolean,    // 是否有閏月
    nWeek: number,      // 星期(數字)
    ncWeek: string,     // 星期(國字)
    isTerm: boolean,    // 是否有24節氣
    term: string,       // 24節氣
}

export interface GuaResult {
    fullGua: FullGua;
    svg: string
}
