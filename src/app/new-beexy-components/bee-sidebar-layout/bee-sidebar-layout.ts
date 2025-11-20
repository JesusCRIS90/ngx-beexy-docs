import {
  Component,
  computed,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'bee-sidebar-layout',
  imports: [],
  templateUrl: './bee-sidebar-layout.html',
  styleUrl: './bee-sidebar-layout.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class BeeSidebarLayout implements OnInit, OnDestroy {
  @Input() MaxWidth: number = 30;
  @Input() MinWidth: number = 10;

  currentWidth = signal<number>(0);
  isCollapsed = signal<boolean>(false);

  private currentWidthPercentage = this.MaxWidth;
  private previousWidthValue = 0;

  private isDragging = false;
  private mouseFirstClick_X = 0;
  private onClickMouseFirstWidth = 0;
  private maxWidthValue: number = 0;
  private minWidthValue: number = 0;

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

  get IsCollapsed(): boolean {
    return this.isCollapsed();
  }

  public setCollapse(collapse: boolean): void {
    if (collapse) {
      this.previousWidthValue = this.currentWidth();
      this.currentWidth.set(this.minWidthValue);
    } else {
      this.currentWidth.set(this.previousWidthValue);
    }

    this.updateCurrentWidthPercentage();
    this.isCollapsed.set(collapse);
  }

  private onResizeTrigger(): void {
    // Update MinMax Values
    this.calculateMaxMinWidthValues();

    // Calculate new Width and set to signal
    const screenWidth = window.innerWidth;
    const newWidth = (this.currentWidthPercentage / 100) * screenWidth;
    this.currentWidth.set(newWidth);
    this.previousWidthValue = this.currentWidth();
  }

  private firstDraw(): void {
    this.calculateMaxMinWidthValues();
    this.setCollapse(false);
    this.currentWidth.set(this.maxWidthValue);
    this.previousWidthValue = this.currentWidth();
  }

  private calculateMaxMinWidthValues() {
    const screenWidth = window.innerWidth;

    this.maxWidthValue = (this.MaxWidth / 100) * screenWidth;
    this.minWidthValue = (this.MinWidth / 100) * screenWidth;
  }

  private updateCurrentWidthPercentage() {
    const screenWidth = window.innerWidth;
    const newPercentage = (1 - (screenWidth - this.currentWidth()) / screenWidth) * 100;

    this.currentWidthPercentage = Math.round(newPercentage * 100) / 100;
  }

  private isCurrentWidthMinimum(): boolean {
    return this.currentWidth() <= this.minWidthValue;
  }

  // =========================
  // 🖱️  Drag Handlers
  // =========================

  onMouseDown(event: MouseEvent) {
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
    this.previousWidthValue = this.currentWidth();
  }

  onMouseUp() {
    this.updateCurrentWidthPercentage();
    this.isDragging = false;

    this.isCollapsed.set(this.isCurrentWidthMinimum() ? true : false);

    // console.log( {
    //   "isCollapse": this.isCollapsed(),
    //   "minWidthValue": this.minWidthValue,
    //   "currentWidth": this.currentWidth()
    // } );
    document.removeEventListener('mousemove', this.moveMouseListener);
    document.removeEventListener('mouseup', this.upMouseListener);
  }
}
