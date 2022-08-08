import {Button, Form, Header, Icon, PlaceholderParagraph} from "semantic-ui-react";
import React from "react";
import storage from "../../../firebase.config";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";


export default function ImageUploader({onChange, images} ) {
    const [loading, setLoading] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    }

    const getPromiseFrom = (file) => {
        return new Promise( (resolve, reject) => {
            const storageRef = ref(storage,`/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setLoading(true);
                },
                (err) => reject(err),
                () => {
                    setLoading(false);
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        resolve(url)
                    });
                }
            );
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
            setLoaded(true)
        })
    }

    return <Form.Field >
        <label>Imágenes</label>
        {
            images.length ? <PlaceholderParagraph> {images?.length} imagenes cargadas</PlaceholderParagraph>
                :<>
                    <input type={"file"} accept="image/*" multiple onChange={handleFileChange} placeholder='Ingresar descuento' />
                    {loaded ? <Icon name={"check"} color={"green"}/> : <Button loading={loading} onClick={upload}>Subir</Button>}
                </>
        }
    </Form.Field>
}