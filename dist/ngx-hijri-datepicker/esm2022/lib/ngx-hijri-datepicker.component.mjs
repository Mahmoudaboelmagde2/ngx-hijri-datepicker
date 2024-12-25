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
        this.currentViewDate = moment(this.currentViewDate).iYear(year); // تحديث باستخدام moment مباشرة
        this.selectedDate = this.currentViewDate.clone(); // تحديث التاريخ المختار أيضًا
        this.showYearPopup = false;
        this.onChange(this.selectedDate.format('iYYYY/iM/iD')); // إرسال التغيير إلى الـ formControl
    }
    get hijriYears() {
        const currentYear = moment().iYear();
        const startYear = currentYear - 1446;
        const endYear = currentYear + 100;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhpanJpLWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWhpanJpLWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtaGlqcmktZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLE1BQU0sTUFBTSxjQUFjLENBQUM7OztBQXFVbEMsTUFBTSxPQUFPLDJCQUEyQjtJQXFDbEI7SUFwQ3BCLHNEQUFzRDtJQUN0RCx5Q0FBeUM7SUFDaEMsS0FBSyxHQUFrQixJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7SUFDakUsV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDLENBQUMseURBQXlEO0lBRTFILFdBQVcsR0FBVyxpQkFBaUIsQ0FBQyxDQUFDLDBDQUEwQztJQUNuRixLQUFLLEdBQVcsT0FBTyxDQUFDLENBQUMsdUNBQXVDO0lBQ2hFLE1BQU0sR0FBVyxNQUFNLENBQUMsQ0FBQywyQ0FBMkM7SUFDcEUsVUFBVSxHQUFrQixJQUFJLENBQUMsQ0FBQyx1Q0FBdUM7SUFDekUsb0JBQW9CLEdBQWlCLElBQUksQ0FBQyxDQUFDLDJDQUEyQztJQUN0RixTQUFTLEdBQWlCLElBQUksQ0FBQyxDQUFDLDRCQUE0QjtJQUM1RCxtQkFBbUIsR0FBaUIsSUFBSSxDQUFDLENBQUMsNkNBQTZDO0lBQ3ZGLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQzlFLFdBQVcsR0FBaUIsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQ2xGLDBCQUEwQixHQUFpQixJQUFJLENBQUMsQ0FBQyx5REFB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzSlgsYUFvS1E7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsNEJBQTRCLENBQUM7NEJBQzFELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOytFQUtVLEtBQUs7c0JBQWIsS0FBSztnQkFDSSxXQUFXO3NCQUFwQixNQUFNO2dCQUVFLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkF5R04sZUFBZTtzQkFEZCxZQUFZO3VCQUFDLGdCQUFnQixFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIE9uSW5pdCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC1oaWpyaSc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWhpanJpLWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlOiAgIGBcclxuPGRpdlxyXG4gIGNsYXNzPVwiaGlqcmktZGF0ZXBpY2tlci1jb250YWluZXJcIlxyXG4gIFtuZ1N0eWxlXT1cIntcclxuICAgIHdpZHRoOiB3aWR0aCxcclxuICB9XCJcclxuPlxyXG4gIDwhLS0g2K3ZgtmEINin2YTYpdiv2K7Yp9mEIC0tPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwiaW5wdXQtc3ZnLXdyYXBwZXJcIlxyXG4gICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxufVwiXHJcbiAgPlxyXG4gICAgPGlucHV0XHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgW3ZhbHVlXT1cImRpc3BsYXllZERhdGVcIlxyXG4gICAgICAoY2xpY2spPVwidG9nZ2xlRGF0ZVBpY2tlcigpXCJcclxuICAgICAgcmVhZG9ubHlcclxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgICAgY2xhc3M9XCJkYXRlcGlja2VyLWlucHV0XCJcclxuICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBib3JkZXJDb2xvcjogQm9yZGVyQ29sb3IsXHJcbiAgICAgICAgY29sb3I6IElucHV0Q29sb3IsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBJbnB1dEJhY2tncm91bmRDb2xvclxyXG4gICAgICB9XCJcclxuICAgIC8+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiaWNvbkNsZW5kZXJcIlxyXG4gICAgICAoY2xpY2spPVwidG9nZ2xlRGF0ZVBpY2tlcigpXCJcclxuICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogSWNvbkJhY2tncm91bmRDb2xvclxyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgICAgPHN2Z1xyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiSWNvbkNvbG9yXCJcclxuICAgICAgICB2ZXJzaW9uPVwiMS4xXCJcclxuICAgICAgICBpZD1cIkNhcGFfMVwiXHJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcclxuICAgICAgICB2aWV3Qm94PVwiMCAwIDYxMC4zOTggNjEwLjM5OFwiXHJcbiAgICAgICAgY2xhc3M9XCJkYXRlcGlja2VyLWljb25cIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGc+XHJcbiAgICAgICAgICA8Zz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE1OS41NjcsMGgtMTUuMzI5Yy0xLjk1NiwwLTMuODExLDAuNDExLTUuNjA4LDAuOTk1Yy04Ljk3OSwyLjkxMi0xNS42MTYsMTIuNDk4LTE1LjYxNiwyMy45OTd2MTAuNTUydjI3LjAwOXYxNC4wNTJcclxuICAgICAgICAgICAgICAgYzAsMi42MTEsMC40MzUsNS4wNzgsMS4wNjYsNy40NGMyLjcwMiwxMC4xNDYsMTAuNjUzLDE3LjU1MiwyMC4xNTgsMTcuNTUyaDE1LjMyOWMxMS43MjQsMCwyMS4yMjQtMTEuMTg4LDIxLjIyNC0yNC45OTJWNjIuNTUzXHJcbiAgICAgICAgICAgICAgIFYzNS41NDRWMjQuOTkyQzE4MC43OTEsMTEuMTg4LDE3MS4yOTEsMCwxNTkuNTY3LDB6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTQ2MS4yODgsMGgtMTUuMzI5Yy0xMS43MjQsMC0yMS4yMjQsMTEuMTg4LTIxLjIyNCwyNC45OTJ2MTAuNTUydjI3LjAwOXYxNC4wNTJjMCwxMy44MDQsOS41LDI0Ljk5MiwyMS4yMjQsMjQuOTkyXHJcbiAgICAgICAgICAgICAgIGgxNS4zMjljMTEuNzI0LDAsMjEuMjI0LTExLjE4OCwyMS4yMjQtMjQuOTkyVjYyLjU1M1YzNS41NDRWMjQuOTkyQzQ4Mi41MDcsMTEuMTg4LDQ3My4wMDcsMCw0NjEuMjg4LDB6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTUzOS41ODYsNjIuNTUzaC0zNy45NTR2MTQuMDUyYzAsMjQuMzI3LTE4LjEwMiw0NC4xMTctNDAuMzQ5LDQ0LjExN2gtMTUuMzI5Yy0yMi4yNDcsMC00MC4zNDktMTkuNzktNDAuMzQ5LTQ0LjExN1xyXG4gICAgICAgICAgICAgICBWNjIuNTUzSDE5OS45MTZ2MTQuMDUyYzAsMjQuMzI3LTE4LjEwMiw0NC4xMTctNDAuMzQ5LDQ0LjExN2gtMTUuMzI5Yy0yMi4yNDgsMC00MC4zNDktMTkuNzktNDAuMzQ5LTQ0LjExN1Y2Mi41NTNINzAuODE4XHJcbiAgICAgICAgICAgICAgIGMtMjEuMDY2LDAtMzguMTUsMTYuMDE3LTM4LjE1LDM1Ljc2NHY0NzYuMzE4YzAsMTkuNzg0LDE3LjA4MywzNS43NjQsMzguMTUsMzUuNzY0aDQ2OC43NjNjMjEuMDg1LDAsMzguMTQ5LTE1Ljk4NCwzOC4xNDktMzUuNzY0XHJcbiAgICAgICAgICAgICAgIFY5OC4zMjJDNTc3LjczNSw3OC41NzUsNTYwLjY3MSw2Mi41NTMsNTM5LjU4Niw2Mi41NTN6IE01MjcuNzU3LDU1Ny45bC00NDYuNTAyLTAuMTcyVjE3My43MTdoNDQ2LjUwMlY1NTcuOXpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNywyNjYuMjU4aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE3OSwxOC40MzctMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM3LTIyLjc1OUgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzMzNC41OCwyNTYuMDc0LDM0Mi44MjMsMjY2LjI1OCwzNTMuMDE3LDI2Ni4yNTh6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsMzQ4LjQ2N2gxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xNzksMTguNDM3LTIyLjc1OWMwLTEyLjU3OS04LjI0OC0yMi43NTgtMTguNDM3LTIyLjc1OEgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU4QzMzNC41OCwzMzguMjg4LDM0Mi44MjMsMzQ4LjQ2NywzNTMuMDE3LDM0OC40Njd6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsNDMwLjY3NmgxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xOCwxOC40MzctMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM3LTIyLjc1OUgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE4LTE4LjQzNywyMi43NTlTMzQyLjgyMyw0MzAuNjc2LDM1My4wMTcsNDMwLjY3NnpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNyw1MTIuODloMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTgsMTguNDM3LTIyLjc1OWMwLTEyLjU4LTguMjQ4LTIyLjc1OS0xOC40MzctMjIuNzU5SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMzM0LjU4LDUwMi43MSwzNDIuODIzLDUxMi44OSwzNTMuMDE3LDUxMi44OXpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiwyNjYuMjU4SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTc5LDE4LjQzNi0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzYtMjIuNzU5SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMTI2LjU5NiwyNTYuMDc0LDEzNC44MzgsMjY2LjI1OCwxNDUuMDMyLDI2Ni4yNTh6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsMzQ4LjQ2N0gyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE3OSwxOC40MzYtMjIuNzU5YzAtMTIuNTc5LTguMjQ4LTIyLjc1OC0xOC40MzYtMjIuNzU4SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NThDMTI2LjU5NiwzMzguMjg4LDEzNC44MzgsMzQ4LjQ2NywxNDUuMDMyLDM0OC40Njd6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsNDMwLjY3NkgyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE4LDE4LjQzNi0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzYtMjIuNzU5SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTgtMTguNDM3LDIyLjc1OVMxMzQuODM4LDQzMC42NzYsMTQ1LjAzMiw0MzAuNjc2elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDUxMi44OUgyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE4LDE4LjQzNi0yMi43NTljMC0xMi41OC04LjI0OC0yMi43NTktMTguNDM2LTIyLjc1OUgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzEyNi41OTYsNTAyLjcxLDEzNC44MzgsNTEyLjg5LDE0NS4wMzIsNTEyLjg5elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2c+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0g2KfZhNiq2YLZiNmK2YUgLS0+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJkYXRlcGlja2VyLXBvcHVwXCJcclxuICAgIFtjbGFzcy5vcGVuXT1cInNob3dEYXRlUGlja2VyXCJcclxuICAgIFtjbGFzcy5jbG9zZWRdPVwiIXNob3dEYXRlUGlja2VyXCJcclxuICAgIFtuZ1N0eWxlXT1cIntcclxuICAgIGJvcmRlckNvbG9yOiBCb3JkZXJDb2xvclxyXG4gICAgICB9XCJcclxuICA+XHJcbiAgICA8IS0tINi52YbZiNin2YYg2KfZhNi02YfYsSDZiNij2LLYsdin2LEg2KfZhNiq2YbZgtmEIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgICA8YSAoY2xpY2spPVwicHJldk1vbnRoKClcIj4mbHQ7PC9hPlxyXG4gICAgICA8c3BhbiAoY2xpY2spPVwidG9nZ2xlWWVhclBvcHVwKClcIiAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBjb2xvcjogRGF5Q29sb3JcclxuICAgICAgfVwiPnt7IGN1cnJlbnRNb250aE5hbWUgfX08L3NwYW4+XHJcbiAgICAgIDxhIChjbGljayk9XCJuZXh0TW9udGgoKVwiPiZndDs8L2E+XHJcbiAgICA8L2Rpdj5cclxuPCEtLSBQb3B1cCDZhNin2K7YqtmK2KfYsSDYp9mE2LPZhtipIC0tPlxyXG48ZGl2IGNsYXNzPVwieWVhci1wb3B1cFwiICpuZ0lmPVwic2hvd1llYXJQb3B1cFwiPlxyXG4gIDxkaXYgY2xhc3M9XCJ5ZWFyLWxpc3RcIj5cclxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHllYXIgb2YgaGlqcmlZZWFyc1wiIChjbGljayk9XCJzZWxlY3RZZWFyKHllYXIpXCI+XHJcbiAgICAgIHt7IHllYXIgfX1cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuICAgIDwhLS0g2KPYs9mF2KfYoSDYo9mK2KfZhSDYp9mE2KPYs9io2YjYuSAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJ3ZWVrZGF5c1wiPlxyXG4gICAgICA8ZGl2ICAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBjb2xvcjogRGF0ZXBpY2tlclBvcHVwSGVhZGVyQ29sb3JcclxuICAgICAgfVwiICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5TmFtZXNNaW5cIiBjbGFzcz1cIndlZWtkYXlcIj57eyBkYXkgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0g2LnYsdi2INij2YrYp9mFINin2YTYtNmH2LEgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGF5c1wiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzSW5DdXJyZW50TW9udGhcIlxyXG4gICAgICAgIGNsYXNzPVwiZGF5XCJcclxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic2VsZWN0ZWREYXRlICYmIGRheT8uaXNTYW1lKHNlbGVjdGVkRGF0ZSwgJ2RheScpXCJcclxuICAgICAgICAoY2xpY2spPVwic2VsZWN0RGF0ZShkYXkpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiZGF5XCI+e3sgZGF5LmlEYXRlKCkgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSDYstixINmE2KrYrdiv2YrYryDYp9mE2YrZiNmFINin2YTYrdin2YTZiiAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b2RheS1idXR0b25cIj5cclxuICAgICAgPGEgKGNsaWNrKT1cInNlbGVjdFRvZGF5KClcIlxyXG4gICAgICA+e3t0b2RheUJ0bn19PC9hPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuICBgLFxyXG4gIHN0eWxlczogYFxyXG4gIC55ZWFyLXBvcHVwIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA0MHB4O1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB6LWluZGV4OiAxMDAwO1xyXG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbi55ZWFyLWxpc3QgZGl2IHtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzO1xyXG59XHJcblxyXG4ueWVhci1saXN0IGRpdjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwN2JmZik7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4gIC5oaWpyaS1kYXRlcGlja2VyLWNvbnRhaW5lciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgfVxyXG5cclxuICAuaW5wdXQtc3ZnLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IC8qINmE2YXYrdin2LDYp9ipINin2YTZhdit2KrZiNmJINi52YXZiNiv2YrZi9inICovXHJcbiAgICB3aWR0aDogMTAwJTsgLyog2YbZgdizINi52LHYtiDYp9mE2K3Yp9mI2YrYqSAqL1xyXG4gIH1cclxuXHJcbiAgLmljb25DbGVuZGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIHBhZGRpbmc6IDE0LjVweDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1pbnB1dCB7XHJcbiAgICBmbGV4OiAxOyAvKiDZitij2K7YsCDYp9mE2KXYr9iu2KfZhCDZg9in2YXZhCDYp9mE2LnYsdi2INin2YTZhdiq2KjZgtmKICovXHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4zcyBlYXNlLWluLW91dDtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLWlucHV0OmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmU7IC8qINil2LLYp9mE2Kkg2KfZhNil2LfYp9ixINin2YTYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBib3gtc2hhZG93OiAwIDAgNHB4IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYqtij2KvZitixINiu2YHZitmBINi52YbYryDYp9mE2KrYsdmD2YrYsiAqL1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItaWNvbiB7XHJcbiAgICB3aWR0aDogMTVweDsgLyog2YrZhdmD2YYg2LbYqNi3INin2YTYrdis2YUg2K3Ys9ioINin2YTYrdin2KzYqSAqL1xyXG4gICAgaGVpZ2h0OiAxNXB4OyAvKiDZhtmB2LMg2KfYsdiq2YHYp9i5INin2YTYpdiv2K7Yp9mEICovXHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1wb3B1cCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDEwMCU7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgei1pbmRleDogMTAwMDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMCk7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3A7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLXBvcHVwLm9wZW4ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItcG9wdXAuY2xvc2VkIHtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwKTtcclxuICB9XHJcblxyXG4gIC5oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgfVxyXG5cclxuICAuaGVhZGVyIGEge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLndlZWtkYXlzLFxyXG4gIC5kYXlzIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLndlZWtkYXkge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gIH1cclxuXHJcbiAgLmRheSB7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MsIGNvbG9yIDAuM3M7XHJcbiAgfVxyXG5cclxuICAuZGF5OmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuXHJcbiAgLmRheS5zZWxlY3RlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcblxyXG4gIC50b2RheS1idXR0b24ge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAudG9kYXktYnV0dG9uIGEge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICBjb2xvcjogIzAwMDtcclxuICB9XHJcblxyXG4gIC50b2RheS1idXR0b24gYTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2YTZhNmI2YYg2KfZhNin2YHYqtix2KfYttmKICovXHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuXHJcbiAgYCxcclxuXHJcbnByb3ZpZGVyczogW1xyXG4gIHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4SGlqcmlEYXRlcGlja2VyQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gIH0sXHJcbl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIaWpyaURhdGVwaWNrZXJDb21wb25lbnQge1xyXG4gIC8vIElucHV0IHByb3BlcnRpZXMgdG8gYWxsb3cgY3VzdG9taXphdGlvbiBieSB0aGUgdXNlclxyXG4gIC8vINin2YTZhdiv2K7ZhNin2Kog2YTYqtiu2LXZiti1INin2YTZhdmD2YjZhiDZhdmGINmC2KjZhCDYp9mE2YXYs9iq2K7Yr9mFXHJcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsOyAvLyBUaGUgaW5pdGlhbCB2YWx1ZSAvINin2YTZgtmK2YXYqSDYp9mE2KPZiNmE2YrYqVxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTsgLy8gRW1pdHMgdmFsdWUgd2hlbiBpdCBjaGFuZ2VzIC8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2LnZhtivINin2YTYqti62YrZitixXHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAn2KfYrtiq2LEg2KrYp9ix2YrYriDZh9is2LHZiic7IC8vIFBsYWNlaG9sZGVyIHRleHQgLyDYp9mE2YbYtSDYp9mE2KfZgdiq2LHYp9i22Yog2YTZhNit2YLZhFxyXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmcgPSAnMjUwcHgnOyAvLyBXaWR0aCBvZiB0aGUgaW5wdXQgZmllbGQgLyDYudix2LYg2KfZhNit2YLZhFxyXG4gIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nID0gJzQwcHgnOyAvLyBIZWlnaHQgb2YgdGhlIGlucHV0IGZpZWxkIC8g2KfYsdiq2YHYp9i5INin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJbnB1dENvbG9yOiBzdHJpbmcgfCBudWxsID0gbnVsbDsgLy8gSW5wdXQgdGV4dCBjb2xvciAvINmE2YjZhiDYp9mE2YbYtSDZgdmKINin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJbnB1dEJhY2tncm91bmRDb2xvcjogc3RyaW5nIHwgbnVsbD0gbnVsbDsgLy8gSW5wdXQgYmFja2dyb3VuZCBjb2xvciAvINmE2YjZhiDYrtmE2YHZitipINin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJY29uQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIEljb24gY29sb3IgLyDZhNmI2YYg2KfZhNij2YrZgtmI2YbYqVxyXG4gIEBJbnB1dCgpIEljb25CYWNrZ3JvdW5kQ29sb3I6IHN0cmluZ3wgbnVsbCA9IG51bGw7IC8vIEljb24gYmFja2dyb3VuZCBjb2xvciAvINmE2YjZhiDYrtmE2YHZitipINin2YTYo9mK2YLZiNmG2KlcclxuICBASW5wdXQoKSBEYXlDb2xvcjogc3RyaW5nfCBudWxsPSBudWxsOyAvLyBEYXkgY29sb3IgaW4gY2FsZW5kYXIgLyDZhNmI2YYg2KfZhNij2YrYp9mFINmB2Yog2KfZhNiq2YLZiNmK2YVcclxuICBASW5wdXQoKSBCb3JkZXJDb2xvcjogc3RyaW5nIHwgbnVsbD0gbnVsbDsgLy8gQm9yZGVyIGNvbG9yIGZvciBpbnB1dCBhbmQgcG9wdXAgLyDZhNmI2YYg2KfZhNit2K/ZiNivXHJcbiAgQElucHV0KCkgRGF0ZXBpY2tlclBvcHVwSGVhZGVyQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIEhlYWRlciBjb2xvciBpbiB0aGUgcG9wdXAgLyDZhNmI2YYg2KfZhNix2KPYsyDZgdmKINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICBASW5wdXQoKSBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcgPSAnaVlZWVkvaU0vaUQnOyAvLyDYqtmG2LPZitmCINin2YTYqtin2LHZitiuINin2YTYp9mB2KrYsdin2LbZilxyXG4gIEBJbnB1dCgpIHN0b3JhZ2VGb3JtYXQ6IHN0cmluZyB8IG51bGwgPSBudWxsOyAvLyDYp9mE2KrZhtiz2YrZgiDYp9mE2YXYs9iq2K7Yr9mFINmE2YTYqtiu2LLZitmGICjYp9mB2KrYsdin2LbZitmL2Kcg2YrZg9mI2YYgbnVsbClcclxuICBASW5wdXQoKSBsb2NhbGU6ICdlbicgfCAnYXItU0EnID0gJ2FyLVNBJzsgIC8vINiu2YrYp9ixINmE2KfYrtiq2YrYp9ixINin2YTZhNi62KkgKNin2YHYqtix2KfYttmKOiDYudix2KjZiilcclxuICBASW5wdXQoKSBzdG9yYWdlTG9jYWxlOiAnZW4nIHwgJ2FyLVNBJyA9ICdlbic7ICAvLyDZhNi62Kkg2KfZhNiq2K7YstmK2YZcclxuXHJcbiAgc2VsZWN0ZWREYXRlOiBtb21lbnQuTW9tZW50IHwgbnVsbCA9IG51bGw7IC8vIEN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIC8g2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LFcclxuICBzaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyBUbyBjb250cm9sIHZpc2liaWxpdHkgb2YgdGhlIGRhdGVwaWNrZXIgcG9wdXAgLyDYp9mE2KrYrdmD2YUg2YHZiiDYpdi42YfYp9ixINin2YTYqtmC2YjZitmFXHJcbiAgc2hvd1llYXJQb3B1cDogYm9vbGVhbiA9IGZhbHNlOyAgLy8g2KXYttin2YHYqSDYp9mE2K7Yp9i12YrYqSDZh9mG2KdcclxuICBjdXJyZW50Vmlld0RhdGU6IG1vbWVudC5Nb21lbnQgPSBtb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpOzsgLy8gQ3VycmVudGx5IGRpc3BsYXllZCBtb250aCBpbiB0aGUgcG9wdXAgLyDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYp9mE2YXYudix2YjYtlxyXG4gIHRvZGF5QnRuOnN0cmluZyA9ICfYp9mE2YrZiNmFJ1xyXG4gIG9uQ2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHt9OyAvLyBQbGFjZWhvbGRlciBmb3IgUmVhY3RpdmUgRm9ybXMnIGNoYW5nZSBldmVudCAvINmI2KfYrNmH2Kkg2YTZhNiq2LnYp9mF2YQg2YXYuSDYp9mE2KrYutmK2YrYsdin2Kog2YHZiiBSZWFjdGl2ZSBGb3Jtc1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9OyAvLyBQbGFjZWhvbGRlciBmb3IgUmVhY3RpdmUgRm9ybXMnIHRvdWNoIGV2ZW50IC8g2YjYp9is2YfYqSDZhNmE2KrYudin2YXZhCDZhdi5INmE2YXYs9ipINin2YTYrdmC2YQg2YHZiiBSZWFjdGl2ZSBGb3Jtc1xyXG5cclxuICAvLyDYo9iz2YXYp9ihINin2YTYo9mK2KfZhSAo2KfYrtiq2LXYp9ixKVxyXG4gIC8vIFNob3J0IG5hbWVzIGZvciBkYXlzIG9mIHRoZSB3ZWVrXHJcbiAgLy8gR2V0dGVyINmE2KrYrdiv2YrYryDYo9iz2YXYp9ihINin2YTYo9mK2KfZhSDYqNmG2KfYodmLINi52YTZiSDYp9mE2YTYutipXHJcbiAgZ2V0IGRheU5hbWVzTWluKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLmxvY2FsZSA9PT0gJ2FyLVNBJ1xyXG4gICAgICA/IFsn2K0nLCAn2YYnLCAn2KsnLCAn2LEnLCAn2K4nLCAn2KwnLCAn2LMnXSAgLy8g2LnYsdio2YpcclxuICAgICAgOiBbJ1N1JywgJ01vJywgJ1R1JywgJ1dlJywgJ1RoJywgJ0ZyJywgJ1NhJ107ICAvLyDYpdmG2KzZhNmK2LLZilxyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIC8vICoqSW5pdGlhbCBzZXR1cCBvbiBjb21wb25lbnQgbG9hZCoqXHJcbiAgLy8gKirYpdi52K/Yp9ivINmF2KjYr9im2Yog2LnZhtivINiq2K3ZhdmK2YQg2KfZhNmF2YPZiNmGKipcclxuICBuZ09uSW5pdCgpIHtcclxuICAgIG1vbWVudC5sb2NhbGUodGhpcy5sb2NhbGUpOyAgLy8g2LbYqNi3IGxvY2FsZSDYqNmG2KfYodmLINi52YTZiSDYp9mE2YTYutipINin2YTZhdiu2KrYp9ix2KlcclxuICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbW9tZW50KHRoaXMudmFsdWUsIHRoaXMuZGlzcGxheUZvcm1hdCkubG9jYWxlKHRoaXMubG9jYWxlKTs7IC8vIFBhcnNlIHRoZSBpbml0aWFsIHZhbHVlIC8g2KrYrdmI2YrZhCDYp9mE2YLZitmF2Kkg2KfZhNij2YjZhNmK2Kkg2YTYqtin2LHZitiuXHJcbiAgICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5zZWxlY3RlZERhdGUuY2xvbmUoKTsgLy8gU2V0IHRoZSB2aWV3IGRhdGUgdG8gdGhlIHNlbGVjdGVkIGRhdGUgLyDYudix2LYg2KfZhNi02YfYsSDYp9mE2K7Yp9i1INio2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LFcclxuICAgIH1cclxuICAgIGlmKHRoaXMubG9jYWxlID09ICdlbicpXHJcbiAgICAgIHRoaXMudG9kYXlCdG4gPSAnVG9kYXknXHJcbiAgfVxyXG4gIC8vINil2LDYpyDZhNmFINmK2KrZhSDYqtmF2LHZitixIGBzdG9yYWdlRm9ybWF0YCDZhdmGINin2YTZhdiz2KrYrtiv2YXYjCDZhtiz2KrYrtiv2YUgYGRpc3BsYXlGb3JtYXRgINmD2YLZitmF2Kkg2KfZgdiq2LHYp9i22YrYqVxyXG4gIGdldCByZXNvbHZlZFN0b3JhZ2VGb3JtYXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VGb3JtYXQgfHwgdGhpcy5kaXNwbGF5Rm9ybWF0O1xyXG4gIH1cclxuICAvLyAqKlByb3BlcnR5OiBEaXNwbGF5IHRoZSBjdXJyZW50IG1vbnRoJ3MgbmFtZSBpbiBIaWpyaSBmb3JtYXQqKlxyXG4gIC8vICoq2K7Yp9i12YrYqTog2LnYsdi2INin2LPZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYqNin2YTYqtmG2LPZitmCINin2YTZh9is2LHZiioqXHJcbiAgZ2V0IGN1cnJlbnRNb250aE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5sb2NhbGUodGhpcy5sb2NhbGUpLmZvcm1hdCgnaU1NTU0gaVlZWVknKTsgLy8gRm9ybWF0IHRoZSBjdXJyZW50IG1vbnRoIC8g2LXZiti62Kkg2KfYs9mFINin2YTYtNmH2LEg2KfZhNit2KfZhNmKXHJcbiAgfVxyXG5cclxuICAvLyAqKlByb3BlcnR5OiBDYWxjdWxhdGUgYW5kIHJldHVybiBkYXlzIG9mIHRoZSBjdXJyZW50IG1vbnRoKipcclxuICAvLyAqKtiu2KfYtdmK2Kk6INit2LPYp9ioINmI2KXYsdis2KfYuSDYo9mK2KfZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZiioqXHJcbiAgZ2V0IGRheXNJbkN1cnJlbnRNb250aCgpOiBhbnlbXSB7XHJcbiAgICBjb25zdCBzdGFydE9mTW9udGggPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2lNb250aCcpOyAvLyBTdGFydCBvZiB0aGUgbW9udGggLyDYqNiv2KfZitipINin2YTYtNmH2LFcclxuICAgIGNvbnN0IGVuZE9mTW9udGggPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLmVuZE9mKCdpTW9udGgnKTsgLy8gRW5kIG9mIHRoZSBtb250aCAvINmG2YfYp9mK2Kkg2KfZhNi02YfYsVxyXG5cclxuICAgIGNvbnN0IGRheXMgPSBbXTtcclxuICAgIGNvbnN0IHN0YXJ0RGF5T2ZXZWVrID0gc3RhcnRPZk1vbnRoLmRheSgpOyAvLyBUaGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aCBpbiB0aGUgd2VlayAvINin2YTZitmI2YUg2KfZhNij2YjZhCDZhdmGINin2YTYtNmH2LFcclxuXHJcbiAgICAvLyBBZGQgZW1wdHkgc2xvdHMgZm9yIHByZXZpb3VzIG1vbnRoJ3MgZGF5c1xyXG4gICAgLy8g2KXYttin2YHYqSDZgdix2KfYutin2Kog2YTZhNij2YrYp9mFINin2YTYqtmKINiq2LPYqNmCINin2YTYtNmH2LEg2KfZhNit2KfZhNmKXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0RGF5T2ZXZWVrOyBpKyspIHtcclxuICAgICAgZGF5cy5wdXNoKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBhY3R1YWwgZGF5cyBvZiB0aGUgY3VycmVudCBtb250aFxyXG4gICAgLy8g2KXYttin2YHYqSDYp9mE2KPZitin2YUg2KfZhNmB2LnZhNmK2Kkg2YTZhNi02YfYsSDYp9mE2K3Yp9mE2YpcclxuICAgIGNvbnN0IHRvdGFsRGF5cyA9IGVuZE9mTW9udGguaURhdGUoKTtcclxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IHRvdGFsRGF5czsgZCsrKSB7XHJcbiAgICAgIGRheXMucHVzaChzdGFydE9mTW9udGguY2xvbmUoKS5pRGF0ZShkKS5sb2NhbGUodGhpcy5sb2NhbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF5cztcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBOYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgbW9udGgqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfZhNin2YbYqtmC2KfZhCDYpdmE2Ykg2KfZhNi02YfYsSDYp9mE2LPYp9io2YIqKlxyXG4gIHByZXZNb250aCgpIHtcclxuICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnaU1vbnRoJykubG9jYWxlKHRoaXMubG9jYWxlKTs7XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogTmF2aWdhdGUgdG8gdGhlIG5leHQgbW9udGgqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfZhNin2YbYqtmC2KfZhCDYpdmE2Ykg2KfZhNi02YfYsSDYp9mE2KrYp9mE2YoqKlxyXG4gIG5leHRNb250aCgpIHtcclxuICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5hZGQoMSwgJ2lNb250aCcpLmxvY2FsZSh0aGlzLmxvY2FsZSk7O1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IFNlbGVjdCBhIHNwZWNpZmljIGRhdGUqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfYrtiq2YrYp9ixINiq2KfYsdmK2K4g2YXYudmK2YYqKlxyXG4gIHNlbGVjdERhdGUoZGF5OiBtb21lbnQuTW9tZW50IHwgbnVsbCkge1xyXG4gICAgaWYgKGRheSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRheS5sb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gICAgICBjb25zdCBzdG9yZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmxvY2FsZSh0aGlzLnN0b3JhZ2VMb2NhbGUpLmZvcm1hdCh0aGlzLnJlc29sdmVkU3RvcmFnZUZvcm1hdCk7IC8vINin2YTZgtmK2YXYqSDZhNiq2K7YstmK2YbZh9inINmB2Yog2YLYp9i52K/YqSDYp9mE2KjZitin2YbYp9iqXHJcbiAgICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmxvY2FsZSh0aGlzLmxvY2FsZSkuZm9ybWF0KHRoaXMuZGlzcGxheUZvcm1hdCk7IC8vINin2YTZgtmK2YXYqSDZhNi52LHYttmH2KdcclxuXHJcbiAgICAgIHRoaXMub25DaGFuZ2Uoc3RvcmVkVmFsdWUpOyAvLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYp9mE2YXYrtiy2YbYqSDYpdmE2Ykg2KfZhNmG2YXZiNiw2KxcclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHN0b3JlZFZhbHVlKTsgLy8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2KfZhNmF2K7YstmG2KlcclxuXHJcbiAgICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTsgLy8g2KXYutmE2KfZgiDZhtin2YHYsNipINin2YTYqtmC2YjZitmFXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogVG9nZ2xlIHZpc2liaWxpdHkgb2YgdGhlIGRhdGVwaWNrZXIqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2YHYqtitL9il2LrZhNin2YIg2KfZhNiq2YLZiNmK2YUqKlxyXG4gIHRvZ2dsZURhdGVQaWNrZXIoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlXHJcbiAgICAgID8gdGhpcy5zZWxlY3RlZERhdGUuY2xvbmUoKS5sb2NhbGUodGhpcy5sb2NhbGUpXHJcbiAgICAgIDogbW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTsgLy8gU2V0IHRvIGN1cnJlbnQgZGF0ZSBpZiBubyBkYXRlIGlzIHNlbGVjdGVkIC8g2LnYsdi2INin2YTYtNmH2LEg2KfZhNit2KfZhNmKINil2LDYpyDZhNmFINmK2KrZhSDYp9iu2KrZitin2LEg2KrYp9ix2YrYrlxyXG4gICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9ICF0aGlzLnNob3dEYXRlUGlja2VyOyAvLyBUb2dnbGUgdmlzaWJpbGl0eSAvINiq2KjYr9mK2YQg2KfZhNit2KfZhNipXHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogQ2xvc2UgdGhlIHBvcHVwIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYpdi62YTYp9mCINin2YTYqtmC2YjZitmFINi52YbYryDYp9mE2YbZgtixINiu2KfYsdisINin2YTZhdmD2YjZhioqXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcclxuICBvbkRvY3VtZW50Q2xpY2sodGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGNsaWNrZWRJbnNpZGUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KTsgLy8gQ2hlY2sgaWYgY2xpY2sgaXMgaW5zaWRlIC8g2KfZhNiq2K3ZgtmCINil2LDYpyDZg9in2YYg2KfZhNmG2YLYsSDYr9in2K7ZhCDYp9mE2YXZg9mI2YZcclxuICAgIGlmICghY2xpY2tlZEluc2lkZSkge1xyXG4gICAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vIENsb3NlIHRoZSBwb3B1cCAvINil2LrZhNin2YIg2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gKipQcm9wZXJ0eTogRGlzcGxheSB0aGUgc2VsZWN0ZWQgZGF0ZSBpbiB0aGUgaW5wdXQgZmllbGQqKlxyXG4gIC8vICoq2K7Yp9i12YrYqTog2LnYsdi2INin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixINmB2Yog2KfZhNit2YLZhCoqXHJcbiAgZ2V0IGRpc3BsYXllZERhdGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZSA/IHRoaXMuc2VsZWN0ZWREYXRlLmxvY2FsZSh0aGlzLmxvY2FsZSkuZm9ybWF0KHRoaXMuZGlzcGxheUZvcm1hdCkgOiAnJzsgLy8gRGlzcGxheSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcgLyDYudix2LYg2KfZhNiq2KfYsdmK2K4g2KPZiCDYqtix2YPZhyDZgdin2LHYutin2YtcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBTZWxlY3QgdG9kYXkncyBkYXRlKipcclxuICAvLyAqKti32LHZitmC2Kk6INin2K7YqtmK2KfYsSDYqtin2LHZitiuINin2YTZitmI2YUqKlxyXG4gIHNlbGVjdFRvZGF5KCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZERhdGUgPSBtb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpOyAvLyBTZXQgdGhlIGRhdGUgdG8gdG9kYXkgLyDYqti52YrZitmGINin2YTYqtin2LHZitiuINil2YTZiSDYp9mE2YrZiNmFXHJcbiAgICBjb25zdCBzdG9yZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmxvY2FsZSh0aGlzLnN0b3JhZ2VMb2NhbGUpLmZvcm1hdCh0aGlzLnJlc29sdmVkU3RvcmFnZUZvcm1hdCk7XHJcbiAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5sb2NhbGUodGhpcy5zdG9yYWdlTG9jYWxlKS5mb3JtYXQodGhpcy5kaXNwbGF5Rm9ybWF0KTtcclxuICAgIHRoaXMub25DaGFuZ2Uoc3RvcmVkVmFsdWUpOyAvLyBFbWl0IHRoZSB2YWx1ZSBmb3IgUmVhY3RpdmUgRm9ybXMgLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYpdmE2YkgUmVhY3RpdmUgRm9ybXNcclxuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChzdG9yZWRWYWx1ZSk7IC8vIEVtaXQgdGhlIHZhbHVlIGZvciBzdGFuZGFsb25lIHVzYWdlIC8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2LnZhtivINin2YTYp9iz2KrYrtiv2KfZhSDYp9mE2YHYsdiv2YpcclxuICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTsgLy8gQ2xvc2UgdGhlIHBvcHVwIC8g2KXYutmE2KfZgiDZhtin2YHYsNipINin2YTYqtmC2YjZitmFXHJcbiAgfVxyXG5cclxuICAvLyAqKkNvbnRyb2xWYWx1ZUFjY2Vzc29yOiBXcml0ZSBhIG5ldyB2YWx1ZSoqXHJcbiAgLy8gKirZiNin2KzZh9ipOiDYqti52YrZitmGINmC2YrZhdipINis2K/Zitiv2KkqKlxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbW9tZW50KHZhbHVlLCB0aGlzLnJlc29sdmVkU3RvcmFnZUZvcm1hdCkubG9jYWxlKHRoaXMubG9jYWxlKTsgLy8g2KrYrdmI2YrZhCDYp9mE2YLZitmF2Kkg2KXZhNmJINmE2K3YuNipINio2YbYp9ih2Ysg2LnZhNmJINin2YTYqtmG2LPZitmCXHJcbiAgICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5zZWxlY3RlZERhdGUuY2xvbmUoKTsgLy8gU2V0IHRoZSBjdXJyZW50IHZpZXcgZGF0ZSAvINiq2LnZitmK2YYg2LnYsdi2INin2YTYtNmH2LFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbnVsbDsgLy8gQ2xlYXIgdGhlIHNlbGVjdGVkIGRhdGUgLyDZhdiz2K0g2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vICoqQ29udHJvbFZhbHVlQWNjZXNzb3I6IFJlZ2lzdGVyIGEgY2hhbmdlIGNhbGxiYWNrKipcclxuICAvLyAqKtmI2KfYrNmH2Kk6INiq2LPYrNmK2YQg2K/Yp9mE2Kkg2KrYutmK2YrYsSDYp9mE2YLZitmF2KkqKlxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuOyAvLyBTdG9yZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gLyDYqtiu2LLZitmGINiv2KfZhNipINin2YTYqti62YrZitixXHJcbiAgfVxyXG5cclxuICAvLyAqKkNvbnRyb2xWYWx1ZUFjY2Vzc29yOiBSZWdpc3RlciBhIHRvdWNoZWQgY2FsbGJhY2sqKlxyXG4gIC8vICoq2YjYp9is2YfYqTog2KrYs9is2YrZhCDYr9in2YTYqSDYp9mE2YTZhdizKipcclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuOyAvLyBTdG9yZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gLyDYqtiu2LLZitmGINiv2KfZhNipINin2YTZhNmF2LNcclxuICB9XHJcblxyXG4gIHRvZ2dsZVllYXJQb3B1cCgpIHtcclxuICAgIHRoaXMuc2hvd1llYXJQb3B1cCA9ICF0aGlzLnNob3dZZWFyUG9wdXA7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RZZWFyKHllYXI6IG51bWJlcikge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSBtb21lbnQodGhpcy5jdXJyZW50Vmlld0RhdGUpLmlZZWFyKHllYXIpOyAgLy8g2KrYrdiv2YrYqyDYqNin2LPYqtiu2K/Yp9mFIG1vbWVudCDZhdio2KfYtNix2KlcclxuICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKTsgIC8vINiq2K3Yr9mK2Ksg2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LEg2KPZiti22YvYp1xyXG4gICAgdGhpcy5zaG93WWVhclBvcHVwID0gZmFsc2U7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCgnaVlZWVkvaU0vaUQnKSk7ICAvLyDYpdix2LPYp9mEINin2YTYqti62YrZitixINil2YTZiSDYp9mE2YAgZm9ybUNvbnRyb2xcclxuICB9XHJcblxyXG5cclxuICBnZXQgaGlqcmlZZWFycygpOiBudW1iZXJbXSB7XHJcbiAgICBjb25zdCBjdXJyZW50WWVhciA9IG1vbWVudCgpLmlZZWFyKCk7XHJcbiAgICBjb25zdCBzdGFydFllYXIgPSBjdXJyZW50WWVhciAtIDE0NDY7XHJcbiAgICBjb25zdCBlbmRZZWFyID0gY3VycmVudFllYXIgKyAxMDA7XHJcblxyXG4gICAgY29uc3QgeWVhcnMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSBzdGFydFllYXI7IGkgPD0gZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgIHllYXJzLnB1c2goaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geWVhcnM7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=