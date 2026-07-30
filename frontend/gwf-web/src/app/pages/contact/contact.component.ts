import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = '';
  email = '';
  subject = '';
  message = '';

  submitting = signal(false);
  success = signal('');
  error = signal('');

  constructor(private api: ApiService) {}

  onSubmit(): void {
    this.submitting.set(true);
    this.success.set('');
    this.error.set('');

    this.api.sendContact({
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    }).subscribe({
      next: (response) => {
        this.submitting.set(false);
        if (response.success) {
          this.success.set(response.message);
          this.name = '';
          this.email = '';
          this.subject = '';
          this.message = '';
        }
      },
      error: () => {
        this.submitting.set(false);
        this.error.set('Failed to send message. Please try again.');
      }
    });
  }
}
