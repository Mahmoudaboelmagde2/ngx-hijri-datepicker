import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxHijriDatepickerComponent } from './ngx-hijri-datepicker.component';

@NgModule({
  declarations: [NgxHijriDatepickerComponent], // تعريف المكونات
  imports: [CommonModule], // استيراد الوحدات المطلوبة
  exports: [NgxHijriDatepickerComponent], // تصدير المكون
})
export class NgxHijriDatepickerModule {}
