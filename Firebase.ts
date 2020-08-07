import firebase from 'firebase';
import { Restaurant } from './types';

class Firebase {
  static shared: Firebase;

  private firestore: firebase.firestore.Firestore;
  
  constructor() {
    this.init(); 
    this.observeAuth();
  }
  
  init = () => {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyATfkcyfKqL-D5WJ2vDNvioGIqIZNG-X0M",
      authDomain: "restaurant-menu-8289c.firebaseapp.com",
      databaseURL: "https://restaurant-menu-8289c.firebaseio.com",
      projectId: "restaurant-menu-8289c",
      storageBucket: "restaurant-menu-8289c.appspot.com",
      messagingSenderId: "474054813376",
      appId: "1:474054813376:web:e0fa976c76619faa9f6f25",
      measurementId: "G-MGP6FH84HH"
    });

    this.firestore = firebase.firestore();
  }
  
  observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  getRestaurants = ( callback ) : void => {
    this.firestore.collection('restaurants')
      .get()
      .then(results => {
        var restaurants: Restaurant[] = [];
        results.forEach(restaurant => {
          restaurants.push(this.parse(restaurant.data()));
        });
        callback(restaurants);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  parse = (snapshot) : Restaurant => {

    const { name, restaurantType, id } = snapshot;
    // const { key: id } = snapshot;

    const restaurant = {
      id,
      name,
      restaurantType
    };
    
    return restaurant;
  };
  
}

Firebase.shared = new Firebase();
export default Firebase;
