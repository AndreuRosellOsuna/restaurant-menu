import { Picker } from '@react-native-community/picker';
import * as React from 'react';
import { StyleSheet, ScrollView, Text, Dimensions, Switch } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { View } from '../components/Themed';
import Firebase from '../Firebase';
import { RestaurantType } from '../types';
import * as ImagePicker from 'expo-image-picker';
import { primary } from '../constants/Colors';


const win = Dimensions.get('window');

async function uploadImageAsync(uri: string, random: string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = Firebase.shared
      .storage
      .ref()
      .child(random);
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
}


export default function RestaurantCreationScreen({navigation}) {

    const [restaurant, setRestaurant] = React.useState(
        {
            "name": "Foo",
            "description": "Boo",
            "restaurantType": "Burguers",
            "featured": false,
            "imageRef": ""
        });

    const [nameInputError, setNameInputError] = React.useState("");

    let [selectedImage, setSelectedImage] = React.useState(null);

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
            _handleImagePicked()

            // Firebase.shared.createNewRestaurant(restaurant, () => navigation.goBack());
        }
    }

    let _handleImagePicked = async () => {
        try {
            if (selectedImage.localUri) {
                console.log(`selected image go `)
                console.log(`imageRef is ${restaurant.imageRef}`);
                let uploadUrl = await uploadImageAsync(selectedImage.localUri, restaurant.imageRef);
                // setRestaurant({ ...restaurant, "imageRef": restaurant.imageRef });
            }
        } catch (e) {
          console.log(e);
          alert('Upload failed, sorry :(');
        } finally {
          Firebase.shared.createNewRestaurant(restaurant, () => navigation.goBack());
          console.log('image updated')
        }
      };

    let featuredSwitch = React.forwardRef((props, ref) => {
        return (
            <Switch 
                style={{marginVertical: 10}}
                trackColor={{ false: "#767577", true: primary }}
                value={restaurant.featured}
                onValueChange={() => setRestaurant({...restaurant, "featured": !restaurant.featured})}
                />
        );
    });
    
    let imagePicker = React.forwardRef((props, ref) => {
    
        let openImagePickerAsync = async () => {
            let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        
            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
            }
        
            let pickerResult = await ImagePicker.launchImageLibraryAsync({aspect: [4, 3]});
            if (pickerResult.cancelled === true) {
                return;
            }
    
            setSelectedImage({ localUri: pickerResult.uri });

            let randomName = Math.random().toString(36).substring(7);
            let imageRef = `restaurants/${randomName}`;
            setRestaurant({ ...restaurant, "imageRef": imageRef });
        };
    
        let image;
        if(selectedImage !== null) {
            image = <Image source={{uri: selectedImage.localUri}} style={styles.image} />
        } else {
            image = <Text style={styles.noImageProvided}>No picture is provided</Text>
        }

        return (
             <View style={styles.imageContainer}>
                {image}
                <Button
                    style={{marginBottom: 10}}
                    title="Set image"
                    onPress={openImagePickerAsync} 
                    />
            </View>
        );
    });
            
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
                        value={restaurant.name}
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

                    <Input
                        label="Image"
                        InputComponent={imagePicker}/>

                    <Input
                        inputContainerStyle={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"}}
                        label="Featured"
                        InputComponent={featuredSwitch}/>

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
        alignItems: 'center',
        marginTop: 10
    },
    imageContainer: {
        flex: 1, 
    },
    image: {
        width: win.width,
        height: win.height,
        resizeMode: 'contain',
    },
    noImageProvided: {
        color: 'grey',
        marginVertical: 10
    }
});