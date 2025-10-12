import { useRef, useState } from 'react';
import { StyleSheet, Button, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SmoothSheet, type SmoothSheetRef } from 'react-native-smooth-sheet';

export default function App() {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<SmoothSheetRef>(null);
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />

      <SmoothSheet
        ref={sheetRef}
        isVisible={visible}
        onClose={() => setVisible(false)}
        snapPoint={0.5}
        paddingHorizontal={15}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        maxTopSnapPoint={Platform.OS === 'ios' ? 0.93 : 1}
        dragIndicatorColor="#ccc" //#ff9800  //#666 //#ccc
        flattenOnFullOpen={true}
        theme="#fff" //#1e1e1e //#fff
        disableDrag={false}
      >
        <Text style={styles.text2}>Hello from Smooth Sheet 🎉</Text>
        <Button title="Close" onPress={() => sheetRef.current?.close()} />
      </SmoothSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 30,
  },
  text2: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
