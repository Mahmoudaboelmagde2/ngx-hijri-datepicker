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
    selectedDate = null; // Currently selected date / التاريخ المختار
    showDatePicker = false; // To control visibility of the datepicker popup / التحكم في إظهار التقويم
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
      >{{todayBtn}}</a>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhpanJpLWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWhpanJpLWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtaGlqcmktZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLE1BQU0sTUFBTSxjQUFjLENBQUM7OztBQW9TbEMsTUFBTSxPQUFPLDJCQUEyQjtJQW1DbEI7SUFsQ3BCLHNEQUFzRDtJQUN0RCx5Q0FBeUM7SUFDaEMsS0FBSyxHQUFrQixJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7SUFDakUsV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDLENBQUMseURBQXlEO0lBRTFILFdBQVcsR0FBVyxpQkFBaUIsQ0FBQyxDQUFDLDBDQUEwQztJQUNuRixLQUFLLEdBQVcsT0FBTyxDQUFDLENBQUMsdUNBQXVDO0lBQ2hFLE1BQU0sR0FBVyxNQUFNLENBQUMsQ0FBQywyQ0FBMkM7SUFDcEUsVUFBVSxHQUFrQixJQUFJLENBQUMsQ0FBQyx1Q0FBdUM7SUFDekUsb0JBQW9CLEdBQWlCLElBQUksQ0FBQyxDQUFDLDJDQUEyQztJQUN0RixTQUFTLEdBQWlCLElBQUksQ0FBQyxDQUFDLDRCQUE0QjtJQUM1RCxtQkFBbUIsR0FBaUIsSUFBSSxDQUFDLENBQUMsNkNBQTZDO0lBQ3ZGLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQzlFLFdBQVcsR0FBaUIsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO0lBQ2xGLDBCQUEwQixHQUFpQixJQUFJLENBQUMsQ0FBQyx5REFB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Ozs7O0dBK0lYLGFBMElRO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDOzRCQUMxRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjsrRUFLVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0ksV0FBVztzQkFBcEIsTUFBTTtnQkFFRSxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQXdHTixlQUFlO3NCQURkLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgT25Jbml0LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LWhpanJpJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtaGlqcmktZGF0ZXBpY2tlcicsXHJcbiAgdGVtcGxhdGU6ICAgYFxyXG48ZGl2XHJcbiAgY2xhc3M9XCJoaWpyaS1kYXRlcGlja2VyLWNvbnRhaW5lclwiXHJcbiAgW25nU3R5bGVdPVwie1xyXG4gICAgd2lkdGg6IHdpZHRoLFxyXG4gIH1cIlxyXG4+XHJcbiAgPCEtLSDYrdmC2YQg2KfZhNil2K/Yrtin2YQgLS0+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJpbnB1dC1zdmctd3JhcHBlclwiXHJcbiAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG59XCJcclxuICA+XHJcbiAgICA8aW5wdXRcclxuICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICBbdmFsdWVdPVwiZGlzcGxheWVkRGF0ZVwiXHJcbiAgICAgIChjbGljayk9XCJ0b2dnbGVEYXRlUGlja2VyKClcIlxyXG4gICAgICByZWFkb25seVxyXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICBjbGFzcz1cImRhdGVwaWNrZXItaW5wdXRcIlxyXG4gICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGJvcmRlckNvbG9yOiBCb3JkZXJDb2xvcixcclxuICAgICAgICBjb2xvcjogSW5wdXRDb2xvcixcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IElucHV0QmFja2dyb3VuZENvbG9yXHJcbiAgICAgIH1cIlxyXG4gICAgLz5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJpY29uQ2xlbmRlclwiXHJcbiAgICAgIChjbGljayk9XCJ0b2dnbGVEYXRlUGlja2VyKClcIlxyXG4gICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBJY29uQmFja2dyb3VuZENvbG9yXHJcbiAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgICA8c3ZnXHJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJJY29uQ29sb3JcIlxyXG4gICAgICAgIHZlcnNpb249XCIxLjFcIlxyXG4gICAgICAgIGlkPVwiQ2FwYV8xXCJcclxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxyXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgNjEwLjM5OCA2MTAuMzk4XCJcclxuICAgICAgICBjbGFzcz1cImRhdGVwaWNrZXItaWNvblwiXHJcbiAgICAgID5cclxuICAgICAgICA8Zz5cclxuICAgICAgICAgIDxnPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTU5LjU2NywwaC0xNS4zMjljLTEuOTU2LDAtMy44MTEsMC40MTEtNS42MDgsMC45OTVjLTguOTc5LDIuOTEyLTE1LjYxNiwxMi40OTgtMTUuNjE2LDIzLjk5N3YxMC41NTJ2MjcuMDA5djE0LjA1MlxyXG4gICAgICAgICAgICAgICBjMCwyLjYxMSwwLjQzNSw1LjA3OCwxLjA2Niw3LjQ0YzIuNzAyLDEwLjE0NiwxMC42NTMsMTcuNTUyLDIwLjE1OCwxNy41NTJoMTUuMzI5YzExLjcyNCwwLDIxLjIyNC0xMS4xODgsMjEuMjI0LTI0Ljk5MlY2Mi41NTNcclxuICAgICAgICAgICAgICAgVjM1LjU0NFYyNC45OTJDMTgwLjc5MSwxMS4xODgsMTcxLjI5MSwwLDE1OS41NjcsMHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNNDYxLjI4OCwwaC0xNS4zMjljLTExLjcyNCwwLTIxLjIyNCwxMS4xODgtMjEuMjI0LDI0Ljk5MnYxMC41NTJ2MjcuMDA5djE0LjA1MmMwLDEzLjgwNCw5LjUsMjQuOTkyLDIxLjIyNCwyNC45OTJcclxuICAgICAgICAgICAgICAgaDE1LjMyOWMxMS43MjQsMCwyMS4yMjQtMTEuMTg4LDIxLjIyNC0yNC45OTJWNjIuNTUzVjM1LjU0NFYyNC45OTJDNDgyLjUwNywxMS4xODgsNDczLjAwNywwLDQ2MS4yODgsMHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNNTM5LjU4Niw2Mi41NTNoLTM3Ljk1NHYxNC4wNTJjMCwyNC4zMjctMTguMTAyLDQ0LjExNy00MC4zNDksNDQuMTE3aC0xNS4zMjljLTIyLjI0NywwLTQwLjM0OS0xOS43OS00MC4zNDktNDQuMTE3XHJcbiAgICAgICAgICAgICAgIFY2Mi41NTNIMTk5LjkxNnYxNC4wNTJjMCwyNC4zMjctMTguMTAyLDQ0LjExNy00MC4zNDksNDQuMTE3aC0xNS4zMjljLTIyLjI0OCwwLTQwLjM0OS0xOS43OS00MC4zNDktNDQuMTE3VjYyLjU1M0g3MC44MThcclxuICAgICAgICAgICAgICAgYy0yMS4wNjYsMC0zOC4xNSwxNi4wMTctMzguMTUsMzUuNzY0djQ3Ni4zMThjMCwxOS43ODQsMTcuMDgzLDM1Ljc2NCwzOC4xNSwzNS43NjRoNDY4Ljc2M2MyMS4wODUsMCwzOC4xNDktMTUuOTg0LDM4LjE0OS0zNS43NjRcclxuICAgICAgICAgICAgICAgVjk4LjMyMkM1NzcuNzM1LDc4LjU3NSw1NjAuNjcxLDYyLjU1Myw1MzkuNTg2LDYyLjU1M3ogTTUyNy43NTcsNTU3LjlsLTQ0Ni41MDItMC4xNzJWMTczLjcxN2g0NDYuNTAyVjU1Ny45elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDI2Ni4yNThoMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTc5LDE4LjQzNy0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzctMjIuNzU5SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMzM0LjU4LDI1Ni4wNzQsMzQyLjgyMywyNjYuMjU4LDM1My4wMTcsMjY2LjI1OHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNywzNDguNDY3aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE3OSwxOC40MzctMjIuNzU5YzAtMTIuNTc5LTguMjQ4LTIyLjc1OC0xOC40MzctMjIuNzU4SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NThDMzM0LjU4LDMzOC4yODgsMzQyLjgyMywzNDguNDY3LDM1My4wMTcsMzQ4LjQ2N3pcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMzUzLjAxNyw0MzAuNjc2aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE4LDE4LjQzNy0yMi43NTlzLTguMjQ4LTIyLjc1OS0xOC40MzctMjIuNzU5SDM1My4wMTdcclxuICAgICAgICAgICAgICAgYy0xMC4xOTMsMC0xOC40MzcsMTAuMTgtMTguNDM3LDIyLjc1OVMzNDIuODIzLDQzMC42NzYsMzUzLjAxNyw0MzAuNjc2elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDUxMi44OWgxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xOCwxOC40MzctMjIuNzU5YzAtMTIuNTgtOC4yNDgtMjIuNzU5LTE4LjQzNy0yMi43NTlIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMzMzQuNTgsNTAyLjcxLDM0Mi44MjMsNTEyLjg5LDM1My4wMTcsNTEyLjg5elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDI2Ni4yNThIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xNzksMTguNDM2LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNi0yMi43NTlIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMxMjYuNTk2LDI1Ni4wNzQsMTM0LjgzOCwyNjYuMjU4LDE0NS4wMzIsMjY2LjI1OHpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiwzNDguNDY3SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTc5LDE4LjQzNi0yMi43NTljMC0xMi41NzktOC4yNDgtMjIuNzU4LTE4LjQzNi0yMi43NThIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OEMxMjYuNTk2LDMzOC4yODgsMTM0LjgzOCwzNDguNDY3LDE0NS4wMzIsMzQ4LjQ2N3pcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiw0MzAuNjc2SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTgsMTguNDM2LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNi0yMi43NTlIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xOC0xOC40MzcsMjIuNzU5UzEzNC44MzgsNDMwLjY3NiwxNDUuMDMyLDQzMC42NzZ6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsNTEyLjg5SDI2Mi40NmMxMC4xOTMsMCwxOC40MzYtMTAuMTgsMTguNDM2LTIyLjc1OWMwLTEyLjU4LTguMjQ4LTIyLjc1OS0xOC40MzYtMjIuNzU5SDE0NS4wMzJcclxuICAgICAgICAgICAgICAgYy0xMC4xOTQsMC0xOC40MzcsMTAuMTc5LTE4LjQzNywyMi43NTlDMTI2LjU5Niw1MDIuNzEsMTM0LjgzOCw1MTIuODksMTQ1LjAzMiw1MTIuODl6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZz5cclxuICAgICAgICA8L2c+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSDYp9mE2KrZgtmI2YrZhSAtLT5cclxuICA8ZGl2XHJcbiAgICBjbGFzcz1cImRhdGVwaWNrZXItcG9wdXBcIlxyXG4gICAgW2NsYXNzLm9wZW5dPVwic2hvd0RhdGVQaWNrZXJcIlxyXG4gICAgW2NsYXNzLmNsb3NlZF09XCIhc2hvd0RhdGVQaWNrZXJcIlxyXG4gICAgW25nU3R5bGVdPVwie1xyXG4gICAgYm9yZGVyQ29sb3I6IEJvcmRlckNvbG9yXHJcbiAgICAgIH1cIlxyXG4gID5cclxuICAgIDwhLS0g2LnZhtmI2KfZhiDYp9mE2LTZh9ixINmI2KPYstix2KfYsSDYp9mE2KrZhtmC2YQgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgIDxhIChjbGljayk9XCJwcmV2TW9udGgoKVwiPiZsdDs8L2E+XHJcbiAgICAgIDxzcGFuICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIGNvbG9yOiBEYXlDb2xvclxyXG4gICAgICB9XCI+e3sgY3VycmVudE1vbnRoTmFtZSB9fTwvc3Bhbj5cclxuICAgICAgPGEgKGNsaWNrKT1cIm5leHRNb250aCgpXCI+Jmd0OzwvYT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0g2KPYs9mF2KfYoSDYo9mK2KfZhSDYp9mE2KPYs9io2YjYuSAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJ3ZWVrZGF5c1wiPlxyXG4gICAgICA8ZGl2ICAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBjb2xvcjogRGF0ZXBpY2tlclBvcHVwSGVhZGVyQ29sb3JcclxuICAgICAgfVwiICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5TmFtZXNNaW5cIiBjbGFzcz1cIndlZWtkYXlcIj57eyBkYXkgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0g2LnYsdi2INij2YrYp9mFINin2YTYtNmH2LEgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGF5c1wiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzSW5DdXJyZW50TW9udGhcIlxyXG4gICAgICAgIGNsYXNzPVwiZGF5XCJcclxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic2VsZWN0ZWREYXRlICYmIGRheT8uaXNTYW1lKHNlbGVjdGVkRGF0ZSwgJ2RheScpXCJcclxuICAgICAgICAoY2xpY2spPVwic2VsZWN0RGF0ZShkYXkpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiZGF5XCI+e3sgZGF5LmlEYXRlKCkgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSDYstixINmE2KrYrdiv2YrYryDYp9mE2YrZiNmFINin2YTYrdin2YTZiiAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b2RheS1idXR0b25cIj5cclxuICAgICAgPGEgKGNsaWNrKT1cInNlbGVjdFRvZGF5KClcIlxyXG4gICAgICA+e3t0b2RheUJ0bn19PC9hPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuICBgLFxyXG4gIHN0eWxlczogYC5oaWpyaS1kYXRlcGlja2VyLWNvbnRhaW5lciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgfVxyXG5cclxuICAuaW5wdXQtc3ZnLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IC8qINmE2YXYrdin2LDYp9ipINin2YTZhdit2KrZiNmJINi52YXZiNiv2YrZi9inICovXHJcbiAgICB3aWR0aDogMTAwJTsgLyog2YbZgdizINi52LHYtiDYp9mE2K3Yp9mI2YrYqSAqL1xyXG4gIH1cclxuXHJcbiAgLmljb25DbGVuZGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIHBhZGRpbmc6IDE0LjVweDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1pbnB1dCB7XHJcbiAgICBmbGV4OiAxOyAvKiDZitij2K7YsCDYp9mE2KXYr9iu2KfZhCDZg9in2YXZhCDYp9mE2LnYsdi2INin2YTZhdiq2KjZgtmKICovXHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4zcyBlYXNlLWluLW91dDtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLWlucHV0OmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmU7IC8qINil2LLYp9mE2Kkg2KfZhNil2LfYp9ixINin2YTYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBib3gtc2hhZG93OiAwIDAgNHB4IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYqtij2KvZitixINiu2YHZitmBINi52YbYryDYp9mE2KrYsdmD2YrYsiAqL1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItaWNvbiB7XHJcbiAgICB3aWR0aDogMTVweDsgLyog2YrZhdmD2YYg2LbYqNi3INin2YTYrdis2YUg2K3Ys9ioINin2YTYrdin2KzYqSAqL1xyXG4gICAgaGVpZ2h0OiAxNXB4OyAvKiDZhtmB2LMg2KfYsdiq2YHYp9i5INin2YTYpdiv2K7Yp9mEICovXHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1wb3B1cCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDEwMCU7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgei1pbmRleDogMTAwMDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMCk7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3A7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLXBvcHVwLm9wZW4ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItcG9wdXAuY2xvc2VkIHtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwKTtcclxuICB9XHJcblxyXG4gIC5oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgfVxyXG5cclxuICAuaGVhZGVyIGEge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLndlZWtkYXlzLFxyXG4gIC5kYXlzIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLndlZWtkYXkge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gIH1cclxuXHJcbiAgLmRheSB7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MsIGNvbG9yIDAuM3M7XHJcbiAgfVxyXG5cclxuICAuZGF5OmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuXHJcbiAgLmRheS5zZWxlY3RlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcblxyXG4gIC50b2RheS1idXR0b24ge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAudG9kYXktYnV0dG9uIGEge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICBjb2xvcjogIzAwMDtcclxuICB9XHJcblxyXG4gIC50b2RheS1idXR0b24gYTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2YTZhNmI2YYg2KfZhNin2YHYqtix2KfYttmKICovXHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuXHJcbiAgYCxcclxuXHJcbnByb3ZpZGVyczogW1xyXG4gIHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4SGlqcmlEYXRlcGlja2VyQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlLFxyXG4gIH0sXHJcbl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIaWpyaURhdGVwaWNrZXJDb21wb25lbnQge1xyXG4gIC8vIElucHV0IHByb3BlcnRpZXMgdG8gYWxsb3cgY3VzdG9taXphdGlvbiBieSB0aGUgdXNlclxyXG4gIC8vINin2YTZhdiv2K7ZhNin2Kog2YTYqtiu2LXZiti1INin2YTZhdmD2YjZhiDZhdmGINmC2KjZhCDYp9mE2YXYs9iq2K7Yr9mFXHJcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsOyAvLyBUaGUgaW5pdGlhbCB2YWx1ZSAvINin2YTZgtmK2YXYqSDYp9mE2KPZiNmE2YrYqVxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTsgLy8gRW1pdHMgdmFsdWUgd2hlbiBpdCBjaGFuZ2VzIC8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2LnZhtivINin2YTYqti62YrZitixXHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAn2KfYrtiq2LEg2KrYp9ix2YrYriDZh9is2LHZiic7IC8vIFBsYWNlaG9sZGVyIHRleHQgLyDYp9mE2YbYtSDYp9mE2KfZgdiq2LHYp9i22Yog2YTZhNit2YLZhFxyXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmcgPSAnMjUwcHgnOyAvLyBXaWR0aCBvZiB0aGUgaW5wdXQgZmllbGQgLyDYudix2LYg2KfZhNit2YLZhFxyXG4gIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nID0gJzQwcHgnOyAvLyBIZWlnaHQgb2YgdGhlIGlucHV0IGZpZWxkIC8g2KfYsdiq2YHYp9i5INin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJbnB1dENvbG9yOiBzdHJpbmcgfCBudWxsID0gbnVsbDsgLy8gSW5wdXQgdGV4dCBjb2xvciAvINmE2YjZhiDYp9mE2YbYtSDZgdmKINin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJbnB1dEJhY2tncm91bmRDb2xvcjogc3RyaW5nIHwgbnVsbD0gbnVsbDsgLy8gSW5wdXQgYmFja2dyb3VuZCBjb2xvciAvINmE2YjZhiDYrtmE2YHZitipINin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJY29uQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIEljb24gY29sb3IgLyDZhNmI2YYg2KfZhNij2YrZgtmI2YbYqVxyXG4gIEBJbnB1dCgpIEljb25CYWNrZ3JvdW5kQ29sb3I6IHN0cmluZ3wgbnVsbCA9IG51bGw7IC8vIEljb24gYmFja2dyb3VuZCBjb2xvciAvINmE2YjZhiDYrtmE2YHZitipINin2YTYo9mK2YLZiNmG2KlcclxuICBASW5wdXQoKSBEYXlDb2xvcjogc3RyaW5nfCBudWxsPSBudWxsOyAvLyBEYXkgY29sb3IgaW4gY2FsZW5kYXIgLyDZhNmI2YYg2KfZhNij2YrYp9mFINmB2Yog2KfZhNiq2YLZiNmK2YVcclxuICBASW5wdXQoKSBCb3JkZXJDb2xvcjogc3RyaW5nIHwgbnVsbD0gbnVsbDsgLy8gQm9yZGVyIGNvbG9yIGZvciBpbnB1dCBhbmQgcG9wdXAgLyDZhNmI2YYg2KfZhNit2K/ZiNivXHJcbiAgQElucHV0KCkgRGF0ZXBpY2tlclBvcHVwSGVhZGVyQ29sb3I6IHN0cmluZyB8IG51bGw9IG51bGw7IC8vIEhlYWRlciBjb2xvciBpbiB0aGUgcG9wdXAgLyDZhNmI2YYg2KfZhNix2KPYsyDZgdmKINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICBASW5wdXQoKSBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcgPSAnaVlZWVkvaU0vaUQnOyAvLyDYqtmG2LPZitmCINin2YTYqtin2LHZitiuINin2YTYp9mB2KrYsdin2LbZilxyXG4gIEBJbnB1dCgpIHN0b3JhZ2VGb3JtYXQ6IHN0cmluZyB8IG51bGwgPSBudWxsOyAvLyDYp9mE2KrZhtiz2YrZgiDYp9mE2YXYs9iq2K7Yr9mFINmE2YTYqtiu2LLZitmGICjYp9mB2KrYsdin2LbZitmL2Kcg2YrZg9mI2YYgbnVsbClcclxuICBASW5wdXQoKSBsb2NhbGU6ICdlbicgfCAnYXItU0EnID0gJ2FyLVNBJzsgIC8vINiu2YrYp9ixINmE2KfYrtiq2YrYp9ixINin2YTZhNi62KkgKNin2YHYqtix2KfYttmKOiDYudix2KjZiilcclxuXHJcbiAgc2VsZWN0ZWREYXRlOiBtb21lbnQuTW9tZW50IHwgbnVsbCA9IG51bGw7IC8vIEN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIC8g2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LFcclxuICBzaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyBUbyBjb250cm9sIHZpc2liaWxpdHkgb2YgdGhlIGRhdGVwaWNrZXIgcG9wdXAgLyDYp9mE2KrYrdmD2YUg2YHZiiDYpdi42YfYp9ixINin2YTYqtmC2YjZitmFXHJcbiAgY3VycmVudFZpZXdEYXRlOiBtb21lbnQuTW9tZW50ID0gbW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTs7IC8vIEN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGggaW4gdGhlIHBvcHVwIC8g2KfZhNi02YfYsSDYp9mE2K3Yp9mE2Yog2KfZhNmF2LnYsdmI2LZcclxuICB0b2RheUJ0bjpzdHJpbmcgPSAn2KfZhNmK2YjZhSdcclxuICBvbkNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyBjaGFuZ2UgZXZlbnQgLyDZiNin2KzZh9ipINmE2YTYqti52KfZhdmEINmF2Lkg2KfZhNiq2LrZitmK2LHYp9iqINmB2YogUmVhY3RpdmUgRm9ybXNcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyB0b3VjaCBldmVudCAvINmI2KfYrNmH2Kkg2YTZhNiq2LnYp9mF2YQg2YXYuSDZhNmF2LPYqSDYp9mE2K3ZgtmEINmB2YogUmVhY3RpdmUgRm9ybXNcclxuXHJcbiAgLy8g2KPYs9mF2KfYoSDYp9mE2KPZitin2YUgKNin2K7Yqti12KfYsSlcclxuICAvLyBTaG9ydCBuYW1lcyBmb3IgZGF5cyBvZiB0aGUgd2Vla1xyXG4gIC8vIEdldHRlciDZhNiq2K3Yr9mK2K8g2KPYs9mF2KfYoSDYp9mE2KPZitin2YUg2KjZhtin2KHZiyDYudmE2Ykg2KfZhNmE2LrYqVxyXG4gIGdldCBkYXlOYW1lc01pbigpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2NhbGUgPT09ICdhci1TQSdcclxuICAgICAgPyBbJ9itJywgJ9mGJywgJ9irJywgJ9ixJywgJ9iuJywgJ9isJywgJ9izJ10gIC8vINi52LHYqNmKXHJcbiAgICAgIDogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddOyAgLy8g2KXZhtis2YTZitiy2YpcclxuICB9XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAvLyAqKkluaXRpYWwgc2V0dXAgb24gY29tcG9uZW50IGxvYWQqKlxyXG4gIC8vICoq2KXYudiv2KfYryDZhdio2K/YptmKINi52YbYryDYqtit2YXZitmEINin2YTZhdmD2YjZhioqXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBtb21lbnQubG9jYWxlKHRoaXMubG9jYWxlKTsgIC8vINi22KjYtyBsb2NhbGUg2KjZhtin2KHZiyDYudmE2Ykg2KfZhNmE2LrYqSDYp9mE2YXYrtiq2KfYsdipXHJcbiAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh0aGlzLnZhbHVlLCB0aGlzLmRpc3BsYXlGb3JtYXQpLmxvY2FsZSh0aGlzLmxvY2FsZSk7OyAvLyBQYXJzZSB0aGUgaW5pdGlhbCB2YWx1ZSAvINiq2K3ZiNmK2YQg2KfZhNmC2YrZhdipINin2YTYo9mI2YTZitipINmE2KrYp9ix2YrYrlxyXG4gICAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCk7IC8vIFNldCB0aGUgdmlldyBkYXRlIHRvIHRoZSBzZWxlY3RlZCBkYXRlIC8g2LnYsdi2INin2YTYtNmH2LEg2KfZhNiu2KfYtSDYqNin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmxvY2FsZSA9PSAnZW4nKVxyXG4gICAgICB0aGlzLnRvZGF5QnRuID0gJ1RvZGF5J1xyXG4gIH1cclxuICAvLyDYpdiw2Kcg2YTZhSDZitiq2YUg2KrZhdix2YrYsSBgc3RvcmFnZUZvcm1hdGAg2YXZhiDYp9mE2YXYs9iq2K7Yr9mF2Iwg2YbYs9iq2K7Yr9mFIGBkaXNwbGF5Rm9ybWF0YCDZg9mC2YrZhdipINin2YHYqtix2KfYttmK2KlcclxuICBnZXQgcmVzb2x2ZWRTdG9yYWdlRm9ybWF0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlRm9ybWF0IHx8IHRoaXMuZGlzcGxheUZvcm1hdDtcclxuICB9XHJcbiAgLy8gKipQcm9wZXJ0eTogRGlzcGxheSB0aGUgY3VycmVudCBtb250aCdzIG5hbWUgaW4gSGlqcmkgZm9ybWF0KipcclxuICAvLyAqKtiu2KfYtdmK2Kk6INi52LHYtiDYp9iz2YUg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2Yog2KjYp9mE2KrZhtiz2YrZgiDYp9mE2YfYrNix2YoqKlxyXG4gIGdldCBjdXJyZW50TW9udGhOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Vmlld0RhdGUubG9jYWxlKHRoaXMubG9jYWxlKS5mb3JtYXQoJ2lNTU1NIGlZWVlZJyk7IC8vIEZvcm1hdCB0aGUgY3VycmVudCBtb250aCAvINi12YrYutipINin2LPZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZilxyXG4gIH1cclxuXHJcbiAgLy8gKipQcm9wZXJ0eTogQ2FsY3VsYXRlIGFuZCByZXR1cm4gZGF5cyBvZiB0aGUgY3VycmVudCBtb250aCoqXHJcbiAgLy8gKirYrtin2LXZitipOiDYrdiz2KfYqCDZiNil2LHYrNin2Lkg2KPZitin2YUg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2YoqKlxyXG4gIGdldCBkYXlzSW5DdXJyZW50TW9udGgoKTogYW55W10ge1xyXG4gICAgY29uc3Qgc3RhcnRPZk1vbnRoID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5zdGFydE9mKCdpTW9udGgnKTsgLy8gU3RhcnQgb2YgdGhlIG1vbnRoIC8g2KjYr9in2YrYqSDYp9mE2LTZh9ixXHJcbiAgICBjb25zdCBlbmRPZk1vbnRoID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5lbmRPZignaU1vbnRoJyk7IC8vIEVuZCBvZiB0aGUgbW9udGggLyDZhtmH2KfZitipINin2YTYtNmH2LFcclxuXHJcbiAgICBjb25zdCBkYXlzID0gW107XHJcbiAgICBjb25zdCBzdGFydERheU9mV2VlayA9IHN0YXJ0T2ZNb250aC5kYXkoKTsgLy8gVGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGggaW4gdGhlIHdlZWsgLyDYp9mE2YrZiNmFINin2YTYo9mI2YQg2YXZhiDYp9mE2LTZh9ixXHJcblxyXG4gICAgLy8gQWRkIGVtcHR5IHNsb3RzIGZvciBwcmV2aW91cyBtb250aCdzIGRheXNcclxuICAgIC8vINil2LbYp9mB2Kkg2YHYsdin2LrYp9iqINmE2YTYo9mK2KfZhSDYp9mE2KrZiiDYqtiz2KjZgiDYp9mE2LTZh9ixINin2YTYrdin2YTZilxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydERheU9mV2VlazsgaSsrKSB7XHJcbiAgICAgIGRheXMucHVzaChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYWN0dWFsIGRheXMgb2YgdGhlIGN1cnJlbnQgbW9udGhcclxuICAgIC8vINil2LbYp9mB2Kkg2KfZhNij2YrYp9mFINin2YTZgdi52YTZitipINmE2YTYtNmH2LEg2KfZhNit2KfZhNmKXHJcbiAgICBjb25zdCB0b3RhbERheXMgPSBlbmRPZk1vbnRoLmlEYXRlKCk7XHJcbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSB0b3RhbERheXM7IGQrKykge1xyXG4gICAgICBkYXlzLnB1c2goc3RhcnRPZk1vbnRoLmNsb25lKCkuaURhdGUoZCkubG9jYWxlKHRoaXMubG9jYWxlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRheXM7XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogTmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIG1vbnRoKipcclxuICAvLyAqKti32LHZitmC2Kk6INin2YTYp9mG2KrZgtin2YQg2KXZhNmJINin2YTYtNmH2LEg2KfZhNiz2KfYqNmCKipcclxuICBwcmV2TW9udGgoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuY3VycmVudFZpZXdEYXRlLmNsb25lKCkuc3VidHJhY3QoMSwgJ2lNb250aCcpLmxvY2FsZSh0aGlzLmxvY2FsZSk7O1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IE5hdmlnYXRlIHRvIHRoZSBuZXh0IG1vbnRoKipcclxuICAvLyAqKti32LHZitmC2Kk6INin2YTYp9mG2KrZgtin2YQg2KXZhNmJINin2YTYtNmH2LEg2KfZhNiq2KfZhNmKKipcclxuICBuZXh0TW9udGgoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuY3VycmVudFZpZXdEYXRlLmNsb25lKCkuYWRkKDEsICdpTW9udGgnKS5sb2NhbGUodGhpcy5sb2NhbGUpOztcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBTZWxlY3QgYSBzcGVjaWZpYyBkYXRlKipcclxuICAvLyAqKti32LHZitmC2Kk6INin2K7YqtmK2KfYsSDYqtin2LHZitiuINmF2LnZitmGKipcclxuICBzZWxlY3REYXRlKGRheTogbW9tZW50Lk1vbWVudCB8IG51bGwpIHtcclxuICAgIGlmIChkYXkpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXkubG9jYWxlKHRoaXMubG9jYWxlKTtcclxuICAgICAgY29uc3Qgc3RvcmVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5mb3JtYXQodGhpcy5yZXNvbHZlZFN0b3JhZ2VGb3JtYXQpOyAvLyDYp9mE2YLZitmF2Kkg2YTYqtiu2LLZitmG2YfYpyDZgdmKINmC2KfYudiv2Kkg2KfZhNio2YrYp9mG2KfYqlxyXG4gICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5mb3JtYXQodGhpcy5kaXNwbGF5Rm9ybWF0KTsgLy8g2KfZhNmC2YrZhdipINmE2LnYsdi22YfYp1xyXG5cclxuICAgICAgdGhpcy5vbkNoYW5nZShzdG9yZWRWYWx1ZSk7IC8vINil2LHYs9in2YQg2KfZhNmC2YrZhdipINin2YTZhdiu2LLZhtipINil2YTZiSDYp9mE2YbZhdmI2LDYrFxyXG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoc3RvcmVkVmFsdWUpOyAvLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYp9mE2YXYrtiy2YbYqVxyXG5cclxuICAgICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyDYpdi62YTYp9mCINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBUb2dnbGUgdmlzaWJpbGl0eSBvZiB0aGUgZGF0ZXBpY2tlcioqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDZgdiq2K0v2KXYutmE2KfZgiDYp9mE2KrZgtmI2YrZhSoqXHJcbiAgdG9nZ2xlRGF0ZVBpY2tlcigpIHtcclxuICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5zZWxlY3RlZERhdGVcclxuICAgICAgPyB0aGlzLnNlbGVjdGVkRGF0ZS5jbG9uZSgpLmxvY2FsZSh0aGlzLmxvY2FsZSlcclxuICAgICAgOiBtb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpOyAvLyBTZXQgdG8gY3VycmVudCBkYXRlIGlmIG5vIGRhdGUgaXMgc2VsZWN0ZWQgLyDYudix2LYg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2Yog2KXYsNinINmE2YUg2YrYqtmFINin2K7YqtmK2KfYsSDYqtin2LHZitiuXHJcbiAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gIXRoaXMuc2hvd0RhdGVQaWNrZXI7IC8vIFRvZ2dsZSB2aXNpYmlsaXR5IC8g2KrYqNiv2YrZhCDYp9mE2K3Yp9mE2KlcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBDbG9zZSB0aGUgcG9wdXAgd2hlbiBjbGlja2luZyBvdXRzaWRlKipcclxuICAvLyAqKti32LHZitmC2Kk6INil2LrZhNin2YIg2KfZhNiq2YLZiNmK2YUg2LnZhtivINin2YTZhtmC2LEg2K7Yp9ix2Kwg2KfZhNmF2YPZiNmGKipcclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gIG9uRG9jdW1lbnRDbGljayh0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgY29uc3QgY2xpY2tlZEluc2lkZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpOyAvLyBDaGVjayBpZiBjbGljayBpcyBpbnNpZGUgLyDYp9mE2KrYrdmC2YIg2KXYsNinINmD2KfZhiDYp9mE2YbZgtixINiv2KfYrtmEINin2YTZhdmD2YjZhlxyXG4gICAgaWYgKCFjbGlja2VkSW5zaWRlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTsgLy8gQ2xvc2UgdGhlIHBvcHVwIC8g2KXYutmE2KfZgiDZhtin2YHYsNipINin2YTYqtmC2YjZitmFXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAqKlByb3BlcnR5OiBEaXNwbGF5IHRoZSBzZWxlY3RlZCBkYXRlIGluIHRoZSBpbnB1dCBmaWVsZCoqXHJcbiAgLy8gKirYrtin2LXZitipOiDYudix2LYg2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LEg2YHZiiDYp9mE2K3ZgtmEKipcclxuICBnZXQgZGlzcGxheWVkRGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWREYXRlID8gdGhpcy5zZWxlY3RlZERhdGUubG9jYWxlKHRoaXMubG9jYWxlKS5mb3JtYXQodGhpcy5kaXNwbGF5Rm9ybWF0KSA6ICcnOyAvLyBEaXNwbGF5IGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZyAvINi52LHYtiDYp9mE2KrYp9ix2YrYriDYo9mIINiq2LHZg9mHINmB2KfYsdi62KfZi1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IFNlbGVjdCB0b2RheSdzIGRhdGUqKlxyXG4gIC8vICoq2LfYsdmK2YLYqTog2KfYrtiq2YrYp9ixINiq2KfYsdmK2K4g2KfZhNmK2YjZhSoqXHJcbiAgc2VsZWN0VG9kYXkoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7IC8vIFNldCB0aGUgZGF0ZSB0byB0b2RheSAvINiq2LnZitmK2YYg2KfZhNiq2KfYsdmK2K4g2KXZhNmJINin2YTZitmI2YVcclxuICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gdGhpcy5zZWxlY3RlZERhdGUuZm9ybWF0KHRoaXMucmVzb2x2ZWRTdG9yYWdlRm9ybWF0KTtcclxuICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShzdG9yZWRWYWx1ZSk7IC8vIEVtaXQgdGhlIHZhbHVlIGZvciBSZWFjdGl2ZSBGb3JtcyAvINil2LHYs9in2YQg2KfZhNmC2YrZhdipINil2YTZiSBSZWFjdGl2ZSBGb3Jtc1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHN0b3JlZFZhbHVlKTsgLy8gRW1pdCB0aGUgdmFsdWUgZm9yIHN0YW5kYWxvbmUgdXNhZ2UgLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYudmG2K8g2KfZhNin2LPYqtiu2K/Yp9mFINin2YTZgdix2K/ZilxyXG4gICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyBDbG9zZSB0aGUgcG9wdXAgLyDYpdi62YTYp9mCINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICB9XHJcblxyXG4gIC8vICoqQ29udHJvbFZhbHVlQWNjZXNzb3I6IFdyaXRlIGEgbmV3IHZhbHVlKipcclxuICAvLyAqKtmI2KfYrNmH2Kk6INiq2LnZitmK2YYg2YLZitmF2Kkg2KzYr9mK2K/YqSoqXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBtb21lbnQodmFsdWUsIHRoaXMucmVzb2x2ZWRTdG9yYWdlRm9ybWF0KS5sb2NhbGUodGhpcy5sb2NhbGUpOyAvLyDYqtit2YjZitmEINin2YTZgtmK2YXYqSDYpdmE2Ykg2YTYrdi42Kkg2KjZhtin2KHZiyDYudmE2Ykg2KfZhNiq2YbYs9mK2YJcclxuICAgICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZS5jbG9uZSgpOyAvLyBTZXQgdGhlIGN1cnJlbnQgdmlldyBkYXRlIC8g2KrYudmK2YrZhiDYudix2LYg2KfZhNi02YfYsVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBudWxsOyAvLyBDbGVhciB0aGUgc2VsZWN0ZWQgZGF0ZSAvINmF2LPYrSDYp9mE2KrYp9ix2YrYriDYp9mE2YXYrtiq2KfYsVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gKipDb250cm9sVmFsdWVBY2Nlc3NvcjogUmVnaXN0ZXIgYSBjaGFuZ2UgY2FsbGJhY2sqKlxyXG4gIC8vICoq2YjYp9is2YfYqTog2KrYs9is2YrZhCDYr9in2YTYqSDYqti62YrZitixINin2YTZgtmK2YXYqSoqXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47IC8vIFN0b3JlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiAvINiq2K7YstmK2YYg2K/Yp9mE2Kkg2KfZhNiq2LrZitmK2LFcclxuICB9XHJcblxyXG4gIC8vICoqQ29udHJvbFZhbHVlQWNjZXNzb3I6IFJlZ2lzdGVyIGEgdG91Y2hlZCBjYWxsYmFjayoqXHJcbiAgLy8gKirZiNin2KzZh9ipOiDYqtiz2KzZitmEINiv2KfZhNipINin2YTZhNmF2LMqKlxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47IC8vIFN0b3JlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiAvINiq2K7YstmK2YYg2K/Yp9mE2Kkg2KfZhNmE2YXYs1xyXG4gIH1cclxufVxyXG4iXX0=