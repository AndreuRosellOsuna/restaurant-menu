import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { Restaurant, RestaurantType } from '../types';
import Firebase from '../Firebase';
import { Tile, Button, Divider, Icon, Image } from 'react-native-elements';

export default function RestaurantsScreen({navigation}) {

  const [restaurants, setRestaurants] = React.useState([]);
  const [imagesUrl, setImagesUrl] = React.useState({});

  const updateImages = (key: string, value: string) =>  {
    setImagesUrl({
      ...imagesUrl,
      [key]: {uri: value}
    });
  };

  React.useEffect(() => {
    const unsubscribe = Firebase.shared.subscribeToRestaurantList(setRestaurants);
    return unsubscribe;
  }, []);

  let createNewRestaurant = () => {
    navigation.navigate('RestaurantCreationScreen'); 
  }

  let getRestaurantImage = (item: Restaurant) => {
    if(imagesUrl[item.id] != undefined && imagesUrl[item.id].uri != undefined) {
      return;
    }
    if(item.imageRef) {
      Firebase.shared.getUrlImage(item.imageRef, (url) => {
        updateImages(item.id, url);
        console.log(`item ${item.id} has url ${url}`)
      })
    } else {
      updateImages(item.id, 'https://firebasestorage.googleapis.com/v0/b/restaurant-menu-8289c.appspot.com/o/restaurants%2Fno_rest.png?alt=media&token=a11ca9f2-2830-4a05-a216-6d375e739f27');
    }
  }

  const renderItem = ( { item } : {item: Restaurant}) => {
    let featured;
    if(item.featured) {
      featured = <Icon name="star" color='gold'></Icon>
    }

    getRestaurantImage(item);

    return (
    <View style={{flex: 1}}>
      <Tile 
      imageSrc={imagesUrl[item.id]}
      imageContainerStyle={{flex:4}}
      contentContainerStyle={styles.tile}
      title={item.name}
      titleStyle={styles.itemName}
      onPress={() => navigation.navigate('RestaurantDetailScreen', {restaurantId: item.id})}>
      <View style={styles.tileDetail}>
        <Text style={styles.itemType}>{item.restaurantType}</Text>
        {featured}
      </View>
      </Tile>
      <Divider style={{ margin: 5 }}></Divider>
    </View>
  )};


  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList 
            data={restaurants}
            keyExtractor={item => item.id}
            renderItem={renderItem}
         />
      </View>
      <View style={styles.addButton}>
        <Button title="Add new Restaurant"
                onPress={createNewRestaurant}></Button>
      </View>
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
  list: {
    flex: 10,
    marginVertical: 1,
  },
  tile: {
    flex: 1,
    margin: 10,
    // borderWidth: 2,
    // borderColor: 'blue'
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
  },
  tileDetail: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between' 
  },
  addButton: {
    flex: 1,
    margin: 10
  }
});
