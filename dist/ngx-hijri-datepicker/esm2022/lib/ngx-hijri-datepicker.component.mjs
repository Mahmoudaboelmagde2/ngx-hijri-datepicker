import { Component, HostListener, Input, Output, EventEmitter, } from '@angular/core';
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
    InputColor = '#000'; // Input text color / لون النص في الحقل
    InputBackgroundColor = '#fff'; // Input background color / لون خلفية الحقل
    IconColor = '#fff'; // Icon color / لون الأيقونة
    IconBackgroundColor = '#000'; // Icon background color / لون خلفية الأيقونة
    DayColor = '#000'; // Day color in calendar / لون الأيام في التقويم
    BorderColor = '#000'; // Border color for input and popup / لون الحدود
    DatepickerPopupHeaderColor = '#000'; // Header color in the popup / لون الرأس في نافذة التقويم
    displayFormat = 'iYYYY/iM/iD'; // تنسيق التاريخ الافتراضي
    storageFormat = null; // التنسيق المستخدم للتخزين (افتراضيًا يكون null)
    selectedDate = null; // Currently selected date / التاريخ المختار
    showDatePicker = false; // To control visibility of the datepicker popup / التحكم في إظهار التقويم
    currentViewDate = moment(); // Currently displayed month in the popup / الشهر الحالي المعروض
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
            this.selectedDate = moment(this.value, this.displayFormat); // Parse the initial value / تحويل القيمة الأولية لتاريخ
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
        return this.currentViewDate.format('iMMMM iYYYY'); // Format the current month / صيغة اسم الشهر الحالي
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
            days.push(startOfMonth.clone().iDate(d));
        }
        return days;
    }
    // **Method: Navigate to the previous month**
    // **طريقة: الانتقال إلى الشهر السابق**
    prevMonth() {
        this.currentViewDate = this.currentViewDate.clone().subtract(1, 'iMonth');
    }
    // **Method: Navigate to the next month**
    // **طريقة: الانتقال إلى الشهر التالي**
    nextMonth() {
        this.currentViewDate = this.currentViewDate.clone().add(1, 'iMonth');
    }
    // **Method: Select a specific date**
    // **طريقة: اختيار تاريخ معين**
    selectDate(day) {
        if (day) {
            this.selectedDate = day;
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
            ? this.selectedDate.clone()
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
        return this.selectedDate ? this.selectedDate.format(this.displayFormat) : ''; // Display formatted date or empty string / عرض التاريخ أو تركه فارغاً
    }
    // **Method: Select today's date**
    // **طريقة: اختيار تاريخ اليوم**
    selectToday() {
        this.selectedDate = moment(); // Set the date to today / تعيين التاريخ إلى اليوم
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
            this.selectedDate = moment(value, this.resolvedStorageFormat); // تحويل القيمة إلى لحظة بناءً على التنسيق
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: NgxHijriDatepickerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: NgxHijriDatepickerComponent, selector: "lib-ngx-hijri-datepicker", inputs: { value: "value", placeholder: "placeholder", width: "width", height: "height", InputColor: "InputColor", InputBackgroundColor: "InputBackgroundColor", IconColor: "IconColor", IconBackgroundColor: "IconBackgroundColor", DayColor: "DayColor", BorderColor: "BorderColor", DatepickerPopupHeaderColor: "DatepickerPopupHeaderColor", displayFormat: "displayFormat", storageFormat: "storageFormat" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "document:click": "onDocumentClick($event.target)" } }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: NgxHijriDatepickerComponent, decorators: [{
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

  `, styles: [".hijri-datepicker-container{position:relative;display:inline-block;width:250px}.input-svg-wrapper{display:flex;align-items:center;width:100%}.iconClender{background-color:var(--primary-color, #000);padding:14.5px;border-top-left-radius:4px;border-bottom-left-radius:4px;display:flex;justify-content:center;align-items:center;cursor:pointer}.datepicker-input{flex:1;padding:8px;font-size:14px;box-sizing:border-box;border:1px solid var(--primary-color, #000);border-top-right-radius:4px;border-bottom-right-radius:4px;transition:border-color .3s ease-in-out}.datepicker-input:focus{outline:none;border-color:var(--primary-color, #000);box-shadow:0 0 4px var(--primary-color, #000)}.datepicker-icon{width:15px;height:15px;cursor:pointer}.datepicker-popup{position:absolute;top:100%;left:0;z-index:1000;background:#fff;border:1px solid var(--primary-color, #000);box-shadow:0 4px 6px #0000001a;padding:10px;width:100%;opacity:0;transform:scaleY(0);transform-origin:top;transition:all .3s ease-in-out}.datepicker-popup.open{opacity:1;transform:scaleY(1)}.datepicker-popup.closed{opacity:0;transform:scaleY(0)}.header{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:700;color:var(--primary-color, #000)}.header a{cursor:pointer}.weekdays,.days{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}.weekday{font-weight:700;margin-bottom:5px;font-size:12px;color:var(--primary-color, #000)}.day{padding:5px;cursor:pointer;text-align:center;border-radius:4px;transition:background-color .3s,color .3s}.day:hover{background-color:var(--primary-color, #000);color:#fff}.day.selected{background-color:var(--primary-color, #000);color:#fff;font-weight:700}.today-button{text-align:left;margin-top:10px;border:none}.today-button a{cursor:pointer;padding:5px 10px;color:#000}.today-button a:hover{background-color:var(--primary-color, #000);border-radius:50px;color:#fff}\n"] }]
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
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhpanJpLWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWhpanJpLWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtaGlqcmktZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEdBR2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxNQUFNLE1BQU0sY0FBYyxDQUFDOzs7QUE2UmxDLE1BQU0sT0FBTywyQkFBMkI7SUE4QmxCO0lBN0JwQixzREFBc0Q7SUFDdEQseUNBQXlDO0lBQ2hDLEtBQUssR0FBa0IsSUFBSSxDQUFDLENBQUMscUNBQXFDO0lBQ2pFLFdBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQyxDQUFDLHlEQUF5RDtJQUUxSCxXQUFXLEdBQVcsaUJBQWlCLENBQUMsQ0FBQywwQ0FBMEM7SUFDbkYsS0FBSyxHQUFXLE9BQU8sQ0FBQyxDQUFDLHVDQUF1QztJQUNoRSxNQUFNLEdBQVcsTUFBTSxDQUFDLENBQUMsMkNBQTJDO0lBQ3BFLFVBQVUsR0FBVyxNQUFNLENBQUMsQ0FBQyx1Q0FBdUM7SUFDcEUsb0JBQW9CLEdBQVcsTUFBTSxDQUFDLENBQUMsMkNBQTJDO0lBQ2xGLFNBQVMsR0FBVyxNQUFNLENBQUMsQ0FBQyw0QkFBNEI7SUFDeEQsbUJBQW1CLEdBQVcsTUFBTSxDQUFDLENBQUMsNkNBQTZDO0lBQ25GLFFBQVEsR0FBVyxNQUFNLENBQUMsQ0FBQyxnREFBZ0Q7SUFDM0UsV0FBVyxHQUFXLE1BQU0sQ0FBQyxDQUFDLGdEQUFnRDtJQUM5RSwwQkFBMEIsR0FBVyxNQUFNLENBQUMsQ0FBQyx5REFBeUQ7SUFDdEcsYUFBYSxHQUFXLGFBQWEsQ0FBQyxDQUFDLDBCQUEwQjtJQUNqRSxhQUFhLEdBQWtCLElBQUks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LFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQWlHTixlQUFlO3NCQURkLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgT25Jbml0LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LWhpanJpJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItbmd4LWhpanJpLWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlOiBgXHJcbjxkaXZcclxuICBjbGFzcz1cImhpanJpLWRhdGVwaWNrZXItY29udGFpbmVyXCJcclxuICBbbmdTdHlsZV09XCJ7XHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgfVwiXHJcbj5cclxuICA8IS0tINit2YLZhCDYp9mE2KXYr9iu2KfZhCAtLT5cclxuICA8ZGl2XHJcbiAgICBjbGFzcz1cImlucHV0LXN2Zy13cmFwcGVyXCJcclxuICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbn1cIlxyXG4gID5cclxuICAgIDxpbnB1dFxyXG4gICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgIFt2YWx1ZV09XCJkaXNwbGF5ZWREYXRlXCJcclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZURhdGVQaWNrZXIoKVwiXHJcbiAgICAgIHJlYWRvbmx5XHJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1pbnB1dFwiXHJcbiAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgYm9yZGVyQ29sb3I6IEJvcmRlckNvbG9yLFxyXG4gICAgICAgIGNvbG9yOiBJbnB1dENvbG9yLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogSW5wdXRCYWNrZ3JvdW5kQ29sb3JcclxuICAgICAgfVwiXHJcbiAgICAvPlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImljb25DbGVuZGVyXCJcclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZURhdGVQaWNrZXIoKVwiXHJcbiAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IEljb25CYWNrZ3JvdW5kQ29sb3JcclxuICAgICAgfVwiXHJcbiAgICA+XHJcbiAgICAgIDxzdmdcclxuICAgICAgICBbYXR0ci5maWxsXT1cIkljb25Db2xvclwiXHJcbiAgICAgICAgdmVyc2lvbj1cIjEuMVwiXHJcbiAgICAgICAgaWQ9XCJDYXBhXzFcIlxyXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiXHJcbiAgICAgICAgdmlld0JveD1cIjAgMCA2MTAuMzk4IDYxMC4zOThcIlxyXG4gICAgICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1pY29uXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxnPlxyXG4gICAgICAgICAgPGc+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNTkuNTY3LDBoLTE1LjMyOWMtMS45NTYsMC0zLjgxMSwwLjQxMS01LjYwOCwwLjk5NWMtOC45NzksMi45MTItMTUuNjE2LDEyLjQ5OC0xNS42MTYsMjMuOTk3djEwLjU1MnYyNy4wMDl2MTQuMDUyXHJcbiAgICAgICAgICAgICAgIGMwLDIuNjExLDAuNDM1LDUuMDc4LDEuMDY2LDcuNDRjMi43MDIsMTAuMTQ2LDEwLjY1MywxNy41NTIsMjAuMTU4LDE3LjU1MmgxNS4zMjljMTEuNzI0LDAsMjEuMjI0LTExLjE4OCwyMS4yMjQtMjQuOTkyVjYyLjU1M1xyXG4gICAgICAgICAgICAgICBWMzUuNTQ0VjI0Ljk5MkMxODAuNzkxLDExLjE4OCwxNzEuMjkxLDAsMTU5LjU2NywwelwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk00NjEuMjg4LDBoLTE1LjMyOWMtMTEuNzI0LDAtMjEuMjI0LDExLjE4OC0yMS4yMjQsMjQuOTkydjEwLjU1MnYyNy4wMDl2MTQuMDUyYzAsMTMuODA0LDkuNSwyNC45OTIsMjEuMjI0LDI0Ljk5MlxyXG4gICAgICAgICAgICAgICBoMTUuMzI5YzExLjcyNCwwLDIxLjIyNC0xMS4xODgsMjEuMjI0LTI0Ljk5MlY2Mi41NTNWMzUuNTQ0VjI0Ljk5MkM0ODIuNTA3LDExLjE4OCw0NzMuMDA3LDAsNDYxLjI4OCwwelwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk01MzkuNTg2LDYyLjU1M2gtMzcuOTU0djE0LjA1MmMwLDI0LjMyNy0xOC4xMDIsNDQuMTE3LTQwLjM0OSw0NC4xMTdoLTE1LjMyOWMtMjIuMjQ3LDAtNDAuMzQ5LTE5Ljc5LTQwLjM0OS00NC4xMTdcclxuICAgICAgICAgICAgICAgVjYyLjU1M0gxOTkuOTE2djE0LjA1MmMwLDI0LjMyNy0xOC4xMDIsNDQuMTE3LTQwLjM0OSw0NC4xMTdoLTE1LjMyOWMtMjIuMjQ4LDAtNDAuMzQ5LTE5Ljc5LTQwLjM0OS00NC4xMTdWNjIuNTUzSDcwLjgxOFxyXG4gICAgICAgICAgICAgICBjLTIxLjA2NiwwLTM4LjE1LDE2LjAxNy0zOC4xNSwzNS43NjR2NDc2LjMxOGMwLDE5Ljc4NCwxNy4wODMsMzUuNzY0LDM4LjE1LDM1Ljc2NGg0NjguNzYzYzIxLjA4NSwwLDM4LjE0OS0xNS45ODQsMzguMTQ5LTM1Ljc2NFxyXG4gICAgICAgICAgICAgICBWOTguMzIyQzU3Ny43MzUsNzguNTc1LDU2MC42NzEsNjIuNTUzLDUzOS41ODYsNjIuNTUzeiBNNTI3Ljc1Nyw1NTcuOWwtNDQ2LjUwMi0wLjE3MlYxNzMuNzE3aDQ0Ni41MDJWNTU3Ljl6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsMjY2LjI1OGgxMTcuNDI4YzEwLjE5MywwLDE4LjQzNy0xMC4xNzksMTguNDM3LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNy0yMi43NTlIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMzMzQuNTgsMjU2LjA3NCwzNDIuODIzLDI2Ni4yNTgsMzUzLjAxNywyNjYuMjU4elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDM0OC40NjdoMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTc5LDE4LjQzNy0yMi43NTljMC0xMi41NzktOC4yNDgtMjIuNzU4LTE4LjQzNy0yMi43NThIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OEMzMzQuNTgsMzM4LjI4OCwzNDIuODIzLDM0OC40NjcsMzUzLjAxNywzNDguNDY3elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0zNTMuMDE3LDQzMC42NzZoMTE3LjQyOGMxMC4xOTMsMCwxOC40MzctMTAuMTgsMTguNDM3LTIyLjc1OXMtOC4yNDgtMjIuNzU5LTE4LjQzNy0yMi43NTlIMzUzLjAxN1xyXG4gICAgICAgICAgICAgICBjLTEwLjE5MywwLTE4LjQzNywxMC4xOC0xOC40MzcsMjIuNzU5UzM0Mi44MjMsNDMwLjY3NiwzNTMuMDE3LDQzMC42NzZ6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTM1My4wMTcsNTEyLjg5aDExNy40MjhjMTAuMTkzLDAsMTguNDM3LTEwLjE4LDE4LjQzNy0yMi43NTljMC0xMi41OC04LjI0OC0yMi43NTktMTguNDM3LTIyLjc1OUgzNTMuMDE3XHJcbiAgICAgICAgICAgICAgIGMtMTAuMTkzLDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzMzNC41OCw1MDIuNzEsMzQyLjgyMyw1MTIuODksMzUzLjAxNyw1MTIuODl6XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBkPVwiTTE0NS4wMzIsMjY2LjI1OEgyNjIuNDZjMTAuMTkzLDAsMTguNDM2LTEwLjE3OSwxOC40MzYtMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM2LTIyLjc1OUgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU5QzEyNi41OTYsMjU2LjA3NCwxMzQuODM4LDI2Ni4yNTgsMTQ1LjAzMiwyNjYuMjU4elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDM0OC40NjdIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xNzksMTguNDM2LTIyLjc1OWMwLTEyLjU3OS04LjI0OC0yMi43NTgtMTguNDM2LTIyLjc1OEgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE3OS0xOC40MzcsMjIuNzU4QzEyNi41OTYsMzM4LjI4OCwxMzQuODM4LDM0OC40NjcsMTQ1LjAzMiwzNDguNDY3elwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgZD1cIk0xNDUuMDMyLDQzMC42NzZIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xOCwxOC40MzYtMjIuNzU5cy04LjI0OC0yMi43NTktMTguNDM2LTIyLjc1OUgxNDUuMDMyXHJcbiAgICAgICAgICAgICAgIGMtMTAuMTk0LDAtMTguNDM3LDEwLjE4LTE4LjQzNywyMi43NTlTMTM0LjgzOCw0MzAuNjc2LDE0NS4wMzIsNDMwLjY3NnpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGQ9XCJNMTQ1LjAzMiw1MTIuODlIMjYyLjQ2YzEwLjE5MywwLDE4LjQzNi0xMC4xOCwxOC40MzYtMjIuNzU5YzAtMTIuNTgtOC4yNDgtMjIuNzU5LTE4LjQzNi0yMi43NTlIMTQ1LjAzMlxyXG4gICAgICAgICAgICAgICBjLTEwLjE5NCwwLTE4LjQzNywxMC4xNzktMTguNDM3LDIyLjc1OUMxMjYuNTk2LDUwMi43MSwxMzQuODM4LDUxMi44OSwxNDUuMDMyLDUxMi44OXpcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9nPlxyXG4gICAgICAgIDwvZz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8IS0tINin2YTYqtmC2YjZitmFIC0tPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1wb3B1cFwiXHJcbiAgICBbY2xhc3Mub3Blbl09XCJzaG93RGF0ZVBpY2tlclwiXHJcbiAgICBbY2xhc3MuY2xvc2VkXT1cIiFzaG93RGF0ZVBpY2tlclwiXHJcbiAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICBib3JkZXJDb2xvcjogQm9yZGVyQ29sb3JcclxuICAgICAgfVwiXHJcbiAgPlxyXG4gICAgPCEtLSDYudmG2YjYp9mGINin2YTYtNmH2LEg2YjYo9iy2LHYp9ixINin2YTYqtmG2YLZhCAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgPGEgKGNsaWNrKT1cInByZXZNb250aCgpXCI+Jmx0OzwvYT5cclxuICAgICAgPHNwYW4gICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgY29sb3I6IERheUNvbG9yXHJcbiAgICAgIH1cIj57eyBjdXJyZW50TW9udGhOYW1lIH19PC9zcGFuPlxyXG4gICAgICA8YSAoY2xpY2spPVwibmV4dE1vbnRoKClcIj4mZ3Q7PC9hPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSDYo9iz2YXYp9ihINij2YrYp9mFINin2YTYo9iz2KjZiNi5IC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cIndlZWtkYXlzXCI+XHJcbiAgICAgIDxkaXYgICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIGNvbG9yOiBEYXRlcGlja2VyUG9wdXBIZWFkZXJDb2xvclxyXG4gICAgICB9XCIgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlOYW1lc01pblwiIGNsYXNzPVwid2Vla2RheVwiPnt7IGRheSB9fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSDYudix2LYg2KPZitin2YUg2KfZhNi02YfYsSAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJkYXlzXCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXNJbkN1cnJlbnRNb250aFwiXHJcbiAgICAgICAgY2xhc3M9XCJkYXlcIlxyXG4gICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJzZWxlY3RlZERhdGUgJiYgZGF5Py5pc1NhbWUoc2VsZWN0ZWREYXRlLCAnZGF5JylcIlxyXG4gICAgICAgIChjbGljayk9XCJzZWxlY3REYXRlKGRheSlcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJkYXlcIj57eyBkYXkuaURhdGUoKSB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8IS0tINiy2LEg2YTYqtit2K/ZitivINin2YTZitmI2YUg2KfZhNit2KfZhNmKIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvZGF5LWJ1dHRvblwiPlxyXG4gICAgICA8YSAoY2xpY2spPVwic2VsZWN0VG9kYXkoKVwiXHJcbiAgICAgID7Yp9mE2YrZiNmFPC9hPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuICBgLFxyXG4gIHN0eWxlczogYC5oaWpyaS1kYXRlcGlja2VyLWNvbnRhaW5lciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgfVxyXG5cclxuICAuaW5wdXQtc3ZnLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IC8qINmE2YXYrdin2LDYp9ipINin2YTZhdit2KrZiNmJINi52YXZiNiv2YrZi9inICovXHJcbiAgICB3aWR0aDogMTAwJTsgLyog2YbZgdizINi52LHYtiDYp9mE2K3Yp9mI2YrYqSAqL1xyXG4gIH1cclxuXHJcbiAgLmljb25DbGVuZGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIHBhZGRpbmc6IDE0LjVweDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1pbnB1dCB7XHJcbiAgICBmbGV4OiAxOyAvKiDZitij2K7YsCDYp9mE2KXYr9iu2KfZhCDZg9in2YXZhCDYp9mE2LnYsdi2INin2YTZhdiq2KjZgtmKICovXHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4zcyBlYXNlLWluLW91dDtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLWlucHV0OmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmU7IC8qINil2LLYp9mE2Kkg2KfZhNil2LfYp9ixINin2YTYp9mB2KrYsdin2LbZiiAqL1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBib3gtc2hhZG93OiAwIDAgNHB4IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYqtij2KvZitixINiu2YHZitmBINi52YbYryDYp9mE2KrYsdmD2YrYsiAqL1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItaWNvbiB7XHJcbiAgICB3aWR0aDogMTVweDsgLyog2YrZhdmD2YYg2LbYqNi3INin2YTYrdis2YUg2K3Ys9ioINin2YTYrdin2KzYqSAqL1xyXG4gICAgaGVpZ2h0OiAxNXB4OyAvKiDZhtmB2LMg2KfYsdiq2YHYp9i5INin2YTYpdiv2K7Yp9mEICovXHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuZGF0ZXBpY2tlci1wb3B1cCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDEwMCU7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgei1pbmRleDogMTAwMDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMCk7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3A7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICB9XHJcblxyXG4gIC5kYXRlcGlja2VyLXBvcHVwLm9wZW4ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xyXG4gIH1cclxuXHJcbiAgLmRhdGVwaWNrZXItcG9wdXAuY2xvc2VkIHtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwKTtcclxuICB9XHJcblxyXG4gIC5oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgfVxyXG5cclxuICAuaGVhZGVyIGEge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLndlZWtkYXlzLFxyXG4gIC5kYXlzIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLndlZWtkYXkge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2LPYqtiu2K/Yp9mFINmE2YjZhiDYp9mB2KrYsdin2LbZiiAqL1xyXG4gIH1cclxuXHJcbiAgLmRheSB7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MsIGNvbG9yIDAuM3M7XHJcbiAgfVxyXG5cclxuICAuZGF5OmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IsICMwMDApOyAvKiDYp9iz2KrYrtiv2KfZhSDZhNmI2YYg2KfZgdiq2LHYp9i22YogKi9cclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuXHJcbiAgLmRheS5zZWxlY3RlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yLCAjMDAwKTsgLyog2KfYs9iq2K7Yr9in2YUg2YTZiNmGINin2YHYqtix2KfYttmKICovXHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcblxyXG4gIC50b2RheS1idXR0b24ge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAudG9kYXktYnV0dG9uIGEge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICBjb2xvcjogIzAwMDtcclxuICB9XHJcblxyXG4gIC50b2RheS1idXR0b24gYTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdmFyKC0tcHJpbWFyeS1jb2xvciwgIzAwMCk7IC8qINin2YTZhNmI2YYg2KfZhNin2YHYqtix2KfYttmKICovXHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuXHJcbiAgYCxcclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIaWpyaURhdGVwaWNrZXJDb21wb25lbnQge1xyXG4gIC8vIElucHV0IHByb3BlcnRpZXMgdG8gYWxsb3cgY3VzdG9taXphdGlvbiBieSB0aGUgdXNlclxyXG4gIC8vINin2YTZhdiv2K7ZhNin2Kog2YTYqtiu2LXZiti1INin2YTZhdmD2YjZhiDZhdmGINmC2KjZhCDYp9mE2YXYs9iq2K7Yr9mFXHJcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsOyAvLyBUaGUgaW5pdGlhbCB2YWx1ZSAvINin2YTZgtmK2YXYqSDYp9mE2KPZiNmE2YrYqVxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTsgLy8gRW1pdHMgdmFsdWUgd2hlbiBpdCBjaGFuZ2VzIC8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2LnZhtivINin2YTYqti62YrZitixXHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAn2KfYrtiq2LEg2KrYp9ix2YrYriDZh9is2LHZiic7IC8vIFBsYWNlaG9sZGVyIHRleHQgLyDYp9mE2YbYtSDYp9mE2KfZgdiq2LHYp9i22Yog2YTZhNit2YLZhFxyXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmcgPSAnMjUwcHgnOyAvLyBXaWR0aCBvZiB0aGUgaW5wdXQgZmllbGQgLyDYudix2LYg2KfZhNit2YLZhFxyXG4gIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nID0gJzQwcHgnOyAvLyBIZWlnaHQgb2YgdGhlIGlucHV0IGZpZWxkIC8g2KfYsdiq2YHYp9i5INin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJbnB1dENvbG9yOiBzdHJpbmcgPSAnIzAwMCc7IC8vIElucHV0IHRleHQgY29sb3IgLyDZhNmI2YYg2KfZhNmG2LUg2YHZiiDYp9mE2K3ZgtmEXHJcbiAgQElucHV0KCkgSW5wdXRCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyA9ICcjZmZmJzsgLy8gSW5wdXQgYmFja2dyb3VuZCBjb2xvciAvINmE2YjZhiDYrtmE2YHZitipINin2YTYrdmC2YRcclxuICBASW5wdXQoKSBJY29uQ29sb3I6IHN0cmluZyA9ICcjZmZmJzsgLy8gSWNvbiBjb2xvciAvINmE2YjZhiDYp9mE2KPZitmC2YjZhtipXHJcbiAgQElucHV0KCkgSWNvbkJhY2tncm91bmRDb2xvcjogc3RyaW5nID0gJyMwMDAnOyAvLyBJY29uIGJhY2tncm91bmQgY29sb3IgLyDZhNmI2YYg2K7ZhNmB2YrYqSDYp9mE2KPZitmC2YjZhtipXHJcbiAgQElucHV0KCkgRGF5Q29sb3I6IHN0cmluZyA9ICcjMDAwJzsgLy8gRGF5IGNvbG9yIGluIGNhbGVuZGFyIC8g2YTZiNmGINin2YTYo9mK2KfZhSDZgdmKINin2YTYqtmC2YjZitmFXHJcbiAgQElucHV0KCkgQm9yZGVyQ29sb3I6IHN0cmluZyA9ICcjMDAwJzsgLy8gQm9yZGVyIGNvbG9yIGZvciBpbnB1dCBhbmQgcG9wdXAgLyDZhNmI2YYg2KfZhNit2K/ZiNivXHJcbiAgQElucHV0KCkgRGF0ZXBpY2tlclBvcHVwSGVhZGVyQ29sb3I6IHN0cmluZyA9ICcjMDAwJzsgLy8gSGVhZGVyIGNvbG9yIGluIHRoZSBwb3B1cCAvINmE2YjZhiDYp9mE2LHYo9izINmB2Yog2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gIEBJbnB1dCgpIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyA9ICdpWVlZWS9pTS9pRCc7IC8vINiq2YbYs9mK2YIg2KfZhNiq2KfYsdmK2K4g2KfZhNin2YHYqtix2KfYttmKXHJcbiAgQElucHV0KCkgc3RvcmFnZUZvcm1hdDogc3RyaW5nIHwgbnVsbCA9IG51bGw7IC8vINin2YTYqtmG2LPZitmCINin2YTZhdiz2KrYrtiv2YUg2YTZhNiq2K7YstmK2YYgKNin2YHYqtix2KfYttmK2YvYpyDZitmD2YjZhiBudWxsKVxyXG5cclxuICBzZWxlY3RlZERhdGU6IG1vbWVudC5Nb21lbnQgfCBudWxsID0gbnVsbDsgLy8gQ3VycmVudGx5IHNlbGVjdGVkIGRhdGUgLyDYp9mE2KrYp9ix2YrYriDYp9mE2YXYrtiq2KfYsVxyXG4gIHNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vIFRvIGNvbnRyb2wgdmlzaWJpbGl0eSBvZiB0aGUgZGF0ZXBpY2tlciBwb3B1cCAvINin2YTYqtit2YPZhSDZgdmKINil2LjZh9in2LEg2KfZhNiq2YLZiNmK2YVcclxuICBjdXJyZW50Vmlld0RhdGU6IG1vbWVudC5Nb21lbnQgPSBtb21lbnQoKTsgLy8gQ3VycmVudGx5IGRpc3BsYXllZCBtb250aCBpbiB0aGUgcG9wdXAgLyDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYp9mE2YXYudix2YjYtlxyXG5cclxuICBvbkNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyBjaGFuZ2UgZXZlbnQgLyDZiNin2KzZh9ipINmE2YTYqti52KfZhdmEINmF2Lkg2KfZhNiq2LrZitmK2LHYp9iqINmB2YogUmVhY3RpdmUgRm9ybXNcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTsgLy8gUGxhY2Vob2xkZXIgZm9yIFJlYWN0aXZlIEZvcm1zJyB0b3VjaCBldmVudCAvINmI2KfYrNmH2Kkg2YTZhNiq2LnYp9mF2YQg2YXYuSDZhNmF2LPYqSDYp9mE2K3ZgtmEINmB2YogUmVhY3RpdmUgRm9ybXNcclxuXHJcbiAgLy8g2KPYs9mF2KfYoSDYp9mE2KPZitin2YUgKNin2K7Yqti12KfYsSlcclxuICAvLyBTaG9ydCBuYW1lcyBmb3IgZGF5cyBvZiB0aGUgd2Vla1xyXG4gIGRheU5hbWVzTWluOiBzdHJpbmdbXSA9IFsn2K0nLCAn2YYnLCAn2KsnLCAn2LEnLCAn2K4nLCAn2KwnLCAn2LMnXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAvLyAqKkluaXRpYWwgc2V0dXAgb24gY29tcG9uZW50IGxvYWQqKlxyXG4gIC8vICoq2KXYudiv2KfYryDZhdio2K/YptmKINi52YbYryDYqtit2YXZitmEINin2YTZhdmD2YjZhioqXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh0aGlzLnZhbHVlLCB0aGlzLmRpc3BsYXlGb3JtYXQpOyAvLyBQYXJzZSB0aGUgaW5pdGlhbCB2YWx1ZSAvINiq2K3ZiNmK2YQg2KfZhNmC2YrZhdipINin2YTYo9mI2YTZitipINmE2KrYp9ix2YrYrlxyXG4gICAgICB0aGlzLmN1cnJlbnRWaWV3RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKCk7IC8vIFNldCB0aGUgdmlldyBkYXRlIHRvIHRoZSBzZWxlY3RlZCBkYXRlIC8g2LnYsdi2INin2YTYtNmH2LEg2KfZhNiu2KfYtSDYqNin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vINil2LDYpyDZhNmFINmK2KrZhSDYqtmF2LHZitixIGBzdG9yYWdlRm9ybWF0YCDZhdmGINin2YTZhdiz2KrYrtiv2YXYjCDZhtiz2KrYrtiv2YUgYGRpc3BsYXlGb3JtYXRgINmD2YLZitmF2Kkg2KfZgdiq2LHYp9i22YrYqVxyXG4gIGdldCByZXNvbHZlZFN0b3JhZ2VGb3JtYXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VGb3JtYXQgfHwgdGhpcy5kaXNwbGF5Rm9ybWF0O1xyXG4gIH1cclxuICAvLyAqKlByb3BlcnR5OiBEaXNwbGF5IHRoZSBjdXJyZW50IG1vbnRoJ3MgbmFtZSBpbiBIaWpyaSBmb3JtYXQqKlxyXG4gIC8vICoq2K7Yp9i12YrYqTog2LnYsdi2INin2LPZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZiiDYqNin2YTYqtmG2LPZitmCINin2YTZh9is2LHZiioqXHJcbiAgZ2V0IGN1cnJlbnRNb250aE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5mb3JtYXQoJ2lNTU1NIGlZWVlZJyk7IC8vIEZvcm1hdCB0aGUgY3VycmVudCBtb250aCAvINi12YrYutipINin2LPZhSDYp9mE2LTZh9ixINin2YTYrdin2YTZilxyXG4gIH1cclxuXHJcbiAgLy8gKipQcm9wZXJ0eTogQ2FsY3VsYXRlIGFuZCByZXR1cm4gZGF5cyBvZiB0aGUgY3VycmVudCBtb250aCoqXHJcbiAgLy8gKirYrtin2LXZitipOiDYrdiz2KfYqCDZiNil2LHYrNin2Lkg2KPZitin2YUg2KfZhNi02YfYsSDYp9mE2K3Yp9mE2YoqKlxyXG4gIGdldCBkYXlzSW5DdXJyZW50TW9udGgoKTogYW55W10ge1xyXG4gICAgY29uc3Qgc3RhcnRPZk1vbnRoID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5zdGFydE9mKCdpTW9udGgnKTsgLy8gU3RhcnQgb2YgdGhlIG1vbnRoIC8g2KjYr9in2YrYqSDYp9mE2LTZh9ixXHJcbiAgICBjb25zdCBlbmRPZk1vbnRoID0gdGhpcy5jdXJyZW50Vmlld0RhdGUuY2xvbmUoKS5lbmRPZignaU1vbnRoJyk7IC8vIEVuZCBvZiB0aGUgbW9udGggLyDZhtmH2KfZitipINin2YTYtNmH2LFcclxuXHJcbiAgICBjb25zdCBkYXlzID0gW107XHJcbiAgICBjb25zdCBzdGFydERheU9mV2VlayA9IHN0YXJ0T2ZNb250aC5kYXkoKTsgLy8gVGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGggaW4gdGhlIHdlZWsgLyDYp9mE2YrZiNmFINin2YTYo9mI2YQg2YXZhiDYp9mE2LTZh9ixXHJcblxyXG4gICAgLy8gQWRkIGVtcHR5IHNsb3RzIGZvciBwcmV2aW91cyBtb250aCdzIGRheXNcclxuICAgIC8vINil2LbYp9mB2Kkg2YHYsdin2LrYp9iqINmE2YTYo9mK2KfZhSDYp9mE2KrZiiDYqtiz2KjZgiDYp9mE2LTZh9ixINin2YTYrdin2YTZilxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydERheU9mV2VlazsgaSsrKSB7XHJcbiAgICAgIGRheXMucHVzaChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYWN0dWFsIGRheXMgb2YgdGhlIGN1cnJlbnQgbW9udGhcclxuICAgIC8vINil2LbYp9mB2Kkg2KfZhNij2YrYp9mFINin2YTZgdi52YTZitipINmE2YTYtNmH2LEg2KfZhNit2KfZhNmKXHJcbiAgICBjb25zdCB0b3RhbERheXMgPSBlbmRPZk1vbnRoLmlEYXRlKCk7XHJcbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSB0b3RhbERheXM7IGQrKykge1xyXG4gICAgICBkYXlzLnB1c2goc3RhcnRPZk1vbnRoLmNsb25lKCkuaURhdGUoZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXlzO1xyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IE5hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBtb250aCoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9mE2KfZhtiq2YLYp9mEINil2YTZiSDYp9mE2LTZh9ixINin2YTYs9in2KjZgioqXHJcbiAgcHJldk1vbnRoKCkge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdpTW9udGgnKTtcclxuICB9XHJcblxyXG4gIC8vICoqTWV0aG9kOiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBtb250aCoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9mE2KfZhtiq2YLYp9mEINil2YTZiSDYp9mE2LTZh9ixINin2YTYqtin2YTZiioqXHJcbiAgbmV4dE1vbnRoKCkge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLmN1cnJlbnRWaWV3RGF0ZS5jbG9uZSgpLmFkZCgxLCAnaU1vbnRoJyk7XHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogU2VsZWN0IGEgc3BlY2lmaWMgZGF0ZSoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9iu2KrZitin2LEg2KrYp9ix2YrYriDZhdi52YrZhioqXHJcbiAgc2VsZWN0RGF0ZShkYXk6IG1vbWVudC5Nb21lbnQgfCBudWxsKSB7XHJcbiAgICBpZiAoZGF5KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF5O1xyXG4gICAgICBjb25zdCBzdG9yZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLnJlc29sdmVkU3RvcmFnZUZvcm1hdCk7IC8vINin2YTZgtmK2YXYqSDZhNiq2K7YstmK2YbZh9inINmB2Yog2YLYp9i52K/YqSDYp9mE2KjZitin2YbYp9iqXHJcbiAgICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpOyAvLyDYp9mE2YLZitmF2Kkg2YTYudix2LbZh9inXHJcblxyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHN0b3JlZFZhbHVlKTsgLy8g2KXYsdiz2KfZhCDYp9mE2YLZitmF2Kkg2KfZhNmF2K7YstmG2Kkg2KXZhNmJINin2YTZhtmF2YjYsNisXHJcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChzdG9yZWRWYWx1ZSk7IC8vINil2LHYs9in2YQg2KfZhNmC2YrZhdipINin2YTZhdiu2LLZhtipXHJcblxyXG4gICAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vINil2LrZhNin2YIg2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gKipNZXRob2Q6IFRvZ2dsZSB2aXNpYmlsaXR5IG9mIHRoZSBkYXRlcGlja2VyKipcclxuICAvLyAqKti32LHZitmC2Kk6INmB2KrYrS/Ypdi62YTYp9mCINin2YTYqtmC2YjZitmFKipcclxuICB0b2dnbGVEYXRlUGlja2VyKCkge1xyXG4gICAgdGhpcy5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZVxyXG4gICAgICA/IHRoaXMuc2VsZWN0ZWREYXRlLmNsb25lKClcclxuICAgICAgOiBtb21lbnQoKTsgLy8gU2V0IHRvIGN1cnJlbnQgZGF0ZSBpZiBubyBkYXRlIGlzIHNlbGVjdGVkIC8g2LnYsdi2INin2YTYtNmH2LEg2KfZhNit2KfZhNmKINil2LDYpyDZhNmFINmK2KrZhSDYp9iu2KrZitin2LEg2KrYp9ix2YrYrlxyXG4gICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9ICF0aGlzLnNob3dEYXRlUGlja2VyOyAvLyBUb2dnbGUgdmlzaWJpbGl0eSAvINiq2KjYr9mK2YQg2KfZhNit2KfZhNipXHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogQ2xvc2UgdGhlIHBvcHVwIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYpdi62YTYp9mCINin2YTYqtmC2YjZitmFINi52YbYryDYp9mE2YbZgtixINiu2KfYsdisINin2YTZhdmD2YjZhioqXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcclxuICBvbkRvY3VtZW50Q2xpY2sodGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGNsaWNrZWRJbnNpZGUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KTsgLy8gQ2hlY2sgaWYgY2xpY2sgaXMgaW5zaWRlIC8g2KfZhNiq2K3ZgtmCINil2LDYpyDZg9in2YYg2KfZhNmG2YLYsSDYr9in2K7ZhCDYp9mE2YXZg9mI2YZcclxuICAgIGlmICghY2xpY2tlZEluc2lkZSkge1xyXG4gICAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gZmFsc2U7IC8vIENsb3NlIHRoZSBwb3B1cCAvINil2LrZhNin2YIg2YbYp9mB2LDYqSDYp9mE2KrZgtmI2YrZhVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gKipQcm9wZXJ0eTogRGlzcGxheSB0aGUgc2VsZWN0ZWQgZGF0ZSBpbiB0aGUgaW5wdXQgZmllbGQqKlxyXG4gIC8vICoq2K7Yp9i12YrYqTog2LnYsdi2INin2YTYqtin2LHZitiuINin2YTZhdiu2KrYp9ixINmB2Yog2KfZhNit2YLZhCoqXHJcbiAgZ2V0IGRpc3BsYXllZERhdGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZSA/IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpIDogJyc7IC8vIERpc3BsYXkgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nIC8g2LnYsdi2INin2YTYqtin2LHZitiuINij2Ygg2KrYsdmD2Ycg2YHYp9ix2LrYp9mLXHJcbiAgfVxyXG5cclxuICAvLyAqKk1ldGhvZDogU2VsZWN0IHRvZGF5J3MgZGF0ZSoqXHJcbiAgLy8gKirYt9ix2YrZgtipOiDYp9iu2KrZitin2LEg2KrYp9ix2YrYriDYp9mE2YrZiNmFKipcclxuICBzZWxlY3RUb2RheSgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbW9tZW50KCk7IC8vIFNldCB0aGUgZGF0ZSB0byB0b2RheSAvINiq2LnZitmK2YYg2KfZhNiq2KfYsdmK2K4g2KXZhNmJINin2YTZitmI2YVcclxuICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gdGhpcy5zZWxlY3RlZERhdGUuZm9ybWF0KHRoaXMucmVzb2x2ZWRTdG9yYWdlRm9ybWF0KTtcclxuICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZvcm1hdCh0aGlzLmRpc3BsYXlGb3JtYXQpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShzdG9yZWRWYWx1ZSk7IC8vIEVtaXQgdGhlIHZhbHVlIGZvciBSZWFjdGl2ZSBGb3JtcyAvINil2LHYs9in2YQg2KfZhNmC2YrZhdipINil2YTZiSBSZWFjdGl2ZSBGb3Jtc1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHN0b3JlZFZhbHVlKTsgLy8gRW1pdCB0aGUgdmFsdWUgZm9yIHN0YW5kYWxvbmUgdXNhZ2UgLyDYpdix2LPYp9mEINin2YTZgtmK2YXYqSDYudmG2K8g2KfZhNin2LPYqtiu2K/Yp9mFINin2YTZgdix2K/ZilxyXG4gICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IGZhbHNlOyAvLyBDbG9zZSB0aGUgcG9wdXAgLyDYpdi62YTYp9mCINmG2KfZgdiw2Kkg2KfZhNiq2YLZiNmK2YVcclxuICB9XHJcblxyXG4gIC8vICoqQ29udHJvbFZhbHVlQWNjZXNzb3I6IFdyaXRlIGEgbmV3IHZhbHVlKipcclxuICAvLyAqKtmI2KfYrNmH2Kk6INiq2LnZitmK2YYg2YLZitmF2Kkg2KzYr9mK2K/YqSoqXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBtb21lbnQodmFsdWUsIHRoaXMucmVzb2x2ZWRTdG9yYWdlRm9ybWF0KTsgLy8g2KrYrdmI2YrZhCDYp9mE2YLZitmF2Kkg2KXZhNmJINmE2K3YuNipINio2YbYp9ih2Ysg2LnZhNmJINin2YTYqtmG2LPZitmCXHJcbiAgICAgIHRoaXMuY3VycmVudFZpZXdEYXRlID0gdGhpcy5zZWxlY3RlZERhdGUuY2xvbmUoKTsgLy8gU2V0IHRoZSBjdXJyZW50IHZpZXcgZGF0ZSAvINiq2LnZitmK2YYg2LnYsdi2INin2YTYtNmH2LFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbnVsbDsgLy8gQ2xlYXIgdGhlIHNlbGVjdGVkIGRhdGUgLyDZhdiz2K0g2KfZhNiq2KfYsdmK2K4g2KfZhNmF2K7Yqtin2LFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vICoqQ29udHJvbFZhbHVlQWNjZXNzb3I6IFJlZ2lzdGVyIGEgY2hhbmdlIGNhbGxiYWNrKipcclxuICAvLyAqKtmI2KfYrNmH2Kk6INiq2LPYrNmK2YQg2K/Yp9mE2Kkg2KrYutmK2YrYsSDYp9mE2YLZitmF2KkqKlxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuOyAvLyBTdG9yZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gLyDYqtiu2LLZitmGINiv2KfZhNipINin2YTYqti62YrZitixXHJcbiAgfVxyXG5cclxuICAvLyAqKkNvbnRyb2xWYWx1ZUFjY2Vzc29yOiBSZWdpc3RlciBhIHRvdWNoZWQgY2FsbGJhY2sqKlxyXG4gIC8vICoq2YjYp9is2YfYqTog2KrYs9is2YrZhCDYr9in2YTYqSDYp9mE2YTZhdizKipcclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuOyAvLyBTdG9yZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gLyDYqtiu2LLZitmGINiv2KfZhNipINin2YTZhNmF2LNcclxuICB9XHJcbn1cclxuIl19