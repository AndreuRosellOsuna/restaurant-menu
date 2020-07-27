import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import restaurants from '../mock_data';
import { Restaurant } from '../types';


export default function RestaurantsScreen() {
  
  const renderItem = ( { item } : {item: Restaurant}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.restaurantType}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <View style={styles.list}>
        <FlatList 
            data={restaurants}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
         />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginStart: 30,
    marginTop: 20,
    backgroundColor: 'powderblue'
  },
  list: {
    flex: 2,
    marginVertical: 3,
    width: '80%',
    backgroundColor: 'skyblue'
  },
});
