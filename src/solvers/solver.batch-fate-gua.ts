import { FullGua } from '../full-gua-factory';
import { EarthlyBranch } from '../gua.interface';
import { elementRelative, getElement } from '../util/util';

export class BatchFateGuaSolver {

    /**
     * 世爻旺相(僅依年、空亡判)
     * @param fullGua
     */
    shihWang(fullGua: FullGua): boolean {
        const shih = fullGua.yao[fullGua.HeavenlyStems.shihPosition - 1];
        const yearEarthlyBranch = fullGua.lunarYear.substring(1) as EarthlyBranch;
        const monthEarthlyBranch = fullGua.lunarMonth.substring(1) as EarthlyBranch;
        return this.wang(yearEarthlyBranch, monthEarthlyBranch, shih.earthlyBranch) && !shih.void;
    }

    /**
     * 僅元震說命卦長生要月來旺相，不確定要不要，先留著
     * 若不考慮長生這些，月地支就無用了
     * @param year 年地支
     * @param month 月地支
     * @param shih 世地支
     * @return true=旺相、false=衰
     * @private
     */
    private wang(year: EarthlyBranch, month: EarthlyBranch, shih: EarthlyBranch): boolean {
        const shihElement = getElement(shih);
        const yearElement = getElement(year);
        const monthElement = getElement(month)
        switch (shihElement) {
            case '土':
                return elementRelative(shihElement, yearElement) ||
                    (elementRelative(shihElement, monthElement) && (year === '申' || year === '子'));
            case '金':
                return elementRelative(shihElement, yearElement) ||
                (elementRelative(shihElement, monthElement) && year === '巳');
            default:
                return elementRelative(shihElement, yearElement);
        }
    }

}