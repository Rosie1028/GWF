import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { FounderInfo } from '../../core/models';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  founder = signal<FounderInfo | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFounderInfo().subscribe({
      next: (info) => {
        this.founder.set(info);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load founder information.');
        this.loading.set(false);
      }
    });
  }
}
