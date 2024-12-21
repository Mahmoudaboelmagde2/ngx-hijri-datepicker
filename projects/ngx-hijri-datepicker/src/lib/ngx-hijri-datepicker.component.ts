import {
  Component,
  HostListener,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import moment from 'moment-hijri';
@Component({
  selector: 'ngx-hijri-datepicker',
  template:   `
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

  `,
  styles: `.hijri-datepicker-container {
    position: relative;
    display: inline-block;
    width: 250px;
  }

  .input-svg-wrapper {
    display: flex;
    align-items: center; /* لمحاذاة المحتوى عموديًا */
    width: 100%; /* نفس عرض الحاوية */
  }

  .iconClender {
    background-color: var(--primary-color, #000); /* استخدام لون افتراضي */
    padding: 14.5px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .datepicker-input {
    flex: 1; /* يأخذ الإدخال كامل العرض المتبقي */
    padding: 8px;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid var(--primary-color, #000); /* استخدام لون افتراضي */
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: border-color 0.3s ease-in-out;
  }

  .datepicker-input:focus {
    outline: none; /* إزالة الإطار الافتراضي */
    border-color: var(--primary-color, #000); /* استخدام لون افتراضي */
    box-shadow: 0 0 4px var(--primary-color, #000); /* تأثير خفيف عند التركيز */
  }

  .datepicker-icon {
    width: 15px; /* يمكن ضبط الحجم حسب الحاجة */
    height: 15px; /* نفس ارتفاع الإدخال */
    cursor: pointer;
  }

  .datepicker-popup {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: #fff;
    border: 1px solid var(--primary-color, #000); /* استخدام لون افتراضي */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
    width: 100%;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.3s ease-in-out;
  }

  .datepicker-popup.open {
    opacity: 1;
    transform: scaleY(1);
  }

  .datepicker-popup.closed {
    opacity: 0;
    transform: scaleY(0);
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: bold;
    color: var(--primary-color, #000); /* استخدام لون افتراضي */
  }

  .header a {
    cursor: pointer;
  }

  .weekdays,
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
  }

  .weekday {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 12px;
    color: var(--primary-color, #000); /* استخدام لون افتراضي */
  }

  .day {
    padding: 5px;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }

  .day:hover {
    background-color: var(--primary-color, #000); /* استخدام لون افتراضي */
    color: #fff;
  }

  .day.selected {
    background-color: var(--primary-color, #000); /* استخدام لون افتراضي */
    color: white;
    font-weight: bold;
  }

  .today-button {
    text-align: left;
    margin-top: 10px;
    border: none;
  }

  .today-button a {
    cursor: pointer;
    padding: 5px 10px;
    color: #000;
  }

  .today-button a:hover {
    background-color:  var(--primary-color, #000); /* اللون الافتراضي */
    border-radius: 50px;
    color: white;
  }

  `,

providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxHijriDatepickerComponent),
    multi: true,
  },
],
})
export class NgxHijriDatepickerComponent {
  // Input properties to allow customization by the user
  // المدخلات لتخصيص المكون من قبل المستخدم
  @Input() value: string | null = null; // The initial value / القيمة الأولية
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>(); // Emits value when it changes / إرسال القيمة عند التغيير

  @Input() placeholder: string = 'اختر تاريخ هجري'; // Placeholder text / النص الافتراضي للحقل
  @Input() width: string = '250px'; // Width of the input field / عرض الحقل
  @Input() height: string = '40px'; // Height of the input field / ارتفاع الحقل
  @Input() InputColor: string | null = null; // Input text color / لون النص في الحقل
  @Input() InputBackgroundColor: string | null= null; // Input background color / لون خلفية الحقل
  @Input() IconColor: string | null= null; // Icon color / لون الأيقونة
  @Input() IconBackgroundColor: string| null = null; // Icon background color / لون خلفية الأيقونة
  @Input() DayColor: string| null= null; // Day color in calendar / لون الأيام في التقويم
  @Input() BorderColor: string | null= null; // Border color for input and popup / لون الحدود
  @Input() DatepickerPopupHeaderColor: string | null= null; // Header color in the popup / لون الرأس في نافذة التقويم
  @Input() displayFormat: string = 'iYYYY/iM/iD'; // تنسيق التاريخ الافتراضي
  @Input() storageFormat: string | null = null; // التنسيق المستخدم للتخزين (افتراضيًا يكون null)
  @Input() locale: 'en' | 'ar-SA' = 'ar-SA';  // خيار لاختيار اللغة (افتراضي: عربي)
  @Input() storageLocale: 'en' | 'ar-SA' = 'en';  // لغة التخزين

  selectedDate: moment.Moment | null = null; // Currently selected date / التاريخ المختار
  showDatePicker = false; // To control visibility of the datepicker popup / التحكم في إظهار التقويم
  currentViewDate: moment.Moment = moment().locale(this.locale);; // Currently displayed month in the popup / الشهر الحالي المعروض
  todayBtn:string = 'اليوم'
  onChange = (value: string) => {}; // Placeholder for Reactive Forms' change event / واجهة للتعامل مع التغييرات في Reactive Forms
  onTouched = () => {}; // Placeholder for Reactive Forms' touch event / واجهة للتعامل مع لمسة الحقل في Reactive Forms

  // أسماء الأيام (اختصار)
  // Short names for days of the week
  // Getter لتحديد أسماء الأيام بناءً على اللغة
  get dayNamesMin(): string[] {
    return this.locale === 'ar-SA'
      ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']  // عربي
      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];  // إنجليزي
  }
  constructor(private elementRef: ElementRef) {}

  // **Initial setup on component load**
  // **إعداد مبدئي عند تحميل المكون**
  ngOnInit() {
    moment.locale(this.locale);  // ضبط locale بناءً على اللغة المختارة
    if (this.value) {
      this.selectedDate = moment(this.value, this.displayFormat).locale(this.locale);; // Parse the initial value / تحويل القيمة الأولية لتاريخ
      this.currentViewDate = this.selectedDate.clone(); // Set the view date to the selected date / عرض الشهر الخاص بالتاريخ المختار
    }
    if(this.locale == 'en')
      this.todayBtn = 'Today'
  }
  // إذا لم يتم تمرير `storageFormat` من المستخدم، نستخدم `displayFormat` كقيمة افتراضية
  get resolvedStorageFormat(): string {
    return this.storageFormat || this.displayFormat;
  }
  // **Property: Display the current month's name in Hijri format**
  // **خاصية: عرض اسم الشهر الحالي بالتنسيق الهجري**
  get currentMonthName(): string {
    return this.currentViewDate.locale(this.locale).format('iMMMM iYYYY'); // Format the current month / صيغة اسم الشهر الحالي
  }

  // **Property: Calculate and return days of the current month**
  // **خاصية: حساب وإرجاع أيام الشهر الحالي**
  get daysInCurrentMonth(): any[] {
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
    this.currentViewDate = this.currentViewDate.clone().subtract(1, 'iMonth').locale(this.locale);;
  }

  // **Method: Navigate to the next month**
  // **طريقة: الانتقال إلى الشهر التالي**
  nextMonth() {
    this.currentViewDate = this.currentViewDate.clone().add(1, 'iMonth').locale(this.locale);;
  }

  // **Method: Select a specific date**
  // **طريقة: اختيار تاريخ معين**
  selectDate(day: moment.Moment | null) {
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
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement); // Check if click is inside / التحقق إذا كان النقر داخل المكون
    if (!clickedInside) {
      this.showDatePicker = false; // Close the popup / إغلاق نافذة التقويم
    }
  }

  // **Property: Display the selected date in the input field**
  // **خاصية: عرض التاريخ المختار في الحقل**
  get displayedDate(): string {
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
  writeValue(value: string): void {
    if (value) {
      this.selectedDate = moment(value, this.resolvedStorageFormat).locale(this.locale); // تحويل القيمة إلى لحظة بناءً على التنسيق
      this.currentViewDate = this.selectedDate.clone(); // Set the current view date / تعيين عرض الشهر
    } else {
      this.selectedDate = null; // Clear the selected date / مسح التاريخ المختار
    }
  }

  // **ControlValueAccessor: Register a change callback**
  // **واجهة: تسجيل دالة تغيير القيمة**
  registerOnChange(fn: any): void {
    this.onChange = fn; // Store the callback function / تخزين دالة التغيير
  }

  // **ControlValueAccessor: Register a touched callback**
  // **واجهة: تسجيل دالة اللمس**
  registerOnTouched(fn: any): void {
    this.onTouched = fn; // Store the callback function / تخزين دالة اللمس
  }
}
