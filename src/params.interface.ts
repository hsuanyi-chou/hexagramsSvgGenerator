import { Gua } from './gua.interface';

interface BaseParams {
    thing?: string; // 事由
}

/**
 * 基礎 create 參數
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
