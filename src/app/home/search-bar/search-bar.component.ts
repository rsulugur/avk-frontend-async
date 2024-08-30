import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../home.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = 'Macbook';
  apiService: ApiService = inject(ApiService);

  onSearch() {
    this.apiService.searchProducts(this.searchQuery);
  }
}