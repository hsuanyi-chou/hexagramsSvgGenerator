export type Gua = '天' | '澤' | '火' | '雷' | '風' | '水' | '山' | '地';

export interface GuaConfiguration {
    WIDTH: number; // 圖片寬度
    HEIGHT: number; // 圖片長度

    YAO_COLOR: string; // 爻顏色
    YAO_BOLD: number; // 爻的粗度
    YAO_GAP: number; // 每一爻的間距
    YANG_LENGTH: number; // 陽爻長度
    YIN_LENGTH: number; // 陰爻長度
    YIN_GAP: number; // 陰爻中間的空白 (20約18點字體的空間)
    DOWN_FIRST_YAO: number; // 下卦第一爻初始位置 (y軸)
    UP_FIRST_YAO: number; // 上卦第一爻初始位置 (y軸)

    EARTHLY_BRANCH_COLOR: string; // 地支顏色
    HEAVENLY_STEM_COLOR: string; // 天干顏色
    MUTUAL: string; // 動爻顏色
    HIDDEN_COLOR: string; // 伏藏顏色
}