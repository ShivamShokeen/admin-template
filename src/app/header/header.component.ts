import { CommonModule } from '@angular/common';
import { Component, HostListener, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggleTrigger = new EventEmitter<string>();

  fullScreenToggle: any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F11') {
      this.toggleFullScreen();
    }
  }

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.fullScreenToggle = document.documentElement;
  }
  trigger() {
    this.toggleTrigger.emit('toggle');
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      this.openFullScreen();
    } else {
      this.closeFullScreen();
    }
  }

  openFullScreen() {
    if (this.fullScreenToggle.requestFullscreen) {
      this.fullScreenToggle.requestFullscreen();
    } else if (this.fullScreenToggle.mozRequestFullScreen) {
      /* Firefox */
      this.fullScreenToggle.mozRequestFullScreen();
    } else if (this.fullScreenToggle.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.fullScreenToggle.webkitRequestFullscreen();
    } else if (this.fullScreenToggle.msRequestFullscreen) {
      /* IE/Edge */
      this.fullScreenToggle.msRequestFullscreen();
    }
  }

  closeFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
