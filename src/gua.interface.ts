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
export interface IFullGua {
    name: string; // 卦名
    description: string; // 四字卦辭
    yao: Yao[];  // 六爻 - 地支、六親
    hidden: Yao[]; // 伏藏
    HeavenlyStems: HeavenlyStems // 天干、世應位置
    gung: Gung; // 宮
    hint?: string[]; // 提示
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
    MUTUAL: string; // 動爻顏色
    HIDDEN_COLOR: string; // 伏藏顏色
    SHIH_YING_COLOR: string; // 世應顏色
    SIDE_INFO_COLOR: string; // 側邊資訊處顏色
}

export interface LunarDate {
    zodiac: string;
    GanZhiYear: 'string;
    GanZhiMonth: string;
    GanZhiDay: 'string;
    worktime: number;
    term: any;
    lunarYear: number;
    lunarMonth: number;
    lunarDay: number;
    lunarMonthName: string;
    lunarDayName: string;
    lunarLeapMonth: number;
    solarFestival: any;
    lunarFestival: any;
}