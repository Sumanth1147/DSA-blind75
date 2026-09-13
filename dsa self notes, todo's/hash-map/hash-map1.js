// Problem: Subarray Sum Equals K (LeetCode 560)
//
// Statement:
//   You are given an integer array `nums` and an integer `k`.
//   Count how many contiguous subarrays have a sum exactly equal to `k`.
//   A subarray is a contiguous slice nums[i..j] (inclusive); empty subarray does not count.
//
// Example:
//   nums = [1, 1, 1], k = 2
//   Subarrays with sum 2: [1,1] starting at index 0, and [1,1] starting at index 1 → answer = 2
//
// input:  nums = [1, 2, 1, 2, 1], k = 3
// output: 4  (subarrays with sum 3: [1,2], [2,1], [1,2], [2,1])
// time complexity: O(n)   (single pass)
// space complexity: O(n) (hash map for prefix-sum frequencies)
// hint: prefix sum + hash map — if (prefixSum - k) was seen before, those positions start a valid subarray ending here

/**
 * Technique: Prefix sum + hash map (single pass — not sliding window)
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let map = {};
    let prefixSum = 0;
    let count = 0;
    // Sum before index 0 is 0 (imaginary). So subarrays starting at 0 work when prefixSum === k.
    map[0] = 1;

    for (let i=0; i < nums.length; i++) {
        // prefixSum = sum of nums[0]..nums[i] (everything so far)
        prefixSum+=nums[i];

        // If a subarray ending at i has sum k, then (sum before that subarray) = prefixSum - k.
        // We call that earlier sum "required" and look it up in map.
        const required = prefixSum-k;

        if (map[required] !== undefined) {
            // Each time we saw "required" before = one valid start → one subarray ending at i with sum k
            count+=map[required];
        }

        // Save this prefixSum so future indices can use it as their "required"
        if (map[prefixSum] === undefined) {
            map[prefixSum] = 1;
        } else {
            map[prefixSum]++;
        }
    }

    return count
};

// console.log(subarraySum([1, 1, 1], 2)); // 2

// ------------------------------------------------------------------------
// longest substring without repeating characters
// input:  s = 'abcabcbb'
// output: 3  (longest substring without repeat: 'abc')
//
// key idea: sliding window [left..right] + map stores last index of each char
// notes:
//   - right expands window one char at a time
//   - if ch repeats inside window → jump left past its old index
//   - map[ch] >= left means duplicate is still inside current window

// | Approach   | Time  | Space | Notes                              |
// | ---------- | ----- | ----- | ---------------------------------- |
// | Brute force| O(n²) | O(n)  | try each start i, expand j until repeat |
// | Optimized  | O(n)  | O(n)  | sliding window + map               |

// brute force — for each start i, grow end j until a char repeats
function lengthOfLongestSubstringBrute(s) {
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    const seen = {};
    for (let j = i; j < s.length; j++) {
      if (seen[s[j]]) break;      // repeat found → stop this window
      seen[s[j]] = true;
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }
  return maxLen;
}


// optimized — sliding window + two pointers (left/right) + hash map
// Why sliding window? We keep one valid substring window [left..right] and only shrink when a repeat appears inside it.
// Why two pointers? `right` expands the window; `left` marks where the valid window starts.

/**
 * Technique: Sliding window + two pointers (left, right) + hash map
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstringOptimized(s) {
  let left = 0;    // window start — two-pointer #1
  let maxLen = 0;

  const map = {};  // char → last index where we saw it

  for (let right = 0; right < s.length; right++) { // two-pointer #2 — expands window
    const ch = s[right];

    // map[ch] >= left → last ch is still inside window [left..right] (real repeat)
    // left = map[ch] + 1 → drop everything up to old ch; window starts after it
    if (map[ch] !== undefined && map[ch] >= left) {
      left = map[ch] + 1;
    }

    map[ch] = right; // remember latest index of ch

    const currentLen = right - left + 1;
    if (currentLen > maxLen) {
      maxLen = currentLen;
    }
  }

  return maxLen;
}

console.log(lengthOfLongestSubstringBrute('abcabcbb'));      // 3
console.log(lengthOfLongestSubstringOptimized('abcabcbb')); // 3