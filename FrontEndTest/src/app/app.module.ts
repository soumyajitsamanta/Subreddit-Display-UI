import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedditListContainerComponent } from './reddit-list-container/reddit-list-container.component';
import { FormsModule } from '@angular/forms';
import { RedditListItemComponent } from './reddit-list-item/reddit-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RedditListContainerComponent,
    RedditListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    FormsModule
  ]
})
export class AppModule { }
