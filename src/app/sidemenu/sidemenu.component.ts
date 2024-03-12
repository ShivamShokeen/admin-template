import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent {
  newDate = new Date();
  username: string = 'Shivam Shokeen';
  email: string = 'shivamshokeen46@gmail.com';
  @Output() toggleTrigger = new EventEmitter<string>();

  constructor() {
    setInterval(() => {
      this.newDate = new Date();
    }, 1000);
  }

  trigger() {
    this.toggleTrigger.emit('toggle');
  }


}
