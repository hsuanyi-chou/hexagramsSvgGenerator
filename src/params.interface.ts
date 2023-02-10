import { Gua } from './gua.interface';

export interface BaseParams {
    /** 事由 */
    thing?: string;
}

/**
 * 基礎 create 參數
 * 卦象產生器 參數
 */
export interface CreateParams extends BaseParams {
    up: Gua; // 上卦
    down: Gua; // 下卦
    mutual: number[]; // 動爻(數字陣列)
    date?: Date; // 日期
    cutAt2300?: boolean; // 是否 23:00 換日
}

/**
 * 基礎命卦 參數
 */
export interface CreateFateGuaParams extends BaseParams {
    date: Date;
    cutAt2300?: boolean;
}

/**
 * 命卦 base 參數
 */
export interface GenFateGuaParams extends BaseParams {
    date: Date; // 日期
    withMutual: boolean; // 是否要動爻
    cutAt2300: boolean; // 是否 23:00 換日
}

export interface BuildFateGuaParams extends BaseParams {
    date: Date; // 日期
}

/**
 * 批量命卦 參數
 */
export interface BatchFateGuaParams {
    beginDate: Date;
    endDate: Date;
}

/**
 * 時間取卦 參數
 */
export interface BuildGuaByTimeParams extends BaseParams {
    time: string;
}

/**
 * 金錢卦(buildBy)參數
 */
export interface MoneyGuaParams extends BaseParams {
    yingYangArray: string[]; // 陰陽爻陣列，陰 = 0；陽 = 1
    date: Date; // 日期
    mutual: number[]; // 動爻(數字陣列)
}