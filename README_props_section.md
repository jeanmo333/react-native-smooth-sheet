## 📐 Props

| Prop                  | Type          | Default     | Description                                                                 |
|-----------------------|---------------|-------------|-----------------------------------------------------------------------------|
| `isVisible`           | `boolean`     | —           | Controls whether the sheet is shown or hidden                               |
| `onClose`             | `() => void`  | —           | Called after the sheet finishes its closing animation                       |
| `snapPoint`           | `number`      | `0.25=25%`  | Fraction of screen height (e.g. `0.25`, `0.5`, `1`)                          |
| `paddingHorizontal`   | `number`      | `15`        | Horizontal padding inside the sheet                                         |
| `borderTopLeftRadius` | `number`      | `20`        | Top-left corner radius of the sheet                                         |
| `borderTopRightRadius`| `number`      | `20`        | Top-right corner radius of the sheet                                        |
| `children`            | `ReactNode`   | —           | Content to render inside the bottom sheet                                   |