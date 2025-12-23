import { BaseParams } from './params.interface';

export type RandomNum =
  | '000'
  | '001'
  | '010'
  | '011'
  | '100'
  | '101'
  | '110'
  | '111'
  | '';

/** 供 UI 呈現搖卦過程。反向順序存入資料，由六爻~初爻儲存。利於 UI 直接使用 */
export interface ShakeRecord {
  record: RandomNum;
  position: string;
}

/**
 * 金錢卦，產卦基礎資料
 */
export interface BuildGuaData extends BaseParams {
  /** 搖卦數字記錄，供網址回產卦象 */
  shakeNumRecords: RandomNum[];
  /** 目前每爻之陰陽，陰 = 0；陽 = 1 */
  yingYangArray: string[];
  /** 目前第幾爻，供記錄動爻位置。1~6。初始值為 1 */
  shakeCounts: number;
  /** 目前動爻，依搖到的位置記錄 */
  mutual: number[];
  /** 供 UI 呈現搖卦過程。反向順序存入資料，由六爻~初爻儲存。利於 UI 直接使用 */
  shakeRecords: ShakeRecord[];
  /** 搖卦日期 */
  date: Date;
}
