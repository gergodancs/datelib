"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DateBuilder: () => DateBuilder
});
module.exports = __toCommonJS(index_exports);

// src/constans.ts
var MIN_DAY = 1;
var MAX_DAY = 31;
var MIN_MONTH = 1;
var MAX_MONTH = 12;
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// src/helpers.ts
function isDayValid(day) {
  return Number.isInteger(day) && day >= MIN_DAY && day <= MAX_DAY;
}
function isMonthValid(month) {
  return Number.isInteger(month) && month >= MIN_MONTH && month <= MAX_MONTH;
}

// src/date-validator.ts
var DateValidator = class {
  constructor(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.errors = [];
  }
  isValidInput() {
    let isValid = true;
    if (!isDayValid(this.day)) {
      this.errors.push("Invalid day");
      isValid = false;
    }
    if (!isMonthValid(this.month)) {
      this.errors.push("Invalid month");
      isValid = false;
    }
    if (isValid) {
      const date = new Date(this.year, this.month - 1, this.day);
      const dateValid = date.getFullYear() === this.year && date.getMonth() === this.month - 1 && date.getDate() === this.day;
      if (!dateValid) {
        this.errors.push("Invalid date combination");
        isValid = false;
      }
    }
    return isValid;
  }
  getErrors() {
    return this.errors;
  }
};

// src/error.ts
var DateValidationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "DateValidationError";
  }
};

// src/DateBuilder.ts
var DateBuilder = class _DateBuilder {
  constructor(date) {
    this.date = date;
  }
  /**
   * Creates a new DateBuilder instance from various input types.
   *
   * @param input - Accepts ISO string, Unix timestamp (seconds or ms), Date object, or custom object.
   * @returns A new DateBuilder instance.
   * @throws {DateValidationError} If the input format is invalid or not supported.
   *
   * @example
   * const builder = DateBuilder.from("2024-11-30");
   */
  static from(input) {
    if (input instanceof Date) {
      return new _DateBuilder(new Date(Date.UTC(
        input.getFullYear(),
        input.getMonth(),
        input.getDate()
      )));
    }
    if (typeof input === "string") {
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
      if (isoRegex.test(input)) {
        const date = new Date(input);
        if (isNaN(date.getTime())) {
          throw new DateValidationError("Invalid ISO string");
        }
        return new _DateBuilder(date);
      }
      const parts = input.split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts.map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        return new _DateBuilder(date);
      }
      throw new DateValidationError("Invalid date format");
    }
    if (typeof input === "number") {
      const timestamp = input < 1e12 ? input * 1e3 : input;
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        throw new DateValidationError("Invalid timestamp");
      }
      return new _DateBuilder(date);
    }
    if ("day" in input && "month" in input && "year" in input) {
      const { day, month, year } = input;
      const validator = new DateValidator(day, month, year);
      if (!validator.isValidInput()) {
        throw new DateValidationError(validator.getErrors().join(", "));
      }
      const utcDate = new Date(Date.UTC(year, month - 1, day));
      return new _DateBuilder(utcDate);
    }
    throw new DateValidationError("Unsupported date format");
  }
  /**
   * Creates a DateBuilder from the current date and time.
   *
   * @returns A DateBuilder with the current date.
   *
   * @example
   * const now = DateBuilder.fromNow();
   */
  static fromNow() {
    return new _DateBuilder(/* @__PURE__ */ new Date());
  }
  /**
   * Formats the internal date using a custom format string.
   * Supported placeholders: `yyyy`, `MM`, `dd`, `MMMM` (full month name), `dddd` (full weekday name).
   *
   * @param formatString - e.g. `"yyyy-MM-dd"` or `"dd.MM.yyyy"` or `"dddd, MMMM dd, yyyy"`
   * @returns Formatted date string.
   *
   * @example
   * date.format("yyyy/MM/dd"); // "2025/04/05"
   * date.format("MMMM dd, yyyy"); // "May 04, 2025"
   * date.format("dddd, MMMM dd, yyyy"); // "Sunday, May 04, 2025"
   */
  format(formatString) {
    const date = this.date;
    const textValues = {
      "MMMM": MONTH_NAMES[date.getUTCMonth()],
      "MMM": MONTH_NAMES[date.getUTCMonth()].slice(0, 3),
      "dddd": date.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" }),
      "ddd": date.toLocaleString("en-US", { weekday: "short", timeZone: "UTC" }),
      "E": date.toLocaleString("en-US", { weekday: "short", timeZone: "UTC" }),
      // For abbreviated day name
      "DDDD": date.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" })
      // For abbreviated day name
    };
    textValues["MMMM"] = textValues["MMMM"];
    textValues["dddd"] = textValues["dddd"].charAt(0).toUpperCase() + textValues["dddd"].slice(1);
    Object.keys(textValues).forEach((token) => {
      const regex = new RegExp(token, "g");
      formatString = formatString.replace(regex, textValues[token]);
    });
    const numberMap = {
      yyyy: String(date.getUTCFullYear()),
      MM: String(date.getUTCMonth() + 1).padStart(2, "0"),
      dd: String(date.getUTCDate()).padStart(2, "0")
    };
    formatString = formatString.replace(/yyyy|MM|dd|A/g, (match) => numberMap[match] || match);
    return formatString;
  }
  /**
   * Converts the date to ISO 8601 format.
   *
   * @returns ISO date string.
   *
   * @example
   * date.toISO(); // "2025-05-04T10:20:30.000Z"
   */
  toISO() {
    return this.date.toISOString();
  }
  /**
   * Converts the date to a Unix timestamp (in seconds).
   *
   * @returns Unix timestamp (seconds).
   *
   * @example
   * date.toUnix(); // 1732924800
   */
  toUnix() {
    return Math.floor(this.date.getTime() / 1e3);
  }
  /**
   * Converts the date to a Unix timestamp (in milliseconds).
   *
   * @returns Unix timestamp (milliseconds).
   *
   * @example
   * date.toUnixMs(); // 1732924800000
   */
  toUnixMs() {
    return this.date.getTime();
  }
  /**
   * Returns a native JavaScript Date object.
   *
   * @returns A copy of the internal Date object.
   */
  toDate() {
    return new Date(this.date);
  }
  /**
   * Converts the date to a plain object with day, month, and year.
   *
   * @returns An object with { day, month, year }.
   *
   * @example
   * date.toObject(); // { day: 4, month: 5, year: 2025 }
   */
  toObject() {
    return {
      day: this.date.getDate(),
      month: this.date.getMonth() + 1,
      year: this.date.getFullYear()
    };
  }
  /**
   * Returns a localized date string using Intl.DateTimeFormat.
   *
   * @param locale - A BCP 47 language tag like `"en-US"` or `"de-DE"`.
   * @param options - Optional formatting options.
   * @returns A localized date string.
   *
   * @example
   * date.toLocale("en-US"); // "5/4/2025"
   * date.toLocale("de-DE", { weekday: "long" }); // "Sonntag"
   */
  toLocale(locale, options) {
    return this.date.toLocaleDateString(locale, options);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateBuilder
});
