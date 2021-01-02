/**
 * 仍有許多其他function。但本專案只建立需要用到的部份
 * 詳細功能見 solarlunar 專案
 * @see https://www.npmjs.com/package/solarlunar
 */
declare module 'solarlunar' {
    type SolarLunarData = {
        lYear: number,      // 農曆年(數字)
        lMonth: number,     // 農曆月(數字)
        lDay: number,       // 農曆日(數字)
        animal: string,     // 生肖
        yearCn: string,     // 西元年(中文)
        monthCn: string,    // 農曆月(中文)
        dayCn: string,      // 農曆日(中文)
        cYear: number,      // 國曆年(數字)
        cMonth: number,     // 國曆月(數字)
        cDay: number,       // 國曆日(數字)
        gzYear: string,     // 干支年
        gzMonth: string,    // 千支月
        gzDay: string,      // 干支日
        isToday: boolean,   // 是否今日
        isLeap: boolean,    // 是否有閏月
        nWeek: number,      // 星期(數字)
        ncWeek: string,     // 星期(國字)
        isTerm: boolean,    // 是否有24節氣
        term: string,       // 24節氣
    };
    function solar2lunar(year: number, month: number, day: number): SolarLunarData;
}