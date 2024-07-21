import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.init();
  }

  switchTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

}