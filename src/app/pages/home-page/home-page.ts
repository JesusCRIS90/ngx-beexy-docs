import { Component, ViewChild } from '@angular/core';

import { BeeSidebarLayout, SidebarLayoutState } from '../../new-beexy-components/bee-sidebar-layout/bee-sidebar-layout';

@Component({
  selector: 'app-home-page',
  imports: [BeeSidebarLayout],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export default class HomePage {
  // ✔ Reference to the child component
  @ViewChild(BeeSidebarLayout)
  beeSidebarLayoutRef!: BeeSidebarLayout;

  // ✔ Getter checks real component state
  public IsSideBarCollapse(): boolean {
    return this.beeSidebarLayoutRef?.IsCollapsed ?? false;
  }

  // ✔ Toggle collapse on click
  ClickCollapse() {
    // console.log('Button Collapse Click');

    if (!this.beeSidebarLayoutRef) return;

    const isCollapse: boolean = this.beeSidebarLayoutRef.IsCollapsed;

    this.beeSidebarLayoutRef.setCollapse(!isCollapse);
  }

  // ✔ Dynamic button text
  CollapseButtonText(): string {
    return this.IsSideBarCollapse() ? 'Expand' : 'Collapse';
  }

  onSidebarChange(state: SidebarLayoutState) {
    console.log('Sidebar updated:', {state});
  }
}
