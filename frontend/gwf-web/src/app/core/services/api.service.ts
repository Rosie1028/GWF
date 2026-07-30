import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, FounderInfo, ContactMessage, ContactResponse, OrderRequest, OrderResponse } from '../models';
import { withLocalProductImages } from '../utils/product-images';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      map(products => withLocalProductImages(products))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
      map(product => withLocalProductImages([product])[0])
    );
  }

  getFounderInfo(): Observable<FounderInfo> {
    return this.http.get<FounderInfo>(`${this.baseUrl}/about`);
  }

  sendContact(message: ContactMessage): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.baseUrl}/contact`, message);
  }

  placeOrder(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.baseUrl}/orders`, order);
  }
}
