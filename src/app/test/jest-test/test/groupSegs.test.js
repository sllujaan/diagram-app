
const segs = require("../src/groupSegs");



const test1 = () => {
    //new test case--------------------------
    const segments = [
        ["m", 10, 10],
        ["l", 20, 20],
        ["z"],
        ["m", 30, 30],
        ["l", 40, 40],
        ["z"]
    ];
    const expectedValue = [
        [["m", 10, 10],
        ["l", 20, 20],
        ["z"]],
        [["m", 30, 30],
        ["l", 40, 40],
        ["z"]]
    ];
    test(`test1 groups segments correctly`, () => {
        expect(segs.groupSegments(segments)).toEqual(expectedValue);
    });
    //-------------------------------
};
test1();



const test2 = () => {
    //new test case--------------------------
    const segments = [
        ["m", 10, 10],
        ["l", 20, 20],
        ["z"],
        ["m", 30, 30],
        ["l", 40, 40],
        ["z"],
        ["m", 30, 30],
        ["l", 40, 40],
        ["z"],
        ["m", 30, 30],
        ["l", 40, 40],
        ["z"]
    ];
    const expectedValue = [
        [["m", 10, 10],
        ["l", 20, 20],
        ["z"]],
        [["m", 30, 30],
        ["l", 40, 40],
        ["z"]],
        [["m", 30, 30],
        ["l", 40, 40],
        ["z"]],
        [["m", 30, 30],
        ["l", 40, 40],
        ["z"]]
    ];
    test(`test2 groups segments correctly`, () => {
        expect(segs.groupSegments(segments)).toEqual(expectedValue);
    });
    //-------------------------------
};
test2();


const test3 = () => {
    //new test case--------------------------
    const segments = [
        ["m", 10, 10],
        ["z"]
    ];
    const expectedValue = [
        [["m", 10, 10],
        ["z"]]
    ];
    test(`test3 groups segments correctly`, () => {
        expect(segs.groupSegments(segments)).toEqual(expectedValue);
    });
    //-------------------------------
};
test3();


const test4 = () => {
    //new test case--------------------------
    const segments = [
        ["m", 10, 10],
        ["m", 10, 10]
    ];
    const expectedValue = [
        [["m", 10, 10]],
        [["m", 10, 10]]
    ];
    test(`test4 groups segments correctly`, () => {
        expect(segs.groupSegments(segments)).toEqual(expectedValue);
    });
    //-------------------------------
};
test4();


const test5 = () => {
    //new test case--------------------------
    const segments = [
    ];
    const expectedValue = [
    ];
    test(`test5 groups segments correctly`, () => {
        expect(segs.groupSegments(segments)).toEqual(expectedValue);
    });
    //-------------------------------
};
test5();