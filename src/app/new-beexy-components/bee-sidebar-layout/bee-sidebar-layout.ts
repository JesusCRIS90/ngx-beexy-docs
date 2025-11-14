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
  private currentWidthPercentage = this.MaxWidth;

  private isDragging = false;
  private mouseFirstClick_X = 0;
  private onClickMouseFirstWidth = 0;

  private resizeListener!: () => void;
  private moveMouseListener!: (event: MouseEvent) => void;
  private upMouseListener!: () => void;

  ngOnInit(): void {
    this.firstDraw();

    // Listen for resize
    this.resizeListener = this.onResizeTrigger.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
    document.removeEventListener('mousemove', this.moveMouseListener);
    document.removeEventListener('mouseup', this.upMouseListener);
  }

  get sidebarWidth() {
    return `${this.currentWidth()}px`;
  }

  private onResizeTrigger(): void {
    
    const screenWidth = window.innerWidth;

    const newWidth = (this.currentWidthPercentage / 100 ) * screenWidth;

    this.currentWidth.set(newWidth);
  }

  private firstDraw(): void {
    const screenWidth = window.innerWidth;
    const newWidth = (this.MaxWidth / 100) * screenWidth;

    this.currentWidth.set(newWidth);
  }

  private updateCurrentWidthPercentage()
  {
    const screenWidth = window.innerWidth;
    const newPercentage = ( 1 - ( (screenWidth - this.currentWidth()) / screenWidth) ) * 100;

    this.currentWidthPercentage = Math.round( newPercentage * 100 ) / 100;  
  }

  // =========================
  // 🖱️  Drag Handlers
  // =========================

  onMouseDown(event: MouseEvent) {
    // console.log(`[onMouseDown]: ${event.clientX}`);

    this.isDragging = true;
    this.mouseFirstClick_X = event.clientX;
    this.onClickMouseFirstWidth = this.currentWidth();

    // Add listeners for drag tracking
    this.moveMouseListener = this.onMouseMove.bind(this);
    this.upMouseListener = this.onMouseUp.bind(this);

    document.addEventListener('mousemove', this.moveMouseListener);
    document.addEventListener('mouseup', this.upMouseListener);

    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    // console.log(`[onMouseMOve]: ${event.clientX}`);

    // Calculate Mouse 'Shifting' in Pixels
    const deltaX = event.clientX - this.mouseFirstClick_X;
    const newWidth = this.onClickMouseFirstWidth + deltaX;

    // Calculate min & max in pixels
    const screenWidth = window.innerWidth;
    const minPx = (this.MinWidth / 100) * screenWidth;
    const maxPx = (this.MaxWidth / 100) * screenWidth;

    // Clamping width
    const clampedWidth = Math.min(Math.max(newWidth, minPx), maxPx);

    this.currentWidth.set(clampedWidth);
  }

  onMouseUp() {
    this.updateCurrentWidthPercentage();

    console.log(this.currentWidthPercentage);
    this.isDragging = false;
    document.removeEventListener('mousemove', this.moveMouseListener);
    document.removeEventListener('mouseup', this.upMouseListener);
  }
}
