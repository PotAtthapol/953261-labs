# 953261 Lab 2 — Kad Café (Modern JavaScript)

| | |
|---|---|
| **Name** | _Atthapol Lungaung_ |
| **Nickname** | _Top_ |
| **Student ID** | _692115045_ |
| **Section** | 701 |

## How to run

```bash
cd lab02
npm run warmup   # Part B
npm test         # Part C
npm start        # Part D — the daily report
```

## My own function (Part D)

`cheapDrinks(menu, maxPrice)` returns an array of formatted menu lines (`menuLine`) for available drinks whose price is at or below `maxPrice`, sorted from cheapest to most expensive without mutating the original menu. It uses `.filter()`, `.toSorted()`, and `.map()`.

## What I learned today

I use `map` when transforming every item in an array into a new shape or value, and `filter` when keeping only items that match a condition. `find` helps retrieve the first matching item or `undefined`, while `reduce` combines an array into a single value like a sum, average, or grouped object without mutating the original data.

## AI-use statement

Yes, I used Gemini to help explain error messages, review my code structure, and guide me through completing the lab tasks step by step. I understand every line of code in my submission and can explain how it works on my own.