import { EarthlyBranch, Elements } from '../gua.interface';

type DirectionType = '進' | '退';
type MatchType = '剋合' | '生合';

interface EarthlyBranchMetadata {
    earthlyBranch: EarthlyBranch,
    fiveElements: Elements,
    longLive: EarthlyBranch, // 長生
    tiWang: EarthlyBranch, // 帝旺
    tomb: EarthlyBranch, // 墓
    exhaust: EarthlyBranch, // 絕
    direction: { // 進神、退神
        type: DirectionType,
        value: EarthlyBranch
    },
    match: { // 合
        value: EarthlyBranch,
        type: MatchType
    },
    conflict: EarthlyBranch, // 沖
    punishment: { // 刑
        description: string,
        target: EarthlyBranch
    },
}

export const EarthlyBranchMetadata: EarthlyBranchMetadata[] = [
    {
        earthlyBranch: '子',
        fiveElements: '水',
        longLive: '申',
        tiWang: '子',
        tomb: '辰',
        exhaust: '巳', // 絕
        direction: { value: '亥', type: '退' },
        match: { value: '丑', type: '剋合'},
        conflict: '午',
        punishment: {description: '子卯互刑。主付出不求回報。事情有折磨之象', target: '卯'},
    },
];