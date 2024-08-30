import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean | Observable<boolean> {
        // TODO - connect auth again
        if (!this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login'], { replaceUrl: true });
            return false;
        }
    }
}
