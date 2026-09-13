// valid palindrome  --   using  recursion
// input:  'racecar' | 'hello'
// output: true      | false
// hints: two pointers, check characters from start and end moving towards center
function isPalindrome(str) {

    function helper(str, l, r) {
        // Base case: crossed pointers → palindrome
        if (l >= r) return true;

        if (str[l] !== str[r]) return false;

        return helper(str, l + 1, r - 1);  // not l++ or r-- because post increment/decrement returns the original value
    }

    return helper(str, 0, str.length - 1);
}

console.log(isPalindrome('racecar'));  // true
console.log(isPalindrome('hello'));    // false

// simple palindrome — two pointers (iterative)
function isPalindromeSimple(str) {
    let l = 0;
    let r = str.length - 1;

    while (l < r) {    // -------> while loop
        if (str[l] !== str[r]) return false;
        l++;
        r--;
    }

    return true;
}

console.log(isPalindromeSimple('racecar'));  // true
console.log(isPalindromeSimple('hello'));    // false

// -------------------------------------------------------------------------------------------------

// longest common prefix  -- optimized
// input:  strs = ['flower', 'flow', 'flight']
// output: 'fl'
// hints: compare characters of first string with all others at same index
// time complexity -- O(n×m)  n = number of strings, m = length of first string
// Technique: Vertical scan — compare same index across all strings (not sliding window)

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let first = strs[0]
    let prefix = "";
    for (let i =0; i < first.length; i++) {
        let char = first[i];

        for (let j = 1; j < strs.length; j++) {
          // check if index i is out of bounds for strs[j] or characters don't match
            if (i >= strs[j].length || strs[j][i] !== char) {
                return prefix;
            }

        }
            prefix+=char; // add after second loop runs
    }

    return prefix;
};

//------------------------------------------------------------------------------------
// group anagrams  -- optimized
// input:  strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
// output: [['eat','tea','ate'], ['tan','nat'], ['bat']]  (order may vary)
// hints: use character count as key in map to group anagrams together
// time complexity -- O(n * k)  n = number of strings, k = length of longest string
// Technique: Hash map + frequency key (character count as key)

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let map = new Map();

    for (s of strs) {
        let count = new Array(26).fill(0);
        for (let i = 0; i< s.length; i++) {
            count[s.charCodeAt(i)- 97]++;
        }

        let key = count.join('#')

        if(!map.has(key)) map.set(key, []);
        map.get(key).push(s)
    }

    return Array.from(map.values())
};

// ------------------------------------------------------------------------
// valid anagram  -- optimized
// input:  s = 'anagram', t = 'nagaram'  |  s = 'rat', t = 'car'
// output: true                         |  false
// hint: use frequency array to count characters
// time complexity -- O(n) -- n is length of the anagram
// Technique: Frequency array (count chars in one pass)

function isAnagram(s, t) {
  // quick length check
  if (s.length !== t.length) return false;

  // frequency array for 26 lowercase letters
  const counts = new Array(26);
  for (let i = 0; i < 26; i++) counts[i] = 0;

  const base = 'a'.charCodeAt(0);

  // count chars in s (increment) and t (decrement)
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - base] += 1;
    counts[t.charCodeAt(i) - base] -= 1;
  }

  // if all zeros, they're anagrams
  for (let i = 0; i < 26; i++) {
    if (counts[i] !== 0) return false;
  }
  return true;
}

// valid anagram — brute force (build count keys for s and t, compare)
// input:  s = 'anagram', t = 'nagaram'
// output: true

var isAnagram = function(s, t) {
   
        let count1 = new Array(26).fill(0);
      for (let i =0; i< s.length; i++) {
        count1[s.charCodeAt(i) - 97]++;
      }

      let key1 = count1.join('#');  

        let count2 = new Array(26).fill(0);
       for (let i =0; i< t.length; i++) {
        count2[t.charCodeAt(i) - 97]++;
      }

      let key2 = count2.join('#');  

      return key1 === key2

};

//---------------------------------------------------------------------------
// longest palindromic substring  -- optimized
// input:  s = 'babad'
// output: 'bab'  (or 'aba' — both length 3)
// time complexity -- O(n^2)  n = length of the string
// space complexity -- O(1)
// hint : expand around center technique
// Technique: Expand around center — two pointers move outward from each center

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length < 2) return s;

    let start = 0;
    let maxLen = 1;

    function expand(left, right) {
        while(left >=0 && right < s.length && s[left] === s[right]) {    // --------------------------------> while loop
            let currLen = right-left+1;
            if (currLen > maxLen) {
                maxLen = currLen;
                start = left;
            }
            left--;
            right++
        }
    }


    for (let i = 0; i < s.length; i++) {
        expand(i,i);
        // even length
        expand(i, i+1)
    }

    let result = "";
    for (let i=start; i< start + maxLen;i++ ) {
        result+=s[i]
    }

    return result;
};

// - VALID PARANTHESIS 
// input:  '()[]{}'  |  '(]'  |  '([)]'
// output: true      |  false |  false
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
// determine if the input string is valid.
// | Approach | Time | Space | Validates Order? |
// | -------- | ---- | ----- | ---------------- |
// | Stack    | O(n) | O(n)  | ✅ Yes            |
// | Counter  | O(n) | O(1)  | ❌ No             |
// Technique: Stack — push expected closers, pop on match

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(string) {
    const stack = [] // stores expected closing brackets

    // map each opening bracket to its matching closer
    const pairs =  {
        '(': ')',
        '{': '}',
        '[': ']',
    }

    for (char of string) {
        if(pairs[char]) {
            // opening bracket → push the closer we expect next
            stack.push(pairs[char])
        } else {
            // closing bracket → must match what we expected on top
            if(stack.pop() !== char ) return false
        }
    }
    // valid only if every opener was closed
    return stack.length === 0;
};

console.log(isValid('()[]{}'))




// valid parentheses — if order doesn't matter (counter only)
// input:  '{[()]}'  |  '([)]'  (same counts, wrong nesting)
// output: true       |  true   (counter passes; stack approach → false)
// | Approach | Time | Space | Validates Order? |
// | -------- | ---- | ----- | ---------------- |
// | Stack    | O(n) | O(n)  | ✅ Yes            |
// | Counter  | O(n) | O(1)  | ❌ No             |

var isValidUnordered = function (s) {
  let round = 0;   // ()
  let square = 0;  // []
  let curly = 0;   // {}

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch === '(') round++;
    else if (ch === ')') round--;

    else if (ch === '[') square++;
    else if (ch === ']') square--;

    else if (ch === '{') curly++;
    else if (ch === '}') curly--;
  }

  return round === 0 && square === 0 && curly === 0;
};

// ------------------------------------------------------------------------
// reduce number by summing digits until one digit remains ("digital root")
// input:  34512
// output: 6  (34512 → 15 → 6)
//
// | Approach   | Time        | Space |
// | ---------- | ----------- | ----- |
// | Brute force| O(log n)    | O(1)  |  repeat digit-sum until single digit
// | Optimized  | O(1)        | O(1)  |  digital root formula (mod 9)

// digital root — brute force
// input:  34512
// output: 6

function addDigitsBrute(num) {
  while (num >= 10) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;           // add last digit
      num = Math.floor(num / 10); // drop last digit
    }
    num = sum;
  }
  return num;
}

// digital root — optimized (mod 9)
// input:  34512
// output: 6
// Technique: Math formula (digital root mod 9) — O(1), not a loop

function addDigitsOptimized(num) {
  if (num === 0) return 0;
  return num % 9 === 0 ? 9 : num % 9; 
}

console.log(addDigitsBrute(34512));    // 6
console.log(addDigitsOptimized(34512)); // 6

// ------------------------------------------------------------------------
// return all characters with the maximum frequency
// input:  'aabbcddbbddece'
// output: ['b', 'd']  (both appear 4 times — max; first-seen order)
//
// | Approach   | Time  | Space |
// | ---------- | ----- | ----- |
// | Brute force| O(n²) | O(n)  |  recount each char with a full scan
// | Optimized  | O(n)  | O(n)  |  one pass to count + one pass to collect

// max frequency chars — brute force
// input:  'aabbcddbbddece'
// output: ['b', 'd']

function maxFrequencyCharsBrute(s) {
  const counts = {};

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (counts[ch] !== undefined) continue; // already counted this char

    let c = 0;
    for (let j = 0; j < s.length; j++) {
      if (s[j] === ch) c++;
    }
    counts[ch] = c;
  }

  let max = 0;
  for (const ch in counts) {
    if (counts[ch] > max) max = counts[ch];
  }

  const result = [];
  const added = {};
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (counts[ch] === max && !added[ch]) {
      added[ch] = true;
      result[result.length] = ch; // manual push
    }
  }
  return result;
}

// max frequency chars — optimized
// input:  'aabbcddbbddece'
// output: ['b', 'd']
// Technique: Hash map — pass 1 count frequencies, pass 2 collect max chars

function maxFrequencyCharsOptimized(s) {
  const counts = {}; // char → how many times seen
  let max = 0;       // highest frequency so far

  // pass 1: count each char in one scan (no nested loop)
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    // first time: undefined + 1 → NaN, so use || 0
    // || 0 → first time ch is missing, treat count as 0, then add 1
    const c = (counts[ch] || 0) + 1;
    counts[ch] = c;
    if (c > max) max = c; // track global max frequency
  }

  // pass 2: collect chars tied at max, in first-seen order
  const result = [];
  const added = {}; // avoid pushing same char again (s repeats chars)
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (counts[ch] === max && !added[ch]) {
      added[ch] = true;
      result[result.length] = ch;
    }
  }
  return result;
}

console.log(maxFrequencyCharsBrute('aabbcddbbddece'));      // ['b', 'd']
console.log(maxFrequencyCharsOptimized('aabbcddbbddece')); // ['b', 'd']



