import { IDayEarthlyBranchReturn, IEarthlyBranchProps, IMonthEarthlyBranchReturn, IMutualEarthlyBranchReturn } from "../earthly-branch.util"

// --------------------- 申 猴 monkey ---------------------
export const earthlyBranchMonkeyMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['休'];
        case '丑':
            return ['生'];
        case '寅':
            return ['沖'];
        case '卯':
            return ['囚'];
        case '辰':
            return ['生'];
        case '巳':
            return ['剋', '合'];
        case '午':
            return ['剋'];
        case '未':
            return ['生'];
        case '申':
            return ['值'];
        case '酉':
            return ['旺'];
        case '戌':
            return ['生'];
        case '亥':
            return ['休'];
       }
}

export const earthlyBranchMonkeyDay = ({ compare }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['休'];
        case '丑':
            return ['墓'];
        case '寅':
            return ['沖', '絕'];
        case '卯':
            return ['囚'];
        case '辰':
            return ['生'];
        case '巳':
            return ['長生', '合'];
        case '午':
            return ['剋'];
        case '未':
            return ['生'];
        case '申':
            return ['值'];
        case '酉':
            return ['帝旺'];
        case '戌':
            return ['生'];
        case '亥':
            return ['休'];
       }
}

export const earthlyBranchMonkeyMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化休'];
        case '丑':
            return ['動入墓'];
        case '寅':
            return ['動化絕', '動化回頭沖'];
        case '卯':
            return ['動化囚'];
        case '辰':
            return ['動化回頭長生'];
        case '巳':
            return ['動化回頭長生'];
        case '午':
            return ['動化回頭剋'];
        case '未':
            return ['動化回頭生'];
        case '申':
            return ['伏吟'];
        case '酉':
            return ['動化進'];
        case '戌':
            return ['動化回頭生'];
        case '亥':
            return ['動化休'];
       }
}


// --------------------- 酉  雞 Rooster ---------------------
export const earthlyBranchRoosterMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['休'];
        case '丑':
            return ['生'];
        case '寅':
            return ['囚'];
        case '卯':
            return ['沖'];
        case '辰':
            return ['生', '合'];
        case '巳':
            return ['剋'];
        case '午':
            return ['剋'];
        case '未':
            return ['生'];
        case '申':
            return ['旺'];
        case '酉':
            return ['值'];
        case '戌':
            return ['合'];
        case '亥':
            return ['休'];
        }
}

export const earthlyBranchRoosterDay = ({ compare }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['休'];
        case '丑':
            return ['墓'];
        case '寅':
            return ['絕'];
        case '卯':
            return ['休'];
        case '辰':
            return ['生', '合'];
        case '巳':
            return ['長生'];
        case '午':
            return ['剋'];
        case '未':
            return ['生'];
        case '申':
            return ['旺'];
        case '酉':
            return ['帝旺'];
        case '戌':
            return ['生'];
        case '亥':
            return ['休'];
       }
}

export const earthlyBranchRoosterMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化休'];
        case '丑':
            return ['動入墓'];
        case '寅':
            return ['動化絕'];
        case '卯':
            return ['動化回頭沖'];
        case '辰':
            return ['動化回頭生合'];
        case '巳':
            return ['動化回頭長生'];
        case '午':
            return ['動化回頭剋'];
        case '未':
            return ['動化回頭生'];
        case '申':
            return ['動化退'];
        case '酉':
            return ['伏吟'];
        case '戌':
            return ['動化回頭生'];
        case '亥':
            return ['動化休'];
       }
}