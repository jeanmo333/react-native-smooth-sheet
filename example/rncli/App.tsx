/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Button,
  SafeAreaView,
  Text,
  Platform,
  ScrollView,
  View,
  FlatList,
} from 'react-native';
import {SmoothSheet, SmoothSheetRef} from 'react-native-smooth-sheet';
import HelloSmooth from './HelloSmooth';
//import SmoothSheet, { SmoothSheetRef } from './SmoothSheet';

function App(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<SmoothSheetRef>(null);
  const data = Array.from({length: 50}, (_, i) => `Item #${i + 1}`);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />

      <SmoothSheet
        ref={sheetRef}
        isVisible={visible}
        onClose={() => setVisible(false)}
        snapPoint={0.9}
        paddingHorizontal={15}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        maxTopSnapPoint={Platform.OS === 'ios' ? 0.93 : 1}
        dragIndicatorColor="#ff9800" //#ff9800  //#666 //#ccc
        flattenOnFullOpen={true}
        theme="#fff" //#1e1e1e //#fff
        disableDrag={false}>
        <View style={{marginBottom: 10}}>
          <Button title="Close" onPress={() => sheetRef.current?.close()} />
        </View>

        {/* <View style={{paddingBottom: 60}}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <Text>{item}</Text>}
            contentContainerStyle={styles.scrollContent}
            nestedScrollEnabled
          />
        </View> */}

        <ScrollView style={{marginBottom: 30}}>
          {Array.from({length: 30}).map((_, i) => (
            <Text key={i} style={{padding: 20}}>
              Item #{i + 1}
            </Text>
          ))}
        </ScrollView>
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
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 10,
  },
});

export default App;
