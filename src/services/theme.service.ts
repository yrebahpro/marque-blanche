// theme.service.ts
import { Injectable, Inject, Renderer2, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private renderer: Renderer2;
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get themeFromLocalStorage(): string {
    if (this.isBrowser) {
      const currentTheme = localStorage.getItem('theme');
      return currentTheme ? currentTheme : 'default-theme';
    }
    return 'default-theme';
  }

  set themeToLocalStorage(value: string) {
    if (this.isBrowser) {
      localStorage.setItem('theme', value);
    }
  }

  init(): void {
    if (this.isBrowser) {
      this.themeToLocalStorage = this.themeFromLocalStorage;
      this.setTheme(this.themeFromLocalStorage);
    }
  }

  setTheme(themeValue: string | null): void {
    if (this.isBrowser && themeValue) {
      const rootElement = document.documentElement;
      this.themeToLocalStorage = themeValue;
      this.renderer.setAttribute(rootElement, 'data-theme', this.themeFromLocalStorage);
    }
  }
}