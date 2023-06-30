import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { allowedSymbols } from "./constants/constants";
@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="form">
      <input
        type="password"
        placeholder="password"
        class="password"
        [formControl]="passwordControl"
      />
      <div class="easy">The password is easy.</div>
      <div class="medium">The password is medium.</div>
      <div class="strong">The password is strong.</div>
      <div class="hint">
        Allowed english characters, numbers and symbols:
        <span>{{ symbols }}</span
        >.
      </div>
    </form>
  `,
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent {
  passwordControl = new FormControl('');
  symbols = allowedSymbols.split('').join(', ');

  minLengthValidator() {}
  easyPasswordValidator() {}
  mediumPasswordValidator() {}
  strongPasswordValidator() {}
}
