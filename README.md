# react-native-smooth-sheet

[![npm version](https://img.shields.io/npm/v/react-native-smooth-sheet?color=%2300b894&label=npm&style=flat-square)](https://www.npmjs.com/package/react-native-smooth-sheet)

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

## 📐 Props

| Prop        | Type          | Default | Description                                               |
|-------------|---------------|---------|-----------------------------------------------------------|
| `isVisible` | `boolean`     | —       | Controls whether the sheet is shown or hidden             |
| `onClose`   | `() => void`  | —       | Called after the sheet finishes its closing animation     |
| `snapPoint` | `number`      | `0.25`   | Fraction of screen height (e.g. `0.25`, `0.5`, `0.75`, `1`) |
| `children`  | `ReactNode`   | —       | Content to render inside the bottom sheet                 |

---

## 🔧 Ref Methods

| Method    | Description                                 |
|-----------|---------------------------------------------|
| `close()` | Programmatically close the bottom sheet     |

> Use `ref` to access this method from your components.

---

## 🧩 Features

- 💨 Smooth animated opening/closing
- 📏 Configurable snap points: `0.25`, `0.5`, `0.75`, `1`
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
