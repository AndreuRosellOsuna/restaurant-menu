import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { Restaurant, RestaurantType } from '../types';
import Firebase from '../Firebase';


export default function RestaurantsScreen({navigation}) {

  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    Firebase.shared.getRestaurants(setRestaurants);
  }, []);
  
  const renderItem = ( { item } : {item: Restaurant}) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('RestaurantDetailScreen')}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemType}>{item.restaurantType}</Text>
    </TouchableOpacity>
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
    // height: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    // flex: 2
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
