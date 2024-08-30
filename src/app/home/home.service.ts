import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Product } from './search-results/search-result.model';
import { AuthService } from '../auth/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl = 'http://localhost:8080/v1/fetch/products';

    fetchedProducts: BehaviorSubject<Product[] | undefined> = new BehaviorSubject<Product[] | undefined>([]);
    // fetchedProducts: WritableSignal<Product[] | undefined> = signal<Product[] | undefined>(undefined);
    isLoading: WritableSignal<boolean> = signal(false);

    private authService: AuthService = inject(AuthService);
    // private toastr = inject(ToastrService);

    constructor(private http: HttpClient) { }

    searchProducts(searchString: string): void {
        if (searchString.length < 4) {
            // this.toastr.error("Search query must be atleast 4 characters in length")
            return
        }
        this.isLoading.set(true)
        this.fetchedProducts.next(undefined);

        this.getStream(searchString).subscribe(
            {
                next: (newProducts: Product[]) => {
                    const oldProducts = this.fetchedProducts.getValue() ?? [];
                    this.fetchedProducts.next([...oldProducts, ...newProducts]);
                },
                error: (err) => {
                    this.isLoading.set(false);
                },
                complete: () => {
                    this.isLoading.set(false);
                }
            }
        )
    }

    getStream(searchKey: string): Observable<any> {
        const urlWithParams = `${this.apiUrl}?searchKey=${searchKey}`;
        return new Observable((observer) => {
            const eventSource = new EventSource(urlWithParams);
            eventSource.onmessage = (event) => {
                try {
                    const products: Product[] = JSON.parse(event.data);
                    observer.next(products);
                } catch (error) {
                    observer.error('Error parsing product data');
                }
            };
            eventSource.onerror = (error) => {
                observer.complete();
                eventSource.close();
            };
            return () => {
                observer.complete();
                eventSource.close();
            };
        });
    }
}
