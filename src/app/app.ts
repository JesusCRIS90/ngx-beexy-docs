import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BeeSidebarLayout } from "./new-beexy-components/bee-sidebar-layout/bee-sidebar-layout"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BeeSidebarLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngx-beexy-docs');
}
