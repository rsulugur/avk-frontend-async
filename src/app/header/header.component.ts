import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  version = "1.0.1"
  username: string | null = "user";
  items: MenuItem[] = [
    {
      label: 'Crawl',
      icon: 'pi pi-shop',
      routerLink: ['/avk/crawl']
    },
    {
      label: 'Audit',
      icon: 'pi pi-history',
      routerLink: ['/avk/audit']
    }
  ]
}
