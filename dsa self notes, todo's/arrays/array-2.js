// longest consecutive sequence in an array
// input: [100, 4, 200, 1, 3, 2]
// output: 4
// explanation: The longest consecutive sequence is [1, 2, 3, 4].
// hint: use a set to store the numbers
// time complexity -- O(n) -- n is length of the array
// Technique: Set to track numbers and check for start of sequences

// optimized approach


function longestConsecutive(nums) {
    if (nums.length === 0) return 0;

    const set = {};

    // Store all numbers
    for (let i = 0; i < nums.length; i++) {
        set[nums[i]] = true;
    }

    let longest = 0;

    for (let i = 0; i < nums.length; i++) {

        const num = nums[i];

        // Check if this is the start of a sequence
        if (set[num - 1] === undefined) {

            let currentNum = num;
            let currentLength = 1;

            while (set[currentNum + 1] !== undefined) {   //   -------> while loop
                currentNum++;
                currentLength++;
            }

            if (currentLength > longest) {
                longest = currentLength;
            }
        }
    }

    return longest;
}

// brute force approach

// time complexity -- O(n^2) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Linear scan and check for next number in array
function longestConsecutiveBrute(nums) {
    if (nums.length === 0) return 0;
    
    let longest = 0;
    
    for (let i = 0; i < nums.length; i++) {
        let currentNum = nums[i];
        let currentLength = 1;
        
        while (nums.includes(currentNum + 1)) {   // -------> while loop
            currentNum++;
            currentLength++;
        }
        
        if (currentLength > longest) {
            longest = currentLength;
        }
    }
    
    return longest;
}


// --- Maximum Product Subarray in an Array

// input: [2, 3, -2, 4]
// output: 6
// explanation: The maximum product subarray is [2, 3].
// hint: use a while loop to reverse the number
// time complexity -- O(n) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Linear scan and check for next number in array



// optimized approach
function maxProduct(nums) {

    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let answer = nums[0];

    for (let i = 1; i < nums.length; i++) {

        let current = nums[i];

        // If current number is negative,
        // swap max and min
        // if a negitive value is found, swap max and min because multiplying a -ve value with largest value will makes it smallest and vice versa
        if (current < 0) {
            let temp = maxSoFar;
            maxSoFar = minSoFar;
            minSoFar = temp;
        }

        maxSoFar = Math.max(current, current * maxSoFar);

        minSoFar = Math.min(current, current * minSoFar);

        answer = Math.max(answer, maxSoFar);
    }

    return answer;
}

// --------- brute force approach ---------

// time complexity -- O(n^2) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Linear scan and check for next number in array
function maxProduct(nums) {
    let maxProduct = nums[0];

    for (let i = 0; i < nums.length; i++) {

        let product = 1;

        for (let j = i; j < nums.length; j++) {

            product *= nums[j];

            if (product > maxProduct) {
                maxProduct = product;
            }
        }
    }

    return maxProduct;
}



// array 3 sum

// input: [-1, 0, 1, 2, -1, -4]
// output: [[-1, 0, 1], [-1, -1, 2]]
// explanation: The 3 sum solutions are [-1, 0, 1] and [-1, -1, 2].
// hint: use a set to store the numbers
// time complexity -- O(n^3) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Linear scan and check for next number in array

// brute force approach


function threeSum(nums) {

    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {

        for (let j = i + 1; j < nums.length - 1; j++) {

            for (let k = j + 1; k < nums.length; k++) {

                if (nums[i] + nums[j] + nums[k] === 0) {

                    // Sort only these 3 numbers manually
                    let a = nums[i];
                    let b = nums[j];
                    let c = nums[k];

                    if (a > b) { let t = a; a = b; b = t; }
                    if (b > c) { let t = b; b = c; c = t; }
                    if (a > b) { let t = a; a = b; b = t; }

                    let exists = false;

                    for (let x = 0; x < result.length; x++) {

                        if (
                            result[x][0] === a &&
                            result[x][1] === b &&
                            result[x][2] === c
                        ) {
                            exists = true;
                            break;
                        }
                    }

                    if (!exists) {
                        result.push([a, b, c]);
                    }
                }
            }
        }
    }

    return result;
}


// --------- brute force approach ---------

// time complexity -- O(n^3) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Linear scan and check for next number in array



// --------- 3 sum optimized approach ---------

function threeSum(nums) {

    nums.sort((a, b) => a - b);

    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {

        // Skip duplicate first numbers
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {

            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {

                result.push([
                    nums[i],
                    nums[left],
                    nums[right]
                ]);

                // Skip duplicate left values
                while (
                    left < right &&
                    nums[left] === nums[left + 1]
                ) {
                    left++;
                }

                // Skip duplicate right values
                while (
                    left < right &&
                    nums[right] === nums[right - 1]
                ) {
                    right--;
                }

                left++;
                right--;

            }
            else if (sum < 0) {
                left++;
            }
            else {
                right--;
            }

        }
    }

    return result;
}




//    Search in rotated sorted array-1 Leetcode problem

// brute force approach

function search(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }
    return -1;
}

// optimized approach
// two pointer approach, binary search
// time complexity -- O(log n) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Binary search and check for target in sorted array
function search(nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {

        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Left half is sorted
        if (nums[left] <= nums[mid]) {

            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }

        }
        // Right half is sorted
        else {

            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }

        }

    }

    return -1;
}



// container with most water 
// brute force approach
// time complexity -- O(n^2) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Linear scan and check for next number in array
// input: [1, 8, 6, 2, 5, 4, 8, 3, 7]
// output: 49
// explanation: The maximum area is 49, which is the area of the rectangle with height 8 and width 7.
// brute force approach

function maxAreaBruteForce(height) {
    let maxArea = 0;
    const n = height.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            const width = j - i;
            const minHeight = Math.min(height[i], height[j]);
            const area = width * minHeight;
            maxArea = Math.max(maxArea, area);
        }
    }
    
    return maxArea;
}

// optimised approach
// time complexity -- O(n) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Two pointer approach and check for next number in array
function maxAreaOptimized(height) {
    let maxArea = 0;
    let left = 0;
    let right = height.length - 1;
    
    while (left < right) {
        // Calculate width
        const width = right - left;
        
        // Find the limiting height
        const minHeight = Math.min(height[left], height[right]);
        
        // Calculate area
        const area = width * minHeight;
        
        // Update max area
        maxArea = Math.max(maxArea, area);
        
        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}

// three sum indices

// input: [2, 7, 11, 15, 3], 20
// output: [0, 1, 2]
// explanation: The 3 sum indices are [0, 1, 2].
// hint: use a set to store the numbers
// time complexity -- O(n^3) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Linear scan and check for next number in array
function threeSumIndices(nums, target) {

    for (let i = 0; i < nums.length - 2; i++) {

        for (let j = i + 1; j < nums.length - 1; j++) {

            for (let k = j + 1; k < nums.length; k++) {

                if (nums[i] + nums[j] + nums[k] === target) {
                    return [i, j, k];
                }
            }
        }
    }

    return [];
}


// optimized approach
// time complexity -- O(n^2) -- n is length of the array
// space complexity -- O(1) -- constant space
// Technique: Two pointer approach and check for next number in array
function threeSumIndices(nums, target) {

    let arr = [];

    // Store value + original index
    for (let i = 0; i < nums.length; i++) {
        arr.push({
            value: nums[i],
            index: i
        });
    }

    // Sort based on value
    arr.sort((a, b) => a.value - b.value);

    for (let i = 0; i < arr.length - 2; i++) {

        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {

            let sum =
                arr[i].value +
                arr[left].value +
                arr[right].value;

            if (sum === target) {

                return [
                    arr[i].index,
                    arr[left].index,
                    arr[right].index
                ];
            }

            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return [];
}

console.log(threeSumIndices([2, 7, 11, 15, 3], 20));