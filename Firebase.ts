import firebase from 'firebase';
import { Restaurant } from './types';

class Firebase {
  static shared: Firebase;

  private restaurantCollection : string = 'restaurants';
  private firestore: firebase.firestore.Firestore;
  public storage : firebase.storage.Storage;
  private auth : firebase.auth.Auth;
  
  constructor() {
    this.init(); 
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
    this.storage = firebase.storage();
    this.auth = firebase.auth();
  }
  
  observeUserAuth = (setUser: () => void, setLoading: any) => {
    return this.auth.onAuthStateChanged(async authUser => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        //console.log(authUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    });
  }
  
  loginWithEmail = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();

  subscribeToRestaurantList = (userUid: string, callback) => {
    return this.firestore.collection(this.restaurantCollection)
      .where("userRef", "==", userUid)
      .onSnapshot(results => {
        callback(this.parseRestaurantList(results));
      })
  }

  getRestaurants = ( callback ) : void => {
    this.firestore.collection(this.restaurantCollection)
      .get()
      .then(results => {
        callback(this.parseRestaurantList(results));
      })
      .catch(error => {
        console.error(error);
      });
  }

  private parseRestaurantList = (results) : Restaurant[] => {
    var restaurants: Restaurant[] = [];
    results.forEach(restaurant => {
      restaurants.push(this.parse(restaurant.id, restaurant.data()));
    });
    return restaurants;
  }

  getRestaurantById = ( restaurantId, callback ) : void => {
    this.firestore.collection(this.restaurantCollection)
      .doc(restaurantId)
      .get()
      .then(doc => {
        var restaurant : Restaurant = this.parse(doc.id, doc.data())
        callback(restaurant);
      })
  }
  

  subscribeRestaurantById = ( restaurantId, callback ) => {
    return this.firestore.collection(this.restaurantCollection)
      .doc(restaurantId)
      .onSnapshot(doc => {
        var restaurant : Restaurant = this.parse(doc.id, doc.data())
        callback(restaurant);
      });
  }
  
  parse = (id, snapshot) : Restaurant => {

    const { name, restaurantType, description, featured, imageRef } = snapshot;

    const restaurant = {
      id,
      name,
      restaurantType,
      description,
      featured,
      imageRef
    };
    
    return restaurant;
  };
  
  updateRestaurantById = (restaurantId, restaurant) => {
    this.firestore.collection(this.restaurantCollection)
      .doc(restaurantId)
      .update(restaurant)
  }

  createNewRestaurant = (restaurant : Restaurant, callback : () => any, userUid: string) => {
    restaurant.userRef = userUid;
    this.firestore.collection(this.restaurantCollection)
      .add(restaurant)
      .then(callback())
      .catch((e) => console.error(`error on adding new restaurant: ${e} `));
  }

  deleteRestaurantById = (restaurantId, callback) => {
    this.firestore.collection(this.restaurantCollection)
      .doc(restaurantId)
      .delete()
      .then(callback())
      .catch((e) => console.error(`error on delete restaurant: ${e} `));
  }

  getUrlImage = (imageRef: string, callback : (imageUrl: string) => any) => {
    this.storage.ref(imageRef)
      .getDownloadURL()
      .then((url) => {
        callback(url);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getDefaultImage = (callback : (imageUrl: string) => any) => {
    this.storage.ref('restaurants/no_rest.png')
      .getDownloadURL()
      .then((url) => {
        callback(url);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}

Firebase.shared = new Firebase();
export default Firebase;
