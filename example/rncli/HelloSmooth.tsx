import {Text, Button} from 'react-native';
import React from 'react';
import {SmoothSheetRef} from 'react-native-smooth-sheet';

interface Props {
  sheetRef: React.RefObject<SmoothSheetRef>;
}

const HelloSmooth = ({sheetRef}: Props) => {
  return (
    <>
      <Text style={{
        fontSize: 18, 
        marginBottom: 20, 
        fontWeight: 'bold',  
        color: 'black'
        }}>
        Hello from Smooth Sheet 🎉
      </Text>
      <Button title="Close" onPress={() => sheetRef.current?.close()} />
    </>
  );
};

export default HelloSmooth;
