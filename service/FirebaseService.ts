import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../firebase.config";
import {deleteObject} from "@firebase/storage";
import Compressor from "compressorjs";

export enum IMAGE_QUALITY {
    HIGH = 0.6,
    LOW = 0.3
}

export interface ImageUploadingOptions {
    quality?: IMAGE_QUALITY,
    width?: number,
    height?: number,
}

class ImageService {
    removeFromFirestore = (images: string[]) => {
        console.log("Deleting ", images)
        return new Promise((resolve, reject) => {
            images.forEach(imageUrl => {
                const storageRef = ref(storage, imageUrl)
                deleteObject(storageRef).then(resolve)
                    .catch(reject);
            })
        });
    }

    upload(file: File, setLoading: (b: boolean) => void, options?: ImageUploadingOptions, name?: string, folder?: string) {
        return new Promise((resolve, reject) => {

            new Compressor(file, {
                quality: 0.6,
                width: 1200,
                height: 1800,
                ...options,
                success(fileC: File | Blob) {
                    const storageRef = ref(storage,`/${folder || "files"}/${name || file.name}`)
                    const uploadTask = uploadBytesResumable(storageRef, fileC);

                    uploadTask.on(
                        "state_changed",
                        () => {
                            setLoading(true);
                        },
                        (err) => reject(err),
                        () => {
                            // download url
                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                resolve(url);
                            });
                        }
                    );
                }
            })
        })
    }
}

export default new ImageService();