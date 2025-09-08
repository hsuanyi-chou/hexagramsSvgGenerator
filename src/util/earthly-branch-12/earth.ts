import { IDayEarthlyBranchReturn, IEarthlyBranchProps, IMonthEarthlyBranchReturn, IMutualEarthlyBranchReturn } from "../earthly-branch.util"
import { getElement, isMonthWang } from "../util";
// --------------------- 丑 牛 Ox ---------------------
export const earthlyBranchOxMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['合'];
        case '丑':
            return ['值'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['剋'];
        case '辰':
            return ['旺'];
        case '巳':
            return ['生'];
        case '午':
            return ['生'];
        case '未':
            return ['沖'];
        case '申':
            return ['休'];
        case '酉':
            return ['休'];
        case '戌':
            return ['旺'];
        case '亥':
            return ['囚'];
   }
}

export const earthlyBranchOxDay = ({ compare, handle12LongLife }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            const result: IDayEarthlyBranchReturn = ['合'];
            if (isMonthWang({ target: '丑', lunarMonth: handle12LongLife.month })) {
                return [...result, '帝旺'];
            } else {
                return [...result, '囚'];
            }
        case '丑':
            return ['值'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['剋'];
        case '辰':
            return ['墓'];
        case '巳':
            if (isMonthWang({ target: '丑', lunarMonth: handle12LongLife.month })) {
                return ['生'];
            } else {
                return ['絕'];
            }
        case '午':
            return ['生'];
        case '未':
            return ['沖'];
        case '申':
            if (isMonthWang({ target: '丑', lunarMonth: handle12LongLife.month })) {
                return ['長生'];
            } else {
                return ['休'];
            }
        case '酉':
            return ['休'];
        case '戌':
            return ['旺'];
        case '亥':
            return ['囚'];
    }
}

export const earthlyBranchOxMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化合'];
        case '丑':
            return ['伏吟'];
        case '寅':
            return ['動化回頭剋'];
        case '卯':
            return ['動化回頭剋'];
        case '辰':
            return ['動化進'];
        case '巳':
            return ['動化絕'];
        case '午':
            return ['動化回頭生'];
        case '未':
            return ['動化回頭沖'];
        case '申':
            return ['動化回頭長生'];
        case '酉':
            return ['動化休'];
        case '戌':
            return ['動化退'];
        case '亥':
            return ['動化囚'];
    }
}

// --------------------- 辰 龍 Dragon ---------------------
export const earthlyBranchDragonMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['囚'];
        case '丑':
            return ['旺'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['剋'];
        case '辰':
            return ['值'];
        case '巳':
            return ['生'];
        case '午':
            return ['生'];
        case '未':
            return ['旺'];
        case '申':
            return ['休'];
        case '酉':
            return ['合'];
        case '戌':
            return ['沖'];
        case '亥':
            return ['囚'];
   }
}

export const earthlyBranchDragonDay = ({ compare, handle12LongLife }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            if (isMonthWang({ target: '辰', lunarMonth: handle12LongLife.month })) {
                return ['帝旺'];
            } else {
                return ['囚'];
            }
        case '丑':
            return ['旺'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['剋'];
        case '辰':
            return ['值'];
        case '巳':
            if (isMonthWang({ target: '辰', lunarMonth: handle12LongLife.month })) {
                return ['生'];
            } else {
                return ['絕'];
            }
        case '午':
            return ['生'];
        case '未':
            return ['旺'];
        case '申':
            if (isMonthWang({ target: '辰', lunarMonth: handle12LongLife.month })) {
                return ['長生'];
            } else {
                return ['休'];
            }
        case '酉':
            return ['合'];
        case '戌':
            return ['沖'];
        case '亥':
            return ['囚'];
    }
}

export const earthlyBranchDragonMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化囚'];
        case '丑':
            return ['動化退'];
        case '寅':
            return ['動化回頭剋'];
        case '卯':
            return ['動化回頭剋'];
        case '辰':
            return ['伏吟'];
        case '巳':
            return ['動化絕'];
        case '午':
            return ['動化回頭生'];
        case '未':
            return ['動化進'];
        case '申':
            return ['動化回頭長生'];
        case '酉':
            return ['動化合'];
        case '戌':
            return ['動化回頭沖'];
        case '亥':
            return ['動化囚'];
    }
}

// --------------------- 未 羊 Goat ---------------------
export const earthlyBranchGoatMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['囚'];
        case '丑':
            return ['沖'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['剋'];
        case '辰':
            return ['旺'];
        case '巳':
            return ['生'];
        case '午':
            return ['生', '合'];
        case '未':
            return ['值'];
        case '申':
            return ['休'];
        case '酉':
            return ['休'];
        case '戌':
            return ['旺'];
        case '亥':
            return ['囚'];
   }
}

export const earthlyBranchGoatDay = ({ compare, handle12LongLife }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            if (isMonthWang({ target: compare, lunarMonth: handle12LongLife.month })) {
                return ['帝旺'];
            } else {
                return ['囚'];
            }
        case '丑':
            return ['沖'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['剋'];
        case '辰':
            return ['墓'];
        case '巳':
            if (isMonthWang({ target: '未', lunarMonth: handle12LongLife.month })) {
                return ['生'];
            } else {
                return ['絕'];
            }
        case '午':
            return ['生', '合'];
        case '未':
            return ['值'];
        case '申':
            if (isMonthWang({ target: '未', lunarMonth: handle12LongLife.month })) {
                return ['長生'];
            } else {
                return ['休'];
            }
        case '酉':
            return ['合'];
        case '戌':
            return ['旺'];
        case '亥':
            return ['囚'];
    }
}

export const earthlyBranchGoatMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化囚'];
        case '丑':
            return ['動化回頭沖'];
        case '寅':
            return ['動化回頭剋'];
        case '卯':
            return ['動化回頭剋'];
        case '辰':
            return ['動化退'];
        case '巳':
            return ['動化絕'];
        case '午':
            return ['動化回頭生合'];
        case '未':
            return ['伏吟'];
        case '申':
            return ['動化回頭長生'];
        case '酉':
            return ['動化休'];
        case '戌':
            return ['動化進'];
        case '亥':
            return ['動化囚'];
    }
}

// --------------------- 戌 狗 Dog ---------------------
export const earthlyBranchDogMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['囚'];
        case '丑':
            return ['旺'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['合', '剋'];
        case '辰':
            return ['沖'];
        case '巳':
            return ['生'];
        case '午':
            return ['生'];
        case '未':
            return ['旺'];
        case '申':
            return ['休'];
        case '酉':
            return ['休'];
        case '戌':
            return ['值'];
        case '亥':
            return ['囚'];
   }
}

export const earthlyBranchDogDay = ({ compare, handle12LongLife }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            if (isMonthWang({ target: compare, lunarMonth: handle12LongLife.month })) {
                return ['帝旺'];
            } else {
                return ['囚'];
            }
        case '丑':
            return ['旺'];
        case '寅':
            return ['剋'];
        case '卯':
            return ['剋', '合'];
        case '辰':
            return ['墓', '沖'];
        case '巳':
            if (isMonthWang({ target: '戌', lunarMonth: handle12LongLife.month })) {
                return ['生'];
            } else {
                return ['絕'];
            }
        case '午':
            return ['生'];
        case '未':
            return ['旺'];
        case '申':
            if (isMonthWang({ target: '戌', lunarMonth: handle12LongLife.month })) {
                return ['長生'];
            } else {
                return ['休'];
            }
        case '酉':
            return ['休'];
        case '戌':
            return ['值'];
        case '亥':
            return ['囚'];
    }
}

export const earthlyBranchDogMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化囚'];
        case '丑':
            return ['動化進'];
        case '寅':
            return ['動化回頭剋'];
        case '卯':
            return ['動化回頭剋合'];
        case '辰':
            return ['動化回頭沖'];
        case '巳':
            return ['動化絕'];
        case '午':
            return ['動化回頭生'];
        case '未':
            return ['動化退'];
        case '申':
            return ['動化回頭長生'];
        case '酉':
            return ['動化休'];
        case '戌':
            return ['伏吟'];
        case '亥':
            return ['動化囚'];
    }
}