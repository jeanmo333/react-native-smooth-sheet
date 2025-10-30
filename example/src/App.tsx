// import { useRef, useState } from 'react';
// import {
//   StyleSheet,
//   Button,
//   Text,
//   Platform,
//   ScrollView,
//   View,
// } from 'react-native';
// import { SmoothSheet, type SmoothSheetRef } from 'react-native-smooth-sheet';

// export default function App() {
//   const [visible, setVisible] = useState(false);
//   const sheetRef = useRef<SmoothSheetRef>(null);

//   // Crear datos para el ScrollView
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     title: `Elemento ${index + 1}`,
//     description: `Esta es la descripción del elemento número ${index + 1}`,
//   }));
//   return (
//     <View style={styles.sectionContainer}>
//       <Button title="Open Sheet" onPress={() => setVisible(true)} />

//       <SmoothSheet
//         ref={sheetRef}
//         isVisible={visible}
//         onClose={() => setVisible(false)}
//         snapPoint={0.7}
//         paddingHorizontal={15}
//         borderTopLeftRadius={20}
//         borderTopRightRadius={20}
//         maxTopSnapPoint={Platform.OS === 'ios' ? 0.93 : 1}
//         dragIndicatorColor="#ccc" //#ff9800  //#666 //#ccc
//         flattenOnFullOpen={true}
//         theme="#fff" //#1e1e1e //#fff
//         disableDrag={false}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {data.map((item) => (
//             <View key={item.id} style={styles.listItem}>
//               <Text style={styles.itemTitle}>{item.title}</Text>
//               <Text style={styles.itemDescription}>{item.description}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </SmoothSheet>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontWeight: 'bold',
//     color: 'red',
//     fontSize: 30,
//   },
//   text2: {
//     fontSize: 18,
//     marginBottom: 20,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   scrollContent: {
//     paddingBottom: 200,
//   },
//   listItem: {
//     backgroundColor: '#f5f5f5',
//     padding: 15,
//     marginVertical: 5,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   itemDescription: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//   },
// });


import { useRef, useState } from 'react';
import { View, Text, Button, ScrollView, Platform, FlatList } from 'react-native';
import { SmoothSheet, type SmoothSheetRef } from 'react-native-smooth-sheet';


export default function App() {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<SmoothSheetRef>(null);

  // Create data for FlatList
  const data = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    description: `This is the description for item number ${index + 1}`,
  }));

  const renderItem = ({ item } : { item: typeof data[0] }) => (
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
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      </SmoothSheet>
    </View>
  );
}
