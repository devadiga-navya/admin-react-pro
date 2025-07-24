# CSS Design System

This directory contains a comprehensive CSS design system for the React admin application. The system is built with modern CSS practices, using CSS custom properties (variables) for consistent theming and maintainable code.

## File Structure

```
src/styles/
├── global.css          # Global variables, reset, and base styles
├── forms.css           # Form-specific styles and components
├── listings.css        # Table and listing page styles
├── details.css         # Detail page and content styles
├── components.css      # Reusable component styles and utilities
└── README.md          # This documentation file
```

## Design Principles

### 1. **Consistency**
- All colors, spacing, and typography are defined as CSS custom properties
- Consistent naming conventions across all files
- Unified design language throughout the application

### 2. **Accessibility**
- High contrast ratios for text readability
- Focus states for keyboard navigation
- Semantic HTML structure support
- Screen reader friendly components

### 3. **Responsive Design**
- Mobile-first approach
- Flexible grid systems
- Adaptive typography and spacing
- Touch-friendly interactive elements

### 4. **Performance**
- Minimal CSS footprint
- Efficient selectors
- Optimized animations and transitions
- No external dependencies

## Color Palette

### Primary Colors
- `--primary-color`: #2563eb (Blue)
- `--primary-dark`: #1d4ed8 (Dark Blue)
- `--primary-light`: #3b82f6 (Light Blue)

### Status Colors
- `--success-color`: #10b981 (Green)
- `--warning-color`: #f59e0b (Orange)
- `--error-color`: #ef4444 (Red)
- `--info-color`: #3b82f6 (Blue)

### Neutral Colors
- `--gray-50` to `--gray-900`: Complete grayscale palette
- `--white`: #ffffff

## Typography

### Font Family
- Primary: Inter (with system font fallbacks)
- Monospace: Monaco, Menlo, Ubuntu Mono

### Font Sizes
- `--font-size-xs`: 0.75rem
- `--font-size-sm`: 0.875rem
- `--font-size-base`: 1rem
- `--font-size-lg`: 1.125rem
- `--font-size-xl`: 1.25rem
- `--font-size-2xl`: 1.5rem
- `--font-size-3xl`: 1.875rem
- `--font-size-4xl`: 2.25rem

## Spacing System

### Spacing Scale
- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)

## Border Radius

- `--radius-sm`: 0.25rem (4px)
- `--radius-md`: 0.375rem (6px)
- `--radius-lg`: 0.5rem (8px)
- `--radius-xl`: 0.75rem (12px)
- `--radius-full`: 50% (for circles)

## Shadows

- `--shadow-sm`: Subtle elevation
- `--shadow-md`: Medium elevation
- `--shadow-lg`: High elevation
- `--shadow-xl`: Maximum elevation

## Transitions

- `--transition-fast`: 150ms ease-in-out
- `--transition-normal`: 250ms ease-in-out
- `--transition-slow`: 350ms ease-in-out

## Usage Examples

### Forms
```html
<div class="form-container">
  <div class="form-header">
    <h1 class="form-title">Create Organization</h1>
    <p class="form-subtitle">Add a new organization to the system</p>
  </div>
  
  <div class="form-section">
    <label class="form-label required">Organization Name</label>
    <input type="text" class="form-input" placeholder="Enter organization name">
  </div>
  
  <div class="form-actions">
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">Save</button>
  </div>
</div>
```

### Tables/Listings
```html
<div class="listing-container">
  <div class="listing-header">
    <h1 class="listing-title">Organizations</h1>
    <div class="listing-actions">
      <div class="listing-search">
        <input type="text" placeholder="Search organizations...">
      </div>
      <button class="btn btn-primary">Add Organization</button>
    </div>
  </div>
  
  <table class="listing-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Organization Name</td>
        <td><span class="listing-status active">Active</span></td>
        <td class="listing-actions-cell">
          <button class="listing-action-btn view">View</button>
          <button class="listing-action-btn edit">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Detail Pages
```html
<div class="detail-container">
  <div class="detail-header">
    <div class="detail-header-content">
      <div class="detail-header-info">
        <h1 class="detail-title">Organization Name</h1>
        <p class="detail-subtitle">Organization description</p>
        <div class="detail-meta">
          <div class="detail-meta-item">
            <span class="detail-meta-label">ID</span>
            <span class="detail-meta-value">ORG001</span>
          </div>
        </div>
      </div>
      <div class="detail-header-actions">
        <span class="detail-status active">Active</span>
        <button class="btn btn-primary">Edit</button>
      </div>
    </div>
  </div>
  
  <div class="detail-content">
    <div class="detail-main">
      <div class="detail-section">
        <div class="detail-section-header">
          <h2 class="detail-section-title">Details</h2>
        </div>
        <div class="detail-section-body">
          <div class="detail-grid">
            <div class="detail-field">
              <span class="detail-field-label">Name</span>
              <span class="detail-field-value">Organization Name</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Component Classes

### Buttons
- `.btn`: Base button class
- `.btn-primary`: Primary action button
- `.btn-secondary`: Secondary action button
- `.btn-success`: Success action button
- `.btn-danger`: Destructive action button
- `.btn-outline`: Outlined button style
- `.btn-sm`, `.btn-lg`: Size variants

### Status Indicators
- `.listing-status.active`: Active status
- `.listing-status.inactive`: Inactive status
- `.listing-status.pending`: Pending status

### Alerts
- `.alert`: Base alert class
- `.alert-success`: Success message
- `.alert-warning`: Warning message
- `.alert-error`: Error message
- `.alert-info`: Information message

### Badges
- `.badge`: Base badge class
- `.badge-primary`: Primary badge
- `.badge-success`: Success badge
- `.badge-warning`: Warning badge
- `.badge-error`: Error badge

## Utility Classes

### Display
- `.d-block`, `.d-inline`, `.d-flex`, `.d-grid`, `.d-none`
- `.d-md-none`, `.d-lg-none` (responsive)

### Flexbox
- `.flex-row`, `.flex-column`
- `.justify-content-start`, `.justify-content-center`, `.justify-content-between`
- `.align-items-start`, `.align-items-center`, `.align-items-end`

### Text
- `.text-center`, `.text-left`, `.text-right`
- `.text-truncate`, `.text-break`
- `.font-bold`, `.font-semibold`, `.font-medium`

### Spacing
- `.text-xs`, `.text-sm`, `.text-base`, `.text-lg`, `.text-xl`
- `.text-primary`, `.text-secondary`, `.text-success`, `.text-error`

## Responsive Design

The design system includes responsive breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Responsive utilities are available for hiding/showing elements at different breakpoints.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS Custom Properties support required
- Internet Explorer 11+ (with polyfills if needed)

## Performance Considerations

1. **CSS Variables**: Efficient for theming and reduces CSS bundle size
2. **Minimal Nesting**: Flat CSS structure for better performance
3. **Efficient Selectors**: Simple, fast selectors
4. **Optimized Animations**: Hardware-accelerated transitions
5. **No External Dependencies**: Self-contained design system

## Maintenance

### Adding New Components
1. Create the component styles in the appropriate CSS file
2. Follow the existing naming conventions
3. Use CSS custom properties for theming
4. Include responsive design considerations
5. Add documentation to this README

### Updating Colors/Themes
1. Modify the CSS custom properties in `global.css`
2. Test across all components
3. Ensure accessibility compliance
4. Update documentation

### Best Practices
1. Use semantic class names
2. Keep specificity low
3. Avoid !important declarations
4. Test across different screen sizes
5. Validate accessibility
6. Document new patterns

## Accessibility Features

- High contrast color ratios
- Focus indicators for keyboard navigation
- Semantic HTML structure support
- Screen reader friendly components
- Touch-friendly interactive elements
- Reduced motion support for animations

This design system provides a solid foundation for building consistent, accessible, and maintainable user interfaces. 