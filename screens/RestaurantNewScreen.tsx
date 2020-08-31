import { Picker } from '@react-native-community/picker';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
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

    const [nameInputError, setNameInputError] = React.useState("");

    let nameChanged = (text) => {
        setNameInputError("");
        textChanged(text, 'name');
    }

    var textChanged  = (text, field) => {
        setRestaurant({...restaurant, [field]: text})
    }

    let validateAndSave = () => {
        let isError : boolean = false;
        if(restaurant.name == "") {
            isError = true;
            setNameInputError("Name is required");
        }

        if(!isError) {
            Firebase.shared.createNewRestaurant(restaurant, () => navigation.goBack());
        }
    }

    let typePicker = React.forwardRef((props, ref) => {
            
        let restaurantTypes = Object.keys(RestaurantType).map(typeKey => {
            return <Picker.Item key={typeKey} label={RestaurantType[typeKey]} value={RestaurantType[typeKey]}/>
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
            <View style={{flex: 10}}>
                <ScrollView>
                    <Input
                        style={{marginVertical: 100}}
                        label="Name"
                        placeholder="Restaurant name"
                        errorMessage={nameInputError}
                        onChangeText={text => nameChanged(text)}
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
                    
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <Button 
                    title="Save"
                    onPress={validateAndSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,   
        padding: 10
    },
    buttonContainer: {
        flex: 1, 
        width: 'auto',
        alignItems: 'center'
    }
});