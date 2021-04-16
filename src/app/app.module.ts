import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherModule } from './weather/weather.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './notification/notification.module';
import { NewsApiModule } from './news-api/news-api.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherModule,
    NotificationModule,
    NewsApiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
