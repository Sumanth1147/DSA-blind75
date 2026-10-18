  // find missing number binary 
  // arr = [0,1,5,4,3]  ---> 0 should be present for xor method

  function findMissing(arr) {
    let xor = arr.length;

    for (let i=0; i < arr.length; i++) {
        xor = xor^i^arr[i]
    }
    
    return xor
}

console.log(findMissing([0,1,5,4,3]));

 // find missing number
//  sum of numbers
function missingNumber(nums) {
    let n = nums.length;

    let expected = n * (n + 1) / 2;
    let actual = 0;

    for (let i = 0; i < nums.length; i++) {
        actual += nums[i];
    }

    return expected - actual;
}