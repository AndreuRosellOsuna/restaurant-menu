import * as React from 'react';
import { StyleSheet, Modal } from 'react-native';
import { Text, View } from '../components/Themed';
import Firebase from '../Firebase';
import { Button } from 'react-native-elements';
import useRestaurantName from '../hooks/useRestaurantNameAsTitle';

export default function RestaurantDetailScreen({route, navigation}) {

    const {restaurantId} = route.params;
    
    const [restaurant, setRestaurant] = React.useState(
        {
            "name": "",
            "description": ""
        });

    const unsubscribeFunction = React.useRef(() => {});

    const [modalVisible, setModalVisible] = React.useState(false);

    let modifyRestaurant = () => {
        navigation.navigate('RestaurantModificationScreen', {restaurantId: restaurantId})
    }

    let openDeleteRestaurantModal = () => {
        setModalVisible(true);
    }

    let cancelDeleteRestaurantModal = () => {
        setModalVisible(false);
    }

    let confirmDeleteRestaurantModal = () => {
        unsubscribeFunction.current();
        Firebase.shared.deleteRestaurantById(restaurantId, () => {
            navigation.navigate('RestaurantScreen');
        });
    }

    React.useEffect(() => {
        const unsubscribe = Firebase.shared.subscribeRestaurantById(restaurantId, setRestaurant);
        unsubscribeFunction.current = unsubscribe;
        return unsubscribe;
    }, []);

    useRestaurantName(navigation, restaurant);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={modifyRestaurant}
                    title="Modify"
                    />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={openDeleteRestaurantModal}
                    title="Delete"
                    />
            </View>
            <Modal visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Confirm delete?</Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={cancelDeleteRestaurantModal}
                                title="Cancel"
                                />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                onPress={confirmDeleteRestaurantModal}
                                title="Confirm"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,   
    },
    name : {
        height: 30,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginStart: 30,
        marginTop: 40,
        backgroundColor: 'powderblue',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    description : {
        marginStart: 30,
        color: 'steelblue',
        fontSize: 15,
        fontStyle: 'italic',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      buttonContainer: {
        marginTop: 22
      }
});