import { IDayEarthlyBranchReturn, IEarthlyBranchProps, IMonthEarthlyBranchReturn, IMutualEarthlyBranchReturn } from "../earthly-branch.util"

// --------------------- 寅 虎 Tiger---------------------
export const earthlyBranchTigerMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['生'];
        case '丑':
            return ['囚'];
        case '寅':
            return ['值'];
        case '卯':
            return ['旺'];
        case '辰':
            return ['囚'];
        case '巳':
            return ['休'];
        case '午':
            return ['休'];
        case '未':
            return ['囚'];
        case '申':
            return ['沖'];
        case '酉':
            return ['囚'];
        case '戌':
            return ['囚'];
        case '亥':
            return ['生', '合'];
       }
}

export const earthlyBranchTigerMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化回頭生'];
        case '丑':
            return ['動化囚'];
        case '寅':
            return ['伏吟'];
        case '卯':
            return ['動化進'];
        case '辰':
            return ['動化囚'];
        case '巳':
            return ['動化休'];
        case '午':
            return ['動化休'];
        case '未':
            return ['動入墓'];
        case '申':
            return ['動化回頭沖剋', '動化絕'];
        case '酉':
            return ['動化回頭剋'];
        case '戌':
            return ['動化回頭剋'];
        case '亥':
            return ['動化回頭長生'];
       }
}

export const earthlyBranchTigerDay = ({ compare }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['生'];
        case '丑':
            return ['囚'];
        case '寅':
            return ['值'];
        case '卯':
            return ['帝旺'];
        case '辰':
            return ['囚'];
        case '巳':
            return ['休'];
        case '午':
            return ['休'];
        case '未':
            return ['墓'];
        case '申':
            return ['絕'];
        case '酉':
            return ['剋'];
        case '戌':
            return ['囚'];
        case '亥':
            return ['長生'];
       }
}


// --------------------- 卯 兔 Rabbit---------------------
export const earthlyBranchRabbitMonth = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMonthEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['生'];
        case '丑':
            return ['囚'];
        case '寅':
            return ['旺'];
        case '卯':
            return ['值'];
        case '辰':
            return ['囚'];
        case '巳':
            return ['休'];
        case '午':
            return ['休'];
        case '未':
            return ['囚'];
        case '申':
            return ['剋'];
        case '酉':
            return ['沖', '剋'];
        case '戌':
            return ['合'];
        case '亥':
            return ['生'];
       }
}

export const earthlyBranchRabbitMutual = ({ compare }: Pick<IEarthlyBranchProps, 'compare'>):IMutualEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['動化回頭生'];
        case '丑':
            return ['動化囚'];
        case '寅':
            return ['動化退'];
        case '卯':
            return ['伏吟'];
        case '辰':
            return ['動化囚'];
        case '巳':
            return ['動化休'];
        case '午':
            return ['動化休'];
        case '未':
            return ['動入墓'];
        case '申':
            return ['動化回頭剋', '動化絕'];
        case '酉':
            return ['動化回頭沖剋'];
        case '戌':
            return ['動化合'];
        case '亥':
            return ['動化回頭長生'];
       }
}

export const earthlyBranchRabbitDay = ({ compare }: Pick<IEarthlyBranchProps, 'compare' | 'handle12LongLife'>): IDayEarthlyBranchReturn => {
    switch(compare) {
        case '子':
            return ['生'];
        case '丑':
            return ['囚'];
        case '寅':
            return ['旺'];
        case '卯':
            return ['帝旺'];
        case '辰':
            return ['囚'];
        case '巳':
            return ['休'];
        case '午':
            return ['休'];
        case '未':
            return ['墓'];
        case '申':
            return ['剋'];
        case '酉':
            return ['剋', '沖'];
        case '戌':
            return ['合'];
        case '亥':
            return ['長生'];
       }
}