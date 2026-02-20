# Responsive & Accessibility QA

## Viewports
- iPhone width (390px): header, tables, and buttons fit without horizontal overflow
- iPad width (768px): AppShell nav behaves and content stays readable

## Keyboard
- Tab through inputs and buttons; focus ring is visible
- Action icons announce labels (screen reader)

## ARIA
- Icon-only buttons have `aria-label`
- Form errors are linked with inputs (`aria-describedby`)
