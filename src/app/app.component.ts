import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="content">
      <h1>USENSE_TEST-TASK</h1>
      <app-password-field></app-password-field>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'usense_test-task';
}
