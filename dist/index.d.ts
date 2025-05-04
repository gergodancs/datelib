type DateInput = string | number | Date | {
    day: number;
    month: number;
    year: number;
};
/**
 * A utility class for parsing, validating and formatting dates from various formats.
 */
declare class DateBuilder {
    readonly date: Date;
    private constructor();
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
    static from(input: DateInput): DateBuilder;
    /**
     * Creates a DateBuilder from the current date and time.
     *
     * @returns A DateBuilder with the current date.
     *
     * @example
     * const now = DateBuilder.fromNow();
     */
    static fromNow(): DateBuilder;
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
    format(formatString: string): string;
    /**
     * Converts the date to ISO 8601 format.
     *
     * @returns ISO date string.
     *
     * @example
     * date.toISO(); // "2025-05-04T10:20:30.000Z"
     */
    toISO(): string;
    /**
     * Converts the date to a Unix timestamp (in seconds).
     *
     * @returns Unix timestamp (seconds).
     *
     * @example
     * date.toUnix(); // 1732924800
     */
    toUnix(): number;
    /**
     * Converts the date to a Unix timestamp (in milliseconds).
     *
     * @returns Unix timestamp (milliseconds).
     *
     * @example
     * date.toUnixMs(); // 1732924800000
     */
    toUnixMs(): number;
    /**
     * Returns a native JavaScript Date object.
     *
     * @returns A copy of the internal Date object.
     */
    toDate(): Date;
    /**
     * Converts the date to a plain object with day, month, and year.
     *
     * @returns An object with { day, month, year }.
     *
     * @example
     * date.toObject(); // { day: 4, month: 5, year: 2025 }
     */
    toObject(): {
        day: number;
        month: number;
        year: number;
    };
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
    toLocale(locale: string, options?: Intl.DateTimeFormatOptions): string;
}

export { DateBuilder };
