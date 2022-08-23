import {Button, Form, Icon, PlaceholderParagraph} from "semantic-ui-react";
import React from "react";
import storage from "../../../firebase.config";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Compressor from 'compressorjs';
import GButton, {ButtonType} from "../Utils/GButton";
import FirebaseService from "../../../service/FirebaseService";
import ToastUtils from "../../utils/toastUtils";


export default function ImageUploader({onChange, images}) {
    const [loading, setLoading] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    }

    const getPromiseFrom = (file) => {
        return new Promise((resolve, reject) => {

            new Compressor(file, {
                quality: 0.6,
                width: 1200,
                height:1800,
                success(fileC: File | Blob) {
                    const storageRef = ref(storage, `/files/${file.name}`)
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

    const previewPromise: (file) => Promise<any> = (file) => {
        return new Promise((resolve, reject) => {

            new Compressor(file, {
                quality: 0.6,
                width: 666,
                height: 666,
                success(fileC: File | Blob) {
                    const storageRef = ref(storage, `/files/preview_${file.name}`)
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

    const upload = () => {
        if (!files) {
            alert("Please choose a file first!")
        }

        let promises: Promise<any>[] = [];
        for (let i = 0; i < files.length; i++) {
            promises = promises.concat([
                getPromiseFrom(files[i])
            ])
        }
        promises.push(previewPromise(files[0]))

        Promise.all(promises).then((res) => {
            onChange(res);
            setLoading(false);
        })
    }

    const deleteImages = () => {
        FirebaseService.removeFromFirestore(images.concat([images[0]]))
            .then(() => {
                ToastUtils.success("Imagenes eliminadas!");
                onChange([]);
            })
            .catch(() => ToastUtils.error("Hubo un problema eliminando las imagenes"))
    }

    return <Form.Field>
        <label>Imágenes</label>
        {
            images.length ? <PlaceholderParagraph> {images?.length} imagenes cargadas <Icon name={"check"}
                                                                                            color={"green"}/>
                    <br/>
                    <GButton icon={"delete"} type={ButtonType.PRIMARY_BASIC} text={"Borrar"} onClick={deleteImages}/>
                </PlaceholderParagraph>
                : <>
                    <input type={"file"} accept="image/*" multiple onChange={handleFileChange}
                           placeholder='Ingresar descuento'/>
                    {files.length > 0 &&
                        <Button loading={loading} color={"orange"} onClick={upload}><Icon name={"cloud upload"}/>Subir a la
                            nube</Button>}
                </>
        }
    </Form.Field>
}