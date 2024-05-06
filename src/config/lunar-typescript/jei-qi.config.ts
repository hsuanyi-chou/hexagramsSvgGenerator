/** 萬年曆上若於此時間占卦，需要留意換日時間的節氣 */
const CHANGE_JEI_QI = [
  '小寒',
  '立春',
  '驚蟄',
  '清明',
  '立夏',
  '芒種',
  '小暑',
  '立秋',
  '白露',
  '寒露',
  '立冬',
  '大雪',
];

export const isChangeJeiQi = (jeiQi: string) => CHANGE_JEI_QI.includes(jeiQi);
