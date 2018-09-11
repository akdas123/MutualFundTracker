import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewInvestmentComponent } from './new-investment/new-investment.component';
import { EditInvestmentComponent } from './edit-investment/edit-investment.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chart/:id', component: LinechartComponent },
  { path: 'new investment', component: NewInvestmentComponent },
  { path: 'transactions', component: TransactionHistoryComponent },
  { path: 'edit investment/:index', component: EditInvestmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
