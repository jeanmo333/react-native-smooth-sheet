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
## Demo
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
        snapPoint={0.5}
      >
        <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: "bold" }}>
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

Then use it inside your screen like this:

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
        snapPoint={0.5}
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

| Prop        | Type          | Default     | Description                                               |
|-------------|---------------|-------------|-----------------------------------------------------------|
| `isVisible` | `boolean`     | —           | Controls whether the sheet is shown or hidden             |
| `onClose`   | `() => void`  | —           | Called after the sheet finishes its closing animation     |
| `snapPoint` | `number`      | `0.25=25%`  | Fraction of screen height (e.g. `0.25`, `0.3=30%`, `0.5=50%`, `0.75=75%`,`0.8=80%`, `0.9=90%`, `0.95=95%`, `1=100%`) |
| `children`  | `ReactNode`   | —           | Content to render inside the bottom sheet                 |

---

## 🔧 Ref Methods

| Method    | Description                                 |
|-----------|---------------------------------------------|
| `close()` | Programmatically close the bottom sheet     |

> Use `ref` to access this method from your components.

---

## 🧩 Features

- 💨 Smooth animated opening/closing
- 📏 Configurable snap points: `0.25`,`0.3`,`0.4`, `0.5`, `0.75`, `0.8`,`0.90`, `0.95`, `1`
- 🎛️ Fully customizable content via `children`
- 🎯 Drag-to-close gesture support
- ⚡ **Zero dependencies** – no `Reanimated`, no `GestureHandler`

---

## 📦 License

MIT © [Moril Jean Francois](https://github.com/jeanmo333)

---

## 🔗 Links

- 📘 GitHub: [github.com/jeanmo333/react-native-smooth-sheet](https://github.com/jeanmo333/react-native-smooth-sheet)  
- 📦 NPM: [npmjs.com/package/react-native-smooth-sheet](https://www.npmjs.com/package/react-native-smooth-sheet)
