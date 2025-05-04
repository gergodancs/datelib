# date-builder

A lightweight TypeScript utility for building, validating, and formatting dates from various input types.

## ✨ Features

- Accepts multiple date formats:
    - ISO strings (`"2024-05-04T00:00:00Z"`)
    - Simple string format (`"2024-05-04"`)
    - Unix timestamps (seconds or milliseconds)
    - JavaScript `Date` objects
    - Custom objects (`{ day, month, year }`)
- Built-in validation with helpful error messages
- Easy formatting with common placeholders (`yyyy`, `MM`, `dd`, `dddd`, `MMMM`)
- Safe UTC-based parsing to avoid timezone issues
- Localized output support via `Intl.DateTimeFormat`

## 🚀 Usage

```ts
import { DateBuilder } from 'date-builder';

// From ISO string
const isoDate = DateBuilder.from("2024-05-04");

// From object
const objDate = DateBuilder.from({ day: 4, month: 5, year: 2024 });

// From timestamp
const tsDate = DateBuilder.from(1714780800);

// From JS Date
const nativeDate = DateBuilder.from(new Date());

// From now
const now = DateBuilder.fromNow();

console.log(isoDate.format("yyyy-MM-dd"));          // "2024-05-04"
console.log(isoDate.format("dddd, MMMM dd, yyyy")); // "Saturday, May 04, 2024"
console.log(isoDate.toUnix());                      // 1714780800
console.log(isoDate.toISO());                       // "2024-05-04T00:00:00.000Z"

console.log(now.toLocale("de-DE", { dateStyle: "full" })); // "Samstag, 4. Mai 2024" 
```

##  Input Types Supported
 - "2024-05-04" (string)

 - 1714780800 (number - seconds)

 - 1714780800000 (number - milliseconds)

 - new Date() (JS Date object)

 - { day: 4, month: 5, year: 2024 } (custom object)


## 📦 Installation

```bash
npm install @dancsg/date-converter
