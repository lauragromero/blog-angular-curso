import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';



@NgModule({
  declarations: [ErrorMessagesComponent],
  imports: [
    CommonModule
  ], exports: [ErrorMessagesComponent]
})
export class SharedModule { }
