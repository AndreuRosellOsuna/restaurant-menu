import { Picker } from '@react-native-community/picker';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { View } from '../components/Themed';
import Firebase from '../Firebase';
import { RestaurantType } from '../types';

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

    let typePicker = React.forwardRef((props, ref) => {
            
        let restaurantTypes = Object.keys(RestaurantType).map(typeKey => {
            return <Picker.Item key={typeKey} label={RestaurantType[typeKey]} value={typeKey}/>
        });

        return (
            <Picker {...props} ref={ref}
                selectedValue={restaurant.restaurantType}
                onValueChange={(itemValue, itemIndex) => {
                    setRestaurant({...restaurant, "restaurantType": itemValue})
                }}>
                <Picker.Item label="" value=""/>
                {restaurantTypes}
            </Picker>
        )
    });

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

            <Input
                label="Type"
                InputComponent={typePicker}/>
            
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