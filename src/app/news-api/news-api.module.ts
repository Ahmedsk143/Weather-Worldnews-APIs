import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldNewsComponent } from './world-news/world-news.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [WorldNewsComponent],
  imports: [CommonModule, PaginationModule.forRoot()],
  exports: [WorldNewsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class NewsApiModule {}
