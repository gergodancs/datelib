import {DateValidator} from "./date-validator";
import {DateValidationError} from "./error";
import {MONTH_NAMES} from "./constans";

export type DateInput =
    | string                     // ISO string
    | number                     // Unix timestamp
    | Date                       // Date object
    | { day: number, month: number, year: number };  // custom parts object


/**
 * A utility class for parsing, validating and formatting dates from various formats.
 */
export class DateBuilder {
    readonly date: Date;

    private constructor(date: Date) {
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
    static from(input: DateInput): DateBuilder {
        if (input instanceof Date) {
            return new DateBuilder(new Date(Date.UTC(
                input.getFullYear(),
                input.getMonth(),
                input.getDate()
            )));
        }

        if (typeof input === 'string') {
            // Check if the input string is in ISO format (e.g., 2024-07-15T00:00:00.000Z)
            const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

            // If the string matches the ISO format, use the Date constructor to create the date object
            if (isoRegex.test(input)) {
                const date = new Date(input); // Parse the ISO string directly
                if (isNaN(date.getTime())) {
                    throw new DateValidationError('Invalid ISO string');
                }
                return new DateBuilder(date);
            }

            // If the string doesn't match ISO, assume it's in yyyy-mm-dd format
            const parts = input.split('-');
            if (parts.length === 3) {
                const [year, month, day] = parts.map(Number); // Convert each part to a number
                const date = new Date(Date.UTC(year, month - 1, day)); // Month is zero-indexed in Date
                return new DateBuilder(date);
            }

            throw new DateValidationError('Invalid date format');
        }

        if (typeof input === 'number') {
            const timestamp = input < 1e12 ? input * 1000 : input;
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) {
                throw new DateValidationError('Invalid timestamp');
            }
            return new DateBuilder(date);
        }

        if ('day' in input && 'month' in input && 'year' in input) {
            const {day, month, year} = input;
            const validator = new DateValidator(day, month, year);
            if (!validator.isValidInput()) {
                throw new DateValidationError(validator.getErrors().join(', '));
            }
            // Construct date using UTC to avoid local timezone issues
            const utcDate = new Date(Date.UTC(year, month - 1, day));
            return new DateBuilder(utcDate);
        }


        throw new DateValidationError('Unsupported date format');
    }

    /**
     * Creates a DateBuilder from the current date and time.
     *
     * @returns A DateBuilder with the current date.
     *
     * @example
     * const now = DateBuilder.fromNow();
     */
    static fromNow(): DateBuilder {
        return new DateBuilder(new Date());
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
    format(formatString: string): string {
        const date = this.date;

        // Temporary map for text token values
        const textValues: Record<string, string> = {
            'MMMM': MONTH_NAMES[date.getUTCMonth()],
            'MMM': MONTH_NAMES[date.getUTCMonth()].slice(0, 3),
            'dddd': date.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' }),
            'ddd': date.toLocaleString('en-US', { weekday: 'short', timeZone: 'UTC' }),
            'E': date.toLocaleString('en-US', { weekday: 'short', timeZone: 'UTC' }), // For abbreviated day name
            'DDDD': date.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' }), // For abbreviated day name
        };

        // Ensure month names and day names are properly capitalized
        textValues['MMMM'] = textValues['MMMM']; // Capitalize the first letter of the month name
        textValues['dddd'] = textValues['dddd'].charAt(0).toUpperCase() + textValues['dddd'].slice(1); // Capitalize the first letter of the day name

        // Replace all text-based tokens with their corresponding values
        Object.keys(textValues).forEach((token) => {
            const regex = new RegExp(token, 'g');
            formatString = formatString.replace(regex, textValues[token]);
        });

        // Now handle numeric values (day, month, hours, etc.)
        const numberMap: Record<string, string> = {
            yyyy: String(date.getUTCFullYear()),
            MM: String(date.getUTCMonth() + 1).padStart(2, '0'),
            dd: String(date.getUTCDate()).padStart(2, '0'),
        };

        // Replace numeric date/time tokens like yyyy, MM, dd, etc.
        formatString = formatString.replace(/yyyy|MM|dd|A/g, match => numberMap[match] || match);

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
    toISO(): string {
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
    toUnix(): number {
        return Math.floor(this.date.getTime() / 1000);
    }

    /**
     * Converts the date to a Unix timestamp (in milliseconds).
     *
     * @returns Unix timestamp (milliseconds).
     *
     * @example
     * date.toUnixMs(); // 1732924800000
     */
    toUnixMs(): number {
        return this.date.getTime();
    }

    /**
     * Returns a native JavaScript Date object.
     *
     * @returns A copy of the internal Date object.
     */
    toDate(): Date {
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
    toObject(): { day: number; month: number; year: number } {
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
    toLocale(locale: string, options?: Intl.DateTimeFormatOptions): string {
        return this.date.toLocaleDateString(locale, options);
    }
}
