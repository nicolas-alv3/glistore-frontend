import {Button, Form, Icon, PlaceholderParagraph} from "semantic-ui-react";
import React from "react";
import storage from "../../../firebase.config";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import Compressor from 'compressorjs';


export default function ImageUploader({onChange, images}) {
    const [loading, setLoading] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    }

    const getPromiseFrom = (file) => {
        return new Promise((resolve, reject) => {

            new Compressor(file, {
                quality: 0.4,
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

        Promise.all(promises).then((res) => {
            onChange(res);
            setLoading(false);
        })
    }

    return <Form.Field>
        <label>Imágenes</label>
        {
            images.length ? <PlaceholderParagraph> {images?.length} imagenes cargadas <Icon name={"check"}
                                                                                            color={"green"}/></PlaceholderParagraph>
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