import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggleTrigger = new EventEmitter<string>();

  trigger() {
    this.toggleTrigger.emit('toggle');
  }
}
