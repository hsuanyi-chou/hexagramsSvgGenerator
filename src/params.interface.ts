import { Gua } from './gua.interface';
import { RandomNum } from './money-gua.interface';

export interface BaseParams {
    /** 事由 */
    thing?: string;
    /** 是否顯示生成時間 */
    showGenTime?: boolean;
}

/**
 * 基礎 create 參數
 * 卦象產生器 參數
 */
export interface CreateParams extends BaseParams {
    /** 上卦 */
    up: Gua;
    /** 下卦 */
    down: Gua;
    /** 動爻(數字陣列) */
    mutual: number[];
    /** 日期 */
    date?: Date;
    /** 是否 23:00 換日 */
    cutAt2300?: boolean;
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
    /** 日期 */
    date: Date;
    /** 是否要動爻 */
    withMutual: boolean;
    /** 是否 23:00 換日 */
    cutAt2300: boolean;
}

export interface BuildFateGuaParams extends BaseParams {
    /** 日期 */
    date: Date;
}

/**
 * 批量命卦 參數
 */
export interface BatchFateGuaParams {
    beginDate: Date;
    endDate: Date;
    cutAt2300?: boolean;
    /** 是否顯示生成時間 */
    showGenTime?: boolean;
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
    /** 搖卦數字記錄，供網址回產卦象 */
    shakeNumRecords: RandomNum[];
    /** 搖卦日期 */
    date: Date;
}
