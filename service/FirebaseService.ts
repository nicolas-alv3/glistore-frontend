import {ref} from "firebase/storage";
import storage from "../firebase.config";
import {deleteObject} from "@firebase/storage";

class FirebaseService {
    removeFromFirestore = (images: string[]) => {
        console.log("Deleting ", images)
        return new Promise( (resolve, reject) => {
            images.forEach(imageUrl => {
                const storageRef = ref(storage, imageUrl)
                deleteObject(storageRef).then(resolve)
                    .catch(reject);
            })
        });
    }
}

export default new FirebaseService();