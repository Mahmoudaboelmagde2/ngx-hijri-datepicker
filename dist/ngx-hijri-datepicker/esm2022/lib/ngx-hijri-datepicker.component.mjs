import { Component, HostListener, Input, Output, EventEmitter, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment-hijri';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NgxHijriDatepickerComponent {
    elementRef;
    // Input properties to allow customization by the user
    // المدخلات لتخصيص المكون من قبل المستخدم
    value = null; // The initial value / القيمة الأولية
    valueChange = new EventEmitter(); // Emits value when it changes / إرسال القيمة عند التغيير
    placeholder = 'اختر تاريخ هجري'; // Placeholder text / النص الافتراضي للحقل
    width = '250px'; // Width of the input field / عرض الحقل
    height = '40px'; // Height of the input field / ارتفاع الحقل
    InputColor = null; // Input text color / لون النص في الحقل
    InputBackgroundColor = null; // Input background color / لون خلفية الحقل
    IconColor = null; // Icon color / لون الأيقونة
    IconBackgroundColor = null; // Icon background color / لون خلفية الأيقونة
    DayColor = null; // Day color in calendar / لون الأيام في التقويم
    BorderColor = null; // Border color for input and popup / لون الحدود
    DatepickerPopupHeaderColor = null; // Header color in the popup / لون الرأس في نافذة التقويم
    displayFormat = 'iYYYY/iM/iD'; // تنسيق التاريخ الافتراضي
    storageFormat = null; // التنسيق المستخدم للتخزين (افتراضيًا يكون null)
    locale = 'ar-SA'; // خيار لاختيار اللغة (افتراضي: عربي)
    storageLocale = 'en'; // لغة التخزين
    selectedDate = null; // Currently selected date / التاريخ المختار
    showDatePicker = false; // To control visibility of the datepicker popup / التحكم في إظهار التقويم
    showYearPopup = false; // إضافة الخاصية هنا
    currentViewDate = moment().locale(this.locale);
    ; // Currently displayed month in the popup / الشهر الحالي المعروض
    todayBtn = 'اليوم';
    onChange = (value) => { }; // Placeholder for Reactive Forms' change event / واجهة للتعامل مع التغييرات في Reactive Forms
    onTouched = () => { }; // Placeholder for Reactive Forms' touch event / واجهة للتعامل مع لمسة الحقل في Reactive Forms
    // أسماء الأيام (اختصار)
    // Short names for days of the week
    // Getter لتحديد أسماء الأيام بناءً على اللغة
    get dayNamesMin() {
        return this.locale === 'ar-SA'
            ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'] // عربي
            : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']; // إنجليزي
    }
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    // **Initial setup on component load**
    // **إعداد مبدئي عند تحميل المكون**
    ngOnInit() {
        moment.locale(this.locale); // ضبط locale بناءً على اللغة المختارة
        if (this.value) {
            this.selectedDate = moment(this.value, this.displayFormat).locale(this.locale);
            ; // Parse the initial value / تحويل القيمة الأولية لتاريخ
            this.currentViewDate = this.selectedDate.clone(); // Set the view date to the selected date / عرض الشهر الخاص بالتاريخ المختار
        }
        if (this.locale == 'en')
            this.todayBtn = 'Today';
    }
    // إذا لم يتم تمرير `storageFormat` من المستخدم، نستخدم `displayFormat` كقيمة افتراضية
    get resolvedStorageFormat() {
        return this.storageFormat || this.displayFormat;
    }
    // **Property: Display the current month's name in Hijri format**
    // **خاصية: عرض اسم الشهر الحالي بالتنسيق الهجري**
    get currentMonthName() {
        return this.currentViewDate.locale(this.locale).format('iMMMM iYYYY'); // Format the current month / صيغة اسم الشهر الحالي
    }
    // **Property: Calculate and return days of the current month**
    // **خاصية: حساب وإرجاع أيام الشهر الحالي**
    get daysInCurrentMonth() {
        const startOfMonth = this.currentViewDate.clone().startOf('iMonth'); // Start of the month / بداية الشهر
        const endOfMonth = this.currentViewDate.clone().endOf('iMonth'); // End of the month / نهاية الشهر
        const days = [];
        const startDayOfWeek = startOfMonth.day(); // The first day of the month in the week / اليوم الأول من الشهر
        // Add empty slots for previous month's days
        // إضافة فراغات للأيام التي تسبق الشهر الحالي
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(null);
        }
        // Add actual days of the current month
        // إضافة الأيام الفعلية للشهر الحالي
        const totalDays = endOfMonth.iDate();
        for (let d = 1; d <= totalDays; d++) {
            days.push(startOfMonth.clone().iDate(d).locale(this.locale));
        }
        return days;
    }
    // **Method: Navigate to the previous month**
    // **طريقة: الانتقال إلى الشهر السابق**
    prevMonth() {
        this.currentViewDate = this.currentViewDate.clone().subtract(1, 'iMonth').locale(this.locale);
        ;
    }
    // **Method: Navigate to the next month**
    // **طريقة: الانتقال إلى الشهر التالي**
    nextMonth() {
        this.currentViewDate = this.currentViewDate.clone().add(1, 'iMonth').locale(this.locale);
        ;
    }
    // **Method: Select a specific date**
    // **طريقة: اختيار تاريخ معين**
    selectDate(day) {
        if (day) {
            this.selectedDate = day.locale(this.locale);
            const storedValue = this.selectedDate.locale(this.storageLocale).format(this.resolvedStorageFormat); // القيمة لتخزينها في قاعدة البيانات
            const displayValue = this.selectedDate.locale(this.locale).format(this.displayFormat); // القيمة لعرضها
            this.onChange(storedValue); // إرسال القيمة المخزنة إلى النموذج
            this.valueChange.emit(storedValue); // إرسال القيمة المخزنة
            this.showDatePicker = false; // إغلاق نافذة التقويم
        }
    }
    // **Method: Toggle visibility of the datepicker**
    // **طريقة: فتح/إغلاق التقويم**
    toggleDatePicker() {
        this.currentViewDate = this.selectedDate
            ? this.selectedDate.clone().locale(this.locale)
            : moment().locale(this.locale); // Set to current date if no date is selected / عرض الشهر الحالي إذا لم يتم اختيار تاريخ
        this.showDatePicker = !this.showDatePicker; // Toggle visibility / تبديل الحالة
    }
    // **Method: Close the popup when clicking outside**
    // **طريقة: إغلاق التقويم عند النقر خارج المكون**
    onDocumentClick(targetElement) {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement); // Check if click is inside / التحقق إذا كان النقر داخل المكون
        if (!clickedInside) {
            this.showDatePicker = false; // Close the popup / إغلاق نافذة التقويم
        }
    }
    // **Property: Display the selected date in the input field**
    // **خاصية: عرض التاريخ المختار في الحقل**
    get displayedDate() {
        return this.selectedDate ? this.selectedDate.locale(this.locale).format(this.displayFormat) : ''; // Display formatted date or empty string / عرض التاريخ أو تركه فارغاً
    }
    // **Method: Select today's date**
    // **طريقة: اختيار تاريخ اليوم**
    selectToday() {
        this.selectedDate = moment().locale(this.locale); // Set the date to today / تعيين التاريخ إلى اليوم
        const storedValue = this.selectedDate.locale(this.storageLocale).format(this.resolvedStorageFormat);
        const displayValue = this.selectedDate.locale(this.storageLocale).format(this.displayFormat);
        this.onChange(storedValue); // Emit the value for Reactive Forms / إرسال القيمة إلى Reactive Forms
        this.valueChange.emit(storedValue); // Emit the value for standalone usage / إرسال القيمة عند الاستخدام الفردي
        this.showDatePicker = false; // Close the popup / إغلاق نافذة التقويم
    }
    // **ControlValueAccessor: Write a new value**
    // **واجهة: تعيين قيمة جديدة**
    writeValue(value) {
        if (value) {
            this.selectedDate = moment(value, this.resolvedStorageFormat).locale(this.locale); // تحويل القيمة إلى لحظة بناءً على التنسيق
            this.currentViewDate = this.selectedDate.clone(); // Set the current view date / تعيين عرض الشهر
        }
        else {
            this.selectedDate = null; // Clear the selected date / مسح التاريخ المختار
        }
    }
    // **ControlValueAccessor: Register a change callback**
    // **واجهة: تسجيل دالة تغيير القيمة**
    registerOnChange(fn) {
        this.onChange = fn; // Store the callback function / تخزين دالة التغيير
    }
    // **ControlValueAccessor: Register a touched callback**
    // **واجهة: تسجيل دالة اللمس**
    registerOnTouched(fn) {
        this.onTouched = fn; // Store the callback function / تخزين دالة اللمس
    }
    toggleYearPopup() {
        this.showYearPopup = !this.showYearPopup;
    }
    selectYear(year) {
        this.currentViewDate = this.currentViewDate.clone().iYear(year);
        this.showYearPopup = false;
    }
    get hijriYears() {
        const currentYear = moment().iYear();
        const startYear = currentYear - 50;
        const endYear = currentYear + 50;
        const years = [];
        for (let i = startYear; i <= endYear; i++) {
            years.push(i);
        }
        return years;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NgxHijriDatepickerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NgxHijriDatepickerComponent, selector: "ngx-hijri-datepicker", inputs: { value: "value", placeholder: "placeholder", width: "width", height: "height", InputColor: "InputColor", InputBackgroundColor: "InputBackgroundColor", IconColor: "IconColor", IconBackgroundColor: "IconBackgroundColor", DayColor: "DayColor", BorderColor: "BorderColor", DatepickerPopupHeaderColor: "DatepickerPopupHeaderColor", displayFormat: "displayFormat", storageFormat: "storageFormat", locale: "locale", storageLocale: "storageLocale" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "document:click": "onDocumentClick($event.target)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgxHijriDatepickerComponent),
                multi: true,
            },
        ], ngImport: i0, template: `
<div
  class="hijri-datepicker-container"
  [ngStyle]="{
    width: width,
  }"
>
  <!-- حقل الإدخال -->
  <div
    class="input-svg-wrapper"
    [ngStyle]="{
        width: width,
}"
  >
    <input
      type="text"
      [value]="displayedDate"
      (click)="toggleDatePicker()"
      readonly
      [placeholder]="placeholder"
      class="datepicker-input"
      [ngStyle]="{
        width: width,
        borderColor: BorderColor,
        color: InputColor,
        backgroundColor: InputBackgroundColor
      }"
    />
    <div
      class="iconClender"
      (click)="toggleDatePicker()"
      [ngStyle]="{
        backgroundColor: IconBackgroundColor
      }"
    >
      <svg
        [attr.fill]="IconColor"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 610.398 610.398"
        class="datepicker-icon"
      >
        <g>
          <g>
            <path
              d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052
               c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553
               V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"
            />
            <path
              d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992
               h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"
            />
            <path
              d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117
               V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818
               c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764
               V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"
            />
            <path
              d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
               c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"
            />
            <path
              d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017
               c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"
            />
            <path
              d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
               c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"
            />
            <path
              d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017
               c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"
            />
            <path
              d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
               c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"
            />
            <path
              d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032
               c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"
            />
            <path
              d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
               c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"
            />
            <path
              d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032
               c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
  <!-- التقويم -->
  <div
    class="datepicker-popup"
    [class.open]="showDatePicker"
    [class.closed]="!showDatePicker"
    [ngStyle]="{
    borderColor: BorderColor
      }"
  >
    <!-- عنوان الشهر وأزرار التنقل -->
    <div class="header">
      <a (click)="prevMonth()">&lt;</a>
      <span (click)="toggleYearPopup()"   [ngStyle]="{
        color: DayColor
      }">{{ currentMonthName }}</span>
      <a (click)="nextMonth()">&gt;</a>
    </div>
<!-- Popup لاختيار السنة -->
<div class="year-popup" *ngIf="showYearPopup">
  <div class="year-list">
    <div *ngFor="let year of hijriYears" (click)="selectYear(year)">
      {{ year }}
    </div>
  </div>
</div>
    <!-- أسماء أيام الأسبوع -->
    <div class="weekdays">
      <div       [ngStyle]="{
        color: DatepickerPopupHeaderColor
      }" *ngFor="let day of dayNamesMin" class="weekday">{{ day }}</div>
    </div>

    <!-- عرض أيام الشهر -->
    <div class="days">
      <div
        *ngFor="let day of daysInCurrentMonth"
        class="day"
        [class.selected]="selectedDate && day?.isSame(selectedDate, 'day')"
        (click)="selectDate(day)"
      >
        <span *ngIf="day">{{ day.iDate() }}</span>
      </div>
    </div>

    <!-- زر لتحديد اليوم الحالي -->
    <div class="today-button">
      <a (click)="selectToday()"
      >{{todayBtn}}</a>
    </div>
  </div>
</div>

  `, isInline: true, styles: [".year-popup{position:absolute;top:40px;left:0;width:100%;background:#fff;border:1px solid var(--primary-color, #000);box-shadow:0 4px 6px #0000001a;z-index:1000;max-height:200px;overflow-y:auto}.year-list div{padding:10px;text-align:center;cursor:pointer;transition:background-color .3s}.year-list div:hover{background-color:var(--primary-color, #007bff);color:#fff}.hijri-datepicker-container{position:relative;display:inline-block;width:250px}.input-svg-wrapper{display:flex;align-items:center;width:100%}.iconClender{background-color:var(--primary-color, #000);padding:14.5px;border-top-left-radius:4px;border-bottom-left-radius:4px;display:flex;justify-content:center;align-items:center;cursor:pointer}.datepicker-input{flex:1;padding:8px;font-size:14px;box-sizing:border-box;border:1px solid var(--primary-color, #000);border-top-right-radius:4px;border-bottom-right-radius:4px;transition:border-color .3s ease-in-out}.datepicker-input:focus{outline:none;border-color:var(--primary-color, #000);box-shadow:0 0 4px var(--primary-color, #000)}.datepicker-icon{width:15px;height:15px;cursor:pointer}.datepicker-popup{position:absolute;top:100%;left:0;z-index:1000;background:#fff;border:1px solid var(--primary-color, #000);box-shadow:0 4px 6px #0000001a;padding:10px;width:100%;opacity:0;transform:scaleY(0);transform-origin:top;transition:all .3s ease-in-out}.datepicker-popup.open{opacity:1;transform:scaleY(1)}.datepicker-popup.closed{opacity:0;transform:scaleY(0)}.header{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:700;color:var(--primary-color, #000)}.header a{cursor:pointer}.weekdays,.days{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}.weekday{font-weight:700;margin-bottom:5px;font-size:12px;color:var(--primary-color, #000)}.day{padding:5px;cursor:pointer;text-align:center;border-radius:4px;transition:background-color .3s,color .3s}.day:hover{background-color:var(--primary-color, #000);color:#fff}.day.selected{background-color:var(--primary-color, #000);color:#fff;font-weight:700}.today-button{text-align:left;margin-top:10px;border:none}.today-button a{cursor:pointer;padding:5px 10px;color:#000}.today-button a:hover{background-color:var(--primary-color, #000);border-radius:50px;color:#fff}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NgxHijriDatepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-hijri-datepicker', template: `
<div
  class="hijri-datepicker-container"
  [ngStyle]="{
    width: width,
  }"
>
  <!-- حقل الإدخال -->
  <div
    class="input-svg-wrapper"
    [ngStyle]="{
        width: width,
}"
  >
    <input
      type="text"
      [value]="displayedDate"
      (click)="toggleDatePicker()"
      readonly
      [placeholder]="placeholder"
      class="datepicker-input"
      [ngStyle]="{
        width: width,
        borderColor: BorderColor,
        color: InputColor,
        backgroundColor: InputBackgroundColor
      }"
    />
    <div
      class="iconClender"
      (click)="toggleDatePicker()"
      [ngStyle]="{
        backgroundColor: IconBackgroundColor
      }"
    >
      <svg
        [attr.fill]="IconColor"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 610.398 610.398"
        class="datepicker-icon"
      >
        <g>
          <g>
            <path
              d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052
               c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553
               V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"
            />
            <path
              d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992
               h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"
            />
            <path
              d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117
               V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818
               c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764
               V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"
            />
            <path
              d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
               c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"
            />
            <path
              d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017
               c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"
            />
            <path
              d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
               c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"
            />
            <path
              d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017
               c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"
            />
            <path
              d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
               c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"
            />
            <path
              d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032
               c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"
            />
            <path
              d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
               c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"
            />
            <path
              d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032
               c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
  <!-- التقويم -->
  <div
    class="datepicker-popup"
    [class.open]="showDatePicker"
    [class.closed]="!showDatePicker"
    [ngStyle]="{
    borderColor: BorderColor
      }"
  >
    <!-- عنوان الشهر وأزرار التنقل -->
    <div class="header">
      <a (click)="prevMonth()">&lt;</a>
      <span (click)="toggleYearPopup()"   [ngStyle]="{
        color: DayColor
      }">{{ currentMonthName }}</span>
      <a (click)="nextMonth()">&gt;</a>
    </div>
<!-- Popup لاختيار السنة -->
<div class="year-popup" *ngIf="showYearPopup">
  <div class="year-list">
    <div *ngFor="let year of hijriYears" (click)="selectYear(year)">
      {{ year }}
    </div>
  </div>
</div>
    <!-- أسماء أيام الأسبوع -->
    <div class="weekdays">
      <div       [ngStyle]="{
        color: DatepickerPopupHeaderColor
      }" *ngFor="let day of dayNamesMin" class="weekday">{{ day }}</div>
    </div>

    <!-- عرض أيام الشهر -->
    <div class="days">
      <div
        *ngFor="let day of daysInCurrentMonth"
        class="day"
        [class.selected]="selectedDate && day?.isSame(selectedDate, 'day')"
        (click)="selectDate(day)"
      >
        <span *ngIf="day">{{ day.iDate() }}</span>
      </div>
    </div>

    <!-- زر لتحديد اليوم الحالي -->
    <div class="today-button">
      <a (click)="selectToday()"
      >{{todayBtn}}</a>
    </div>
  </div>
</div>

  `, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxHijriDatepickerComponent),
                            multi: true,
                        },
                    ], styles: [".year-popup{position:absolute;top:40px;left:0;width:100%;background:#fff;border:1px solid var(--primary-color, #000);box-shadow:0 4px 6px #0000001a;z-index:1000;max-height:200px;overflow-y:auto}.year-list div{padding:10px;text-align:center;cursor:pointer;transition:background-color .3s}.year-list div:hover{background-color:var(--primary-color, #007bff);color:#fff}.hijri-datepicker-container{position:relative;display:inline-block;width:250px}.input-svg-wrapper{display:flex;align-items:center;width:100%}.iconClender{background-color:var(--primary-color, #000);padding:14.5px;border-top-left-radius:4px;border-bottom-left-radius:4px;display:flex;justify-content:center;align-items:center;cursor:pointer}.datepicker-input{flex:1;padding:8px;font-size:14px;box-sizing:border-box;border:1px solid var(--primary-color, #000);border-top-right-radius:4px;border-bottom-right-radius:4px;transition:border-color .3s ease-in-out}.datepicker-input:focus{outline:none;border-color:var(--primary-color, #000);box-shadow:0 0 4px var(--primary-color, #000)}.datepicker-icon{width:15px;height:15px;cursor:pointer}.datepicker-popup{position:absolute;top:100%;left:0;z-index:1000;background:#fff;border:1px solid var(--primary-color, #000);box-shadow:0 4px 6px #0000001a;padding:10px;width:100%;opacity:0;transform:scaleY(0);transform-origin:top;transition:all .3s ease-in-out}.datepicker-popup.open{opacity:1;transform:scaleY(1)}.datepicker-popup.closed{opacity:0;transform:scaleY(0)}.header{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:700;color:var(--primary-color, #000)}.header a{cursor:pointer}.weekdays,.days{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}.weekday{font-weight:700;margin-bottom:5px;font-size:12px;color:var(--primary-color, #000)}.day{padding:5px;cursor:pointer;text-align:center;border-radius:4px;transition:background-color .3s,color .3s}.day:hover{background-color:var(--primary-color, #000);color:#fff}.day.selected{background-color:var(--primary-color, #000);color:#fff;font-weight:700}.today-button{text-align:left;margin-top:10px;border:none}.today-button a{cursor:pointer;padding:5px 10px;color:#000}.today-button a:hover{background-color:var(--primary-color, #000);border-radius:50px;color:#fff}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], placeholder: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], InputColor: [{
                type: Input
            }], InputBackgroundColor: [{
                type: Input
            }], IconColor: [{
                type: Input
            }], IconBackgroundColor: [{
                type: Input
            }], DayColor: [{
                type: Input
            }], BorderColor: [{
                type: Input
            }], DatepickerPopupHeaderColor: [{
                type: Input
            }], displayFormat: [{
                type: Input
            }], storageFormat: [{
                type: Input
            }], locale: [{
                type: Input
            }], storageLocale: [{
                type: Input
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhpanJpLWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWhpanJpLWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtaGlqcmktZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLE1BQU0sTUFBTSxjQUFjLENBQUM7OztBQXFVbEMsTUFBTSxPQUFPLDJCQUEyQjtJQXFDbEI7SUFwQ3BCLHNEQUFzRDtJQUN0RCx5Q0FBeUM7SUFDaEMsS0FBSyxHQUFrQixJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7SUFDakUsV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDLENBQUMseURBQXlEO0lBRTFILFdBQVcsR0FBVyxpQkFBaUIsQ0FBQyxDQUFDLDBDQUEwQztJQUNuRixLQUFLLEdBQVcsT0FBTyxDQUFDLENBQUMsdUNBQXVDO0lBQ2hFLE1BQU0sR0FBVyxNQUFNLENBQUMsQ0FBQywyQ0FBMkM7SUFDcEUsVUFBVSxHQUFrQixJQUFJLENBQUMsQ0FBQyx1Q0FBdUM7SUFDekUsb0JBQW9CLEdBQWlCLElBQUksQ0FBQyxDQUFDLDJDQUEyQztJQUN0RixTQUFTLEdBQWlCLElBQUksQ0FBQyxDQUFDLDRCQUE0QjtJQUM1RCxtQkFBbUIsR0FBaUIsSUFBSSxDQUFDLENBQUMsNkNBQTZDO0lBQ3ZGLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQzlFLFdBQVcsR0FBaUIsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQ2xGLDBCQUEwQixHQUFpQixJQUFJLENBQUMsQ0FBQyx5REFB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SUFBSTt5QkFDWjtxQkFDRjsrRUFLVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0ksV0FBVztzQkFBcEIsTUFBTTtnQkFFRSxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBeUdOLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBPbkluaXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtaGlqcmknO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1oaWpyaS1kYXRlcGlja2VyJyxcclxuICB0ZW1wbGF0ZTogICBgXHJcbjxkaXZcclxuICBjbGFzcz1cImhpanJpLWRhdGVwaWNrZXItY29udGFpbmVyXCJcclxuICBbbmdTdHlsZV09XCJ7XHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgfVwiXHJcbj5cclxuICA8IS0tINit2YLZhCDYp9mE2KXYr9iu2KfZhCAtLT5cclxuICA8ZGl2XHJcbiAgICBjbGFzcz1cImlucHV0LXN2Zy13cmFwcGVyXCJcclxuICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbn1cIlxyXG4gID5cclxuICAgIDxpbnB1dFxyXG4gICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgIFt2YWx1ZV09XCJkaXNwbGF5ZWREYXRlXCJcclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZURhdGVQaWNrZXIoKVwiXHJcbiAgICAgIHJlYWRvbmx5XHJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1pbnB1dFwiXHJcbiAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgYm9yZGVyQ29sb3I6IEJvcmRlckNvbG9yLFxyXG4gICAgICAgIGNvbG9yOiBJbnB1dENvbG9yLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogSW5wdXRCYWNrZ3JvdW5kQ29sb3JcclxuICAgICAgfVwiXHJcbiAgICAvPlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImljb25DbGVuZGVyXCJcclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZURhdGVQaWNrZXIoKVwiXHJcbiAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IEljb25CYWNrZ3JvdW5kQ29sb3JcclxuICAgICAgfVwiXHJcbiAgICA+XHJcbiAgICAgIDxzdmdcclxuICAgICAgICBbYXR0ci5maWxsXT1cIkljb25Db2xvclwiXHJcbiAgICAgICAgdmVyc2lvbj1cIjEuMVwiXHJcbiAgICAgICAgaWQ9XCJDYXBhXzFcIlxyXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiXHJcbiAgICAgICAgdmlld0JveD1cIjAgMCA2MTAuMzk4IDYxMC4zOThcIlxyXG4gICAgICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1pY29uXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxnPlxyXG4gICAgICAgICAgPGc+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNTkuNTY3LDBoLTE1LjMyOWMtMS45NTYsMC0zLjgxMSwwLjQxMS01LjYwOCwwLjk5NWMtOC45NzksMi45MTItMTUuNjE2LDEyLjQ5OC0xNS42MTYsMjMuOTk3djEwLjU1MnYyNy4wMDl2MTQuMDUyXHJcbiAgICAgICAgICAgICAgIGMwLDIuNjExLDAuNDM1LDUuMDc4LDEuMDY2LDcuNDRjMi43MDIsMTAuMTQ2LDEwLjY1MywxNy41NTIsMjAuMTU4LDE3LjU1MmgxNS4zMjljMTEuNzI0LDAsMjEuMjI0LTExLjE4OCwyMS4yMjQtMjQuOTkyVjYyLjU1M1xyXG4gICAgICAgICAgICAgICBWMzUuNTQ0VjI0Ljk5MkMxODAuNzkxLDExLjE4OCwxNzEuMjkxLDAsMTU5LjU2NywwelwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk00NjEuMjg4LDBoLTE1LjMyOWMtMTEuNzI0LDAtMjEuMjI0LDExLjE4OC0yMS4yMjQsMjQuOTkydjEwLjU1MnYyNy4wMDl2MTQuMDUyYzAsMTMuODA0LDkuNSwyNC45OTIsMjEuMjI0LDI0Ljk5MlxyXG4gICAgICAgICAgICAgICBoMTUuMzI5YzExLjcyNCwwLDIxLjIyNC0xMS4xODgsMjEuMjI0LTI0Ljk5MlY2Mi41NTNWMzUuNTQ0VjI0Ljk5MkM0ODIuNTA3LDExLjE4OCw0NzMuMDA3LDAsNDYxLjI4OCwwelwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk01MzkuNTg2LDYyLjU1M2gtMzcuOTU0djE0LjA1MmMwLDI0LjMyNy0xOC4xMDIsNDQuMTE3LTQwLjM0OSw0NC4xMTdoLTE1LjMyOWMtMjIuMjQ3LDAtNDAuMzQ5LTE5Ljc5LTQwLjM0OS00NC4xMTdcclxuICAgICAgICAgICAgICAgVjYyLjU1M0gxOTkuOTE2djE0LjA1MmMwLDI0LjMyNy0xOC4xMDIsNDQuMTE3LTQwLjM0OSw0NC4xMTdoLTE1LjMyOWMtMjIuMjQ4LDAtNDAuMzQ5LTE5Ljc5LTQwLjM0OS00NC4xMTdWNjIuNTUzSDcwLjgxOFxyXG4gICAgICAgICAgICAgICBjLTIxLjA2NiwwLTM4LjE1LDE2LjAxNy0zOC4xNSwzNS43NjR2NDc2LjMxOGMwLDE5Ljc4NCwxNy4wODMsMzUuNzY0LDM4LjE1LDM1Ljc2NGg0NjguNzYzYzIxLjA4NSwwLDM4LjE0OS0xNS45ODQsMzguMTQ5LTM1Ljc2NFxyXG4gICAgICAgICAgICAgICBWOTguMzIyQzU3Ny43MzUsNzguNTc1LDU2MC42NzEsNjIuNTUzLDUzOS41ODYsNjIuNTUzeiBNNTI3Ljc1Nyw1NTcuOWwtNDQ2LjUwMi0wLjE3MlYxNzMuNzE3aDQ0Ni41MDJWNTU3Ljl6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsMjY2LjI1OGgxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xNzksMTguNDM3LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNy0yMi43NTlIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMzMzQuNTgsMjU2LjA3NCwzNDIuODIzLDI2Ni4yNTgsMzUzLjAxNywyNjYuMjU4elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDM0OC40NjdoMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTc5LDE4LjQzNy0yMi43NTljMC0xMi41NzktOC4yNDgtMjIuNzU4LTE4LjQzNy0yMi43NThIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OEMzMzQuNTgsMzM4LjI4OCwzNDIuODIzLDM0OC40NjcsMzUzLjAxNywzNDguNDY3elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDQzMC42NzZoMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTgsMTguNDM3LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNy0yMi43NTlIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xOC0xOC40MzcsMjIuNzU5UzM0Mi44MjMsNDMwLjY3NiwzNTMuMDE3LDQzMC42NzZ6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsNTEyLjg5aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE4LDE4LjQzNy0yMi43NTljMC0xMi41OC04LjI0OC0yMi43NTktMTguNDM3LTIyLjc1OUgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzMzNC41OCw1MDIuNzEsMzQyLjgyMyw1MTIuODksMzUzLjAxNyw1MTIuODl6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsMjY2LjI1OEgyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE3OSwxOC40MzYtMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM2LTIyLjc1OUgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzEyNi41OTYsMjU2LjA3NCwxMzQuODM4LDI2Ni4yNTgsMTQ1LjAzMiwyNjYuMjU4elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDM0OC40NjdIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xNzksMTguNDM2LTIyLjc1OWMwLTEyLjU3OS04LjI0OC0yMi43NTgtMTguNDM2LTIyLjc1OEgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU4QzEyNi41OTYsMzM4LjI4OCwxMzQuODM4LDM0OC40NjcsMTQ1LjAzMiwzNDguNDY3elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDQzMC42NzZIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xOCwxOC40MzYtMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM2LTIyLjc1OUgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE4LTE4LjQzNywyMi43NTlTMTM0LjgzOCw0MzAuNjc2LDE0NS4wMzIsNDMwLjY3NnpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiw1MTIuODlIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xOCwxOC40MzYtMjIuNzU5YzAtMTIuNTgtOC4yNDgtMjIuNzU5LTE4LjQzNi0yMi43NTlIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMxMjYuNTk2LDUwMi43MSwxMzQuODM4LDUxMi44OSwxNDUuMDMyLDUxMi44OXpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9nPlxyXG4gICAgICAgIDwvZz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8IS0tINin2YTYqtmC2YjZitmFIC0tPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1wb3B1cFwiXHJcbiAgICBbY2xhc3Mub3Blbl09XCJzaG93RGF0ZVBpY2tlclwiXHJcbiAgICBbY2xhc3MuY2xvc2VkXT1cIiFzaG93RGF0ZVBpY2tlclwiXHJcbiAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICBib3JkZXJDb2xvcjogQm9yZGVyQ29sb3JcclxuICAgICAgfVwiXHJcbiAgPlxyXG4gICAgPCEtLSDYudmG2YjYp9mGINin2YTYtNmH2LEg2YjYo9iy2LHYp9ixINin2YTYqtmG2YLZhCAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgPGEgKGNsaWNrKT1cInByZXZNb250aCgpXCI+Jmx0OzwvYT5cclxuICAgICAgPHNwYW4gKGNsaWNrKT1cInRvZ2dsZVllYXJQb3B1cCgpXCIgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgY29sb3I6IERheUNvbG9yXHJcbiAgICAgIH1cIj57eyBjdXJyZW50TW9udGhOYW1lIH19PC9zcGFuPlxyXG4gICAgICA8YSAoY2xpY2spPVwibmV4dE1vbnRoKClcIj4mZ3Q7PC9hPlxyXG4gICAgPC9kaXY+XHJcbjwhLS0gUG9wdXAg2YTYp9iu2KrZitin2LEg2KfZhNiz2YbYqSAtLT5cclxuPGRpdiBjbGFzcz1cInllYXItcG9wdXBcIiAqbmdJZj1cInNob3dZZWFyUG9wdXBcIj5cclxuICA8ZGl2IGNsYXNzPVwieWVhci1saXN0XCI+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCB5ZWFyIG9mIGhpanJpWWVhcnNcIiAoY2xpY2spPVwic2VsZWN0WWVhcih5ZWFyKVwiPlxyXG4gICAgICB7eyB5ZWFyIH19XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiAgICA8IS0tINij2LPZhdin2KEg2KPZitin2YUg2KfZhNij2LPYqNmI2LkgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwid2Vla2RheXNcIj5cclxuICAgICAgPGRpdiAgICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgY29sb3I6IERhdGVwaWNrZXJQb3B1cEhlYWRlckNvbG9yXHJcbiAgICAgIH1cIiAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheU5hbWVzTWluXCIgY2xhc3M9XCJ3ZWVrZGF5XCI+e3sgZGF5IH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8IS0tINi52LHYtiDYo9mK2KfZhSDYp9mE2LTZh9ixIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cImRheXNcIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5c0luQ3VycmVudE1vbnRoXCJcclxuICAgICAgICBjbGFzcz1cImRheVwiXHJcbiAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cInNlbGVjdGVkRGF0ZSAmJiBkYXk/LmlzU2FtZShzZWxlY3RlZERhdGUsICdkYXknKVwiXHJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdERhdGUoZGF5KVwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImRheVwiPnt7IGRheS5pRGF0ZSgpIH19PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0g2LLYsSDZhNiq2K3Yr9mK2K8g2KfZhNmK2YjZhSDYp9mE2K3Yp9mE2YogLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwidG9kYXktYnV0dG9uXCI+XHJcbiAgICAgIDxhIChjbGljayk9XCJzZWxlY3RUb2RheSgpXCJcclxuICAgICAgPnt7dG9kYXlCdG59fTwvYT5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbiAgYCxcclxuICBzdHlsZXM6IGBcclxuICAueWVhci1wb3B1cCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNDBweDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXByaW1hcnktY29sb3IsICMwMDApO1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgei1pbmRleDogMTAwMDtcclxuICBtYXgtaGVpZ2h0OiAyMDBweDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4ueWVhci1saXN0IGRpdiB7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcztcclxufVxyXG5cclxuLnllYXItbGlzdCBkaXY6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDdiZmYpO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuICAuaGlqcmktZGF0ZXBpY2tlci1jb250YWluZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gIH1cclxuXHJcbiAgLmlucHV0LXN2Zy13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAvKiDZhNmF2K3Yp9iw2KfYqSDYp9mE2YXYrdiq2YjZiSDYudmF2YjYr9mK2YvYpyAqL1xyXG4gICAgd2lkdGg6IDEwMCU7IC8qINmG2YHYsyDYudix2LYg2KfZhNit2KfZiNmK2KkgKi9cclxuICB9XHJcblxyXG4gIC5pY29uQ2xlbmRlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBwYWRkaW5nOiAxNC41cHg7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA0cHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItaW5wdXQge1xyXG4gICAgZmxleDogMTsgLyog2YrYo9iu2LAg2KfZhNil2K/Yrtin2YQg2YPYp9mF2YQg2KfZhNi52LHYtiDYp9mE2YXYqtio2YLZiiAqL1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNHB4O1xyXG4gICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuM3MgZWFzZS1pbi1vdXQ7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1pbnB1dDpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lOyAvKiDYpdiy2KfZhNipINin2YTYpdi32KfYsSDYp9mE2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KrYo9ir2YrYsSDYrtmB2YrZgSDYudmG2K8g2KfZhNiq2LHZg9mK2LIgKi9cclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLWljb24ge1xyXG4gICAgd2lkdGg6IDE1cHg7IC8qINmK2YXZg9mGINi22KjYtyDYp9mE2K3YrNmFINit2LPYqCDYp9mE2K3Yp9is2KkgKi9cclxuICAgIGhlaWdodDogMTVweDsgLyog2YbZgdizINin2LHYqtmB2KfYuSDYp9mE2KXYr9iu2KfZhCAqL1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItcG9wdXAge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAxMDAlO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHotaW5kZXg6IDEwMDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDApO1xyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1wb3B1cC5vcGVuIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxKTtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLXBvcHVwLmNsb3NlZCB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMCk7XHJcbiAgfVxyXG5cclxuICAuaGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gIH1cclxuXHJcbiAgLmhlYWRlciBhIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC53ZWVrZGF5cyxcclxuICAuZGF5cyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC53ZWVrZGF5IHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICB9XHJcblxyXG4gIC5kYXkge1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzLCBjb2xvciAwLjNzO1xyXG4gIH1cclxuXHJcbiAgLmRheTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICB9XHJcblxyXG4gIC5kYXkuc2VsZWN0ZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfVxyXG5cclxuICAudG9kYXktYnV0dG9uIHtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gIH1cclxuXHJcbiAgLnRvZGF5LWJ1dHRvbiBhIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgfVxyXG5cclxuICAudG9kYXktYnV0dG9uIGE6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9mE2YTZiNmGINin2YTYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcblxyXG4gIGAsXHJcblxyXG5wcm92aWRlcnM6IFtcclxuICB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEhpanJpRGF0ZXBpY2tlckNvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZSxcclxuICB9LFxyXG5dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SGlqcmlEYXRlcGlja2VyQ29tcG9uZW50IHtcclxuICAvLyBJbnB1dCBwcm9wZXJ0aWVzIHRvIGFsbG93IGN1c3RvbWl6YXRpb24gYnkgdGhlIHVzZXJcclxuICAvLyDYp9mE2YXYr9iu2YTYp9iqINmE2KrYrti12YrYtSDYp9mE2YXZg9mI2YYg2YXZhiDZgtio2YQg2KfZhNmF2LPYqtiu2K/ZhVxyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDsgLy8gVGhlIGluaXRpYWwgdmFsdWUgLyDYp9mE2YLZitmF2Kkg2KfZhNij2YjZhNmK2KlcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7IC8vIEVtaXRzIHZhbHVlIHdoZW4gaXQgY2hhbmdlcyAvINil2LHYs9in2YQg2KfZhNmC2YrZhdipINi52YbYryDYp9mE2KrYutmK2YrYsVxyXG5cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ9in2K7YqtixINiq2KfYsdmK2K4g2YfYrNix2YonOyAvLyBQbGFjZWhvbGRlciB0ZXh0IC8g2KfZhNmG2LUg2KfZhNin2YHYqtix2KfYttmKINmE2YTYrdmC2YRcclxuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nID0gJzI1MHB4JzsgLy8gV2lkdGggb2YgdGhlIGlucHV0IGZpZWxkIC8g2LnYsdi2INin2YTYrdmC2YRcclxuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZyA9ICc0MHB4JzsgLy8gSGVpZ2h0IG9mIHRoZSBpbnB1dCBmaWVsZCAvINin2LHYqtmB2KfYuSDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgSW5wdXRDb2xvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7IC8vIElucHV0IHRleHQgY29sb3IgLyDZhNmI2YYg2KfZhNmG2LUg2YHZiiDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgSW5wdXRCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIElucHV0IGJhY2tncm91bmQgY29sb3IgLyDZhNmI2YYg2K7ZhNmB2YrYqSDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgSWNvbkNvbG9yOiBzdHJpbmcgfCBudWxsPSBudWxsOyAvLyBJY29uIGNvbG9yIC8g2YTZiNmGINin2YTYo9mK2YLZiNmG2KlcclxuICBASW5wdXQoKSBJY29uQmFja2dyb3VuZENvbG9yOiBzdHJpbmd8IG51bGwgPSBudWxsOyAvLyBJY29uIGJhY2tncm91bmQgY29sb3IgLyDZhNmI2YYg2K7ZhNmB2YrYqSDYp9mE2KPZitmC2YjZhtipXHJcbiAgQElucHV0KCkgRGF5Q29sb3I6IHN0cmluZ3wgbnVsbD0gbnVsbDsgLy8gRGF5IGNvbG9yIGluIGNhbGVuZGFyIC8g2YTZiNmGINin2YTYo9mK2KfZhSDZgdmKINin2YTYqtmC2YjZitmFXHJcbiAgQElucHV0KCkgQm9yZGVyQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIEJvcmRlciBjb2xvciBmb3IgaW5wdXQgYW5kIHBvcHVwIC8g2YTZiNmGINin2YTYrdiv2YjYr1xyXG4gIEBJbnB1dCgpIERhdGVwaWNrZXJQb3B1cEhlYWRlckNvbG9yOiBzdHJpbmcgfCBudWxsPSBudWxsOyAvLyBIZWFkZXIgY29sb3IgaW4gdGhlIHBvcHVwIC8g2YTZiNmGINin2YTYsdij2LMg2YHZiiDZhtin2YHYsNipINin2YTYqtmC2YjZitmFXHJcbiAgQElucHV0KCkgZGlzcGxheUZvcm1hdDogc3RyaW5nID0gJ2lZWVlZL2lNL2lEJzsgLy8g2KrZhtiz2YrZgiDYp9mE2KrYp9ix2YrYriDYp9mE2KfZgdiq2LHYp9i22YpcclxuICBASW5wdXQoKSBzdG9yYWdlRm9ybWF0OiBzdHJpbmcgfCBudWxsID0gbnVsbDsgLy8g2KfZhNiq2YbYs9mK2YIg2KfZhNmF2LPYqtiu2K/ZhSDZhNmE2KrYrtiy2YrZhiAo2KfZgdiq2LHYp9i22YrZi9inINmK2YPZiNmGIG51bGwpXHJcbiAgQElucHV0KCkgbG9jYWxlOiAnZW4nIHwgJ2FyLVNBJyA9ICdhci1TQSc7ICAvLyDYrtmK2KfYsSDZhNin2K7YqtmK2KfYsSDYp9mE2YTYutipICjYp9mB2KrYsdin2LbZijog2LnYsdio2YopXHJcbiAgQElucHV0KCkgc3RvcmFnZUxvY2FsZTogJ2VuJyB8ICdhci1TQScgPSAnZW4nOyAgLy8g2YTYutipINin2YTYqtiu2LLZitmGXHJcblxyXG4gIHNlbGVjdGVkRGF0ZTogbW9tZW50Lk1vbWVudCB8IG51bGwgPSBudWxsOyAvLyBDdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSAvINin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTsgLy8gVG8gY29udHJvbCB2aXNpYmlsaXR5IG9mIHRoZSBkYXRlcGlja2VyIHBvcHVwIC8g2KfZhNiq2K3Zg9mFINmB2Yog2KXYuNmH2KfYsSDYp9mE2KrZgtmI2YrZhVxyXG4gIHNob3dZZWFyUG9wdXA6IGJvb2xlYW4gPSBmYWxzZTsgIC8vINil2LbYp9mB2Kkg2KfZhNiu2KfYtdmK2Kkg2YfZhtinXHJcbiAgY3VycmVudFZpZXdEYXRlOiBtb21lbnQuTW9tZW50ID0gbW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTs7IC8vIEN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGggaW4gdGhlIHBvcHVwIC8g2KfZhNi02YfYsSDYp9mE2K3Yp9mE2Yog2KfZhNmF2LnYsdmI2LZcclxuICB0b2RheUJ0bjpzdHJpbmcgPSAn2KfZhNmK2YjZhSdcclxuICBvbkNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyBjaGFuZ2UgZXZlbnQgLyDZiNin2KzZh9ipINmE2YTYqti52KfZhdmEINmF2Lkg2KfZhNiq2LrZitmK2LHYp9iqINmB2YogUmVhY3RpdmUgRm9ybXNcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyB0b3VjaCBldmVudCAvINmI2KfYrNmH2Kkg2YTZhNiq2LnYp9mF2YQg2YXYuSDZhNmF2LPYqSDYp9mE2K3ZgtmEINmB2YogUmVhY3RpdmUgRm9ybXNcclxuXHJcbiAgLy8g2KPYs9mF2KfYoSDYp9mE2KPZitin2YUgKNin2K7Yqti12KfYsSlcclxuICAvLyBTaG9ydCBuYW1lcyBmb3IgZGF5cyBvZiB0aGUgd2Vla1xyXG4gIC8vIEdldHRlciDZhNiq2K3Yr9mK2K8g2KPYs9mF2KfYoSDYp9mE2KPZitin2YUg2KjZhtin2KHZiyDYudmE2Ykg2KfZhNmE2LrYqVxyXG4gIGdldCBkYXlOYW1lc01pbigpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2NhbGUgPT09ICdhci1TQSdcclxuICAgICAgPyBbJ9itJywgJ9mGJywgJ9irJywgJ9ixJywgJ9iuJywgJ9isJywgJ9izJ10gIC8vINi52LHYqNmKXHJcbiAgICAgIDogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddOyAgLy8g2KXZhtis2YTZitiy2YpcclxuICB9XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAvLyAqKkluaXRpYWwgc2V0dXAgb24gY29tcG9uZW50IGxvYWQqKlxyXG4gIC8vICoq2KXYudiv2KfYryDZhdio2K/YptmKINi52YbYryDYqtit2YXZitmEINin2YTZhdmD2YjZhioqXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBtb21lbnQubG9jYWxlKHRoaXMubG9jYWxlKTsgIC8vINi22KjYtyBsb2NhbGUg2KjZhtin2KHZiyDYudmE2Ykg2KfZhNmE2LrYqSDYp9mE2YXYrtiq2KfYsdipXHJcbiAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh0aGlzLnZhbHVlLCB0aGlzLmRpc3BsYXlGb3JtYXQpLmxvY2FsZSh0aGlzLmxvY2FsZSk7OyAvLyBQYXJzZSB0aGUgaW5pdGlhbCB2YWx1ZSAvINiq2K3ZiNmK2YQg2KfZhNmC2YrZhdipINin2YTYo9mI2YTZitipINmE2KrYp9ix2YrYrlxyXG4gICAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCk7IC8vIFNldCB0aGUgdmlldyBkYXRlIHRvIHRoZSBzZWxlY3RlZCBkYXRlIC8g2LnYsdi2INin2YTYtNmH2LEg2KfZhNiu2KfYtSDYqNin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmxvY2FsZSA9PSAnZW4nKVxyXG4gICAgICB0aGlzLnRvZGF5QnRuID0gJ1RvZGF5J1xyXG4gIH1cclxuICAvLyDYpdiw2Kcg2YTZhSDZitiq2YUg2KrZhdix2YrYsSBgc3RvcmFnZUZvcm1hdGAg2YXZhiDYp9mE2YXYs9iq2K7Yr9mF2Iwg2YbYs9iq2K7Yr9mFIGBkaXNwbGF5Rm9ybWF0YCDZg9mC2YrZhdipINin2YHYqtix2KfYttmK2KlcclxuICBnZXQgcmVzb2x2ZWRTdG9yYWdlRm9ybWF0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlRm9ybWF0IHx8IHRoaXMuZGlzcGxheUZvcm1hdDtcclxuICB9XHJcbiAgLy8gKipQcm9wZXJ0eTogRGlzcGxheSB0aGUgY3VycmVudCBtb250aCdzIG5hbWUgaW4gSGlqcmkgZm9ybWF0KipcclxuICAvLyAqKtiu2KfYtdmK2Kk6INi52LHYtiDYp9iz2YUg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2Yog2KjYp9mE2KrZhtiz2YrZgiDYp9mE2YfYrNix2YoqKlxyXG4gIGdldCBjdXJyZW50TW9udGhOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Vmlld0RhdGUubG9jYWxlKHRoaXMubG9jYWxlKS5mb3JtYXQoJ2lNTU1NIGlZWVlZJyk7IC8vIEZvcm1hdCB0aGUgY3VycmVudCBtb250aCAvINi12YrYutipINin2LPZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZilxyXG4gIH1cclxuXHJcbiAgLy8gKipQcm9wZXJ0eTogQ2FsY3VsYXRlIGFuZCByZXR1cm4gZGF5cyBvZiB0aGUgY3VycmVudCBtb250aCoqXHJcbiAgLy8gKirYrtin2LXZitipOiDYrdiz2KfYqCDZiNil2LHYrNin2Lkg2KPZitin2YUg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2YoqKlxyXG4gIGdldCBkYXlzSW5DdXJyZW50TW9udGgoKTogYW55W10ge1xyXG4gICAgY29uc3Qgc3RhcnRPZk1vbnRoID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5zdGFydE9mKCdpTW9udGgnKTsgLy8gU3RhcnQgb2YgdGhlIG1vbnRoIC8g2KjYr9in2YrYqSDYp9mE2LTZh9ixXHJcbiAgICBjb25zdCBlbmRPZk1vbnRoID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5lbmRPZignaU1vbnRoJyk7IC8vIEVuZCBvZiB0aGUgbW9udGggLyDZhtmH2KfZitipINin2YTYtNmH2LFcclxuXHJcbiAgICBjb25zdCBkYXlzID0gW107XHJcbiAgICBjb25zdCBzdGFydERheU9mV2VlayA9IHN0YXJ0T2ZNb250aC5kYXkoKTsgLy8gVGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGggaW4gdGhlIHdlZWsgLyDYp9mE2YrZiNmFINin2YTYo9mI2YQg2YXZhiDYp9mE2LTZh9ixXHJcblxyXG4gICAgLy8gQWRkIGVtcHR5IHNsb3RzIGZvciBwcmV2aW91cyBtb250aCdzIGRheXNcclxuICAgIC8vINil2LbYp9mB2Kkg2YHYsdin2LrYp9iqINmE2YTYo9mK2KfZhSDYp9mE2KrZiiDYqtiz2KjZgiDYp9mE2LTZh9ixINin2YTYrdin2YTZilxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydERheU9mV2VlazsgaSsrKSB7XHJcbiAgICAgIGRheXMucHVzaChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYWN0dWFsIGRheXMgb2YgdGhlIGN1cnJlbnQgbW9udGhcclxuICAgIC8vINil2LbYp9mB2Kkg2KfZhNij2YrYp9mFINin2YTZgdi52YTZitipINmE2YTYtNmH2LEg2KfZhNit2KfZhNmKXHJcbiAgICBjb25zdCB0b3RhbERheXMgPSBlbmRPZk1vbnRoLmlEYXRlKCk7XHJcbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSB0b3RhbERheXM7IGQrKykge1xyXG4gICAgICBkYXlzLnB1c2goc3RhcnRPZk1vbnRoLmNsb25lKCkuaURhdGUoZCkubG9jYWxlKHRoaXMubG9jYWxlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRheXM7XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogTmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIG1vbnRoKipcclxuICAvLyAqKti32LHZitmC2Kk6INin2YTYp9mG2KrZgtin2YQg2KXZhNmJINin2YTYtNmH2LEg2KfZhNiz2KfYqNmCKipcclxuICBwcmV2TW9udGgoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuY3VycmVudFZpZXdEYXRlLmNsb25lKCkuc3VidHJhY3QoMSwgJ2lNb250aCcpLmxvY2FsZSh0aGlzLmxvY2FsZSk7O1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IE5hdmlnYXRlIHRvIHRoZSBuZXh0IG1vbnRoKipcclxuICAvLyAqKti32LHZitmC2Kk6INin2YTYp9mG2KrZgtin2YQg2KXZhNmJINin2YTYtNmH2LEg2KfZhNiq2KfZhNmKKipcclxuICBuZXh0TW9udGgoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuY3VycmVudFZpZXdEYXRlLmNsb25lKCkuYWRkKDEsICdpTW9udGgnKS5sb2NhbGUodGhpcy5sb2NhbGUpOztcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBTZWxlY3QgYSBzcGVjaWZpYyBkYXRlKipcclxuICAvLyAqKti32LHZitmC2Kk6INin2K7YqtmK2KfYsSDYqtin2LHZitiuINmF2LnZitmGKipcclxuICBzZWxlY3REYXRlKGRheTogbW9tZW50Lk1vbWVudCB8IG51bGwpIHtcclxuICAgIGlmIChkYXkpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXkubG9jYWxlKHRoaXMubG9jYWxlKTtcclxuICAgICAgY29uc3Qgc3RvcmVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5sb2NhbGUodGhpcy5zdG9yYWdlTG9jYWxlKS5mb3JtYXQodGhpcy5yZXNvbHZlZFN0b3JhZ2VGb3JtYXQpOyAvLyDYp9mE2YLZitmF2Kkg2YTYqtiu2LLZitmG2YfYpyDZgdmKINmC2KfYudiv2Kkg2KfZhNio2YrYp9mG2KfYqlxyXG4gICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5sb2NhbGUodGhpcy5sb2NhbGUpLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpOyAvLyDYp9mE2YLZitmF2Kkg2YTYudix2LbZh9inXHJcblxyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHN0b3JlZFZhbHVlKTsgLy8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2KfZhNmF2K7YstmG2Kkg2KXZhNmJINin2YTZhtmF2YjYsNisXHJcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChzdG9yZWRWYWx1ZSk7IC8vINil2LHYs9in2YQg2KfZhNmC2YrZhdipINin2YTZhdiu2LLZhtipXHJcblxyXG4gICAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vINil2LrZhNin2YIg2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IFRvZ2dsZSB2aXNpYmlsaXR5IG9mIHRoZSBkYXRlcGlja2VyKipcclxuICAvLyAqKti32LHZitmC2Kk6INmB2KrYrS/Ypdi62YTYp9mCINin2YTYqtmC2YjZitmFKipcclxuICB0b2dnbGVEYXRlUGlja2VyKCkge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZVxyXG4gICAgICA/IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKVxyXG4gICAgICA6IG1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7IC8vIFNldCB0byBjdXJyZW50IGRhdGUgaWYgbm8gZGF0ZSBpcyBzZWxlY3RlZCAvINi52LHYtiDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYpdiw2Kcg2YTZhSDZitiq2YUg2KfYrtiq2YrYp9ixINiq2KfYsdmK2K5cclxuICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSAhdGhpcy5zaG93RGF0ZVBpY2tlcjsgLy8gVG9nZ2xlIHZpc2liaWxpdHkgLyDYqtio2K/ZitmEINin2YTYrdin2YTYqVxyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IENsb3NlIHRoZSBwb3B1cCB3aGVuIGNsaWNraW5nIG91dHNpZGUqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KXYutmE2KfZgiDYp9mE2KrZgtmI2YrZhSDYudmG2K8g2KfZhNmG2YLYsSDYrtin2LHYrCDYp9mE2YXZg9mI2YYqKlxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgb25Eb2N1bWVudENsaWNrKHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBjb25zdCBjbGlja2VkSW5zaWRlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0RWxlbWVudCk7IC8vIENoZWNrIGlmIGNsaWNrIGlzIGluc2lkZSAvINin2YTYqtit2YLZgiDYpdiw2Kcg2YPYp9mGINin2YTZhtmC2LEg2K/Yp9iu2YQg2KfZhNmF2YPZiNmGXHJcbiAgICBpZiAoIWNsaWNrZWRJbnNpZGUpIHtcclxuICAgICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyBDbG9zZSB0aGUgcG9wdXAgLyDYpdi62YTYp9mCINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vICoqUHJvcGVydHk6IERpc3BsYXkgdGhlIHNlbGVjdGVkIGRhdGUgaW4gdGhlIGlucHV0IGZpZWxkKipcclxuICAvLyAqKtiu2KfYtdmK2Kk6INi52LHYtiDYp9mE2KrYp9ix2YrYriDYp9mE2YXYrtiq2KfYsSDZgdmKINin2YTYrdmC2YQqKlxyXG4gIGdldCBkaXNwbGF5ZWREYXRlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZERhdGUgPyB0aGlzLnNlbGVjdGVkRGF0ZS5sb2NhbGUodGhpcy5sb2NhbGUpLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpIDogJyc7IC8vIERpc3BsYXkgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nIC8g2LnYsdi2INin2YTYqtin2LHZitiuINij2Ygg2KrYsdmD2Ycg2YHYp9ix2LrYp9mLXHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogU2VsZWN0IHRvZGF5J3MgZGF0ZSoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9iu2KrZitin2LEg2KrYp9ix2YrYriDYp9mE2YrZiNmFKipcclxuICBzZWxlY3RUb2RheSgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTsgLy8gU2V0IHRoZSBkYXRlIHRvIHRvZGF5IC8g2KrYudmK2YrZhiDYp9mE2KrYp9ix2YrYriDYpdmE2Ykg2KfZhNmK2YjZhVxyXG4gICAgY29uc3Qgc3RvcmVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5sb2NhbGUodGhpcy5zdG9yYWdlTG9jYWxlKS5mb3JtYXQodGhpcy5yZXNvbHZlZFN0b3JhZ2VGb3JtYXQpO1xyXG4gICAgY29uc3QgZGlzcGxheVZhbHVlID0gdGhpcy5zZWxlY3RlZERhdGUubG9jYWxlKHRoaXMuc3RvcmFnZUxvY2FsZSkuZm9ybWF0KHRoaXMuZGlzcGxheUZvcm1hdCk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHN0b3JlZFZhbHVlKTsgLy8gRW1pdCB0aGUgdmFsdWUgZm9yIFJlYWN0aXZlIEZvcm1zIC8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2KXZhNmJIFJlYWN0aXZlIEZvcm1zXHJcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoc3RvcmVkVmFsdWUpOyAvLyBFbWl0IHRoZSB2YWx1ZSBmb3Igc3RhbmRhbG9uZSB1c2FnZSAvINil2LHYs9in2YQg2KfZhNmC2YrZhdipINi52YbYryDYp9mE2KfYs9iq2K7Yr9in2YUg2KfZhNmB2LHYr9mKXHJcbiAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vIENsb3NlIHRoZSBwb3B1cCAvINil2LrZhNin2YIg2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gIH1cclxuXHJcbiAgLy8gKipDb250cm9sVmFsdWVBY2Nlc3NvcjogV3JpdGUgYSBuZXcgdmFsdWUqKlxyXG4gIC8vICoq2YjYp9is2YfYqTog2KrYudmK2YrZhiDZgtmK2YXYqSDYrNiv2YrYr9ipKipcclxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh2YWx1ZSwgdGhpcy5yZXNvbHZlZFN0b3JhZ2VGb3JtYXQpLmxvY2FsZSh0aGlzLmxvY2FsZSk7IC8vINiq2K3ZiNmK2YQg2KfZhNmC2YrZhdipINil2YTZiSDZhNit2LjYqSDYqNmG2KfYodmLINi52YTZiSDYp9mE2KrZhtiz2YrZglxyXG4gICAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCk7IC8vIFNldCB0aGUgY3VycmVudCB2aWV3IGRhdGUgLyDYqti52YrZitmGINi52LHYtiDYp9mE2LTZh9ixXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG51bGw7IC8vIENsZWFyIHRoZSBzZWxlY3RlZCBkYXRlIC8g2YXYs9itINin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAqKkNvbnRyb2xWYWx1ZUFjY2Vzc29yOiBSZWdpc3RlciBhIGNoYW5nZSBjYWxsYmFjayoqXHJcbiAgLy8gKirZiNin2KzZh9ipOiDYqtiz2KzZitmEINiv2KfZhNipINiq2LrZitmK2LEg2KfZhNmC2YrZhdipKipcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjsgLy8gU3RvcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIC8g2KrYrtiy2YrZhiDYr9in2YTYqSDYp9mE2KrYutmK2YrYsVxyXG4gIH1cclxuXHJcbiAgLy8gKipDb250cm9sVmFsdWVBY2Nlc3NvcjogUmVnaXN0ZXIgYSB0b3VjaGVkIGNhbGxiYWNrKipcclxuICAvLyAqKtmI2KfYrNmH2Kk6INiq2LPYrNmK2YQg2K/Yp9mE2Kkg2KfZhNmE2YXYsyoqXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjsgLy8gU3RvcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIC8g2KrYrtiy2YrZhiDYr9in2YTYqSDYp9mE2YTZhdizXHJcbiAgfVxyXG5cclxuICB0b2dnbGVZZWFyUG9wdXAoKSB7XHJcbiAgICB0aGlzLnNob3dZZWFyUG9wdXAgPSAhdGhpcy5zaG93WWVhclBvcHVwO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0WWVhcih5ZWFyOiBudW1iZXIpIHtcclxuICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5pWWVhcih5ZWFyKTtcclxuICAgIHRoaXMuc2hvd1llYXJQb3B1cCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhpanJpWWVhcnMoKTogbnVtYmVyW10ge1xyXG4gICAgY29uc3QgY3VycmVudFllYXIgPSBtb21lbnQoKS5pWWVhcigpO1xyXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gY3VycmVudFllYXIgLSA1MDtcclxuICAgIGNvbnN0IGVuZFllYXIgPSBjdXJyZW50WWVhciArIDUwO1xyXG5cclxuICAgIGNvbnN0IHllYXJzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gc3RhcnRZZWFyOyBpIDw9IGVuZFllYXI7IGkrKykge1xyXG4gICAgICB5ZWFycy5wdXNoKGkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHllYXJzO1xyXG4gIH1cclxuXHJcbn1cclxuIl19