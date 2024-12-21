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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NgxHijriDatepickerComponent, selector: "ngx-hijri-datepicker", inputs: { value: "value", placeholder: "placeholder", width: "width", height: "height", InputColor: "InputColor", InputBackgroundColor: "InputBackgroundColor", IconColor: "IconColor", IconBackgroundColor: "IconBackgroundColor", DayColor: "DayColor", BorderColor: "BorderColor", DatepickerPopupHeaderColor: "DatepickerPopupHeaderColor", displayFormat: "displayFormat", storageFormat: "storageFormat", locale: "locale" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "document:click": "onDocumentClick($event.target)" } }, providers: [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhpanJpLWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWhpanJpLWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtaGlqcmktZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLE1BQU0sTUFBTSxjQUFjLENBQUM7OztBQW9TbEMsTUFBTSxPQUFPLDJCQUEyQjtJQStCbEI7SUE5QnBCLHNEQUFzRDtJQUN0RCx5Q0FBeUM7SUFDaEMsS0FBSyxHQUFrQixJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7SUFDakUsV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDLENBQUMseURBQXlEO0lBRTFILFdBQVcsR0FBVyxpQkFBaUIsQ0FBQyxDQUFDLDBDQUEwQztJQUNuRixLQUFLLEdBQVcsT0FBTyxDQUFDLENBQUMsdUNBQXVDO0lBQ2hFLE1BQU0sR0FBVyxNQUFNLENBQUMsQ0FBQywyQ0FBMkM7SUFDcEUsVUFBVSxHQUFrQixJQUFJLENBQUMsQ0FBQyx1Q0FBdUM7SUFDekUsb0JBQW9CLEdBQWlCLElBQUksQ0FBQyxDQUFDLDJDQUEyQztJQUN0RixTQUFTLEdBQWlCLElBQUksQ0FBQyxDQUFDLDRCQUE0QjtJQUM1RCxtQkFBbUIsR0FBaUIsSUFBSSxDQUFDLENBQUMsNkNBQTZDO0lBQ3ZGLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQzlFLFdBQVcsR0FBaUIsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQ2xGLDBCQUEwQixHQUFpQixJQUFJLENBQUMsQ0FBQyx5REFBeUQ7SUFDMUcsYUFBYSxHQUFXLGFBQWEsQ0FBQyxDQUFDLDBCQUEwQjtJQUNqRSxhQUFhLEdBQWtCLElBQUksQ0FBQyxDQUFDLGlEQUFpRDtJQUN0RixNQUFNLEdBQWdCLElBQUksQ0FBQyxDQUFFLHFDQUFxQztJQUUzRSxZQUFZLEdBQXlCLElBQUksQ0FBQyxDQUFDLDRDQUE0QztJQUN2RixjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsMEVBQTBFO0lBQ2xHLGVBQWUsR0FBa0IsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQyxnRUFBZ0U7SUFFaEksUUFBUSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyw4RkFBOEY7SUFDaEksU0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLDhGQUE4RjtJQUVwSCx3QkFBd0I7SUFDeEIsbUNBQW1DO0lBQ25DLFdBQVcsR0FBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTVELFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRTlDLHNDQUFzQztJQUN0QyxtQ0FBbUM7SUFDbkMsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFBLENBQUMsQ0FBQyx3REFBd0Q7WUFDekksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsNEVBQTRFO1FBQ2hJLENBQUM7SUFDSCxDQUFDO0lBQ0Qsc0ZBQXNGO0lBQ3RGLElBQUkscUJBQXFCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xELENBQUM7SUFDRCxpRUFBaUU7SUFDakUsa0RBQWtEO0lBQ2xELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLG1EQUFtRDtJQUM1SCxDQUFDO0lBRUQsK0RBQStEO0lBQy9ELDJDQUEyQztJQUMzQyxJQUFJLGtCQUFrQjtRQUNwQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLG1DQUFtQztRQUN4RyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztRQUVsRyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsZ0VBQWdFO1FBRTNHLDRDQUE0QztRQUM1Qyw2Q0FBNkM7UUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVELHVDQUF1QztRQUN2QyxvQ0FBb0M7UUFDcEMsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw2Q0FBNkM7SUFDN0MsdUNBQXVDO0lBQ3ZDLFNBQVM7UUFDUCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQUEsQ0FBQztJQUNqRyxDQUFDO0lBRUQseUNBQXlDO0lBQ3pDLHVDQUF1QztJQUN2QyxTQUFTO1FBQ1AsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUFBLENBQUM7SUFDNUYsQ0FBQztJQUVELHFDQUFxQztJQUNyQywrQkFBK0I7SUFDL0IsVUFBVSxDQUFDLEdBQXlCO1FBQ2xDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDUixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsb0NBQW9DO1lBQzlHLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtZQUVuRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO1lBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1lBRTNELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsc0JBQXNCO1FBQ3JELENBQUM7SUFDSCxDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELCtCQUErQjtJQUMvQixnQkFBZ0I7UUFDZCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZO1lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLHdGQUF3RjtRQUN0RyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLG1DQUFtQztJQUNqRixDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELGlEQUFpRDtJQUVqRCxlQUFlLENBQUMsYUFBMEI7UUFDeEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsOERBQThEO1FBQzNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLHdDQUF3QztRQUN2RSxDQUFDO0lBQ0gsQ0FBQztJQUVELDZEQUE2RDtJQUM3RCwwQ0FBMEM7SUFDMUMsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsc0VBQXNFO0lBQzFLLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsZ0NBQWdDO0lBQ2hDLFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxrREFBa0Q7UUFDcEcsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxzRUFBc0U7UUFDbEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQywwRUFBMEU7UUFDOUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyx3Q0FBd0M7SUFDdkUsQ0FBQztJQUVELDhDQUE4QztJQUM5Qyw4QkFBOEI7SUFDOUIsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsMENBQTBDO1lBQzdILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLDhDQUE4QztRQUNsRyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO1FBQzVFLENBQUM7SUFDSCxDQUFDO0lBRUQsdURBQXVEO0lBQ3ZELHFDQUFxQztJQUNyQyxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsbURBQW1EO0lBQ3pFLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsOEJBQThCO0lBQzlCLGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxpREFBaUQ7SUFDeEUsQ0FBQzt3R0FoS1UsMkJBQTJCOzRGQUEzQiwyQkFBMkIseWtCQVI3QjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMkJBQTJCLENBQUM7Z0JBQzFELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRiwwQkEvUmE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0lYOzs0RkFrSlUsMkJBQTJCO2tCQW5TdkMsU0FBUzsrQkFDRSxzQkFBc0IsWUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0lYLGFBMElRO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDOzRCQUMxRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjsrRUFLVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0ksV0FBVztzQkFBcEIsTUFBTTtnQkFFRSxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQWlHTixlQUFlO3NCQURkLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgT25Jbml0LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LWhpanJpJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtaGlqcmktZGF0ZXBpY2tlcicsXHJcbiAgdGVtcGxhdGU6ICAgYFxyXG48ZGl2XHJcbiAgY2xhc3M9XCJoaWpyaS1kYXRlcGlja2VyLWNvbnRhaW5lclwiXHJcbiAgW25nU3R5bGVdPVwie1xyXG4gICAgd2lkdGg6IHdpZHRoLFxyXG4gIH1cIlxyXG4+XHJcbiAgPCEtLSDYrdmC2YQg2KfZhNil2K/Yrtin2YQgLS0+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJpbnB1dC1zdmctd3JhcHBlclwiXHJcbiAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG59XCJcclxuICA+XHJcbiAgICA8aW5wdXRcclxuICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICBbdmFsdWVdPVwiZGlzcGxheWVkRGF0ZVwiXHJcbiAgICAgIChjbGljayk9XCJ0b2dnbGVEYXRlUGlja2VyKClcIlxyXG4gICAgICByZWFkb25seVxyXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICBjbGFzcz1cImRhdGVwaWNrZXItaW5wdXRcIlxyXG4gICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGJvcmRlckNvbG9yOiBCb3JkZXJDb2xvcixcclxuICAgICAgICBjb2xvcjogSW5wdXRDb2xvcixcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IElucHV0QmFja2dyb3VuZENvbG9yXHJcbiAgICAgIH1cIlxyXG4gICAgLz5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJpY29uQ2xlbmRlclwiXHJcbiAgICAgIChjbGljayk9XCJ0b2dnbGVEYXRlUGlja2VyKClcIlxyXG4gICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBJY29uQmFja2dyb3VuZENvbG9yXHJcbiAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgICA8c3ZnXHJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJJY29uQ29sb3JcIlxyXG4gICAgICAgIHZlcnNpb249XCIxLjFcIlxyXG4gICAgICAgIGlkPVwiQ2FwYV8xXCJcclxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxyXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgNjEwLjM5OCA2MTAuMzk4XCJcclxuICAgICAgICBjbGFzcz1cImRhdGVwaWNrZXItaWNvblwiXHJcbiAgICAgID5cclxuICAgICAgICA8Zz5cclxuICAgICAgICAgIDxnPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTU5LjU2NywwaC0xNS4zMjljLTEuOTU2LDAtMy44MTEsMC40MTEtNS42MDgsMC45OTVjLTguOTc5LDIuOTEyLTE1LjYxNiwxMi40OTgtMTUuNjE2LDIzLjk5N3YxMC41NTJ2MjcuMDA5djE0LjA1MlxyXG4gICAgICAgICAgICAgICBjMCwyLjYxMSwwLjQzNSw1LjA3OCwxLjA2Niw3LjQ0YzIuNzAyLDEwLjE0NiwxMC42NTMsMTcuNTUyLDIwLjE1OCwxNy41NTJoMTUuMzI5YzExLjcyNCwwLDIxLjIyNC0xMS4xODgsMjEuMjI0LTI0Ljk5MlY2Mi41NTNcclxuICAgICAgICAgICAgICAgVjM1LjU0NFYyNC45OTJDMTgwLjc5MSwxMS4xODgsMTcxLjI5MSwwLDE1OS41NjcsMHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNNDYxLjI4OCwwaC0xNS4zMjljLTExLjcyNCwwLTIxLjIyNCwxMS4xODgtMjEuMjI0LDI0Ljk5MnYxMC41NTJ2MjcuMDA5djE0LjA1MmMwLDEzLjgwNCw5LjUsMjQuOTkyLDIxLjIyNCwyNC45OTJcclxuICAgICAgICAgICAgICAgaDE1LjMyOWMxMS43MjQsMCwyMS4yMjQtMTEuMTg4LDIxLjIyNC0yNC45OTJWNjIuNTUzVjM1LjU0NFYyNC45OTJDNDgyLjUwNywxMS4xODgsNDczLjAwNywwLDQ2MS4yODgsMHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNNTM5LjU4Niw2Mi41NTNoLTM3Ljk1NHYxNC4wNTJjMCwyNC4zMjctMTguMTAyLDQ0LjExNy00MC4zNDksNDQuMTE3aC0xNS4zMjljLTIyLjI0NywwLTQwLjM0OS0xOS43OS00MC4zNDktNDQuMTE3XHJcbiAgICAgICAgICAgICAgIFY2Mi41NTNIMTk5LjkxNnYxNC4wNTJjMCwyNC4zMjctMTguMTAyLDQ0LjExNy00MC4zNDksNDQuMTE3aC0xNS4zMjljLTIyLjI0OCwwLTQwLjM0OS0xOS43OS00MC4zNDktNDQuMTE3VjYyLjU1M0g3MC44MThcclxuICAgICAgICAgICAgICAgYy0yMS4wNjYsMC0zOC4xNSwxNi4wMTctMzguMTUsMzUuNzY0djQ3Ni4zMThjMCwxOS43ODQsMTcuMDgzLDM1Ljc2NCwzOC4xNSwzNS43NjRoNDY4Ljc2M2MyMS4wODUsMCwzOC4xNDktMTUuOTg0LDM4LjE0OS0zNS43NjRcclxuICAgICAgICAgICAgICAgVjk4LjMyMkM1NzcuNzM1LDc4LjU3NSw1NjAuNjcxLDYyLjU1Myw1MzkuNTg2LDYyLjU1M3ogTTUyNy43NTcsNTU3LjlsLTQ0Ni41MDItMC4xNzJWMTczLjcxN2g0NDYuNTAyVjU1Ny45elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDI2Ni4yNThoMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTc5LDE4LjQzNy0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzctMjIuNzU5SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMzM0LjU4LDI1Ni4wNzQsMzQyLjgyMywyNjYuMjU4LDM1My4wMTcsMjY2LjI1OHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNywzNDguNDY3aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE3OSwxOC40MzctMjIuNzU5YzAtMTIuNTc5LTguMjQ4LTIyLjc1OC0xOC40MzctMjIuNzU4SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NThDMzM0LjU4LDMzOC4yODgsMzQyLjgyMywzNDguNDY3LDM1My4wMTcsMzQ4LjQ2N3pcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNyw0MzAuNjc2aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE4LDE4LjQzNy0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzctMjIuNzU5SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTgtMTguNDM3LDIyLjc1OVMzNDIuODIzLDQzMC42NzYsMzUzLjAxNyw0MzAuNjc2elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDUxMi44OWgxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xOCwxOC40MzctMjIuNzU5YzAtMTIuNTgtOC4yNDgtMjIuNzU5LTE4LjQzNy0yMi43NTlIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMzMzQuNTgsNTAyLjcxLDM0Mi44MjMsNTEyLjg5LDM1My4wMTcsNTEyLjg5elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDI2Ni4yNThIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xNzksMTguNDM2LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNi0yMi43NTlIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMxMjYuNTk2LDI1Ni4wNzQsMTM0LjgzOCwyNjYuMjU4LDE0NS4wMzIsMjY2LjI1OHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiwzNDguNDY3SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTc5LDE4LjQzNi0yMi43NTljMC0xMi41NzktOC4yNDgtMjIuNzU4LTE4LjQzNi0yMi43NThIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OEMxMjYuNTk2LDMzOC4yODgsMTM0LjgzOCwzNDguNDY3LDE0NS4wMzIsMzQ4LjQ2N3pcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiw0MzAuNjc2SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTgsMTguNDM2LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNi0yMi43NTlIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xOC0xOC40MzcsMjIuNzU5UzEzNC44MzgsNDMwLjY3NiwxNDUuMDMyLDQzMC42NzZ6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsNTEyLjg5SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTgsMTguNDM2LTIyLjc1OWMwLTEyLjU4LTguMjQ4LTIyLjc1OS0xOC40MzYtMjIuNzU5SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMTI2LjU5Niw1MDIuNzEsMTM0LjgzOCw1MTIuODksMTQ1LjAzMiw1MTIuODl6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZz5cclxuICAgICAgICA8L2c+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSDYp9mE2KrZgtmI2YrZhSAtLT5cclxuICA8ZGl2XHJcbiAgICBjbGFzcz1cImRhdGVwaWNrZXItcG9wdXBcIlxyXG4gICAgW2NsYXNzLm9wZW5dPVwic2hvd0RhdGVQaWNrZXJcIlxyXG4gICAgW2NsYXNzLmNsb3NlZF09XCIhc2hvd0RhdGVQaWNrZXJcIlxyXG4gICAgW25nU3R5bGVdPVwie1xyXG4gICAgYm9yZGVyQ29sb3I6IEJvcmRlckNvbG9yXHJcbiAgICAgIH1cIlxyXG4gID5cclxuICAgIDwhLS0g2LnZhtmI2KfZhiDYp9mE2LTZh9ixINmI2KPYstix2KfYsSDYp9mE2KrZhtmC2YQgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgIDxhIChjbGljayk9XCJwcmV2TW9udGgoKVwiPiZsdDs8L2E+XHJcbiAgICAgIDxzcGFuICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIGNvbG9yOiBEYXlDb2xvclxyXG4gICAgICB9XCI+e3sgY3VycmVudE1vbnRoTmFtZSB9fTwvc3Bhbj5cclxuICAgICAgPGEgKGNsaWNrKT1cIm5leHRNb250aCgpXCI+Jmd0OzwvYT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0g2KPYs9mF2KfYoSDYo9mK2KfZhSDYp9mE2KPYs9io2YjYuSAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJ3ZWVrZGF5c1wiPlxyXG4gICAgICA8ZGl2ICAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBjb2xvcjogRGF0ZXBpY2tlclBvcHVwSGVhZGVyQ29sb3JcclxuICAgICAgfVwiICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5TmFtZXNNaW5cIiBjbGFzcz1cIndlZWtkYXlcIj57eyBkYXkgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0g2LnYsdi2INij2YrYp9mFINin2YTYtNmH2LEgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGF5c1wiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzSW5DdXJyZW50TW9udGhcIlxyXG4gICAgICAgIGNsYXNzPVwiZGF5XCJcclxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic2VsZWN0ZWREYXRlICYmIGRheT8uaXNTYW1lKHNlbGVjdGVkRGF0ZSwgJ2RheScpXCJcclxuICAgICAgICAoY2xpY2spPVwic2VsZWN0RGF0ZShkYXkpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiZGF5XCI+e3sgZGF5LmlEYXRlKCkgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSDYstixINmE2KrYrdiv2YrYryDYp9mE2YrZiNmFINin2YTYrdin2YTZiiAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b2RheS1idXR0b25cIj5cclxuICAgICAgPGEgKGNsaWNrKT1cInNlbGVjdFRvZGF5KClcIlxyXG4gICAgICA+2KfZhNmK2YjZhTwvYT5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbiAgYCxcclxuICBzdHlsZXM6IGAuaGlqcmktZGF0ZXBpY2tlci1jb250YWluZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gIH1cclxuXHJcbiAgLmlucHV0LXN2Zy13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAvKiDZhNmF2K3Yp9iw2KfYqSDYp9mE2YXYrdiq2YjZiSDYudmF2YjYr9mK2YvYpyAqL1xyXG4gICAgd2lkdGg6IDEwMCU7IC8qINmG2YHYsyDYudix2LYg2KfZhNit2KfZiNmK2KkgKi9cclxuICB9XHJcblxyXG4gIC5pY29uQ2xlbmRlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBwYWRkaW5nOiAxNC41cHg7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA0cHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItaW5wdXQge1xyXG4gICAgZmxleDogMTsgLyog2YrYo9iu2LAg2KfZhNil2K/Yrtin2YQg2YPYp9mF2YQg2KfZhNi52LHYtiDYp9mE2YXYqtio2YLZiiAqL1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNHB4O1xyXG4gICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuM3MgZWFzZS1pbi1vdXQ7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1pbnB1dDpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lOyAvKiDYpdiy2KfZhNipINin2YTYpdi32KfYsSDYp9mE2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KrYo9ir2YrYsSDYrtmB2YrZgSDYudmG2K8g2KfZhNiq2LHZg9mK2LIgKi9cclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLWljb24ge1xyXG4gICAgd2lkdGg6IDE1cHg7IC8qINmK2YXZg9mGINi22KjYtyDYp9mE2K3YrNmFINit2LPYqCDYp9mE2K3Yp9is2KkgKi9cclxuICAgIGhlaWdodDogMTVweDsgLyog2YbZgdizINin2LHYqtmB2KfYuSDYp9mE2KXYr9iu2KfZhCAqL1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItcG9wdXAge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAxMDAlO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHotaW5kZXg6IDEwMDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDApO1xyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1wb3B1cC5vcGVuIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxKTtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLXBvcHVwLmNsb3NlZCB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMCk7XHJcbiAgfVxyXG5cclxuICAuaGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gIH1cclxuXHJcbiAgLmhlYWRlciBhIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC53ZWVrZGF5cyxcclxuICAuZGF5cyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC53ZWVrZGF5IHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICB9XHJcblxyXG4gIC5kYXkge1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzLCBjb2xvciAwLjNzO1xyXG4gIH1cclxuXHJcbiAgLmRheTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICB9XHJcblxyXG4gIC5kYXkuc2VsZWN0ZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfVxyXG5cclxuICAudG9kYXktYnV0dG9uIHtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gIH1cclxuXHJcbiAgLnRvZGF5LWJ1dHRvbiBhIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgfVxyXG5cclxuICAudG9kYXktYnV0dG9uIGE6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9mE2YTZiNmGINin2YTYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcblxyXG4gIGAsXHJcblxyXG5wcm92aWRlcnM6IFtcclxuICB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEhpanJpRGF0ZXBpY2tlckNvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZSxcclxuICB9LFxyXG5dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SGlqcmlEYXRlcGlja2VyQ29tcG9uZW50IHtcclxuICAvLyBJbnB1dCBwcm9wZXJ0aWVzIHRvIGFsbG93IGN1c3RvbWl6YXRpb24gYnkgdGhlIHVzZXJcclxuICAvLyDYp9mE2YXYr9iu2YTYp9iqINmE2KrYrti12YrYtSDYp9mE2YXZg9mI2YYg2YXZhiDZgtio2YQg2KfZhNmF2LPYqtiu2K/ZhVxyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDsgLy8gVGhlIGluaXRpYWwgdmFsdWUgLyDYp9mE2YLZitmF2Kkg2KfZhNij2YjZhNmK2KlcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7IC8vIEVtaXRzIHZhbHVlIHdoZW4gaXQgY2hhbmdlcyAvINil2LHYs9in2YQg2KfZhNmC2YrZhdipINi52YbYryDYp9mE2KrYutmK2YrYsVxyXG5cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ9in2K7YqtixINiq2KfYsdmK2K4g2YfYrNix2YonOyAvLyBQbGFjZWhvbGRlciB0ZXh0IC8g2KfZhNmG2LUg2KfZhNin2YHYqtix2KfYttmKINmE2YTYrdmC2YRcclxuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nID0gJzI1MHB4JzsgLy8gV2lkdGggb2YgdGhlIGlucHV0IGZpZWxkIC8g2LnYsdi2INin2YTYrdmC2YRcclxuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZyA9ICc0MHB4JzsgLy8gSGVpZ2h0IG9mIHRoZSBpbnB1dCBmaWVsZCAvINin2LHYqtmB2KfYuSDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgSW5wdXRDb2xvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7IC8vIElucHV0IHRleHQgY29sb3IgLyDZhNmI2YYg2KfZhNmG2LUg2YHZiiDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgSW5wdXRCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIElucHV0IGJhY2tncm91bmQgY29sb3IgLyDZhNmI2YYg2K7ZhNmB2YrYqSDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgSWNvbkNvbG9yOiBzdHJpbmcgfCBudWxsPSBudWxsOyAvLyBJY29uIGNvbG9yIC8g2YTZiNmGINin2YTYo9mK2YLZiNmG2KlcclxuICBASW5wdXQoKSBJY29uQmFja2dyb3VuZENvbG9yOiBzdHJpbmd8IG51bGwgPSBudWxsOyAvLyBJY29uIGJhY2tncm91bmQgY29sb3IgLyDZhNmI2YYg2K7ZhNmB2YrYqSDYp9mE2KPZitmC2YjZhtipXHJcbiAgQElucHV0KCkgRGF5Q29sb3I6IHN0cmluZ3wgbnVsbD0gbnVsbDsgLy8gRGF5IGNvbG9yIGluIGNhbGVuZGFyIC8g2YTZiNmGINin2YTYo9mK2KfZhSDZgdmKINin2YTYqtmC2YjZitmFXHJcbiAgQElucHV0KCkgQm9yZGVyQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIEJvcmRlciBjb2xvciBmb3IgaW5wdXQgYW5kIHBvcHVwIC8g2YTZiNmGINin2YTYrdiv2YjYr1xyXG4gIEBJbnB1dCgpIERhdGVwaWNrZXJQb3B1cEhlYWRlckNvbG9yOiBzdHJpbmcgfCBudWxsPSBudWxsOyAvLyBIZWFkZXIgY29sb3IgaW4gdGhlIHBvcHVwIC8g2YTZiNmGINin2YTYsdij2LMg2YHZiiDZhtin2YHYsNipINin2YTYqtmC2YjZitmFXHJcbiAgQElucHV0KCkgZGlzcGxheUZvcm1hdDogc3RyaW5nID0gJ2lZWVlZL2lNL2lEJzsgLy8g2KrZhtiz2YrZgiDYp9mE2KrYp9ix2YrYriDYp9mE2KfZgdiq2LHYp9i22YpcclxuICBASW5wdXQoKSBzdG9yYWdlRm9ybWF0OiBzdHJpbmcgfCBudWxsID0gbnVsbDsgLy8g2KfZhNiq2YbYs9mK2YIg2KfZhNmF2LPYqtiu2K/ZhSDZhNmE2KrYrtiy2YrZhiAo2KfZgdiq2LHYp9i22YrZi9inINmK2YPZiNmGIG51bGwpXHJcbiAgQElucHV0KCkgbG9jYWxlOiAnZW4nIHwgJ2FyJyA9ICdhcic7ICAvLyDYrtmK2KfYsSDZhNin2K7YqtmK2KfYsSDYp9mE2YTYutipICjYp9mB2KrYsdin2LbZijog2LnYsdio2YopXHJcblxyXG4gIHNlbGVjdGVkRGF0ZTogbW9tZW50Lk1vbWVudCB8IG51bGwgPSBudWxsOyAvLyBDdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSAvINin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTsgLy8gVG8gY29udHJvbCB2aXNpYmlsaXR5IG9mIHRoZSBkYXRlcGlja2VyIHBvcHVwIC8g2KfZhNiq2K3Zg9mFINmB2Yog2KXYuNmH2KfYsSDYp9mE2KrZgtmI2YrZhVxyXG4gIGN1cnJlbnRWaWV3RGF0ZTogbW9tZW50Lk1vbWVudCA9IG1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7OyAvLyBDdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoIGluIHRoZSBwb3B1cCAvINin2YTYtNmH2LEg2KfZhNit2KfZhNmKINin2YTZhdi52LHZiNi2XHJcblxyXG4gIG9uQ2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHt9OyAvLyBQbGFjZWhvbGRlciBmb3IgUmVhY3RpdmUgRm9ybXMnIGNoYW5nZSBldmVudCAvINmI2KfYrNmH2Kkg2YTZhNiq2LnYp9mF2YQg2YXYuSDYp9mE2KrYutmK2YrYsdin2Kog2YHZiiBSZWFjdGl2ZSBGb3Jtc1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9OyAvLyBQbGFjZWhvbGRlciBmb3IgUmVhY3RpdmUgRm9ybXMnIHRvdWNoIGV2ZW50IC8g2YjYp9is2YfYqSDZhNmE2KrYudin2YXZhCDZhdi5INmE2YXYs9ipINin2YTYrdmC2YQg2YHZiiBSZWFjdGl2ZSBGb3Jtc1xyXG5cclxuICAvLyDYo9iz2YXYp9ihINin2YTYo9mK2KfZhSAo2KfYrtiq2LXYp9ixKVxyXG4gIC8vIFNob3J0IG5hbWVzIGZvciBkYXlzIG9mIHRoZSB3ZWVrXHJcbiAgZGF5TmFtZXNNaW46IHN0cmluZ1tdID0gWyfYrScsICfZhicsICfYqycsICfYsScsICfYricsICfYrCcsICfYsyddO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIC8vICoqSW5pdGlhbCBzZXR1cCBvbiBjb21wb25lbnQgbG9hZCoqXHJcbiAgLy8gKirYpdi52K/Yp9ivINmF2KjYr9im2Yog2LnZhtivINiq2K3ZhdmK2YQg2KfZhNmF2YPZiNmGKipcclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbW9tZW50KHRoaXMudmFsdWUsIHRoaXMuZGlzcGxheUZvcm1hdCkubG9jYWxlKHRoaXMubG9jYWxlKTs7IC8vIFBhcnNlIHRoZSBpbml0aWFsIHZhbHVlIC8g2KrYrdmI2YrZhCDYp9mE2YLZitmF2Kkg2KfZhNij2YjZhNmK2Kkg2YTYqtin2LHZitiuXHJcbiAgICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5zZWxlY3RlZERhdGUuY2xvbmUoKTsgLy8gU2V0IHRoZSB2aWV3IGRhdGUgdG8gdGhlIHNlbGVjdGVkIGRhdGUgLyDYudix2LYg2KfZhNi02YfYsSDYp9mE2K7Yp9i1INio2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LFcclxuICAgIH1cclxuICB9XHJcbiAgLy8g2KXYsNinINmE2YUg2YrYqtmFINiq2YXYsdmK2LEgYHN0b3JhZ2VGb3JtYXRgINmF2YYg2KfZhNmF2LPYqtiu2K/ZhdiMINmG2LPYqtiu2K/ZhSBgZGlzcGxheUZvcm1hdGAg2YPZgtmK2YXYqSDYp9mB2KrYsdin2LbZitipXHJcbiAgZ2V0IHJlc29sdmVkU3RvcmFnZUZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUZvcm1hdCB8fCB0aGlzLmRpc3BsYXlGb3JtYXQ7XHJcbiAgfVxyXG4gIC8vICoqUHJvcGVydHk6IERpc3BsYXkgdGhlIGN1cnJlbnQgbW9udGgncyBuYW1lIGluIEhpanJpIGZvcm1hdCoqXHJcbiAgLy8gKirYrtin2LXZitipOiDYudix2LYg2KfYs9mFINin2YTYtNmH2LEg2KfZhNit2KfZhNmKINio2KfZhNiq2YbYs9mK2YIg2KfZhNmH2KzYsdmKKipcclxuICBnZXQgY3VycmVudE1vbnRoTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZpZXdEYXRlLmxvY2FsZSh0aGlzLmxvY2FsZSkuZm9ybWF0KCdpTU1NTSBpWVlZWScpOyAvLyBGb3JtYXQgdGhlIGN1cnJlbnQgbW9udGggLyDYtdmK2LrYqSDYp9iz2YUg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2YpcclxuICB9XHJcblxyXG4gIC8vICoqUHJvcGVydHk6IENhbGN1bGF0ZSBhbmQgcmV0dXJuIGRheXMgb2YgdGhlIGN1cnJlbnQgbW9udGgqKlxyXG4gIC8vICoq2K7Yp9i12YrYqTog2K3Ys9in2Kgg2YjYpdix2KzYp9i5INij2YrYp9mFINin2YTYtNmH2LEg2KfZhNit2KfZhNmKKipcclxuICBnZXQgZGF5c0luQ3VycmVudE1vbnRoKCk6IGFueVtdIHtcclxuICAgIGNvbnN0IHN0YXJ0T2ZNb250aCA9IHRoaXMuY3VycmVudFZpZXdEYXRlLmNsb25lKCkuc3RhcnRPZignaU1vbnRoJyk7IC8vIFN0YXJ0IG9mIHRoZSBtb250aCAvINio2K/Yp9mK2Kkg2KfZhNi02YfYsVxyXG4gICAgY29uc3QgZW5kT2ZNb250aCA9IHRoaXMuY3VycmVudFZpZXdEYXRlLmNsb25lKCkuZW5kT2YoJ2lNb250aCcpOyAvLyBFbmQgb2YgdGhlIG1vbnRoIC8g2YbZh9in2YrYqSDYp9mE2LTZh9ixXHJcblxyXG4gICAgY29uc3QgZGF5cyA9IFtdO1xyXG4gICAgY29uc3Qgc3RhcnREYXlPZldlZWsgPSBzdGFydE9mTW9udGguZGF5KCk7IC8vIFRoZSBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoIGluIHRoZSB3ZWVrIC8g2KfZhNmK2YjZhSDYp9mE2KPZiNmEINmF2YYg2KfZhNi02YfYsVxyXG5cclxuICAgIC8vIEFkZCBlbXB0eSBzbG90cyBmb3IgcHJldmlvdXMgbW9udGgncyBkYXlzXHJcbiAgICAvLyDYpdi22KfZgdipINmB2LHYp9i62KfYqiDZhNmE2KPZitin2YUg2KfZhNiq2Yog2KrYs9io2YIg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2YpcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnREYXlPZldlZWs7IGkrKykge1xyXG4gICAgICBkYXlzLnB1c2gobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGFjdHVhbCBkYXlzIG9mIHRoZSBjdXJyZW50IG1vbnRoXHJcbiAgICAvLyDYpdi22KfZgdipINin2YTYo9mK2KfZhSDYp9mE2YHYudmE2YrYqSDZhNmE2LTZh9ixINin2YTYrdin2YTZilxyXG4gICAgY29uc3QgdG90YWxEYXlzID0gZW5kT2ZNb250aC5pRGF0ZSgpO1xyXG4gICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gdG90YWxEYXlzOyBkKyspIHtcclxuICAgICAgZGF5cy5wdXNoKHN0YXJ0T2ZNb250aC5jbG9uZSgpLmlEYXRlKGQpLmxvY2FsZSh0aGlzLmxvY2FsZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXlzO1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IE5hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBtb250aCoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9mE2KfZhtiq2YLYp9mEINil2YTZiSDYp9mE2LTZh9ixINin2YTYs9in2KjZgioqXHJcbiAgcHJldk1vbnRoKCkge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdpTW9udGgnKS5sb2NhbGUodGhpcy5sb2NhbGUpOztcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBtb250aCoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9mE2KfZhtiq2YLYp9mEINil2YTZiSDYp9mE2LTZh9ixINin2YTYqtin2YTZiioqXHJcbiAgbmV4dE1vbnRoKCkge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLmFkZCgxLCAnaU1vbnRoJykubG9jYWxlKHRoaXMubG9jYWxlKTs7XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogU2VsZWN0IGEgc3BlY2lmaWMgZGF0ZSoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9iu2KrZitin2LEg2KrYp9ix2YrYriDZhdi52YrZhioqXHJcbiAgc2VsZWN0RGF0ZShkYXk6IG1vbWVudC5Nb21lbnQgfCBudWxsKSB7XHJcbiAgICBpZiAoZGF5KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF5LmxvY2FsZSh0aGlzLmxvY2FsZSk7XHJcbiAgICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gdGhpcy5zZWxlY3RlZERhdGUuZm9ybWF0KHRoaXMucmVzb2x2ZWRTdG9yYWdlRm9ybWF0KTsgLy8g2KfZhNmC2YrZhdipINmE2KrYrtiy2YrZhtmH2Kcg2YHZiiDZgtin2LnYr9ipINin2YTYqNmK2KfZhtin2KpcclxuICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gdGhpcy5zZWxlY3RlZERhdGUuZm9ybWF0KHRoaXMuZGlzcGxheUZvcm1hdCk7IC8vINin2YTZgtmK2YXYqSDZhNi52LHYttmH2KdcclxuXHJcbiAgICAgIHRoaXMub25DaGFuZ2Uoc3RvcmVkVmFsdWUpOyAvLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYp9mE2YXYrtiy2YbYqSDYpdmE2Ykg2KfZhNmG2YXZiNiw2KxcclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHN0b3JlZFZhbHVlKTsgLy8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2KfZhNmF2K7YstmG2KlcclxuXHJcbiAgICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTsgLy8g2KXYutmE2KfZgiDZhtin2YHYsNipINin2YTYqtmC2YjZitmFXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogVG9nZ2xlIHZpc2liaWxpdHkgb2YgdGhlIGRhdGVwaWNrZXIqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2YHYqtitL9il2LrZhNin2YIg2KfZhNiq2YLZiNmK2YUqKlxyXG4gIHRvZ2dsZURhdGVQaWNrZXIoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlXHJcbiAgICAgID8gdGhpcy5zZWxlY3RlZERhdGUuY2xvbmUoKS5sb2NhbGUodGhpcy5sb2NhbGUpXHJcbiAgICAgIDogbW9tZW50KCk7IC8vIFNldCB0byBjdXJyZW50IGRhdGUgaWYgbm8gZGF0ZSBpcyBzZWxlY3RlZCAvINi52LHYtiDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYpdiw2Kcg2YTZhSDZitiq2YUg2KfYrtiq2YrYp9ixINiq2KfYsdmK2K5cclxuICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSAhdGhpcy5zaG93RGF0ZVBpY2tlcjsgLy8gVG9nZ2xlIHZpc2liaWxpdHkgLyDYqtio2K/ZitmEINin2YTYrdin2YTYqVxyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IENsb3NlIHRoZSBwb3B1cCB3aGVuIGNsaWNraW5nIG91dHNpZGUqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KXYutmE2KfZgiDYp9mE2KrZgtmI2YrZhSDYudmG2K8g2KfZhNmG2YLYsSDYrtin2LHYrCDYp9mE2YXZg9mI2YYqKlxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgb25Eb2N1bWVudENsaWNrKHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBjb25zdCBjbGlja2VkSW5zaWRlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0RWxlbWVudCk7IC8vIENoZWNrIGlmIGNsaWNrIGlzIGluc2lkZSAvINin2YTYqtit2YLZgiDYpdiw2Kcg2YPYp9mGINin2YTZhtmC2LEg2K/Yp9iu2YQg2KfZhNmF2YPZiNmGXHJcbiAgICBpZiAoIWNsaWNrZWRJbnNpZGUpIHtcclxuICAgICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyBDbG9zZSB0aGUgcG9wdXAgLyDYpdi62YTYp9mCINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vICoqUHJvcGVydHk6IERpc3BsYXkgdGhlIHNlbGVjdGVkIGRhdGUgaW4gdGhlIGlucHV0IGZpZWxkKipcclxuICAvLyAqKtiu2KfYtdmK2Kk6INi52LHYtiDYp9mE2KrYp9ix2YrYriDYp9mE2YXYrtiq2KfYsSDZgdmKINin2YTYrdmC2YQqKlxyXG4gIGdldCBkaXNwbGF5ZWREYXRlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZERhdGUgPyB0aGlzLnNlbGVjdGVkRGF0ZS5sb2NhbGUodGhpcy5sb2NhbGUpLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpIDogJyc7IC8vIERpc3BsYXkgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nIC8g2LnYsdi2INin2YTYqtin2LHZitiuINij2Ygg2KrYsdmD2Ycg2YHYp9ix2LrYp9mLXHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogU2VsZWN0IHRvZGF5J3MgZGF0ZSoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9iu2KrZitin2LEg2KrYp9ix2YrYriDYp9mE2YrZiNmFKipcclxuICBzZWxlY3RUb2RheSgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTsgLy8gU2V0IHRoZSBkYXRlIHRvIHRvZGF5IC8g2KrYudmK2YrZhiDYp9mE2KrYp9ix2YrYriDYpdmE2Ykg2KfZhNmK2YjZhVxyXG4gICAgY29uc3Qgc3RvcmVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5mb3JtYXQodGhpcy5yZXNvbHZlZFN0b3JhZ2VGb3JtYXQpO1xyXG4gICAgY29uc3QgZGlzcGxheVZhbHVlID0gdGhpcy5zZWxlY3RlZERhdGUuZm9ybWF0KHRoaXMuZGlzcGxheUZvcm1hdCk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHN0b3JlZFZhbHVlKTsgLy8gRW1pdCB0aGUgdmFsdWUgZm9yIFJlYWN0aXZlIEZvcm1zIC8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2KXZhNmJIFJlYWN0aXZlIEZvcm1zXHJcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoc3RvcmVkVmFsdWUpOyAvLyBFbWl0IHRoZSB2YWx1ZSBmb3Igc3RhbmRhbG9uZSB1c2FnZSAvINil2LHYs9in2YQg2KfZhNmC2YrZhdipINi52YbYryDYp9mE2KfYs9iq2K7Yr9in2YUg2KfZhNmB2LHYr9mKXHJcbiAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vIENsb3NlIHRoZSBwb3B1cCAvINil2LrZhNin2YIg2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gIH1cclxuXHJcbiAgLy8gKipDb250cm9sVmFsdWVBY2Nlc3NvcjogV3JpdGUgYSBuZXcgdmFsdWUqKlxyXG4gIC8vICoq2YjYp9is2YfYqTog2KrYudmK2YrZhiDZgtmK2YXYqSDYrNiv2YrYr9ipKipcclxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh2YWx1ZSwgdGhpcy5yZXNvbHZlZFN0b3JhZ2VGb3JtYXQpLmxvY2FsZSh0aGlzLmxvY2FsZSk7IC8vINiq2K3ZiNmK2YQg2KfZhNmC2YrZhdipINil2YTZiSDZhNit2LjYqSDYqNmG2KfYodmLINi52YTZiSDYp9mE2KrZhtiz2YrZglxyXG4gICAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCk7IC8vIFNldCB0aGUgY3VycmVudCB2aWV3IGRhdGUgLyDYqti52YrZitmGINi52LHYtiDYp9mE2LTZh9ixXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG51bGw7IC8vIENsZWFyIHRoZSBzZWxlY3RlZCBkYXRlIC8g2YXYs9itINin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAqKkNvbnRyb2xWYWx1ZUFjY2Vzc29yOiBSZWdpc3RlciBhIGNoYW5nZSBjYWxsYmFjayoqXHJcbiAgLy8gKirZiNin2KzZh9ipOiDYqtiz2KzZitmEINiv2KfZhNipINiq2LrZitmK2LEg2KfZhNmC2YrZhdipKipcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjsgLy8gU3RvcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIC8g2KrYrtiy2YrZhiDYr9in2YTYqSDYp9mE2KrYutmK2YrYsVxyXG4gIH1cclxuXHJcbiAgLy8gKipDb250cm9sVmFsdWVBY2Nlc3NvcjogUmVnaXN0ZXIgYSB0b3VjaGVkIGNhbGxiYWNrKipcclxuICAvLyAqKtmI2KfYrNmH2Kk6INiq2LPYrNmK2YQg2K/Yp9mE2Kkg2KfZhNmE2YXYsyoqXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjsgLy8gU3RvcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIC8g2KrYrtiy2YrZhiDYr9in2YTYqSDYp9mE2YTZhdizXHJcbiAgfVxyXG59XHJcbiJdfQ==