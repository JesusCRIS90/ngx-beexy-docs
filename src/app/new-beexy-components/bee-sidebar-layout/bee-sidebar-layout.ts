import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'bee-sidebar-layout',
  imports: [],
  templateUrl: './bee-sidebar-layout.html',
  styleUrl: './bee-sidebar-layout.css',
  standalone: true,
})
export class BeeSidebarLayout implements OnInit, OnDestroy {
  @Input() MaxWidth: number = 30;
  @Input() MinWidth: number = 10;

  currentWidth = signal<number>(0);

  ngOnInit(): void {
    this.updateCurrentWidth();
    window.addEventListener('resize', this.updateCurrentWidth.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateCurrentWidth.bind(this));
  }

  get sidebarWidth() {
    return `${this.currentWidth()}px`; // Signals are functions!
  }

  private updateCurrentWidth(): void {
    console.log("Updating Width")
    const screenWidth = window.innerWidth;
    const newWidth = ((this.MaxWidth - this.MinWidth) / 100) * screenWidth;

    this.currentWidth.set( newWidth );
  }
}
