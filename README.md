# NgxHijriDatepicker - Hijri Datepicker Module

## Overview

`NgxHijriDatepickerModule` is an Angular module for selecting Hijri dates. This module allows for customization of the appearance and behavior through various `@Input` properties. Additionally, it supports different locales for displaying and storing dates.

---

## Features

- Hijri date selection using `moment-hijri`
- Fully customizable via `@Input` properties
- Supports Arabic and English locales
- Separate locales for display and storage
- Emits selected date values through `EventEmitter`
- Supports two-way data binding using `[(value)]`
- Responsive and accessible design

---

## Installation

```typescript
import { NgxHijriDatepickerModule } from 'ngx-hijri-datepicker';

@NgModule({
  imports: [
    CommonModule,
    NgxHijriDatepickerModule,
  ],
})
export class YourModule {}
```

---

## Usage

```html
<ngx-hijri-datepicker
  [(value)]="selectedHijriDate"
  [locale]="'ar-SA'"
  [storageLocale]="'en'"
  [placeholder]="'اختر تاريخ'"
  [width]="'300px'"
  [InputColor]="'#000'"
  [IconColor]="'#fff'"
  (valueChange)="onDateSelected($event)"
></ngx-hijri-datepicker>
```

---

## API Documentation

### Inputs

| Property                     | Type              | Default             | Description                                                                   |
| ---------------------------- | ----------------- | ------------------- | ----------------------------------------------------------------------------- |
| `value`                      | `string \| null`  | `null`              | The initial value for the datepicker. Supports two-way data binding.          |
| `locale`                     | `'en' \| 'ar-SA'` | `'ar-SA'`           | Locale for displaying the date (Arabic or English).                           |
| `storageLocale`              | `'en' \| 'ar-SA'` | `'en'`              | Locale for storing the selected date.                                         |
| `placeholder`                | `string`          | `'اختر تاريخ هجري'` | Placeholder text for the input field.                                         |
| `width`                      | `string`          | `'250px'`           | Width of the datepicker component.                                            |
|                              |                   |                     |                                                                               |
| `InputColor`                 | `string \| null`  | `null`              | Text color for the input field.                                               |
| `InputBackgroundColor`       | `string \| null`  | `null`              | Background color for the input field.                                         |
| `IconColor`                  | `string \| null`  | `null`              | Color of the calendar icon.                                                   |
| `IconBackgroundColor`        | `string \| null`  | `null`              | Background color for the calendar icon.                                       |
| `DayColor`                   | `string \| null`  | `null`              | Text color for days in the calendar.                                          |
| `BorderColor`                | `string \| null`  | `null`              | Border color for the input and popup.                                         |
| `DatepickerPopupHeaderColor` | `string \| null`  | `null`              | Header color in the datepicker popup.                                         |
| `displayFormat`              | `string`          | `'iYYYY/iM/iD'`     | Format for displaying the date in the input field.                            |
| `storageFormat`              | `string \| null`  | `null`              | Format for storing the selected date (uses `displayFormat` if not specified). |
| `formControlName`            | `string`          | `null`              | Form control name for Angular forms integration.                              |

### Outputs

| Property      | Type                   | Description                                                     |
| ------------- | ---------------------- | --------------------------------------------------------------- |
| `valueChange` | `EventEmitter<string>` | Emits the selected date when it changes.                        |
| `value`       | `string`               | Supports two-way binding using `[(value)]`.                     |
| `formControl` | `FormControl`          | Binds the selected date to Angular forms via `formControlName`. |
|               |                        |                                                                 |

---

## Methods

### `selectDate(day: moment.Moment | null)`

- **Description:** Selects a specific date from the calendar.
- **Behavior:**
  - Sets `selectedDate` to the chosen date.
  - Stores the date in the format and locale specified by `storageLocale`.
  - Emits the stored value using `valueChange`.

---

### `toggleDatePicker()`

- **Description:** Toggles the visibility of the datepicker popup.
- **Behavior:**
  - Opens the calendar if closed, and closes it if open.

---

### `selectToday()`

- **Description:** Sets the selected date to today's date.
- **Behavior:**
  - Uses the current date in the Hijri calendar.
  - Applies the locale for display and storage as per `locale` and `storageLocale`.

---

### `writeValue(value: string)`

- **Description:** Updates the component when a new value is written programmatically (Reactive Forms).
- **Behavior:**
  - Parses the input value and updates the displayed date.

---

## Example with Reactive Forms

```html
<form [formGroup]="dateForm">
  <ngx-hijri-datepicker
    formControlName="hijriDate"
    [locale]="'en'"
    [storageLocale]="'en'"
    [(value)]="selectedHijriDate"
    [BorderColor]="BorderColor"
    [DatepickerPopupHeaderColor]="DatepickerPopupHeaderColor"
    [DayColor]="DayColor"
    [placeholder]="placeholder"
    [width]="width"
    [InputColor]="InputColor"
    [IconColor]="IconColor"
    [IconBackgroundColor]="IconBackgroundColor"
  ></ngx-hijri-datepicker>
</form>
```

```typescript
this.dateForm = this.fb.group({
  hijriDate: [''],
});
```

---

## Notes

- You can apply custom CSS to fully control the appearance of the datepicker. Override existing styles by targeting specific classes or using custom SCSS.

- The `locale` property affects the **display** of the date (e.g., Arabic or English numerals and names).
- The `storageLocale` property affects the **format** and **language** in which the date is stored.
- If no `storageFormat` is provided, the component uses `displayFormat` as the default for storing dates.
- The component listens for clicks outside the calendar to close the popup automatically.
- Two-way data binding with `[(value)]` allows seamless synchronization of the selected date with component variables.

---

## Customization

You can style the component by overriding CSS variables or customizing the SCSS directly. The key CSS classes are:

- `.hijri-datepicker-container` – Container for the component.
- `.datepicker-input` – Input field.
- `.datepicker-popup` – Popup containing the calendar.
- `.iconClender` – Calendar icon.
- `.day` – Individual day in the calendar.
- `.selected` – Style for the selected day.

---

## License

This project is  free to use, modify, and distribute the software. However, the software is provided "as is", without warranty of any kind, express or implied.

