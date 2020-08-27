import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { Restaurant, RestaurantType } from '../types';
import Firebase from '../Firebase';


export default function RestaurantsScreen({navigation}) {

  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = Firebase.shared.subscribeToRestaurantList(setRestaurants);
    return unsubscribe;
  }, []);

  let createNewRestaurant = () => {
    navigation.navigate('RestaurantCreationScreen'); 
  }
  
  const renderItem = ( { item } : {item: Restaurant}) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('RestaurantDetailScreen', {restaurantId: item.id})}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemType}>{item.restaurantType}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Restaurants</Text>
      </View>
      <View style={styles.list}>
        <FlatList 
            data={restaurants}
            keyExtractor={item => item.id}
            renderItem={renderItem}
         />
      </View>
      <Button title="Add new Restaurant"
              onPress={createNewRestaurant}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
  },
  title: {
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginStart: 30,
    marginTop: 40,
    backgroundColor: 'powderblue'
  },
  list: {
    marginVertical: 3,
    width: '80%',
    backgroundColor: 'skyblue'
  },
  item: {
    margin: 10,
    borderWidth: 2,
    borderColor: 'blue'
  },
  itemName: {
    color: 'midnightblue',
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemType: {
    color: 'steelblue',
    fontSize: 15,
    fontStyle: 'italic'
  }
});
