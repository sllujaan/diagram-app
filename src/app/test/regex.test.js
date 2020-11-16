
import { _test, _expect } from '../../test.lib/test.lib.js';
import { getFirstData } from '../util/regex.js';






console.log(getFirstData("M10 20"));


_test("M10 20 is a valid path data", () => {
    _expect(getFirstData("M10 20")).toBe("1");
})






















// _test("1 == 1", () => {
//     _expect(1).toBe(1);    
// })
