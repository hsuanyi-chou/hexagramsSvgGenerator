import GuaGenerator from '../index';

test('GuaGenerator.buildGua()', () => {
  const guaGenerator = new GuaGenerator();

  expect(guaGenerator.buildGua('火', '天')).toBe(`<!-- Created By Hexagrams-SVG-Generator -->
            <svg width="290" height="250" xmlns="http://www.w3.org/2000/svg">
            <g>
                <title>background</title>
                <rect fill="#ffffff" id="GUA" height="252" width="292" y="-1" x="-1"/>
            </g><g>
            <title>Layer 1</title>
<line stroke="#000" id="down_1" x1="130" y1="227" x2="230" y2="227" stroke-width="15" fill="none"/>
<line stroke="#000" id="down_2" x1="130" y1="187" x2="230" y2="187" stroke-width="15" fill="none"/>
<line stroke="#000" id="down_3" x1="130" y1="147" x2="230" y2="147" stroke-width="15" fill="none"/>
<line stroke="#000" id="up_0" x1="130" y1="106" x2="230" y2="106" stroke-width="15" fill="none"/>
<line stroke="#000" id="up_1-1" x1="130" y1="66" x2="170" y2="66" stroke-width="15" fill="none"/>
                <line stroke="#000" id="up_1-2" x1="190" y1="66" x2="230" y2="66" stroke-width="15" fill="none"/>
<line stroke="#000" id="up_2" x1="130" y1="26" x2="230" y2="26" stroke-width="15" fill="none"/>

</g>
</svg>`);
});

// test('GuaGenerator.drawEarthlyBranches()', () => {
//   const guaGenerator = new GuaGenerator();
//   // tslint:disable-next-line: no-string-literal
//   const res = guaGenerator['drawEarthlyBranches']();
//   expect(res).toBe('');
// });