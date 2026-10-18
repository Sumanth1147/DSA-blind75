- Always write code and walk through it to find and fix issues.

## 2026-09-20

- **Best Time to Buy/Sell Stock** → Track `minPrice` and `maxProfit`; profit = current price - minimum price so far.
- **Valid Anagram** → Use a 26-slot frequency array; increment for `s` and decrement for `t` using `charCodeAt(0) - 97`.
- **Move Zeros** → Use `insertPosition` to place non-zero values, then fill the remaining positions with zeros.
- **Missing Number** → Start with `xor = arr.length`, then use `xor = xor ^ i ^ arr[i]`; matching values cancel out.
- **Longest Repeating Character Replacement** → Sliding window is valid when `windowLength - maxFreq <= k`; otherwise decrease the left character count and move `left`.