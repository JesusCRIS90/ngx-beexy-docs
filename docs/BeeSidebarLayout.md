# BeeSidebarLayout Component

## Why this component?

Do you want a dynamic, modern sidebar like the ones in everyday apps (VS Code, Krita, Clip Studio Paint) where the user has full control over the sidebar width and can change it manually?

If so, this component is for you.

### Features

- Manually adjustable width
- User-configurable min / max width (expressed as percentages)
- Collapse / expand control
- Smooth animations when collapsing / expanding

---

## Basic usage

Example:

```html
<bee-sidebar-layout>
  <div sidebar>
    <!-- Sidebar content here -->
  </div>

  <div>
    <!-- Main content here -->
  </div>
</bee-sidebar-layout>
```

```ts
import { Component, ViewChild } from '@angular/core';

// Note: update import path to match your package / library
import { BeeSidebarLayout } from '@beexy/layouts/bee-sidebar-layout';

@Component({
  selector: 'app-home-page',
  imports: [BeeSidebarLayout],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export default class HomePage {}
```

Implementation notes:

* The layout expects two projected areas:
  * The element with the sidebar attribute acts as the sidebar container. This attribute is required because the component uses ng-content to project that element into the sidebar slot.
  * The second projected element is the main content area.
* You don't have to use div elements — any HTML element is fine — but remember to include the sidebar attribute on the sidebar element.

## API

The component exposes a small API for more advanced control:

| Name                          | Type          | Purpose                                                                  | Notes                      |
| ----------------------------- | ------------- | ------------------------------------------------------------------------ | -------------------------- |
| `MaxWidth`                    | `@Input()`    | Defines the maximum sidebar width (percentage)                           | Numeric (percentage)       |
| `MinWidth`                    | `@Input()`    | Defines the minimum sidebar width (percentage)                           | Numeric (percentage)       |
| `sidebarWidthChange`          | `@Output()`   | Emits when the sidebar width changes                                     | Emits `SidebarLayoutState` |
| `sidebarWidth()`              | getter method | Returns current sidebar width in pixels                                  | `number` (px)              |
| `IsCollapsed()`               | getter method | Returns whether the sidebar is collapsed                                 | `boolean`                  |
| `setCollapse(value: boolean)` | setter method | Programmatically set collapse state: `true` = collapse, `false` = expand | —                          |
| `SidebarLayoutState`          | interface     | Shape of the object emitted by `sidebarWidthChange`                      | See interface below        |

#### SidebarLayoutState Interface Data
```ts
export interface SidebarLayoutState {
  width: number;
  widthPercentage: number,
  isCollapsed: boolean;
}
```

## Advanced Use

This example demonstrates using the full API:

```html
<bee-sidebar-layout 
  class="custom-sidebar-1" 
  [MaxWidth]="30" 
  [MinWidth]="10"
  (sidebarWidthChange)="onSidebarChange($event)"
>
  <div sidebar>
    <h3>Sidebar</h3>
    <p>Navigation or menu here.</p>
  </div>

  <div>
    <h1>Beexy Docs - Home Page</h1>
    <p>This area grows or shrinks depending on the sidebar width.</p>
    <button (click)="clickCollapse()">{{ collapseButtonText() }}</button>
  </div>
</bee-sidebar-layout>
```

```ts
import { Component, ViewChild } from '@angular/core';
import { BeeSidebarLayout, SidebarLayoutState } from '../../new-beexy-components/bee-sidebar-layout/bee-sidebar-layout';

@Component({
  selector: 'app-home-page',
  imports: [BeeSidebarLayout],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export default class HomePage {
  // Reference to BeeSidebarLayout component
  @ViewChild(BeeSidebarLayout)
  beeSidebarLayoutRef!: BeeSidebarLayout;

  // Returns current collapse state
  public isSidebarCollapsed(): boolean {
    return this.beeSidebarLayoutRef?.IsCollapsed ?? false;
  }

  // Toggle collapse when button is clicked
  clickCollapse(): void {
    if (!this.beeSidebarLayoutRef) return;
    const isCollapsed = this.beeSidebarLayoutRef.IsCollapsed;
    this.beeSidebarLayoutRef.setCollapse(!isCollapsed);
  }

  // Button text updates dynamically
  collapseButtonText(): string {
    return this.isSidebarCollapsed() ? 'Expand' : 'Collapse';
  }

  // Handler for output event
  onSidebarChange(state: SidebarLayoutState): void {
    console.log('Sidebar updated:', state);
  }
}
```

## Styling / customization

The component ships with default styles. You can override them by providing custom CSS. Below is a simplified view of the CSS structure and the most useful properties.

Note: examples below use SCSS-like nesting for clarity. If you use plain CSS, adapt accordingly.

```css
.bee-sidebar-layout {
  .bee-sidebar {
    background: #f4f4f4;
    border-right: 1px solid #ddd;
    transition: width 0.5s ease;

    /* === Drag handle === */
    .bee-resize-handle {
      width: 5px;
    }

    .bee-resize-handle:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .bee-content {
    background: #fff;
  }
}
```

Example custom themes:

```css
.custom-sidebar-1 {
  .bee-sidebar-layout {
    .bee-sidebar {
      background: #fcacac;
      border-right: 3px solid #ddd;
    }

    .bee-resize-handle:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .bee-content {
      background: #b3e5f5;
    }
  }
}
```

```css
.custom-sidebar-2 {
  .bee-sidebar-layout {
    .bee-sidebar {
      background: #d7fcac;
      border-right: 1px solid #ddd;
    }

    .bee-resize-handle:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .bee-content {
      background: #004258;
    }
  }
}
```

Usage:

```html
<bee-sidebar-layout class="custom-sidebar-1">
<!-- Rest of the Code -->
</bee-sidebar-layout>
```

Two important considerations:

1. Put these overriding styles in a global stylesheet (e.g., styles.css or styles.scss) because Angular's component-scoped styles may prevent your global overrides from applying to projected children.

2. BE CAREFUL when overriding properties — changing certain layout-related CSS can break the component. Modify default styles at your own risk.