import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog #formDialog class="dialog">
      <div class="dialog-content">
        <p>Form data sent!</p>
        <p>Password: {{ password }}</p>
        <button (click)="close()" class="button">Close</button>
      </div>
    </dialog>
  `,
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  @ViewChild('formDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;

  @Input() password!: string | null;
  @Output() closeDialog = new EventEmitter();

  open() {
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
    this.closeDialog.emit();
  }
}
