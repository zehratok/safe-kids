
import auth from '@react-native-firebase/auth';

export const uid = () => {
    if(auth().currentUser){
        return auth().currentUser.uid;
    }
    else{
        return null;
    }
}
export const apiurl = 'https://safe-kids-da945-default-rtdb.firebaseio.com'
export const apikey= 'AIzaSyBoyDOgjwvj3Dvuul8ID3u5sUK0mXFwrXM'
