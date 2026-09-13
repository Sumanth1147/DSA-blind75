// print the following pattern:
// 1 2 3 4 5
// 1 2 3 4
// 1 2 3
// 1 2
// 1


let n = 5;

for (let i = n; i >= 1; i--) {

    let result = "";

    for (let j = 1; j <= i; j++) {
        result += j + " ";
    }

    console.log(result);
}


//        1
//     1  2  3
//  1  2  3  4  5


let rows = 3;

for (let i = 1; i <= rows; i++) {

    let result = "";

    // Print leading spaces
    for (let j = 1; j <= rows - i; j++) {
        result += "   ";   // 3 spaces
    }

    // Print numbers
    for (let j = 1; j <= (2 * i - 1); j++) {
        result += j + "  ";
    }

    console.log(result);
}