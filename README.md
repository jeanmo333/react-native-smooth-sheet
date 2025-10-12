# react-native-smooth-sheet

🎉 A **smooth, animated, and customizable** bottom sheet component for React Native — built from scratch with **zero dependencies**.
Perfect for **Expo** and **React Native CLI** apps.

---

## 🚀 Installation

```bash
npm install react-native-smooth-sheet
# or
yarn add react-native-smooth-sheet
```

---

## 🎥 Demo

![Demo](./assets/demo.gif)

---

## 💡 Usage

```tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SmoothSheet, SmoothSheetRef } from 'react-native-smooth-sheet';

export default function App() {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<SmoothSheetRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />

      <SmoothSheet
        ref={sheetRef}
        isVisible={visible}
        onClose={() => setVisible(false)}
        snapPoint={0.25} // default
        paddingHorizontal={15} // default
        borderTopLeftRadius={20} // default
        borderTopRightRadius={20} // default
        theme="#fff" // default
        disableDrag={false} // default
        // maxTopSnapPoint={Platform.OS ==="ios" ? 0.93 : 1} optional
        //dragIndicatorColor="#ccc" --optional  //#ff9800  //#666
        //flattenOnFullOpen={false}  -- optional
      >
        <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: "bold", color: 'white' }}>
          Hello from Smooth Sheet 🎉
        </Text>
        <Button title="Close" onPress={() => sheetRef.current?.close()} />
      </SmoothSheet>
    </View>
  );
}
```

---

## 🧩 Custom Components Support

You can render your own custom components inside the `SmoothSheet`. For example:

```tsx
// HelloSmooth.tsx
import { Text, Button } from 'react-native';
import React from 'react';
import { SmoothSheetRef } from 'react-native-smooth-sheet';

interface Props {
  sheetRef: React.RefObject<SmoothSheetRef>;
}

const HelloSmooth = ({ sheetRef }: Props) => {
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>
        Hello from Smooth Sheet 🎉
      </Text>
      <Button title="Close" onPress={() => sheetRef.current?.close()} />
    </>
  );
};

export default HelloSmooth;
```

```tsx
// App.tsx
import React, { useRef, useState } from 'react';
import { View, Button } from 'react-native';
import { SmoothSheet, SmoothSheetRef } from 'react-native-smooth-sheet';
import HelloSmooth from './HelloSmooth';

export default function App() {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<SmoothSheetRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />

      <SmoothSheet
        ref={sheetRef}
        isVisible={visible}
        onClose={() => setVisible(false)}
        snapPoint={0.25} // default
        paddingHorizontal={15} // default
        borderTopLeftRadius={20} // default
        borderTopRightRadius={20} // default
        theme="#fff" // default
        disableDrag={false} // default
       // maxTopSnapPoint={Platform.OS ==="ios" ? 0.93 : 1} optional
        //dragIndicatorColor="#ccc" --optional  //#ff9800  //#666
        //flattenOnFullOpen={false}  -- optional
      >
        <HelloSmooth sheetRef={sheetRef} />
      </SmoothSheet>
    </View>
  );
}
```

✅ This makes your implementation more modular and reusable!

---

## 📐 Props

| Prop                  | Type          | Default     | Description                                                                 |
|-----------------------|---------------|-------------|-----------------------------------------------------------------------------|
| `isVisible`           | `boolean`     | —           | Controls whether the sheet is shown or hidden                               |
| `onClose`             | `() => void`  | —           | Called after the sheet finishes its closing animation                       |
| `snapPoint`           | `number`      | `0.25=25%`  | Fraction of screen height (e.g. `0.25`, `0.3=30%`, `0.5=50%`, `0.75=75%`,`0.8=80%`, `0.9=90%`, `0.95=95%`, `1=100%`)            |
| `paddingHorizontal`   | `number`      | `15`        | Horizontal padding inside the sheet                                         |
| `borderTopLeftRadius` | `number`      | `20`        | Top-left corner radius of the sheet                                         |
| `borderTopRightRadius`| `number`      | `20`        | Top-right corner radius of the sheet                                        |
| `theme`               | `string`      | `#fff`      | Background color of the sheet (supports any color)                          |
| `disableDrag`         | `boolean`     | `false`     | Disables drag-to-close and tap outside to close functionality
| `dragIndicatorColor`  | `string`      | `#ccc` / `#666` | Customize the drag handle color. Defaults to `#ccc` (light) or `#666` (dark) |
| `flattenOnFullOpen`   | `boolean`     | `false`     | If `true`, removes border raduis when fully expanded (`snapPoint = 1`)       |            |
| `maxTopSnapPoint`     | `number`      | `0`         | Limits how far the user can drag upward. E.g. `0.93` means up to 93% height  |
| `children`            | `ReactNode`   | —           | Content to render inside the bottom sheet                                   |

---

## 🔧 Ref Methods

| Method    | Description                                 |
|-----------|---------------------------------------------|
| `close()` | Programmatically close the bottom sheet     |

> Use `ref` to access this method from your components.

---

## 🧩 Features

- 💨 Smooth animated opening/closing
- 📏 Configurable snap points with `snapPoint`
- 🧲 Prevent dragging beyond a limit with `maxTopSnapPoint`
- 🎯 Drag-to-close gesture support (can be disabled with `disableDrag`)
- 🖼️ Fully customizable content via `children`
- 🎨 Light/dark/custom theme support via `theme`
- 🖌️ Customize the drag indicator color using `dragIndicatorColor`
- 🧩 Border radius customization with `borderTopLeftRadius` and `borderTopRightRadius`
- 🧱 Flatten top corners on full open using `flattenOnFullOpen`
- ↔️ Inner horizontal padding control via `paddingHorizontal`
- 🚫 Prevent closing on backdrop tap with `disableDrag`
- ⚡ **Zero dependencies** – no `Reanimated`, no `GestureHandler`

---

## 📦 License

MIT © [Moril Jean Francois](https://github.com/jeanmo333)

---

## 🔗 Links

- 📘 GitHub: [github.com/jeanmo333/react-native-smooth-sheet](https://github.com/jeanmo333/react-native-smooth-sheet)
- 📦 NPM: [npmjs.com/package/react-native-smooth-sheet](https://www.npmjs.com/package/react-native-smooth-sheet)


