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
test(`(m 10 0) is first valid data in path ${path5}`, () => {
    expect(regex.getFirstData(path5).data).toEqual(["m", 10, 0]);
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


const path13 = "z";
test(`(z) is first valid data in path (${path13})`, () => {
    expect(regex.getFirstData(path13).data).toEqual(["z"]);
})

//new test case--------------------------
const path13_1 = "Z";
const validData13_1 = ["Z"];
test(`[${validData13_1.join(" ")}] is first valid data in path [${path13_1}]`, () => {
    expect(regex.getFirstData(path13_1).data).toEqual(validData13_1);
})
//-------------------------------

//new test case--------------------------
const path14 = "A 10 10 10 10 10 10 10";
const validData14 = ["A", 10, 10, 10, 10, 10, 10, 10];
test(`[${validData14.join(" ")}] is first valid data in path [${path14}]`, () => {
    expect(regex.getFirstData(path14).data).toEqual(validData14);
})
//-------------------------------

const test12 = () => {
    //new test case--------------------------
    var _path = "a 1 2 3 4 5 6 7";
    var validData = ["a", 1, 2, 3, 4, 5, 6, 7];
    test(`[${validData.join(" ")}] is first valid data in path [${_path}]`, () => {
        expect(regex.getFirstData(_path).data).toEqual(validData);
    })
    //-------------------------------
}
test12();

//new test case--------------------------
var _path = "a 10 20 30 40 50 60 70";
var expectedValue = ["a", 10, 20, 30, 40, 50, 60, 70];
test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
    expect(regex.getFirstData(_path).data).toEqual(expectedValue);
})
//-------------------------------

//new test case--------------------------
var _path = "C 10 20 30 40 50 60";
var expectedValue = ["C", 10, 20, 30, 40, 50, 60];
test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
    expect(regex.getFirstData(_path).data).toEqual(expectedValue);
})
//-------------------------------

//new test case--------------------------
var _path = "c 10 20 30 40 50 60";
var expectedValue = ["c", 10, 20, 30, 40, 50, 60];
test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
    expect(regex.getFirstData(_path).data).toEqual(expectedValue);
})
//-------------------------------

{
    //new test case--------------------------
    var _path = "c 10 20 30 40";
    var expectedValue = ["c", 0, 0, 0, 0, 0, 0];
    test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
        expect(regex.getFirstData(_path).data).toEqual(expectedValue);
    })
    //-------------------------------
}

{
    //new test case--------------------------
    var _path = "c 10 20 30 40";
    var expectedValue = ["c", 0, 0, 0, 0, 0, 0];
    test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
        expect(regex.getFirstData(_path).data).toEqual(expectedValue);
    })
    //-------------------------------
}


//new test case--------------------------
var _path = "S 10 20 30 40";
var expectedValue = ["S", 10, 20, 30, 40];
test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
    expect(regex.getFirstData(_path).data).toEqual(expectedValue);
})
//-------------------------------

{
    //new test case--------------------------
    var _path = "s 10,20,30,40";
    var expectedValue = ["s", 10, 20, 30, 40];
    test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
        expect(regex.getFirstData(_path).data).toEqual(expectedValue);
    })
    //-------------------------------
}
{//new test case--------------------------
    var _path = "s 10.1,20.2,30.3,40.4";
    var expectedValue = ["s", 10.1, 20.2, 30.3, 40.4];
    test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
        expect(regex.getFirstData(_path).data).toEqual(expectedValue);
    })
    //-------------------------------
}
{
    //new test case--------------------------
    var _path = "s 10,20,30";
    var expectedValue = ["s", 10, 20, 30, 0];
    test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
        expect(regex.getFirstData(_path).data).toEqual(expectedValue);
    })
    //-------------------------------
}
// const test1 = () => {
//     //new test case--------------------------
//     var _path = "s 10,20,30";
//     var expectedValue = ["s", 10, 20, 30, 0];
//     test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
//         expect(regex.getFirstData(_path).data).toEqual(expectedValue);
//     })
//     //-------------------------------
// }

// test1();



const test3 = () => {
     //new test case--------------------------
     var _path = "z 10 10";
     var expectedValue = ["z"];
     test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
         expect(regex.getFirstData(_path).data).toEqual(expectedValue);
     })
     //-------------------------------
};
test3();

const test4 = () => {
    //new test case--------------------------
    var _path = "m";
    var expectedValue = ["m", 0, 0];
    test(`[${expectedValue.join(" ")}] is first valid data in path [${_path}]`, () => {
        expect(regex.getFirstData(_path).data).toEqual(expectedValue);
    })
    //-------------------------------
};
test4();




























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