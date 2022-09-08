import { Elements, EarthlyBranch } from '../gua.interface';

/**
 * 傳入天干、地支，回傳五行 (天干還沒做，用到機會少)
 * @param type 天干/地支
 * @return 五行
 */
export function getElement(type: EarthlyBranch): Elements {
    let text: Elements = '' as Elements;
    switch (type) {
        case '子':
        case '亥':
            text = '水';
            break;
        case '寅':
        case '卯':
            text = '木';
            break;
        case '巳':
        case '午':
            text = '火';
            break;
        case '申':
        case '酉':
            text = '金';
            break;
        case '辰':
        case '未':
        case '戌':
        case '丑':
            text = '土';
            break;
    }
    return text;
}

/**
 * 傳入目標、標的，比對旺衰
 * @param target 比對目標(如世爻)
 * @param compare 比對標的(如年月日)
 * @return true=旺相、false=衰
 */
export function elementRelative(target: Elements, compare: Elements): boolean {
    switch (target) {
        case '土':
            return compare === '土' || compare === '火';
        case '木':
            return compare === '木' || compare === '水';
        case '水':
            return compare === '水' || compare === '金';
        case '火':
            return compare === '火' || compare === '木';
        case '金':
            return compare === '金' || compare === '土';
    }
}