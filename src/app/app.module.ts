import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { PasswordFieldComponent } from "./password-field/password-field.component";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PasswordFieldComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
