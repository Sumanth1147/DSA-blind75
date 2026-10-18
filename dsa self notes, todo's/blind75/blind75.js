// find minimum in rotated sorted array
// blind 75

//optimised ---   O(log n).
function findMin(arr) {
    let left = 0;
    let right = arr.length-1;
  
    while (left < right) {
      let mid = (left + right)/2
  
      if (arr[mid] > arr[right]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
  
    return arr[left]
  
  }
  
  
  console.log(findMin([4, 5, 6, 7, 0, 1, 2]));

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

// -------------------------------------------------------------------------------------------------
// Longest Repeating Character Replacement  (LeetCode 424, Blind 75 · String)
//
// You may replace at most k characters so the window becomes all the same letter.
// Return the length of the longest such substring.
//
// input:  s = "AABABBA", k = 1
// output: 4   window "ABBA" → replace one B (or A) → "AAAA" or "BBBB"
//
// key idea: sliding window [left..right]
//   window is valid if  (windowLen - count of most frequent char) <= k
//   those leftover chars are the ones we would replace
//
// | Approach  | Time | Space | Notes                                      |
// | --------- | ---- | ----- | ------------------------------------------ |
// | Optimized | O(n) | O(1)  | 26 letters; shrink left when replacements > k |

/**
 * Technique: Sliding window + frequency map + maxFrequency in window
 * Time: O(n)  Space: O(1)  (at most 26 keys)
 */
function charecterReplacement(s, k) {
  let map = {}
  let maxLen=0;
  let maxFreq = 0;
  let left = 0;

  for (let right=0; right < s.length; right++) {
      let ch = s[right]
      // map[ch] not map = 
       map[ch] = (map[ch] || 0) +1;

      if (map[ch] > maxFreq) maxFreq = map[ch]

      while (right-left+1 - maxFreq > k) {
          // not map[s[left]--] , map { A: 2, B: 1} ---> reduce A
          map[s[left]]--;
          left++;
      }
  // this is winLen-maxFreq <=k condition
  let windowLen = right - left + 1;
  if (windowLen > maxLen) maxLen = windowLen;
  }
  return maxLen
}

console.log(characterReplacement("AABABBA", 1)); // 4
console.log(characterReplacement("ABAB", 2));    // 4
console.log(characterReplacement("AAAB", 0));    // 3




// --------- 3 sum optimized approach (LeetCode 15, Blind 75 · Array) ---------
//
// Find every unique triplet that sums to 0. Same numbers in a different order count as one triplet.
//
// input:  nums = [-1, 0, 1, 2, -1, -4]
// output: [[-1, -1, 2], [-1, 0, 1]]
//
// Technique: sort, then fix one number and scan the rest with two pointers
// Time: O(n²)   Space: O(1) extra (sort is in place; result array is the output)

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
