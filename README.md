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

## 📜 ScrollView & FlatList Support

The `SmoothSheet` works seamlessly with **ScrollView** and **FlatList** components. The drag functionality is isolated to the top drag area, preventing conflicts with scrollable content.

### 📋 ScrollView Example

```tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { SmoothSheet, SmoothSheetRef } from 'react-native-smooth-sheet';

export default function App() {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<SmoothSheetRef>(null);

  // Create data for ScrollView
  const data = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    description: `This is the description for item number ${index + 1}`,
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />

      <SmoothSheet
        ref={sheetRef}
        isVisible={visible}
        onClose={() => setVisible(false)}
        snapPoint={0.7}
        paddingHorizontal={15}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        maxTopSnapPoint={Platform.OS === 'ios' ? 0.93 : 1}
        dragIndicatorColor="#ccc" //#ff9800  //#666 //#ccc
        flattenOnFullOpen={true}
        theme="#fff" ////#1e1e1e //#fff
        disableDrag={false}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          {data.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: '#f5f5f5',
                padding: 15,
                marginVertical: 5,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                {item.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      </SmoothSheet>
    </View>
  );
}
```

### 📱 FlatList Example

```tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { SmoothSheet, SmoothSheetRef } from 'react-native-smooth-sheet';

export default function App() {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<SmoothSheetRef>(null);

  // Create data for FlatList
  const data = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    description: `This is the description for item number ${index + 1}`,
  }));

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 14, color: '#666' }}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />

      <SmoothSheet
        ref={sheetRef}
        isVisible={visible}
        onClose={() => setVisible(false)}
        snapPoint={0.7}
        paddingHorizontal={15}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        maxTopSnapPoint={Platform.OS === 'ios' ? 0.93 : 1}
        dragIndicatorColor="#ccc" //#ff9800  //#666 //#ccc
        flattenOnFullOpen={true}
        theme="#fff" //#1e1e1e //#fff
        disableDrag={false}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
         <View style={{ paddingBottom: 500 }}/>
      </SmoothSheet>
    </View>
  );
}
```

### ✨ Key Benefits

- **🎯 Isolated Drag Area**: Dragging only works in the top handle area, not in the scrollable content
- **🔄 Smooth Scrolling**: ScrollView and FlatList work naturally without interfering with sheet dragging
- **📏 Flexible Height**: Use different `snapPoint` values to accommodate your content
- **⚡ Performance**: FlatList provides optimal performance for large datasets
- **🎨 Customizable**: Apply your own styles to list items and containers

### 💡 Best Practices

- **ScrollView**: Best for smaller lists (< 50 items) or mixed content types
- **FlatList**: Ideal for large datasets with consistent item layouts
- **Height Management**: Use `snapPoint` to provide adequate space for your content
- **Content Padding**: Add `paddingBottom` to `contentContainerStyle` for better spacing

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


