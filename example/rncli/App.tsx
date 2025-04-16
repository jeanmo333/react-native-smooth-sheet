/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {StyleSheet, Button, SafeAreaView, Text} from 'react-native';
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
        snapPoint={1} 
        paddingHorizontal={15} 
        borderTopLeftRadius={0} 
        dragIndicatorColor="#ccc" //#ff9800  //#666
        flattenOnFullOpen={true}
        borderTopRightRadius={0}
        theme="#fff" //#1e1e1e //#fff
        disableDrag={false} 
       >

       <Text style={{
           fontSize: 18, 
           marginBottom: 20, 
           fontWeight: 'bold',  
           color: '#000'
           }}>
           Hello from Smooth Sheet 🎉
         </Text>
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
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 30,
  },
});

export default App;

