// ============================================================
// PRACTICE SESSION #2
// Pattern: Hash Map
// Source: arrays1.js (Two Sum)
// ============================================================

/**
 * PROBLEM: Two Sum (LeetCode 1)
 *
 * Given an array of integers `nums` and an integer `target`,
 * return the INDICES of the two numbers that add up to `target`.
 *
 * You may assume exactly one solution exists, and you may not
 * use the same element twice.
 *
 * ─────────────────────────────────────────────────────────────
 * Examples:
 *
 *   nums = [2, 7, 11, 15], target = 9
 *   output = [0, 1]   (nums[0] + nums[1] = 2 + 7 = 9)
 *
 *   nums = [3, 2, 4], target = 6
 *   output = [1, 2]
 *
 *   nums = [3, 3], target = 6
 *   output = [0, 1]
 *
 * ─────────────────────────────────────────────────────────────
 * Constraints:
 *   - 2 <= nums.length <= 10^4
 *   - Only one valid answer exists
 *
 * ─────────────────────────────────────────────────────────────
 * Target: O(n) time, O(n) space
 *
 * When stuck, ask me for:
 *   - Hint 1 (nudge)
 *   - Hint 2 (stronger clue)
 *   - Pattern memory trick
 *   - Solution walkthrough
 */

function twoSum(nums, target) {
  let pairId = {};
  for (let i = 0; i < nums.length; i++) {
    let req = target - nums[i];
    if (req in pairId) {
      return [i, pairId[req]];
    }
    pairId[nums[i]] = i;
  }
}

console.log(twoSum([1, 4, 3, 7, 2, 5], 5));

// ── Test cases (uncomment to run) ──
// console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
// console.log(twoSum([3, 2, 4], 6));       // [1, 2]
// console.log(twoSum([3, 3], 6));          // [0, 1]

// product of array except self
// brute force

function ExceptSelf(arr) {
  const n = arr.length;
  const res = new Array(n);

  for (let i = 0; i < n; i++) {
    let prod = 1;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        prod *= arr[j];
      }
    }
    res[i] = prod;
  }
  return res;
}

console.log(ExceptSelf([1, 4, 3, 3, 2]));

// optimised  ---
//prefix = 1
// for --> i=0 to n
// res[i] = prefix
// prefix*=nums[i]

// suffix = 1
// for --- i = n-1 to 0
// res[i]*=suffix
// suffix*=nums[i]

// max sub array sum --> kadanes algorithm

function maxSubArraySum(arr) {
  let sum = 0;
  let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    if (sum > maxSum) maxSum = sum;

    if (sum < 0) sum = 0;
  }
  return maxSum;
}

console.log(maxSubArraySum([-2, 1, -2, 4, -1, 2]));

// valid paranthesis

function ValidParanthesis(str) {
  const stack = [];
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (ch of str) {
    if (map[ch]) {
      stack.push(map[ch]);
    } else {
      if (stack.pop() !== ch) return false;
    }
  }

  return stack.length === 0;
}

console.log(ValidParanthesis("{([])}"));

//  group anagrams
// s = [cat, nat, bat, tac, tan, tab]
// output = [[cat, tac], [bat, tab], [tan, nat]]

function groupAnagrams(arr) {
  let map = {};

  let base = "a".charCodeAt(0);

  for (str of arr) {
    let char = new Array(26).fill(0);

    for (let i = 0; i < str.length; i++) {
      let ch = str[i];
      char[ch.charCodeAt(0) - base]++;
    }

    let key = char.join("#");

    if (!map[key]) map[key] = [];
    map[key].push(str);
  }

  return Object.values(map);
}

console.log(groupAnagrams(["cat", "nat", "bat", "tac", "tan", "tab"]));

// find minimum in rotated sorted array
// blind 75
//optimised ---   O(log n).
function findMin(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let mid = (left + right) / 2;

    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr[left];
}

console.log(findMin([4, 5, 6, 7, 0, 1, 2]));

// best time to buy or sell stock

function bestTime(arr) {
  let maxProfit = 0;
  let minPrice = arr[0];

  for (let i = 0; i < arr.length; i++) {
    let currentProfit = arr[i] - minPrice;
    maxProfit = Math.max(currentProfit, maxProfit);
    minPrice = Math.min(minPrice, arr[i]);
  }

  return maxProfit;
}

console.log(bestTime([4, 6, 7, 5, 0, 1, 2]));

// valid anagram  -- optimized
// input:  s = 'anagram', t = 'nagaram'  |  s = 'rat', t = 'car'
// output: true                         |  false
// hint: use frequency array to count characters

function validAnagram(s, t) {
  if (s.length !== t.length) return false;

  const arr = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    arr[s[i].charCodeAt(0) - 97]++;
    arr[t[i].charCodeAt(0) - 97]--;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) return false;
  }
  return true;
}

console.log(validAnagram("bat", "tab"));

// move zeros

function moveZeros(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      res[res.length] = arr[i];
    }
  }

  for (let i = res.length; i < arr.length; i++) {
    res[i] = 0;
  }

  return res;
}

console.log(moveZeros([1, 0, 3, 0, 5, 0, 9, 1]));

// find missing number binary
// arr = [0,1,5,4,3]  ---> 0 should be present for xor method

function findMissing(arr) {
  let xor = arr.length;

  for (let i = 0; i < arr.length; i++) {
    xor = xor ^ i ^ arr[i];
  }

  return xor;
}

console.log(findMissing([0, 1, 5, 4, 3]));

// Longest Repeating Character Replacement  (LeetCode 424, Blind 75 · String)
//
// You may replace at most k characters so the window becomes all the same letter.
// Return the length of the longest such substring.
//
// input:  s = "AABABBA", k = 1
// output: 4   window "ABBA" → replace one B (or A) → "AAAA" or "BBBB"

function charecterReplacement(s, k) {
  let map = {};
  let maxLen = 0;
  let maxFreq = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    let ch = s[right];
    // map[ch] not map =
    map[ch] = (map[ch] || 0) + 1;

    if (map[ch] > maxFreq) maxFreq = map[ch];

    while (right - left + 1 - maxFreq > k) {
      // not map[s[left]--] , map { A: 2, B: 1} ---> reduce A
      map[s[left]]--;
      left++;
    }
    // this is winLen-maxFreq <=k condition
    let windowLen = right - left + 1;
    if (windowLen > maxLen) maxLen = windowLen;
  }

  return maxLen;
}

console.log(charecterReplacement("AABABBA", 1));

//  3 sum, --> brute force
// return elements in sorted order

function threeSum(arr) {
  let result = [];
  let n = arr.length;
  for (let i = 0; i < n - 2; i++) {
    for (let j = 1; j < n - 1; j++) {
      for (let k = 2; k < n; k++) {
        if (arr[i] + arr[j] + arr[k] === 0) {
          let a = arr[i];
          let b = arr[j];
          let c = arr[k];

          if (a > b) {
            t = b;
            b = a;
            a = t;
          }
          if (b > c) {
            t = c;
            c = b;
            b = t;
          }
          if (a > c) {
            t = c;
            c = a;
            a = t;
          }

          let exists = false;
          for (let i = 0; i < result.length; i++) {
            if (
              result[i][0] === a &&
              result[i][1] === b &&
              result[i][2] === c
            ) {
              exists = true;
            }
          }

          if (!exists) result.push([a, b, c]);
        }
      }
    }
  }

  return result;
}

console.log(threeSum([0, -1, -1, 3, -2, 1, 2]));

// longest substring without repeating chanrecters
// optimised

function LSWRC(str) {
  let map = {};
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < str.length; right++) {
    let ch = str[right];

    if (map[ch] !== undefined && map[ch] >= left) {
      left = map[ch] + 1;
    }
    map[ch] = right;
    let curLen = right - left + 1;
    if (curLen > maxLen) {
      maxLen = curLen;
    }
  }

  return maxLen;
}

console.log(LSWRC("abcabcba"));

// array--->
// contains duplicates --> numbers array

var containsDuplicate = function (nums) {
  const freq = {};

  for (let i = 0; i < nums.length; i++) {
    let value = nums[i];

    if (freq[value]) {
      return true; // appears more than once
    }

    freq[value] = true;
  }

  return false;
};

console.log(containsDup([1, 2, 5, 6, 3, 4, 5]));
