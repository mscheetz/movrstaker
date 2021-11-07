import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { FutureComponent } from './components/future/future.component';
import { StakeInfoComponent } from './components/stake-info/stake-info.component';
import { StartPointComponent } from './components/start-point/start-point.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/auth.interceptor';

import { ButtonModule } from 'node_modules/primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'node_modules/primeng/inputtext';
import { TableModule } from 'node_modules/primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    RewardsComponent,
    FutureComponent,
    StakeInfoComponent,
    StartPointComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    TableModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
