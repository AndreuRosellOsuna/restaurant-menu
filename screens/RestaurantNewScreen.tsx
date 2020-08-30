import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import Firebase from '../Firebase';
import { TextInput } from 'react-native-gesture-handler';
import { RestaurantType } from '../types';
import { Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

export default function RestaurantCreationScreen({navigation}) {

    const [restaurant, setRestaurant] = React.useState(
        {
            "name": "",
            "description": "",
            "restaurantType": ""
        });

    var textChanged  = (text, field) => {
        setRestaurant({...restaurant, [field]: text})
    }

    let save = () => {
        Firebase.shared.createNewRestaurant(restaurant, () => navigation.goBack());
    }

    let restaurantTypes = Object.keys(RestaurantType).map(typeKey => {
        return <Picker.Item key={typeKey} label={RestaurantType[typeKey]} value={typeKey}/>
    });

    // let typePicker = () => {


    //     return (
    //     <Picker
    //         selectedValue={restaurant.restaurantType}
    //         onValueChange={(itemValue, itemIndex) => {
    //             setRestaurant({...restaurant, "restaurantType": itemValue})
    //         }}>
    //         <Picker.Item label="" value=""/>
    //         {restaurantTypes}
    //     </Picker>
    //     )
    // }

    return (
        <View style={styles.container}>
            <Input
                label="Name"
                placeholder="Restaurant name"
                onChangeText={text => textChanged(text, 'name')}
                />
            <Input
                label="Description"
                placeholder="Description"
                multiline={true}
                onChangeText={text => textChanged(text, 'description')}
                />

                
            <Picker
                selectedValue={restaurant.restaurantType}
                onValueChange={(itemValue, itemIndex) => {
                    setRestaurant({...restaurant, "restaurantType": itemValue})
                }}>
                <Picker.Item label="" value=""/>
                {restaurantTypes}
            </Picker>

            {/* <Input
                label="Type"
                label="Type"
                label="Type"
                // InputComponent={typePicker}/>
                InputComponent={() => }/> */}
            
            <Button 
                title="Save"
                onPress={save} />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,   
        padding: 10
    },
    label: {

    }
});