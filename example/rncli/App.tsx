/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {StyleSheet, Button, SafeAreaView} from 'react-native';
//import {SmoothSheet, SmoothSheetRef} from 'react-native-smooth-sheet';
import HelloSmooth from './HelloSmooth';
import SmoothSheet, { SmoothSheetRef } from './SmoothSheet';

function App(): React.JSX.Element {
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
        theme="#fff" 
        disableDrag={false} 
       >

        <HelloSmooth sheetRef={sheetRef} />
  
      </SmoothSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 30,
  },
});

export default App;

