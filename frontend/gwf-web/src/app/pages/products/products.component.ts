import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models';
import { resolveProductImageUrl } from '../../core/utils/product-images';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');
  showCart = signal(false);
  checkoutSuccess = signal('');
  checkoutError = signal('');

  customerName = '';
  customerEmail = '';
  shippingAddress = '';

  constructor(
    private api: ApiService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load products. Make sure the API is running.');
        this.loading.set(false);
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showCart.set(true);
  }

  toggleCart(): void {
    this.showCart.update(v => !v);
  }

  onImageError(event: Event, product: Product): void {
    const img = event.target as HTMLImageElement;
    img.src = resolveProductImageUrl(product);
  }

  placeOrder(): void {
    this.checkoutSuccess.set('');
    this.checkoutError.set('');

    const items = this.cartService.cartItems();
    if (items.length === 0) return;

    this.api.placeOrder({
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      shippingAddress: this.shippingAddress,
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price
      }))
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.checkoutSuccess.set(response.message);
          this.cartService.clearCart();
          this.customerName = '';
          this.customerEmail = '';
          this.shippingAddress = '';
        }
      },
      error: () => {
        this.checkoutError.set('Order failed. Please try again.');
      }
    });
  }
}
