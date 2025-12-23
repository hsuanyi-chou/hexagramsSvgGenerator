import { EarthlyBranch } from '../gua.interface';
import {
  earthlyBranchDragonMonth,
  earthlyBranchGoatMonth,
  earthlyBranchOxMonth,
  earthlyBranchDogMonth,
  earthlyBranchOxDay,
  earthlyBranchGoatDay,
  earthlyBranchDragonDay,
  earthlyBranchDogDay,
  earthlyBranchOxMutual,
  earthlyBranchDragonMutual,
  earthlyBranchDogMutual,
  earthlyBranchGoatMutual,
} from './earthly-branch-12/earth';
import {
  earthlyBranchRatMonth,
  earthlyBranchPigMonth,
  earthlyBranchRatDay,
  earthlyBranchPigDay,
  earthlyBranchRatMutual,
  earthlyBranchPigMutual,
} from './earthly-branch-12/water';
import {
  earthlyBranchHorseDay,
  earthlyBranchHorseMonth,
  earthlyBranchHorseMutual,
  earthlyBranchSnakeDay,
  earthlyBranchSnakeMutual,
  earthlyBranchSnakeMonth,
} from './earthly-branch-12/fire';
import {
  earthlyBranchRabbitDay,
  earthlyBranchRabbitMonth,
  earthlyBranchRabbitMutual,
  earthlyBranchTigerDay,
  earthlyBranchTigerMonth,
  earthlyBranchTigerMutual,
} from './earthly-branch-12/wood';
import {
  earthlyBranchMonkeyMonth,
  earthlyBranchRoosterDay,
  earthlyBranchRoosterMonth,
  earthlyBranchMonkeyDay,
  earthlyBranchRoosterMutual,
  earthlyBranchMonkeyMutual,
} from './earthly-branch-12/gold';

export type IEarthlyBranchProps = {
  target: EarthlyBranch;
  compare: EarthlyBranch;
  /**
   * 長生、帝旺、墓、絕
   * 土日: 土要判斷長生、帝旺、墓時，要搭配month的地支
   */
  handle12LongLife: { variant: '月' | '日' | '動'; month: EarthlyBranch };
};

export type IMonthEarthlyBranchReturn = (
  | '值'
  | '旺'
  | '生'
  | '剋'
  | '沖'
  | '休'
  | '囚'
  | '合'
)[];
export type IDayEarthlyBranchReturn = (
  | '長生'
  | '帝旺'
  | '墓'
  | '絕'
  | IMonthEarthlyBranchReturn[keyof IMonthEarthlyBranchReturn]
)[];

export type IMutualEarthlyBranchReturn = (
  | '動化進'
  | '動化退'
  | '動化回頭生'
  | '動化回頭長生'
  | '動化回頭剋'
  | '動化回頭剋合'
  | '動化回頭生合'
  | '動化合'
  | '動化回頭沖剋'
  | '動化回頭沖'
  | '動入墓'
  | '動化休'
  | '動化囚'
  | '動化絕'
  | '伏吟'
)[];

export const earthlyBranchMonth = ({
  target,
  compare,
}: Omit<IEarthlyBranchProps, 'handle12LongLife'>): string => {
  switch (target) {
    case '子':
      return `月${earthlyBranchRatMonth({ compare }).join('')}`;
    case '丑':
      return `月${earthlyBranchOxMonth({ compare }).join('')}`;
    case '寅':
      return `月${earthlyBranchTigerMonth({ compare }).join('')}`;
    case '卯':
      return `月${earthlyBranchRabbitMonth({ compare }).join('')}`;
    case '辰':
      return `月${earthlyBranchDragonMonth({ compare }).join('')}`;
    case '巳':
      return `月${earthlyBranchSnakeMonth({ compare }).join('')}`;
    case '午':
      return `月${earthlyBranchHorseMonth({ compare }).join('')}`;
    case '未':
      return `月${earthlyBranchGoatMonth({ compare }).join('')}`;
    case '申':
      return `月${earthlyBranchMonkeyMonth({ compare }).join('')}`;
    case '酉':
      return `月${earthlyBranchRoosterMonth({ compare }).join('')}`;
    case '戌':
      return `月${earthlyBranchDogMonth({ compare }).join('')}`;
    case '亥':
      return `月${earthlyBranchPigMonth({ compare }).join('')}`;
  }
};

export const earthlyBranchDay = ({
  target,
  ...props
}: IEarthlyBranchProps): string => {
  switch (target) {
    case '子':
      return `日${earthlyBranchRatDay(props).join('')}`;
    case '丑':
      return `日${earthlyBranchOxDay(props).join('')}`;
    case '寅':
      return `日${earthlyBranchTigerDay(props).join('')}`;
    case '卯':
      return `日${earthlyBranchRabbitDay(props).join('')}`;
    case '辰':
      return `日${earthlyBranchDragonDay(props).join('')}`;
    case '巳':
      return `日${earthlyBranchSnakeDay(props).join('')}`;
    case '午':
      return `日${earthlyBranchHorseDay(props).join('')}`;
    case '未':
      return `日${earthlyBranchGoatDay(props).join('')}`;
    case '申':
      return `日${earthlyBranchMonkeyDay(props).join('')}`;
    case '酉':
      return `日${earthlyBranchRoosterDay(props).join('')}`;
    case '戌':
      return `日${earthlyBranchDogDay(props).join('')}`;
    case '亥':
      return `日${earthlyBranchPigDay(props).join('')}`;
  }
};

export const earthlyBranchMutual = ({
  target,
  compare,
}: Omit<IEarthlyBranchProps, 'handle12LongLife'>): string => {
  switch (target) {
    case '子':
      return earthlyBranchRatMutual({ compare }).join('、');
    case '丑':
      return earthlyBranchOxMutual({ compare }).join('、');
    case '寅':
      return earthlyBranchTigerMutual({ compare }).join('、');
    case '卯':
      return earthlyBranchRabbitMutual({ compare }).join('、');
    case '辰':
      return earthlyBranchDragonMutual({ compare }).join('、');
    case '巳':
      return earthlyBranchSnakeMutual({ compare }).join('、');
    case '午':
      return earthlyBranchHorseMutual({ compare }).join('、');
    case '未':
      return earthlyBranchGoatMutual({ compare }).join('、');
    case '申':
      return earthlyBranchMonkeyMutual({ compare }).join('、');
    case '酉':
      return earthlyBranchRoosterMutual({ compare }).join('、');
    case '戌':
      return earthlyBranchDogMutual({ compare }).join('、');
    case '亥':
      return earthlyBranchPigMutual({ compare }).join('、');
  }
};
