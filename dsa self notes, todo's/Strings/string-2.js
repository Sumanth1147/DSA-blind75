// convert "hello world" to "Hello World" if toUpperCase is used
// optimized solution

function capitalizeWords(str) {
    let result = '';
    let capitalizeNext = true;

    for (let i = 0; i < str.length; i++) {
        if (capitalizeNext) {
            result += str[i].toUpperCase();
            capitalizeNext = false;
        } else {
            result += str[i];
        }

        if (str[i] === ' ') {
            capitalizeNext = true;
        }
    }

    return result;
}



// convert "hello world" to "Hello World" with inbuilt js methods


function convertToTitleCase(str) {
    let result = '';
    let words = str.split(' ');
    for (let word of words) {
        result += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + ' ';
    }
    return result.trim();
}

// if toUpperCase is not used

function capitalizeWords(str) {
    let result = '';
    let capitalizeNext = true;

    for (let i = 0; i < str.length; i++) {
        let ch = str[i];

        if (capitalizeNext && ch >= 'a' && ch <= 'z') {
            // Convert lowercase to uppercase using ASCII
            result += String.fromCharCode(ch.charCodeAt(0) - 32);
            capitalizeNext = false;
        } else {
            result += ch;
        }

        if (ch === ' ') {
            capitalizeNext = true;
        }
    }

    return result;
}

console.log(capitalizeWords("hello world")); // Hello World
console.log(capitalizeWords("i love javascript")); // I Love Javascript



// ----- is number palindrome -----

// input: 121
// output: true
// explanation: 121 reads the same backward as forward.
// hint: use a while loop to reverse the number
// time complexity -- O(log10(x)) -- x is the number
// space complexity -- O(1) -- constant space
// Technique: Reverse the number and compare it with the original number
function isPalindrome(x) {
    // Negative numbers are never palindrome
    if (x < 0) return false;

    let original = x;
    let reversed = 0;

    while (x > 0) {
        const digit = x % 10;
        reversed = reversed * 10 + digit;
        x = Math.floor(x / 10);
    }

    return original === reversed;
}

console.log(isPalindrome(121)); // true



// Sliding Window
// ---------------
// left
// right
// map
// maxLength

// Expand Around Center
// --------------------
// left--
// right++

// Prefix Sum
// ----------
// prefixSum
// required = prefixSum - k
// map[prefixSum]++

// Kadane
// -------
// currentMax
// globalMax

// Maximum Product
// ---------------
// maxSoFar
// minSoFar
// swap if negative

// Binary Search
// -------------
// left
// right
// mid

// HashSet
// -------
// if (!set[num-1])


// Input  : abcaebab11
// Output : aabb11
// we don't preserve the original order of occurrences. Instead:

// Count the frequency of each character.
// For every character whose frequency is 2 or more, print it exactly twice.

function keepDuplicates(str) {

    const freq = {};
    let result = "";

    // Count frequency
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];

        if (freq[ch] === undefined) {
            freq[ch] = 1;
        } else {
            freq[ch]++;
        }
    }

    // Print each repeated character exactly twice
    for (let ch in freq) {
        if (freq[ch] > 1) {
            result += ch;
            result += ch;
        }
    }

    return result;
}

console.log(keepDuplicates("abcaebab11"));

// Preserve the original order of occurrences.

// Input  : abcaebab11
// Output : "abab11"
// we preserve the original order of occurrences.
// hint: use a map to store the frequency of each character and a set to store the characters that have been printed.
// time complexity -- O(n) -- n is the length of the string
// space complexity -- O(n) -- n is the length of the string
// Technique: Use a map to store the frequency of each character and a set to store the characters that have been printed.


function keepDuplicates(str) {

    const freq = {};
    const printed = {};

    // Count frequency
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];

        if (freq[ch] === undefined) {
            freq[ch] = 1;
        } else {
            freq[ch]++;
        }
    }

    let result = "";

    // Print each repeated character only twice
    for (let i = 0; i < str.length; i++) {

        const ch = str[i];

        if (freq[ch] > 1) {

            if (printed[ch] === undefined) {
                printed[ch] = 1;
                result += ch;
            }
            else if (printed[ch] < 2) {
                printed[ch]++;
                result += ch;
            }

        }
    }

    return result;
}

console.log(keepDuplicates("abcaebab11"));