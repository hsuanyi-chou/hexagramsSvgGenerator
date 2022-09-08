import { elementRelative, getElement} from '../util/util';
import { EarthlyBranch, Elements } from '../gua.interface';


describe(`util`, () => {
    test(`getElement / 傳入天干、地支，回傳五行`, () => {
        [
            {
            earth: '子',
            expectResult: '水'
            },
            {
                earth: '辰',
                expectResult: '土'
            },
            {
                earth: '申',
                expectResult: '金'
            },
            {
                earth: '午',
                expectResult: '火'
            },
            {
                earth: '卯',
                expectResult: '木'
            },

        ].forEach(sit => {
            expect(getElement(sit.earth as EarthlyBranch)).toEqual(sit.expectResult);
        })
    });

    test(`elementRelative / 傳入目標、標的，比對旺衰`, () => {
        [
            {
            target: '金',
            compare: '木',
            expectResult: false,
            },
            {
                target: '金',
                compare: '金',
                expectResult: true,
            },
            {
                target: '金',
                compare: '土',
                expectResult: true,
            },
            {
                target: '水',
                compare: '水',
                expectResult: true,
            },
            {
                target: '水',
                compare: '土',
                expectResult: false,
            },
            {
                target: '木',
                compare: '水',
                expectResult: true,
            },
            {
                target: '木',
                compare: '火',
                expectResult: false,
            },
        ].forEach((sit, index) => {
            expect(elementRelative(sit.target as Elements, sit.compare as Elements)).toEqual(sit.expectResult);
        })
    });
});