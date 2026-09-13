// Problem: Two Sum
// input:  nums = [2, 7, 11, 15], target = 9
// output: [0, 1]  (nums[0] + nums[1] = 9)
// Pattern: Hash Map
// Key idea: Store complement = target - num, check if exists

// Time complexity: O(n)
// n is number of elements in input array.

// Space complexity: O(n)
// n is number of elements in input array. In the worst case, we put all numbers in pair_idx.

// Two Sum — optimized (hash map)
// input:  nums = [2, 7, 11, 15], target = 9
// output: [0, 1]
// Technique: Hash map — store seen numbers; single pass (not two pointers)

var twoSum = function(nums, target) {
    const pairIdx = {};

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (target - num in pairIdx) {
            return [i, pairIdx[target - num]];
        }
        pairIdx[num] = i;
    }    
};

// Two Sum — brute force
// input:  nums = [2, 7, 11, 15], target = 9
// output: [0, 1]

var twoSum = function(nums, target) {
    for (let i=0; i < nums.length; i++) {
        for (let j=i+1; j< nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j]
            }
        }
    }
};


//-----------------------------------------------------------
// Problem: Max sub array (Arrays) — Kadane's algorithm
// input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// output: 6  (subarray [4, -1, 2, 1])
// pattern : Kadanes algorithm
// key idea: loop into array,move forward only if sum > 0
//  if sum > max ==> max = sum, if sum < 0 --> sum = 0

// Max sub array — optimized (Kadane)
// input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// output: 6
// Time complexity: O(n)
// Space complexity: O(1)
// Technique: Kadane's algorithm — greedy single pass (track running sum + max)

var maxSubArray = function(nums) {
    let max = -Infinity, sum = 0;
    for (let i = 0; i< nums.length; i++) {
        sum+=nums[i]
        if (sum > max) {
            max = sum;
        }
        if (sum < 0) {
            sum = 0
        }
    }
    return max
};


// Max sub array — brute force
// input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// output: 6
// time complexity : O(n^3)
// space complexity: O(1)

var maxSubArray = function(nums) {
    let max = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            let sum = 0;
            for (let k = i; k <= j; k++) {
                sum += nums[k];
            }
            max = Math.max(max, sum);
        }
    }

    return max;
};

//------------------------------------------------------------------
// Best time to buy and sell stock (Arrays)  — return max profit
// input:  prices = [7, 1, 5, 3, 6, 4]
// output: 5  (buy at 1, sell at 6)
// key idea - find min price before buying, track max profit of all
// Time complexity: O(n)
// Space complexity: O(1)
// Technique: Greedy / single pass — track minimum price seen so far

var maxProfit = function(prices) {
    let maxProfit = 0;
   let mini = prices[0];
    for (let i = 1; i < prices.length; i++) {
         currentProfit =  prices[i] - mini;
         maxProfit = Math.max(currentProfit, maxProfit)
         mini = Math.min(prices[i], mini)
    }
    return maxProfit;
};

//-------------------------------------------------------------------------

// Contains duplicate (Arrays)
// input:  nums = [1, 2, 3, 1]
// output: true
// key idea: use set to track unique elements
// Time complexity: O(n)
// Space complexity: O(n)

// Technique: Hash set — compare unique count vs array length
var containsDuplicate = function(nums) {
    const numSet = new Set(nums);
    return numSet.size < nums.length;
};

// Contains duplicate — hash map (no Set)
// input:  nums = [1, 2, 3, 1]
// output: true
// Technique: Hash map — mark seen values in one pass

var containsDuplicate = function(nums) {
    const freq = {};

    for (let i = 0; i < nums.length; i++) {
        let value = nums[i];

        if (freq[value]) {
            return true;   // appears more than once
        }

        freq[value] = true;
    }

    return false;
};


// ------------------------------------------------------------------------------------------------------
// Move Zeros 
// input:  nums = [0, 1, 0, 3, 12]
// output: [1, 3, 12, 0, 0]  (in-place; non-zeros first)
// key idea: define insert position and move numbers to insert position if it's not zero
// Time complexity: O(n)
// Space complexity: O(1) ---- extra space    **************************
// Space complexity: O(n) ---- in the algo   *************************

// Move zeros — two-pointer swap
// input:  nums = [0, 1, 0, 3, 12]
// output: [1, 3, 12, 0, 0]
// Technique: Two pointers — left = insert position, right scans array

var moveZeroes = function(nums) {
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            [nums[right], nums[left]] = [nums[left], nums[right]];
            left++;
        }
    }

    return nums;    
};

// Move zeros — insert position + fill zeros
// input:  nums = [0, 1, 0, 3, 12]
// output: [1, 3, 12, 0, 0]
// Technique: Two pointers — write index (insertPosition) + scan index (i)

var moveZeroes = function(nums) {
    let insertPosition = 0;
    for (let i = 0; i< nums.length; i++) {
        if (nums[i]!=0) {
            nums[insertPosition] = nums[i];
            insertPosition++
        }
    }

    while (insertPosition < nums.length) {
        nums[insertPosition++] = 0;
    }

    return nums
};


// rotate array k steps — right rotate, brute force (temp array)
// input:  nums = [1, 2, 3, 4, 5], k = 2
// output: [4, 5, 1, 2, 3]
// time complexity: O(n+k) ~ O(n)
// Extra space: O(k) for temp. (If k is small relative to n, space is small.)

var rotate = function(nums, x) {
  let k = x % nums.length;
  let s = nums.length;

  // 1) copy last k elements into temp
  let temp = [];
  for (let i = 0; i < k; i++) {
    temp[i] = nums[s - k + i];
  }

  // 2) shift the first (s-k) elements to the right by k positions
  for (let i = s - 1; i >= k; i--) {
    nums[i] = nums[i - k];
  }

  // 3) copy temp elements to the beginning
  for (let i = 0; i < k; i++) {
    nums[i] = temp[i];
  }

  return nums;
};


// rotate array — right rotate, optimized (reverse 3 times)
// input:  nums = [1, 2, 3, 4, 5], k = 2
// output: [4, 5, 1, 2, 3]
// time: O(n), space: O(1) extra
// Technique: Reverse algorithm — reverse whole array, then reverse parts (not two pointers on main logic)

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++; end--;
  }
}

var rotateRight = function(nums, k) {
  k = k % nums.length;
  const n = nums.length;
  reverse(nums, 0, n - 1);        // reverse all
  reverse(nums, 0, k - 1);        // reverse first k
  reverse(nums, k, n - 1);        // reverse remaining
  return nums;
};


// rotate array — left rotate, optimized
// input:  nums = [1, 2, 3, 4, 5], k = 2
// output: [3, 4, 5, 1, 2]
// Technique: Reverse algorithm — same 3-reverse trick as right rotate

function reverse(nums, l, r) {
    while (l < r) {
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++; r--;
    }
}

var rotateLeft = function(nums, k) {
    let n = nums.length;
    k = k % n;

    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
    reverse(nums, 0, n - 1);

    return nums;
};

//--------------------------------------------------------------------------------------------
// Find second largest num in an array — two-pass
// input:  arr = [10, 20, 3, 7, 5]
// output: 10
// time complexity: O(2n) = O(n)

function secondLargest(arr) {
  let largest = arr[0];
  // first pass
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  
  let secondLargest = -Infinity;
  
   for (let i = 0; i < arr.length; i++) { 
     if (arr[i] != largest && arr[i] > secondLargest) {
       secondLargest = arr[i]
     }
   }
   
   return secondLargest;
}

// Find second largest — optimized (single pass)
// input:  arr = [10, 20, 3, 7, 5]
// output: 10
// hint: if num > largest → secondLargest = largest, largest = num
// time complexity: O(n)
// space complexity: O(1)
// Technique: Single pass — track largest + secondLargest while scanning once

function secondLargest(arr) {
    if (arr.length < 2) return null; // Not enough elements

    let largest = arr[0];
    let secondLargest = -Infinity;

    for (let num of arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if ( num < largest && num > secondLargest) {
            secondLargest = num;
        }
    }
    
    return secondLargest
}

// Find second smallest — optimized (single pass)
// input:  arr = [10, 20, 3, 7, 5]
// output: 5
// Technique: Single pass — track smallest + secondSmallest while scanning once

function secondSmallest(arr) {
    if (arr.length < 2) return null;

    let smallest = Infinity;
    let secondSmallest = Infinity;

    for (let num of arr) {
        if (num < smallest) {
            secondSmallest = smallest;
            smallest = num;
        } else if (num < secondSmallest && num > smallest) {
            secondSmallest = num;
        }
    }

    return secondSmallest === Infinity ? null : secondSmallest;
}

console.log(secondSmallest([10, 20, 3, 7, 5])); // 5


// ----------------------------------------------------------------------------------------------------------------------------------------
// Remove Duplicates from Sorted Array (return new length)
// input:  nums = [1, 1, 2]  (sorted)
// output: 2, nums becomes [1, 2, _]  (first 2 elements are answer)
// key idea: two pointer technique
// Time complexity: O(n)
// Space complexity: O(1)
// Technique: Two pointers — i = last unique position, j scans ahead

var removeDuplicates = function(nums) {
    let i =0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[i]!==nums[j]) {
            nums[i+1] = nums[j];
            i++;
        }
    }

    return i+1;
};

// ----------------------------------------------------------------------------------------
// remove duplicates from unsorted array - hash map
// input:  arr = [1, 2, 1, 3, 2, 4]
// output: [1, 2, 3, 4]  (first-seen order)
// time complexity: O(n)
// space complexity: O(n)
// Technique: Hash map — skip values already seen

function removeDuplicates(arr) {
    const map = {};
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        let value = arr[i];

        if (!map[value]) {      // if value not seen before
            map[value] = true;  // mark as seen
            result[result.length] = value;  // push manually without push()
        }
    }
    return result;
}

// keep only elements that appear exactly once
// input:  arr = [1, 2, 1, 3, 2, 4]
// output: [3, 4]
// time complexity: O(n)
// space complexity: O(n)
function removeRepeated(arr) {
    const freq = {};
    const result = [];

    // 1️⃣ Count frequency of each element
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i];
        if (!freq[value]) {
            freq[value] = 1;
        } else {
            freq[value]++;
        }
    }

    // 2️⃣ Add only elements that appear once
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i];
        if (freq[value] === 1) {
            result[result.length] = value; // manually push
        }
    }

    return result;
}



// ----------------------------------------------------------------------------------------
// quick sort
// input:  arr = [3, 6, 8, 10, 1, 2, 1]
// output: [1, 1, 2, 3, 6, 8, 10]
// time complexity : O(n log n) on average, O(n^2) in worst case
// space complexity: O(log n) due to recursion stack

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];    
}

// Example usage:
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sortedNumbers = quickSort(numbers);
console.log(sortedNumbers); // Output: [1, 1, 2, 3, 6, 8, 10]

// ----------------------------------------------------------------------------------------
// product of all elements except self
// input:  nums = [1, 2, 4, 1]
// output: [8, 4, 2, 8]
//   index 0: 2×4×1 = 8 | index 1: 1×4×1 = 4 | index 2: 1×2×1 = 2 | index 3: 1×2×4 = 8
//
// | Approach   | Time  | Space (extra) | Notes                          |
// | ---------- | ----- | ------------- | ------------------------------ |
// | Brute force| O(n²) | O(1)          | nested loops, skip index i     |
// | Optimized  | O(n)  | O(1)          | prefix pass + suffix pass only |

// product except self — brute force
// input:  nums = [1, 2, 4, 1]
// output: [8, 4, 2, 8]

function productExceptSelfBrute(nums) {
  const n = nums.length;
  const res = new Array(n);

  for (let i = 0; i < n; i++) {
    let prod = 1;
    for (let j = 0; j < n; j++) {
      if (j !== i) prod *= nums[j]; // skip self at index i
    }
    res[i] = prod;
  }
  return res;
}

// product except self — optimized (prefix × suffix)
// input:  nums = [1, 2, 4, 1]
// output: [8, 4, 2, 8]
// Technique: Prefix + suffix — two passes (left→right, then right→left)

function productExceptSelfOptimized(nums) {
  const n = nums.length;
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = 1; // init manually (no .fill)
  }

  // pass 1 (left → right): store prefix product before index i
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i]; // grow prefix to include nums[i] for next index
  }

  // pass 2 (right → left): multiply by suffix product after index i
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i]; // grow suffix to include nums[i] for next index
  }

  return res;
}

console.log(productExceptSelfBrute([1, 2, 4, 1]));      // [8, 4, 2, 8]
console.log(productExceptSelfOptimized([1, 2, 4, 1])); // [8, 4, 2, 8]

// ----------------------------------------------------------------------------------------
// flatten nested arrays (any depth → single level)
// input:  arr = [1, [2, 3], 5]
// output: [1, 2, 3, 5]
//
// | Approach   | Time      | Space     | Notes                        |
// | ---------- | --------- | --------- | ---------------------------- |
// | Brute force| O(n × d)  | O(n)      | flatten one level per loop   |
// | Optimized  | O(n)      | O(n)      | DFS / stack visits each once |

// Technique: DFS / recursion — flatten nested arrays depth-first
var flat = function (arr) {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (Array.isArray(val)) {
      const nested = flat(val);           // flatten deeper
      for (let j = 0; j < nested.length; j++) {
        res[res.length] = nested[j];    // append nested items (no spread if avoiding)
      }
    } else {
      res[res.length] = val;
    }
  }

  return res;
};

// ----------------------------------------------------------------------------------------
// LeetCode 2677 — flatten deeply nested array (depth n), no Array.flat()
//
// input:  arr = [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]], n = 0
// output: [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]]
//
// input:  same arr, n = 1
// output: [1,2,3,4,5,6,7,8,[9,10,11],12,13,14,15]
//
// | Approach   | Time      | Space | Notes                             |
// | ---------- | --------- | ----- | --------------------------------- |
// | Brute force| O(n × s)  | O(s)  | one-level expand, repeat n times  |
// | Optimized  | O(s)      | O(s)  | DFS with depth counter            |

const LC_ARR = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

// brute force — flatten one level per loop; n = 0 leaves arr unchanged
function flatBrute(arr, depth) {
  let current = [];
  for (let i = 0; i < arr.length; i++) {
    current[current.length] = arr[i];
  }

  for (let level = 0; level < depth; level++) {
    const next = [];
    for (let i = 0; i < current.length; i++) {
      const item = current[i];
      if (Array.isArray(item)) {
        for (let j = 0; j < item.length; j++) {
          next[next.length] = item[j];
        }
      } else {
        next[next.length] = item;
      }
    }
    current = next;
  }
  return current;
}

// input:  arr = [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]], n = 1
// output: [1,2,3,4,5,6,7,8,[9,10,11],12,13,14,15]
// optimized — DFS: enter array only while d < depth
// Technique: DFS + depth counter — recurse only while current depth < limit

function flatDepthOptimized(arr, depth) {
  const res = [];

  function dfs(sub, d) {
    for (let i = 0; i < sub.length; i++) {
      const val = sub[i];
      if (Array.isArray(val) && d < depth) {
        dfs(val, d + 1);
      } else {
        res[res.length] = val;
      }
    }
  }

  dfs(arr, 0);
  return res;
}

// on LeetCode submit as: var flat = function (arr, n) { return flatDepthOptimized(arr, n); }
console.log(flatBrute(LC_ARR, 1));
console.log(flatDepthOptimized(LC_ARR, 0));
