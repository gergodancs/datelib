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

## 📦 Installation

```bash
npm install date-builder
