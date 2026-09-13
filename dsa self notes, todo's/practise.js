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
  for (let i=0; i < nums.length; i++) {
    let req = target - nums[i]
    if (req in pairId) {
      return [i, pairId[req]]
    }
    pairId[nums[i]] = i
  }

}

console.log(twoSum([1,4,3,7,2,5], 5))

// ── Test cases (uncomment to run) ──
// console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
// console.log(twoSum([3, 2, 4], 6));       // [1, 2]
// console.log(twoSum([3, 3], 6));          // [0, 1]


// product of array except self
// brute force

function ExceptSelf(arr) {
  const n = arr.length;
  const res = new Array(n)

  for (let i =0; i< n; i++) {
      let prod = 1
      for (let j=0; j < n; j++) {
          if (i!==j) {
              prod*=arr[j]
          }
      }
      res[i] = prod
  }
  return res;
}

console.log(ExceptSelf([1,4,3,3,2]))

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
  for (let i=0; i< arr.length; i++) {
      sum+=arr[i];

      if (sum > maxSum) maxSum = sum;
      
      if (sum < 0) sum = 0;
  }
  return maxSum;
}

console.log(maxSubArraySum([-2, 1, -2, 4, -1, 2]))

// valid paranthesis 

function ValidParanthesis(str) {
  const stack = [];
  const map = {
      '(': ')',
      '[': ']',
      '{': '}',
  }

  for (ch of str) {
      if (map[ch]) {
          stack.push(map[ch])
      } else {
          if (stack.pop() !== ch) return false;
      }
  }

  return stack.length === 0;
}

console.log(ValidParanthesis('{([])}'))

//  group anagrams
// s = [cat, nat, bat, tac, tan, tab]
// output = [[cat, tac], [bat, tab], [tan, nat]]

function groupAnagrams(arr) {

  let map = {}

  let base = 'a'.charCodeAt(0);

  for (str of arr) {
  let char = new Array(26).fill(0);

  for (let i=0; i < str.length; i++) {
    let ch = str[i]
    char[ch.charCodeAt(0) - base]++
  }

  let key = char.join('#')

  if (!map[key])    map[key] = []        
  map[key].push(str)

  }

  return Object.values(map)
}


console.log(groupAnagrams(['cat', 'nat', 'bat', 'tac', 'tan', 'tab']))




