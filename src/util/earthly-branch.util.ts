// 月: 值旺相休困剋沖墓絕
// 動爻: 回頭剋、回頭沖、休、囚、絕、進、退、墓
// 有個hard Code的12地支處理表，回傳`旺、生、剋、沖、休、囚、絕、進、退、墓`，在月日上面，則把`旺, 進, 退` 變成 `旺`。在動爻: 生,剋,沖 前面增加`化回頭`

/**
 * 特例:
 * 1. 水土共長生，在處理日時: 土要判斷長生、帝旺、墓時，要搭配月地支
 * 2. 金的長生是巳，公共函式會是火剋金
 * 3. 變爻時，要判斷長生、墓，不需要帝旺，會是化進、退
 * 4. 月只有基本的值旺衰
 */

import { EarthlyBranch } from "../gua.interface";

export type IEarthlyBranchProps = {
    target: EarthlyBranch;
    compare: EarthlyBranch;
    /**
     * 長生、帝旺、墓、絕
     * 土日: 土要判斷長生、帝旺、墓時，要搭配month的地支
     */
    handle12LongLife: { variant: '月' | '日' | '動', month: EarthlyBranch };
}

export type IMonthEarthlyBranchReturn = ('值' | '旺' | '生' | '剋' | '沖' | '休' | '囚' | '合')[];
export type IDayEarthlyBranchReturn = ('長生' | '帝旺' | '墓' | '絕' | IMonthEarthlyBranchReturn[keyof IMonthEarthlyBranchReturn])[];

export type IMutualEarthlyBranchReturn = (
      '動化進' | '動化退'
    | '動化回頭生' | '動化回頭長生'
    | '動化回頭剋' |'動化回頭剋合' | '動化回頭生合' | '動化合'
    | '動化回頭沖剋' | '動化回頭沖'
    | '動入墓'  | '動化休' | '動化囚' | '動化絕'
    | '伏吟')[];