const regex = require("../src/regex");



const path1 = "m10,10 L10 10";
test(`(m10,10) is first valid data in path (${path1})`, () => {
    expect(regex.getFirstData(path1).data).toEqual(["m", 10, 10]);
})

const path1_1 = "m10.1,10.1 L10 10";
test(`(m10.1,10.1) is first valid data in path (${path1_1})`, () => {
    expect(regex.getFirstData(path1_1).data).toEqual(["m", 10.1, 10.1]);
})

const path1_2 = " 10 m10,10 L10 10";
test(`(m10,10) is first valid data in path (${path1_2})`, () => {
    expect(regex.getFirstData(path1_2).data).toEqual(["m", 10, 10]);
})

const path2 = "m\r\n\t20\r\n\t20 L10 10";
test(`(m\r\n\t20\r\n\t20) is first valid data in path ${path2}`, () => {
    expect(regex.getFirstData(path2).data).toEqual(["m", 20, 20]);
})

const path3 = "\n\t\rm\n\t\r30\n\t\r30 L10 10";
test(`(\n\t\rm\n\t\r30\n\t\r30) is first valid data in path ${path3}`, () => {
    expect(regex.getFirstData(path3).data).toEqual(["m", 30, 30]);
})

const path4 = "m10,10,10,10 L10 10";
test(`(m10,10) is first valid data in path ${path4}`, () => {
    expect(regex.getFirstData(path4).data).toEqual(["m", 10, 10]);
})

const path5 = "m10 L10 10";
test(`(m10) is first valid data in path ${path5}`, () => {
    expect(regex.getFirstData(path5)).toBeNull();
})

const path6 = "H10 L10 10";
test(`(H10) is first valid data in path ${path6}`, () => {
    expect(regex.getFirstData(path6).data).toEqual(["H", 10]);
})

const path7 = "h10 L10 10";
test(`(h10) is first valid data in path ${path7}`, () => {
    expect(regex.getFirstData(path7).data).toEqual(["h", 10]);
})

const path8 = "V10 L10 10";
test(`(V10) is first valid data in path ${path8}`, () => {
    expect(regex.getFirstData(path8).data).toEqual(["V", 10]);
})

const path9 = "v10 L10 10";
test(`(v10) is first valid data in path ${path9}`, () => {
    expect(regex.getFirstData(path9).data).toEqual(["v", 10]);
})

const path10 = "z L10 10";
test(`(z) is first valid data in path ${path10}`, () => {
    expect(regex.getFirstData(path10).data).toEqual(["z"]);
})

const path11 = "t10,10 L10 10";
test(`(t10,10) is first valid data in path (${path11})`, () => {
    expect(regex.getFirstData(path11).data).toEqual(["t", 10, 10]);
})

const path12 = "T10,10 L10 10";
test(`(T10,10) is first valid data in path (${path12})`, () => {
    expect(regex.getFirstData(path12).data).toEqual(["T", 10, 10]);
})




































// const sum = (a, b) => {
//     return a + b;
// }

// const regex = (path) => {
//     return null;
//     //return {data: ["m", 10, 10,]}
// }

// test("m10 10 is a valid path data", () => {
//     expect(regex("m").data).toEqual(["m", 10, 10]);
// })