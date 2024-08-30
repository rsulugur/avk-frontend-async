import { ChangeDetectorRef, Component, computed, DestroyRef, inject, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { Product } from "./search-result.model"
import { ApiService } from '../home.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { getSourceLogo } from '../../utils/apputils';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, TableModule, CurrencyPipe, ButtonModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  constructor(private cdr: ChangeDetectorRef, private destroyRef: DestroyRef, private apiService: ApiService) { }
  fetchSourcelogo = (source: string) => getSourceLogo(source);
  products: WritableSignal<Product[]> = signal<Product[]>([]);

  first = 0;

  ngOnInit(): void {
    const sub = this.apiService.fetchedProducts.subscribe({
      next: (data: Product[] | undefined) => {
        if (data) {
          this.products.set(data);
        }
        else {
          this.products.set([]);
        }
        this.cdr.detectChanges();
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
