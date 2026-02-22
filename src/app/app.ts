import { Component, signal, Renderer2, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('YLR-Portfolio');
  isMenuOpen = false;
  currentYear = new Date().getFullYear();
  isLightMode = false;

  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isLightMode = true;
      this.renderer.addClass(document.documentElement, 'light-mode');
    } else {
      this.isLightMode = false;
      this.renderer.removeClass(document.documentElement, 'light-mode');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.toggle('menu-open', this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.classList.remove('menu-open');
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    if (this.isLightMode) {
      this.enableLightMode();
    } else {
      this.disableLightMode();
    }
  }

  enableLightMode() {
    this.renderer.setStyle(document.documentElement, 'transition', 'all 0.5s ease');
    this.renderer.addClass(document.documentElement, 'light-mode');
    localStorage.setItem('theme', 'light');
    setTimeout(() => this.renderer.removeStyle(document.documentElement, 'transition'), 500);
  }

  disableLightMode() {
    this.renderer.setStyle(document.documentElement, 'transition', 'all 0.5s ease');
    this.renderer.removeClass(document.documentElement, 'light-mode');
    localStorage.setItem('theme', 'dark');
    setTimeout(() => this.renderer.removeStyle(document.documentElement, 'transition'), 500);
  }
}