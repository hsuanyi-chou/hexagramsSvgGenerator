import { IDayEarthlyBranchReturn, IEarthlyBranchProps, IMonthEarthlyBranchReturn, IMutualEarthlyBranchReturn } from "../earthly-branch.util"

// --------------------- 巳 蛇 Snake ---------------------
export const earthlyBranchSnakeMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['剋'];
        case '丑':
            return ['休'];
        case '寅':
            return ['生'];
        case '卯':
            return ['生'];
        case '辰':
            return ['休'];
        case '巳':
            return ['值'];
        case '午':
            return ['旺'];
        case '未':
            return ['休'];
        case '申':
            return ['合'];
        case '酉':
            return ['囚'];
        case '戌':
            return ['休'];
        case '亥':
            return ['沖', '剋'];
   }
}

export const earthlyBranchSnakeDay = ({ compare }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['剋'];
        case '丑':
            return ['休'];
        case '寅':
            return ['長生'];
        case '卯':
            return ['生'];
        case '辰':
            return ['休'];
        case '巳':
            return ['值'];
        case '午':
            return ['帝旺'];
        case '未':
            return ['休'];
        case '申':
            return ['合'];
        case '酉':
            return ['囚'];
        case '戌':
            return ['墓'];
        case '亥':
            return ['絕', '沖'];
    }
}

export const earthlyBranchSnakeMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化回頭剋'];
        case '丑':
            return ['動化休'];
        case '寅':
            return ['動化回頭長生'];
        case '卯':
            return ['動化回頭生'];
        case '辰':
            return ['動化休'];
        case '巳':
            return ['伏吟'];
        case '午':
            return ['動化進'];
        case '未':
            return ['動化休'];
        case '申':
            return ['動化合'];
        case '酉':
            return ['動化囚'];
        case '戌':
            return ['動入墓'];
        case '亥':
            return ['動化絕', '動化回頭沖剋'];
    }
}

// --------------------- 午 馬 Horse ---------------------
export const earthlyBranchHorseMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['沖','剋'];
        case '丑':
            return ['休'];
        case '寅':
            return ['生'];
        case '卯':
            return ['生'];
        case '辰':
            return ['休'];
        case '巳':
            return ['旺'];
        case '午':
            return ['值'];
        case '未':
            return ['合'];
        case '申':
            return ['囚'];
        case '酉':
            return ['囚'];
        case '戌':
            return ['休'];
        case '亥':
            return ['剋'];
   }
}

export const earthlyBranchHorseDay = ({ compare }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['沖','剋'];
        case '丑':
            return ['休'];
        case '寅':
            return ['長生'];
        case '卯':
            return ['生'];
        case '辰':
            return ['休'];
        case '巳':
            return ['旺'];
        case '午':
            return ['帝旺'];
        case '未':
            return ['合'];
        case '申':
            return ['囚'];
        case '酉':
            return ['囚'];
        case '戌':
            return ['墓'];
        case '亥':
            return ['絕'];
    }
}

export const earthlyBranchHorseMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化回頭沖剋'];
        case '丑':
            return ['動化休'];
        case '寅':
            return ['動化回頭長生'];
        case '卯':
            return ['動化回頭生'];
        case '辰':
            return ['動化休'];
        case '巳':
            return ['動化退'];
        case '午':
            return ['伏吟'];
        case '未':
            return ['動化合'];
        case '申':
            return ['動化囚'];
        case '酉':
            return ['動化囚'];
        case '戌':
            return ['動入墓'];
        case '亥':
            return ['動化回頭剋', '動化絕'];
    }
}