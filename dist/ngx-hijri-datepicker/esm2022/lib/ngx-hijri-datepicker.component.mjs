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
    locale = 'ar'; // خيار لاختيار اللغة (افتراضي: عربي)
    selectedDate = null; // Currently selected date / التاريخ المختار
    showDatePicker = false; // To control visibility of the datepicker popup / التحكم في إظهار التقويم
    currentViewDate = moment().locale(this.locale);
    ; // Currently displayed month in the popup / الشهر الحالي المعروض
    onChange = (value) => { }; // Placeholder for Reactive Forms' change event / واجهة للتعامل مع التغييرات في Reactive Forms
    onTouched = () => { }; // Placeholder for Reactive Forms' touch event / واجهة للتعامل مع لمسة الحقل في Reactive Forms
    // أسماء الأيام (اختصار)
    // Short names for days of the week
    dayNamesMin = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    // **Initial setup on component load**
    // **إعداد مبدئي عند تحميل المكون**
    ngOnInit() {
        if (this.value) {
            this.selectedDate = moment(this.value, this.displayFormat).locale(this.locale);
            ; // Parse the initial value / تحويل القيمة الأولية لتاريخ
            this.currentViewDate = this.selectedDate.clone(); // Set the view date to the selected date / عرض الشهر الخاص بالتاريخ المختار
        }
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
            const storedValue = this.selectedDate.format(this.resolvedStorageFormat); // القيمة لتخزينها في قاعدة البيانات
            const displayValue = this.selectedDate.format(this.displayFormat); // القيمة لعرضها
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
            : moment(); // Set to current date if no date is selected / عرض الشهر الحالي إذا لم يتم اختيار تاريخ
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
        const storedValue = this.selectedDate.format(this.resolvedStorageFormat);
        const displayValue = this.selectedDate.format(this.displayFormat);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NgxHijriDatepickerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NgxHijriDatepickerComponent, selector: "lib-ngx-hijri-datepicker", inputs: { value: "value", placeholder: "placeholder", width: "width", height: "height", InputColor: "InputColor", InputBackgroundColor: "InputBackgroundColor", IconColor: "IconColor", IconBackgroundColor: "IconBackgroundColor", DayColor: "DayColor", BorderColor: "BorderColor", DatepickerPopupHeaderColor: "DatepickerPopupHeaderColor", displayFormat: "displayFormat", storageFormat: "storageFormat", locale: "locale" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "document:click": "onDocumentClick($event.target)" } }, providers: [
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
      <span   [ngStyle]="{
        color: DayColor
      }">{{ currentMonthName }}</span>
      <a (click)="nextMonth()">&gt;</a>
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
      >اليوم</a>
    </div>
  </div>
</div>

  `, isInline: true, styles: [".hijri-datepicker-container{position:relative;display:inline-block;width:250px}.input-svg-wrapper{display:flex;align-items:center;width:100%}.iconClender{background-color:var(--primary-color, #000);padding:14.5px;border-top-left-radius:4px;border-bottom-left-radius:4px;display:flex;justify-content:center;align-items:center;cursor:pointer}.datepicker-input{flex:1;padding:8px;font-size:14px;box-sizing:border-box;border:1px solid var(--primary-color, #000);border-top-right-radius:4px;border-bottom-right-radius:4px;transition:border-color .3s ease-in-out}.datepicker-input:focus{outline:none;border-color:var(--primary-color, #000);box-shadow:0 0 4px var(--primary-color, #000)}.datepicker-icon{width:15px;height:15px;cursor:pointer}.datepicker-popup{position:absolute;top:100%;left:0;z-index:1000;background:#fff;border:1px solid var(--primary-color, #000);box-shadow:0 4px 6px #0000001a;padding:10px;width:100%;opacity:0;transform:scaleY(0);transform-origin:top;transition:all .3s ease-in-out}.datepicker-popup.open{opacity:1;transform:scaleY(1)}.datepicker-popup.closed{opacity:0;transform:scaleY(0)}.header{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:700;color:var(--primary-color, #000)}.header a{cursor:pointer}.weekdays,.days{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}.weekday{font-weight:700;margin-bottom:5px;font-size:12px;color:var(--primary-color, #000)}.day{padding:5px;cursor:pointer;text-align:center;border-radius:4px;transition:background-color .3s,color .3s}.day:hover{background-color:var(--primary-color, #000);color:#fff}.day.selected{background-color:var(--primary-color, #000);color:#fff;font-weight:700}.today-button{text-align:left;margin-top:10px;border:none}.today-button a{cursor:pointer;padding:5px 10px;color:#000}.today-button a:hover{background-color:var(--primary-color, #000);border-radius:50px;color:#fff}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NgxHijriDatepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ngx-hijri-datepicker', template: `
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
      <span   [ngStyle]="{
        color: DayColor
      }">{{ currentMonthName }}</span>
      <a (click)="nextMonth()">&gt;</a>
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
      >اليوم</a>
    </div>
  </div>
</div>

  `, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxHijriDatepickerComponent),
                            multi: true,
                        },
                    ], styles: [".hijri-datepicker-container{position:relative;display:inline-block;width:250px}.input-svg-wrapper{display:flex;align-items:center;width:100%}.iconClender{background-color:var(--primary-color, #000);padding:14.5px;border-top-left-radius:4px;border-bottom-left-radius:4px;display:flex;justify-content:center;align-items:center;cursor:pointer}.datepicker-input{flex:1;padding:8px;font-size:14px;box-sizing:border-box;border:1px solid var(--primary-color, #000);border-top-right-radius:4px;border-bottom-right-radius:4px;transition:border-color .3s ease-in-out}.datepicker-input:focus{outline:none;border-color:var(--primary-color, #000);box-shadow:0 0 4px var(--primary-color, #000)}.datepicker-icon{width:15px;height:15px;cursor:pointer}.datepicker-popup{position:absolute;top:100%;left:0;z-index:1000;background:#fff;border:1px solid var(--primary-color, #000);box-shadow:0 4px 6px #0000001a;padding:10px;width:100%;opacity:0;transform:scaleY(0);transform-origin:top;transition:all .3s ease-in-out}.datepicker-popup.open{opacity:1;transform:scaleY(1)}.datepicker-popup.closed{opacity:0;transform:scaleY(0)}.header{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:700;color:var(--primary-color, #000)}.header a{cursor:pointer}.weekdays,.days{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}.weekday{font-weight:700;margin-bottom:5px;font-size:12px;color:var(--primary-color, #000)}.day{padding:5px;cursor:pointer;text-align:center;border-radius:4px;transition:background-color .3s,color .3s}.day:hover{background-color:var(--primary-color, #000);color:#fff}.day.selected{background-color:var(--primary-color, #000);color:#fff;font-weight:700}.today-button{text-align:left;margin-top:10px;border:none}.today-button a{cursor:pointer;padding:5px 10px;color:#000}.today-button a:hover{background-color:var(--primary-color, #000);border-radius:50px;color:#fff}\n"] }]
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
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhpanJpLWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWhpanJpLWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtaGlqcmktZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLE1BQU0sTUFBTSxjQUFjLENBQUM7OztBQW9TbEMsTUFBTSxPQUFPLDJCQUEyQjtJQStCbEI7SUE5QnBCLHNEQUFzRDtJQUN0RCx5Q0FBeUM7SUFDaEMsS0FBSyxHQUFrQixJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7SUFDakUsV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDLENBQUMseURBQXlEO0lBRTFILFdBQVcsR0FBVyxpQkFBaUIsQ0FBQyxDQUFDLDBDQUEwQztJQUNuRixLQUFLLEdBQVcsT0FBTyxDQUFDLENBQUMsdUNBQXVDO0lBQ2hFLE1BQU0sR0FBVyxNQUFNLENBQUMsQ0FBQywyQ0FBMkM7SUFDcEUsVUFBVSxHQUFrQixJQUFJLENBQUMsQ0FBQyx1Q0FBdUM7SUFDekUsb0JBQW9CLEdBQWlCLElBQUksQ0FBQyxDQUFDLDJDQUEyQztJQUN0RixTQUFTLEdBQWlCLElBQUksQ0FBQyxDQUFDLDRCQUE0QjtJQUM1RCxtQkFBbUIsR0FBaUIsSUFBSSxDQUFDLENBQUMsNkNBQTZDO0lBQ3ZGLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQzlFLFdBQVcsR0FBaUIsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQ2xGLDBCQUEwQixHQUFpQixJQUFJLENBQUMsQ0FBQyx5REFB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O2dCQUNHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQWlHTixlQUFlO3NCQURkLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgT25Jbml0LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LWhpanJpJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItbmd4LWhpanJpLWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlOiAgIGBcclxuPGRpdlxyXG4gIGNsYXNzPVwiaGlqcmktZGF0ZXBpY2tlci1jb250YWluZXJcIlxyXG4gIFtuZ1N0eWxlXT1cIntcclxuICAgIHdpZHRoOiB3aWR0aCxcclxuICB9XCJcclxuPlxyXG4gIDwhLS0g2K3ZgtmEINin2YTYpdiv2K7Yp9mEIC0tPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwiaW5wdXQtc3ZnLXdyYXBwZXJcIlxyXG4gICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxufVwiXHJcbiAgPlxyXG4gICAgPGlucHV0XHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgW3ZhbHVlXT1cImRpc3BsYXllZERhdGVcIlxyXG4gICAgICAoY2xpY2spPVwidG9nZ2xlRGF0ZVBpY2tlcigpXCJcclxuICAgICAgcmVhZG9ubHlcclxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgICAgY2xhc3M9XCJkYXRlcGlja2VyLWlucHV0XCJcclxuICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBib3JkZXJDb2xvcjogQm9yZGVyQ29sb3IsXHJcbiAgICAgICAgY29sb3I6IElucHV0Q29sb3IsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBJbnB1dEJhY2tncm91bmRDb2xvclxyXG4gICAgICB9XCJcclxuICAgIC8+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiaWNvbkNsZW5kZXJcIlxyXG4gICAgICAoY2xpY2spPVwidG9nZ2xlRGF0ZVBpY2tlcigpXCJcclxuICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogSWNvbkJhY2tncm91bmRDb2xvclxyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgICAgPHN2Z1xyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiSWNvbkNvbG9yXCJcclxuICAgICAgICB2ZXJzaW9uPVwiMS4xXCJcclxuICAgICAgICBpZD1cIkNhcGFfMVwiXHJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcclxuICAgICAgICB2aWV3Qm94PVwiMCAwIDYxMC4zOTggNjEwLjM5OFwiXHJcbiAgICAgICAgY2xhc3M9XCJkYXRlcGlja2VyLWljb25cIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGc+XHJcbiAgICAgICAgICA8Zz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE1OS41NjcsMGgtMTUuMzI5Yy0xLjk1NiwwLTMuODExLDAuNDExLTUuNjA4LDAuOTk1Yy04Ljk3OSwyLjkxMi0xNS42MTYsMTIuNDk4LTE1LjYxNiwyMy45OTd2MTAuNTUydjI3LjAwOXYxNC4wNTJcclxuICAgICAgICAgICAgICAgYzAsMi42MTEsMC40MzUsNS4wNzgsMS4wNjYsNy40NGMyLjcwMiwxMC4xNDYsMTAuNjUzLDE3LjU1MiwyMC4xNTgsMTcuNTUyaDE1LjMyOWMxMS43MjQsMCwyMS4yMjQtMTEuMTg4LDIxLjIyNC0yNC45OTJWNjIuNTUzXHJcbiAgICAgICAgICAgICAgIFYzNS41NDRWMjQuOTkyQzE4MC43OTEsMTEuMTg4LDE3MS4yOTEsMCwxNTkuNTY3LDB6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTQ2MS4yODgsMGgtMTUuMzI5Yy0xMS43MjQsMC0yMS4yMjQsMTEuMTg4LTIxLjIyNCwyNC45OTJ2MTAuNTUydjI3LjAwOXYxNC4wNTJjMCwxMy44MDQsOS41LDI0Ljk5MiwyMS4yMjQsMjQuOTkyXHJcbiAgICAgICAgICAgICAgIGgxNS4zMjljMTEuNzI0LDAsMjEuMjI0LTExLjE4OCwyMS4yMjQtMjQuOTkyVjYyLjU1M1YzNS41NDRWMjQuOTkyQzQ4Mi41MDcsMTEuMTg4LDQ3My4wMDcsMCw0NjEuMjg4LDB6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTUzOS41ODYsNjIuNTUzaC0zNy45NTR2MTQuMDUyYzAsMjQuMzI3LTE4LjEwMiw0NC4xMTctNDAuMzQ5LDQ0LjExN2gtMTUuMzI5Yy0yMi4yNDcsMC00MC4zNDktMTkuNzktNDAuMzQ5LTQ0LjExN1xyXG4gICAgICAgICAgICAgICBWNjIuNTUzSDE5OS45MTZ2MTQuMDUyYzAsMjQuMzI3LTE4LjEwMiw0NC4xMTctNDAuMzQ5LDQ0LjExN2gtMTUuMzI5Yy0yMi4yNDgsMC00MC4zNDktMTkuNzktNDAuMzQ5LTQ0LjExN1Y2Mi41NTNINzAuODE4XHJcbiAgICAgICAgICAgICAgIGMtMjEuMDY2LDAtMzguMTUsMTYuMDE3LTM4LjE1LDM1Ljc2NHY0NzYuMzE4YzAsMTkuNzg0LDE3LjA4MywzNS43NjQsMzguMTUsMzUuNzY0aDQ2OC43NjNjMjEuMDg1LDAsMzguMTQ5LTE1Ljk4NCwzOC4xNDktMzUuNzY0XHJcbiAgICAgICAgICAgICAgIFY5OC4zMjJDNTc3LjczNSw3OC41NzUsNTYwLjY3MSw2Mi41NTMsNTM5LjU4Niw2Mi41NTN6IE01MjcuNzU3LDU1Ny45bC00NDYuNTAyLTAuMTcyVjE3My43MTdoNDQ2LjUwMlY1NTcuOXpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNywyNjYuMjU4aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE3OSwxOC40MzctMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM3LTIyLjc1OUgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzMzNC41OCwyNTYuMDc0LDM0Mi44MjMsMjY2LjI1OCwzNTMuMDE3LDI2Ni4yNTh6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsMzQ4LjQ2N2gxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xNzksMTguNDM3LTIyLjc1OWMwLTEyLjU3OS04LjI0OC0yMi43NTgtMTguNDM3LTIyLjc1OEgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU4QzMzNC41OCwzMzguMjg4LDM0Mi44MjMsMzQ4LjQ2NywzNTMuMDE3LDM0OC40Njd6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsNDMwLjY3NmgxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xOCwxOC40MzctMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM3LTIyLjc1OUgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE4LTE4LjQzNywyMi43NTlTMzQyLjgyMyw0MzAuNjc2LDM1My4wMTcsNDMwLjY3NnpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNyw1MTIuODloMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTgsMTguNDM3LTIyLjc1OWMwLTEyLjU4LTguMjQ4LTIyLjc1OS0xOC40MzctMjIuNzU5SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMzM0LjU4LDUwMi43MSwzNDIuODIzLDUxMi44OSwzNTMuMDE3LDUxMi44OXpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiwyNjYuMjU4SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTc5LDE4LjQzNi0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzYtMjIuNzU5SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMTI2LjU5NiwyNTYuMDc0LDEzNC44MzgsMjY2LjI1OCwxNDUuMDMyLDI2Ni4yNTh6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsMzQ4LjQ2N0gyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE3OSwxOC40MzYtMjIuNzU5YzAtMTIuNTc5LTguMjQ4LTIyLjc1OC0xOC40MzYtMjIuNzU4SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NThDMTI2LjU5NiwzMzguMjg4LDEzNC44MzgsMzQ4LjQ2NywxNDUuMDMyLDM0OC40Njd6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsNDMwLjY3NkgyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE4LDE4LjQzNi0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzYtMjIuNzU5SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTgtMTguNDM3LDIyLjc1OVMxMzQuODM4LDQzMC42NzYsMTQ1LjAzMiw0MzAuNjc2elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDUxMi44OUgyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE4LDE4LjQzNi0yMi43NTljMC0xMi41OC04LjI0OC0yMi43NTktMTguNDM2LTIyLjc1OUgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzEyNi41OTYsNTAyLjcxLDEzNC44MzgsNTEyLjg5LDE0NS4wMzIsNTEyLjg5elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2c+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0g2KfZhNiq2YLZiNmK2YUgLS0+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJkYXRlcGlja2VyLXBvcHVwXCJcclxuICAgIFtjbGFzcy5vcGVuXT1cInNob3dEYXRlUGlja2VyXCJcclxuICAgIFtjbGFzcy5jbG9zZWRdPVwiIXNob3dEYXRlUGlja2VyXCJcclxuICAgIFtuZ1N0eWxlXT1cIntcclxuICAgIGJvcmRlckNvbG9yOiBCb3JkZXJDb2xvclxyXG4gICAgICB9XCJcclxuICA+XHJcbiAgICA8IS0tINi52YbZiNin2YYg2KfZhNi02YfYsSDZiNij2LLYsdin2LEg2KfZhNiq2YbZgtmEIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgICA8YSAoY2xpY2spPVwicHJldk1vbnRoKClcIj4mbHQ7PC9hPlxyXG4gICAgICA8c3BhbiAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBjb2xvcjogRGF5Q29sb3JcclxuICAgICAgfVwiPnt7IGN1cnJlbnRNb250aE5hbWUgfX08L3NwYW4+XHJcbiAgICAgIDxhIChjbGljayk9XCJuZXh0TW9udGgoKVwiPiZndDs8L2E+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8IS0tINij2LPZhdin2KEg2KPZitin2YUg2KfZhNij2LPYqNmI2LkgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwid2Vla2RheXNcIj5cclxuICAgICAgPGRpdiAgICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgY29sb3I6IERhdGVwaWNrZXJQb3B1cEhlYWRlckNvbG9yXHJcbiAgICAgIH1cIiAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheU5hbWVzTWluXCIgY2xhc3M9XCJ3ZWVrZGF5XCI+e3sgZGF5IH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8IS0tINi52LHYtiDYo9mK2KfZhSDYp9mE2LTZh9ixIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cImRheXNcIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5c0luQ3VycmVudE1vbnRoXCJcclxuICAgICAgICBjbGFzcz1cImRheVwiXHJcbiAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cInNlbGVjdGVkRGF0ZSAmJiBkYXk/LmlzU2FtZShzZWxlY3RlZERhdGUsICdkYXknKVwiXHJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdERhdGUoZGF5KVwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImRheVwiPnt7IGRheS5pRGF0ZSgpIH19PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0g2LLYsSDZhNiq2K3Yr9mK2K8g2KfZhNmK2YjZhSDYp9mE2K3Yp9mE2YogLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwidG9kYXktYnV0dG9uXCI+XHJcbiAgICAgIDxhIChjbGljayk9XCJzZWxlY3RUb2RheSgpXCJcclxuICAgICAgPtin2YTZitmI2YU8L2E+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG4gIGAsXHJcbiAgc3R5bGVzOiBgLmhpanJpLWRhdGVwaWNrZXItY29udGFpbmVyIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHdpZHRoOiAyNTBweDtcclxuICB9XHJcblxyXG4gIC5pbnB1dC1zdmctd3JhcHBlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgLyog2YTZhdit2KfYsNin2Kkg2KfZhNmF2K3YqtmI2Ykg2LnZhdmI2K/ZitmL2KcgKi9cclxuICAgIHdpZHRoOiAxMDAlOyAvKiDZhtmB2LMg2LnYsdi2INin2YTYrdin2YjZitipICovXHJcbiAgfVxyXG5cclxuICAuaWNvbkNsZW5kZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgcGFkZGluZzogMTQuNXB4O1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLWlucHV0IHtcclxuICAgIGZsZXg6IDE7IC8qINmK2KPYrtiwINin2YTYpdiv2K7Yp9mEINmD2KfZhdmEINin2YTYudix2LYg2KfZhNmF2KrYqNmC2YogKi9cclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDRweDtcclxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjNzIGVhc2UtaW4tb3V0O1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItaW5wdXQ6Zm9jdXMge1xyXG4gICAgb3V0bGluZTogbm9uZTsgLyog2KXYstin2YTYqSDYp9mE2KXYt9in2LEg2KfZhNin2YHYqtix2KfYttmKICovXHJcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINiq2KPYq9mK2LEg2K7ZgdmK2YEg2LnZhtivINin2YTYqtix2YPZitiyICovXHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1pY29uIHtcclxuICAgIHdpZHRoOiAxNXB4OyAvKiDZitmF2YPZhiDYttio2Lcg2KfZhNit2KzZhSDYrdiz2Kgg2KfZhNit2KfYrNipICovXHJcbiAgICBoZWlnaHQ6IDE1cHg7IC8qINmG2YHYsyDYp9ix2KrZgdin2Lkg2KfZhNil2K/Yrtin2YQgKi9cclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLXBvcHVwIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTAwJTtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICB6LWluZGV4OiAxMDAwO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGJveC1zaGFkb3c6IDBweCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwKTtcclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItcG9wdXAub3BlbiB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMSk7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1wb3B1cC5jbG9zZWQge1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDApO1xyXG4gIH1cclxuXHJcbiAgLmhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICB9XHJcblxyXG4gIC5oZWFkZXIgYSB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAud2Vla2RheXMsXHJcbiAgLmRheXMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAud2Vla2RheSB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgfVxyXG5cclxuICAuZGF5IHtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcywgY29sb3IgMC4zcztcclxuICB9XHJcblxyXG4gIC5kYXk6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG5cclxuICAuZGF5LnNlbGVjdGVkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH1cclxuXHJcbiAgLnRvZGF5LWJ1dHRvbiB7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICB9XHJcblxyXG4gIC50b2RheS1idXR0b24gYSB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gIH1cclxuXHJcbiAgLnRvZGF5LWJ1dHRvbiBhOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfZhNmE2YjZhiDYp9mE2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgfVxyXG5cclxuICBgLFxyXG5cclxucHJvdmlkZXJzOiBbXHJcbiAge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hIaWpyaURhdGVwaWNrZXJDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWUsXHJcbiAgfSxcclxuXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhpanJpRGF0ZXBpY2tlckNvbXBvbmVudCB7XHJcbiAgLy8gSW5wdXQgcHJvcGVydGllcyB0byBhbGxvdyBjdXN0b21pemF0aW9uIGJ5IHRoZSB1c2VyXHJcbiAgLy8g2KfZhNmF2K/YrtmE2KfYqiDZhNiq2K7YtdmK2LUg2KfZhNmF2YPZiNmGINmF2YYg2YLYqNmEINin2YTZhdiz2KrYrtiv2YVcclxuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7IC8vIFRoZSBpbml0aWFsIHZhbHVlIC8g2KfZhNmC2YrZhdipINin2YTYo9mI2YTZitipXHJcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpOyAvLyBFbWl0cyB2YWx1ZSB3aGVuIGl0IGNoYW5nZXMgLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYudmG2K8g2KfZhNiq2LrZitmK2LFcclxuXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICfYp9iu2KrYsSDYqtin2LHZitiuINmH2KzYsdmKJzsgLy8gUGxhY2Vob2xkZXIgdGV4dCAvINin2YTZhti1INin2YTYp9mB2KrYsdin2LbZiiDZhNmE2K3ZgtmEXHJcbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZyA9ICcyNTBweCc7IC8vIFdpZHRoIG9mIHRoZSBpbnB1dCBmaWVsZCAvINi52LHYtiDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmcgPSAnNDBweCc7IC8vIEhlaWdodCBvZiB0aGUgaW5wdXQgZmllbGQgLyDYp9ix2KrZgdin2Lkg2KfZhNit2YLZhFxyXG4gIEBJbnB1dCgpIElucHV0Q29sb3I6IHN0cmluZyB8IG51bGwgPSBudWxsOyAvLyBJbnB1dCB0ZXh0IGNvbG9yIC8g2YTZiNmGINin2YTZhti1INmB2Yog2KfZhNit2YLZhFxyXG4gIEBJbnB1dCgpIElucHV0QmFja2dyb3VuZENvbG9yOiBzdHJpbmcgfCBudWxsPSBudWxsOyAvLyBJbnB1dCBiYWNrZ3JvdW5kIGNvbG9yIC8g2YTZiNmGINiu2YTZgdmK2Kkg2KfZhNit2YLZhFxyXG4gIEBJbnB1dCgpIEljb25Db2xvcjogc3RyaW5nIHwgbnVsbD0gbnVsbDsgLy8gSWNvbiBjb2xvciAvINmE2YjZhiDYp9mE2KPZitmC2YjZhtipXHJcbiAgQElucHV0KCkgSWNvbkJhY2tncm91bmRDb2xvcjogc3RyaW5nfCBudWxsID0gbnVsbDsgLy8gSWNvbiBiYWNrZ3JvdW5kIGNvbG9yIC8g2YTZiNmGINiu2YTZgdmK2Kkg2KfZhNij2YrZgtmI2YbYqVxyXG4gIEBJbnB1dCgpIERheUNvbG9yOiBzdHJpbmd8IG51bGw9IG51bGw7IC8vIERheSBjb2xvciBpbiBjYWxlbmRhciAvINmE2YjZhiDYp9mE2KPZitin2YUg2YHZiiDYp9mE2KrZgtmI2YrZhVxyXG4gIEBJbnB1dCgpIEJvcmRlckNvbG9yOiBzdHJpbmcgfCBudWxsPSBudWxsOyAvLyBCb3JkZXIgY29sb3IgZm9yIGlucHV0IGFuZCBwb3B1cCAvINmE2YjZhiDYp9mE2K3Yr9mI2K9cclxuICBASW5wdXQoKSBEYXRlcGlja2VyUG9wdXBIZWFkZXJDb2xvcjogc3RyaW5nIHwgbnVsbD0gbnVsbDsgLy8gSGVhZGVyIGNvbG9yIGluIHRoZSBwb3B1cCAvINmE2YjZhiDYp9mE2LHYo9izINmB2Yog2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gIEBJbnB1dCgpIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyA9ICdpWVlZWS9pTS9pRCc7IC8vINiq2YbYs9mK2YIg2KfZhNiq2KfYsdmK2K4g2KfZhNin2YHYqtix2KfYttmKXHJcbiAgQElucHV0KCkgc3RvcmFnZUZvcm1hdDogc3RyaW5nIHwgbnVsbCA9IG51bGw7IC8vINin2YTYqtmG2LPZitmCINin2YTZhdiz2KrYrtiv2YUg2YTZhNiq2K7YstmK2YYgKNin2YHYqtix2KfYttmK2YvYpyDZitmD2YjZhiBudWxsKVxyXG4gIEBJbnB1dCgpIGxvY2FsZTogJ2VuJyB8ICdhcicgPSAnYXInOyAgLy8g2K7Zitin2LEg2YTYp9iu2KrZitin2LEg2KfZhNmE2LrYqSAo2KfZgdiq2LHYp9i22Yo6INi52LHYqNmKKVxyXG5cclxuICBzZWxlY3RlZERhdGU6IG1vbWVudC5Nb21lbnQgfCBudWxsID0gbnVsbDsgLy8gQ3VycmVudGx5IHNlbGVjdGVkIGRhdGUgLyDYp9mE2KrYp9ix2YrYriDYp9mE2YXYrtiq2KfYsVxyXG4gIHNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vIFRvIGNvbnRyb2wgdmlzaWJpbGl0eSBvZiB0aGUgZGF0ZXBpY2tlciBwb3B1cCAvINin2YTYqtit2YPZhSDZgdmKINil2LjZh9in2LEg2KfZhNiq2YLZiNmK2YVcclxuICBjdXJyZW50Vmlld0RhdGU6IG1vbWVudC5Nb21lbnQgPSBtb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpOzsgLy8gQ3VycmVudGx5IGRpc3BsYXllZCBtb250aCBpbiB0aGUgcG9wdXAgLyDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYp9mE2YXYudix2YjYtlxyXG5cclxuICBvbkNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyBjaGFuZ2UgZXZlbnQgLyDZiNin2KzZh9ipINmE2YTYqti52KfZhdmEINmF2Lkg2KfZhNiq2LrZitmK2LHYp9iqINmB2YogUmVhY3RpdmUgRm9ybXNcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyB0b3VjaCBldmVudCAvINmI2KfYrNmH2Kkg2YTZhNiq2LnYp9mF2YQg2YXYuSDZhNmF2LPYqSDYp9mE2K3ZgtmEINmB2YogUmVhY3RpdmUgRm9ybXNcclxuXHJcbiAgLy8g2KPYs9mF2KfYoSDYp9mE2KPZitin2YUgKNin2K7Yqti12KfYsSlcclxuICAvLyBTaG9ydCBuYW1lcyBmb3IgZGF5cyBvZiB0aGUgd2Vla1xyXG4gIGRheU5hbWVzTWluOiBzdHJpbmdbXSA9IFsn2K0nLCAn2YYnLCAn2KsnLCAn2LEnLCAn2K4nLCAn2KwnLCAn2LMnXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAvLyAqKkluaXRpYWwgc2V0dXAgb24gY29tcG9uZW50IGxvYWQqKlxyXG4gIC8vICoq2KXYudiv2KfYryDZhdio2K/YptmKINi52YbYryDYqtit2YXZitmEINin2YTZhdmD2YjZhioqXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh0aGlzLnZhbHVlLCB0aGlzLmRpc3BsYXlGb3JtYXQpLmxvY2FsZSh0aGlzLmxvY2FsZSk7OyAvLyBQYXJzZSB0aGUgaW5pdGlhbCB2YWx1ZSAvINiq2K3ZiNmK2YQg2KfZhNmC2YrZhdipINin2YTYo9mI2YTZitipINmE2KrYp9ix2YrYrlxyXG4gICAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCk7IC8vIFNldCB0aGUgdmlldyBkYXRlIHRvIHRoZSBzZWxlY3RlZCBkYXRlIC8g2LnYsdi2INin2YTYtNmH2LEg2KfZhNiu2KfYtSDYqNin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vINil2LDYpyDZhNmFINmK2KrZhSDYqtmF2LHZitixIGBzdG9yYWdlRm9ybWF0YCDZhdmGINin2YTZhdiz2KrYrtiv2YXYjCDZhtiz2KrYrtiv2YUgYGRpc3BsYXlGb3JtYXRgINmD2YLZitmF2Kkg2KfZgdiq2LHYp9i22YrYqVxyXG4gIGdldCByZXNvbHZlZFN0b3JhZ2VGb3JtYXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VGb3JtYXQgfHwgdGhpcy5kaXNwbGF5Rm9ybWF0O1xyXG4gIH1cclxuICAvLyAqKlByb3BlcnR5OiBEaXNwbGF5IHRoZSBjdXJyZW50IG1vbnRoJ3MgbmFtZSBpbiBIaWpyaSBmb3JtYXQqKlxyXG4gIC8vICoq2K7Yp9i12YrYqTog2LnYsdi2INin2LPZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYqNin2YTYqtmG2LPZitmCINin2YTZh9is2LHZiioqXHJcbiAgZ2V0IGN1cnJlbnRNb250aE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5sb2NhbGUodGhpcy5sb2NhbGUpLmZvcm1hdCgnaU1NTU0gaVlZWVknKTsgLy8gRm9ybWF0IHRoZSBjdXJyZW50IG1vbnRoIC8g2LXZiti62Kkg2KfYs9mFINin2YTYtNmH2LEg2KfZhNit2KfZhNmKXHJcbiAgfVxyXG5cclxuICAvLyAqKlByb3BlcnR5OiBDYWxjdWxhdGUgYW5kIHJldHVybiBkYXlzIG9mIHRoZSBjdXJyZW50IG1vbnRoKipcclxuICAvLyAqKtiu2KfYtdmK2Kk6INit2LPYp9ioINmI2KXYsdis2KfYuSDYo9mK2KfZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZiioqXHJcbiAgZ2V0IGRheXNJbkN1cnJlbnRNb250aCgpOiBhbnlbXSB7XHJcbiAgICBjb25zdCBzdGFydE9mTW9udGggPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2lNb250aCcpOyAvLyBTdGFydCBvZiB0aGUgbW9udGggLyDYqNiv2KfZitipINin2YTYtNmH2LFcclxuICAgIGNvbnN0IGVuZE9mTW9udGggPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLmVuZE9mKCdpTW9udGgnKTsgLy8gRW5kIG9mIHRoZSBtb250aCAvINmG2YfYp9mK2Kkg2KfZhNi02YfYsVxyXG5cclxuICAgIGNvbnN0IGRheXMgPSBbXTtcclxuICAgIGNvbnN0IHN0YXJ0RGF5T2ZXZWVrID0gc3RhcnRPZk1vbnRoLmRheSgpOyAvLyBUaGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aCBpbiB0aGUgd2VlayAvINin2YTZitmI2YUg2KfZhNij2YjZhCDZhdmGINin2YTYtNmH2LFcclxuXHJcbiAgICAvLyBBZGQgZW1wdHkgc2xvdHMgZm9yIHByZXZpb3VzIG1vbnRoJ3MgZGF5c1xyXG4gICAgLy8g2KXYttin2YHYqSDZgdix2KfYutin2Kog2YTZhNij2YrYp9mFINin2YTYqtmKINiq2LPYqNmCINin2YTYtNmH2LEg2KfZhNit2KfZhNmKXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0RGF5T2ZXZWVrOyBpKyspIHtcclxuICAgICAgZGF5cy5wdXNoKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBhY3R1YWwgZGF5cyBvZiB0aGUgY3VycmVudCBtb250aFxyXG4gICAgLy8g2KXYttin2YHYqSDYp9mE2KPZitin2YUg2KfZhNmB2LnZhNmK2Kkg2YTZhNi02YfYsSDYp9mE2K3Yp9mE2YpcclxuICAgIGNvbnN0IHRvdGFsRGF5cyA9IGVuZE9mTW9udGguaURhdGUoKTtcclxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IHRvdGFsRGF5czsgZCsrKSB7XHJcbiAgICAgIGRheXMucHVzaChzdGFydE9mTW9udGguY2xvbmUoKS5pRGF0ZShkKS5sb2NhbGUodGhpcy5sb2NhbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF5cztcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBOYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgbW9udGgqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfZhNin2YbYqtmC2KfZhCDYpdmE2Ykg2KfZhNi02YfYsSDYp9mE2LPYp9io2YIqKlxyXG4gIHByZXZNb250aCgpIHtcclxuICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnaU1vbnRoJykubG9jYWxlKHRoaXMubG9jYWxlKTs7XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogTmF2aWdhdGUgdG8gdGhlIG5leHQgbW9udGgqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfZhNin2YbYqtmC2KfZhCDYpdmE2Ykg2KfZhNi02YfYsSDYp9mE2KrYp9mE2YoqKlxyXG4gIG5leHRNb250aCgpIHtcclxuICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5hZGQoMSwgJ2lNb250aCcpLmxvY2FsZSh0aGlzLmxvY2FsZSk7O1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IFNlbGVjdCBhIHNwZWNpZmljIGRhdGUqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfYrtiq2YrYp9ixINiq2KfYsdmK2K4g2YXYudmK2YYqKlxyXG4gIHNlbGVjdERhdGUoZGF5OiBtb21lbnQuTW9tZW50IHwgbnVsbCkge1xyXG4gICAgaWYgKGRheSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRheS5sb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gICAgICBjb25zdCBzdG9yZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLnJlc29sdmVkU3RvcmFnZUZvcm1hdCk7IC8vINin2YTZgtmK2YXYqSDZhNiq2K7YstmK2YbZh9inINmB2Yog2YLYp9i52K/YqSDYp9mE2KjZitin2YbYp9iqXHJcbiAgICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpOyAvLyDYp9mE2YLZitmF2Kkg2YTYudix2LbZh9inXHJcblxyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHN0b3JlZFZhbHVlKTsgLy8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2KfZhNmF2K7YstmG2Kkg2KXZhNmJINin2YTZhtmF2YjYsNisXHJcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChzdG9yZWRWYWx1ZSk7IC8vINil2LHYs9in2YQg2KfZhNmC2YrZhdipINin2YTZhdiu2LLZhtipXHJcblxyXG4gICAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vINil2LrZhNin2YIg2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IFRvZ2dsZSB2aXNpYmlsaXR5IG9mIHRoZSBkYXRlcGlja2VyKipcclxuICAvLyAqKti32LHZitmC2Kk6INmB2KrYrS/Ypdi62YTYp9mCINin2YTYqtmC2YjZitmFKipcclxuICB0b2dnbGVEYXRlUGlja2VyKCkge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZVxyXG4gICAgICA/IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKVxyXG4gICAgICA6IG1vbWVudCgpOyAvLyBTZXQgdG8gY3VycmVudCBkYXRlIGlmIG5vIGRhdGUgaXMgc2VsZWN0ZWQgLyDYudix2LYg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2Yog2KXYsNinINmE2YUg2YrYqtmFINin2K7YqtmK2KfYsSDYqtin2LHZitiuXHJcbiAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gIXRoaXMuc2hvd0RhdGVQaWNrZXI7IC8vIFRvZ2dsZSB2aXNpYmlsaXR5IC8g2KrYqNiv2YrZhCDYp9mE2K3Yp9mE2KlcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBDbG9zZSB0aGUgcG9wdXAgd2hlbiBjbGlja2luZyBvdXRzaWRlKipcclxuICAvLyAqKti32LHZitmC2Kk6INil2LrZhNin2YIg2KfZhNiq2YLZiNmK2YUg2LnZhtivINin2YTZhtmC2LEg2K7Yp9ix2Kwg2KfZhNmF2YPZiNmGKipcclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gIG9uRG9jdW1lbnRDbGljayh0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgY29uc3QgY2xpY2tlZEluc2lkZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpOyAvLyBDaGVjayBpZiBjbGljayBpcyBpbnNpZGUgLyDYp9mE2KrYrdmC2YIg2KXYsNinINmD2KfZhiDYp9mE2YbZgtixINiv2KfYrtmEINin2YTZhdmD2YjZhlxyXG4gICAgaWYgKCFjbGlja2VkSW5zaWRlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTsgLy8gQ2xvc2UgdGhlIHBvcHVwIC8g2KXYutmE2KfZgiDZhtin2YHYsNipINin2YTYqtmC2YjZitmFXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAqKlByb3BlcnR5OiBEaXNwbGF5IHRoZSBzZWxlY3RlZCBkYXRlIGluIHRoZSBpbnB1dCBmaWVsZCoqXHJcbiAgLy8gKirYrtin2LXZitipOiDYudix2LYg2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LEg2YHZiiDYp9mE2K3ZgtmEKipcclxuICBnZXQgZGlzcGxheWVkRGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWREYXRlID8gdGhpcy5zZWxlY3RlZERhdGUubG9jYWxlKHRoaXMubG9jYWxlKS5mb3JtYXQodGhpcy5kaXNwbGF5Rm9ybWF0KSA6ICcnOyAvLyBEaXNwbGF5IGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZyAvINi52LHYtiDYp9mE2KrYp9ix2YrYriDYo9mIINiq2LHZg9mHINmB2KfYsdi62KfZi1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IFNlbGVjdCB0b2RheSdzIGRhdGUqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfYrtiq2YrYp9ixINiq2KfYsdmK2K4g2KfZhNmK2YjZhSoqXHJcbiAgc2VsZWN0VG9kYXkoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7IC8vIFNldCB0aGUgZGF0ZSB0byB0b2RheSAvINiq2LnZitmK2YYg2KfZhNiq2KfYsdmK2K4g2KXZhNmJINin2YTZitmI2YVcclxuICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gdGhpcy5zZWxlY3RlZERhdGUuZm9ybWF0KHRoaXMucmVzb2x2ZWRTdG9yYWdlRm9ybWF0KTtcclxuICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShzdG9yZWRWYWx1ZSk7IC8vIEVtaXQgdGhlIHZhbHVlIGZvciBSZWFjdGl2ZSBGb3JtcyAvINil2LHYs9in2YQg2KfZhNmC2YrZhdipINil2YTZiSBSZWFjdGl2ZSBGb3Jtc1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHN0b3JlZFZhbHVlKTsgLy8gRW1pdCB0aGUgdmFsdWUgZm9yIHN0YW5kYWxvbmUgdXNhZ2UgLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYudmG2K8g2KfZhNin2LPYqtiu2K/Yp9mFINin2YTZgdix2K/ZilxyXG4gICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyBDbG9zZSB0aGUgcG9wdXAgLyDYpdi62YTYp9mCINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICB9XHJcblxyXG4gIC8vICoqQ29udHJvbFZhbHVlQWNjZXNzb3I6IFdyaXRlIGEgbmV3IHZhbHVlKipcclxuICAvLyAqKtmI2KfYrNmH2Kk6INiq2LnZitmK2YYg2YLZitmF2Kkg2KzYr9mK2K/YqSoqXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBtb21lbnQodmFsdWUsIHRoaXMucmVzb2x2ZWRTdG9yYWdlRm9ybWF0KS5sb2NhbGUodGhpcy5sb2NhbGUpOyAvLyDYqtit2YjZitmEINin2YTZgtmK2YXYqSDYpdmE2Ykg2YTYrdi42Kkg2KjZhtin2KHZiyDYudmE2Ykg2KfZhNiq2YbYs9mK2YJcclxuICAgICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5jbG9uZSgpOyAvLyBTZXQgdGhlIGN1cnJlbnQgdmlldyBkYXRlIC8g2KrYudmK2YrZhiDYudix2LYg2KfZhNi02YfYsVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBudWxsOyAvLyBDbGVhciB0aGUgc2VsZWN0ZWQgZGF0ZSAvINmF2LPYrSDYp9mE2KrYp9ix2YrYriDYp9mE2YXYrtiq2KfYsVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gKipDb250cm9sVmFsdWVBY2Nlc3NvcjogUmVnaXN0ZXIgYSBjaGFuZ2UgY2FsbGJhY2sqKlxyXG4gIC8vICoq2YjYp9is2YfYqTog2KrYs9is2YrZhCDYr9in2YTYqSDYqti62YrZitixINin2YTZgtmK2YXYqSoqXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47IC8vIFN0b3JlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiAvINiq2K7YstmK2YYg2K/Yp9mE2Kkg2KfZhNiq2LrZitmK2LFcclxuICB9XHJcblxyXG4gIC8vICoqQ29udHJvbFZhbHVlQWNjZXNzb3I6IFJlZ2lzdGVyIGEgdG91Y2hlZCBjYWxsYmFjayoqXHJcbiAgLy8gKirZiNin2KzZh9ipOiDYqtiz2KzZitmEINiv2KfZhNipINin2YTZhNmF2LMqKlxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47IC8vIFN0b3JlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiAvINiq2K7YstmK2YYg2K/Yp9mE2Kkg2KfZhNmE2YXYs1xyXG4gIH1cclxufVxyXG4iXX0=