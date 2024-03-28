import {
  Component,
  DoCheck,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements DoCheck {
  showFiller = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  private urlSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.urlSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          (event.url == '/sign-up' || event.url == '/sign-in') &&
          this.authService.isAuthenticated() == true
        ) {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  ngDoCheck(): void {
    console.clear();
  }

  ngAfterViewInit(): void {
    // this.toggle();
  }

  toggle() {
    this.drawer?.toggle();
  }
}
