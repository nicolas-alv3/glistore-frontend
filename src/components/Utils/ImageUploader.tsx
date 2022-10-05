import {Button, Form, Icon, PlaceholderParagraph} from "semantic-ui-react";
import React from "react";
import GButton, {ButtonType} from "./GButton";
import FirebaseService, {IMAGE_QUALITY, ImageUploadingOptions} from "../../../service/FirebaseService";
import ToastUtils from "../../utils/toastUtils";


export default function ImageUploader({onChange, images, error}) {
    const [loading, setLoading] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    }

    const getPromiseFrom = (file) => {
        return FirebaseService.upload(file, () => setLoading(true))
    }

    const previewPromise: (file) => Promise<any> = (file) => {
        const options : ImageUploadingOptions = {
            quality: IMAGE_QUALITY.HIGH,
            width: 666,
            height: 666,
    }
        return FirebaseService.upload(file,() => setLoading(true), options, `preview_${file.name}`)
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

    return <Form.Field error={error}>
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