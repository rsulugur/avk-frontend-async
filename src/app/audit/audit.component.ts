import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuditService } from './audit.service';
import { Audit } from './audit.model';
import { CommonModule, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-audit',
  standalone: true,
  templateUrl: './audit.component.html',
  imports: [DatePipe, CommonModule, CardModule, MessageModule, MessagesModule, TableModule],
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  currentDate: Date = new Date();
  items: WritableSignal<Audit[]> = signal([]);
  destroyRef = inject(DestroyRef)
  recentSearchService = inject(AuditService);
  messages = [{ severity: 'info', detail: 'No Products Found' }];
  ngOnInit(): void {
    const subscription = this.recentSearchService.recentProducts$.subscribe({
      next: data => {
        console.log(data);
        return this.items.set(data);
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
    this.recentSearchService.getRecentProducts();
  }
}
