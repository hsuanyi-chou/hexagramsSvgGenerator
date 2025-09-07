import { IDayEarthlyBranchReturn, IEarthlyBranchProps, IMonthEarthlyBranchReturn, IMutualEarthlyBranchReturn } from "../earthly-branch.util"
import { isMonthWang } from "../util";

// --------------------- 子 水 rat ---------------------
export const earthlyBranchRatMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['值'];
        case '丑':
            return ['剋', '合'];
        case '寅':
            return ['休'];
        case '卯':
            return ['休'];
        case '辰':
            return ['剋'];
        case '巳':
            return ['囚'];
        case '午':
            return ['沖'];
        case '未':
            return ['剋'];
        case '申':
            return ['生'];
        case '酉':
            return ['生'];
        case '戌':
            return ['剋'];
        case '亥':
            return ['旺'];
       }
}

export const earthlyBranchRatMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['伏吟'];
        case '丑':
            return ['動化回頭剋合'];
        case '寅':
            return ['動化休'];
        case '卯':
            return ['動化休'];
        case '辰':
            return ['動入墓'];
        case '巳':
            return ['動化囚'];
        case '午':
            return ['動化回頭沖剋'];
        case '未':
            return ['動化回頭剋'];
        case '申':
            return ['動化回頭長生'];
        case '酉':
            return ['動化回頭生'];
        case '戌':
            return ['動化回頭剋'];
        case '亥':
            return ['動化退'];
       }
}

export const earthlyBranchRatDay = ({ compare, handle12LongLife }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['帝旺'];
        case '丑':
            return ['剋', '合'];
        case '寅':
            return ['休'];
        case '卯':
            return ['休'];
        case '辰':
            return ['墓'];
        case '巳':
            if (isMonthWang({ compare: '子', lunarMonth: handle12LongLife.month })) {
                return ['囚'];
            } else {
                return ['絕'];
            }
        case '午':
            return ['沖'];
        case '未':
            return ['剋'];
        case '申':
            return ['長生'];
        case '酉':
            return ['生'];
        case '戌':
            return ['剋'];
        case '亥':
            return ['旺'];
       }
}

// --------------------- 亥 豬 pig ---------------------
export const earthlyBranchPigMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['旺'];
        case '丑':
            return ['剋'];
        case '寅':
            return ['生', '合'];
        case '卯':
            return ['休'];
        case '辰':
            return ['剋'];
        case '巳':
            return ['囚'];
        case '午':
            return ['沖'];
        case '未':
            return ['剋'];
        case '申':
            return ['生'];
        case '酉':
            return ['生'];
        case '戌':
            return ['剋'];
        case '亥':
            return ['值'];
       }
}

export const earthlyBranchPigMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化進'];
        case '丑':
            return ['動化回頭剋'];
        case '寅':
            return ['動化合'];
        case '卯':
            return ['動化休'];
        case '辰':
            return ['動入墓'];
        case '巳':
            return ['動化回頭沖剋', '動化絕'];
        case '午':
            return ['動化囚'];
        case '未':
            return ['動化回頭剋'];
        case '申':
            return ['動化回頭長生'];
        case '酉':
            return ['動化回頭生'];
        case '戌':
            return ['動化回頭剋'];
        case '亥':
            return ['伏吟'];
       }
}

export const earthlyBranchPigDay = ({ compare, handle12LongLife }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['帝旺'];
        case '丑':
            return ['剋'];
        case '寅':
            return ['合'];
        case '卯':
            return ['休'];
        case '辰':
            return ['墓'];
        case '巳':
            const result: IDayEarthlyBranchReturn = ['沖'];
            if (isMonthWang({ compare: '亥', lunarMonth: handle12LongLife.month })) {
                return result;
            } else {
                return [...result, '絕'];
            }
        case '午':
            return ['囚'];
        case '未':
            return ['剋'];
        case '申':
            return ['長生'];
        case '酉':
            return ['生'];
        case '戌':
            return ['剋'];
        case '亥':
            return ['值'];
       }
}