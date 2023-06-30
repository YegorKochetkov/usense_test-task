import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <form class="form">
      <input type="password" placeholder="password" class="password" />
    </form>
  `,
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent {}
