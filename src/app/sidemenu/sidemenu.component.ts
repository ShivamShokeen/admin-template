import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Event,
} from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent implements OnInit {
  newDate = new Date();
  username: string = 'Shivam Shokeen';
  email: string = 'shivamshokeen46@gmail.com';
  private urlSubscription: Subscription = new Subscription();
  @Output() toggleTrigger = new EventEmitter<string>();
  routerURL: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    setInterval(() => {
      this.newDate = new Date();
    }, 1000);
  }

  ngOnInit() {
    this.routerURL = '';
    this.urlSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.routerURL = event.url;
      }
    });
  }

  trigger() {
    this.toggleTrigger.emit('toggle');
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }
}
