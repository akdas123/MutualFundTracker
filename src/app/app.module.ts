import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng4-charts';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CumulativechartComponent } from './cumulativechart/cumulativechart.component';
import { NewInvestmentComponent } from './new-investment/new-investment.component';


import { MarketValueComputeService } from './market-value-compute.service';


@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    CumulativechartComponent,
    NewInvestmentComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MarketValueComputeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
