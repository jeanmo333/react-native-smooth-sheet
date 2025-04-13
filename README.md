# react-native-smooth-sheet

🎉 A smooth, animated, and customizable bottom sheet component for React Native — built from scratch with no external dependencies.  
Perfect for Expo and React Native CLI apps.

---

## 🚀 Installation

```bash
npm install react-native-smooth-sheet

or 

yarn add react-native-smooth-sheet



💡 Usage

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
        snapPoint={0.75}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Hello from Smooth Sheet 🎉
        </Text>
        <Button title="Close" onPress={() => sheetRef.current?.close()} />
      </SmoothSheet>
    </View>
  );
}



📐 Props

Prop	Type	Default	Description
isVisible	boolean	—	Controls whether the sheet is shown or hidden
onClose	() => void	—	Callback after the sheet is fully closed
snapPoint	number	0.5	Fraction of screen height (e.g. 0.25, 0.5, 1)
children	ReactNode	—	Content to render inside the sheet


🔧 Ref Methods

Method	Description
close()	Programmatically close the bottom sheet
Use ref to access this method from your components.


🧩 Features

💨 Smooth animations

📏 Flexible snap points (25%, 50%, 75%, 100%)

🎛️ Custom content via children

🎯 Drag-to-close gesture

✨ Zero dependencies — no Reanimated, no GestureHandler



📦 License
MIT © Jean Francois Moril



🔗 Links
📘 GitHub: https://github.com/jeanmo333/react-native-smooth-sheet

📦 NPM: https://www.npmjs.com/package/react-native-smooth-sheet