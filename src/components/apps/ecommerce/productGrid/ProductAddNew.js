import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    FormLabel,
    DialogContent,
    DialogContentText,
    Grid,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
//import { addContact } from '../../../store/apps/contacts/ContactSlice';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { fetchProducts, addNewBook } from '../../../../store/apps/eCommerce/EcommerceSlice';
import { storage } from '../../../../firebaseConfig';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const ProductAddNew = () => {
    const dispatch = useDispatch();
    var storageRef = storage.ref();
    const [modal, setModal] = React.useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const [values, setValues] = React.useState({
        title: '',
        author: '',
        year: new Date().getFullYear(),
        description: '',
        image: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let pdfRef, auxPath, path, aux, obtainProgress, increase;
        let r = Math.random().toString(36).substring(2, 5);
        var links = "";
        if (values.image?.length > 0) {
            let fullPath;
            pdfRef = storageRef.child("books/" + r + "_" + values.image[0]?.name?.replaceAll('%', '').replaceAll(/ /g, '').replaceAll('#', '').replaceAll('+', '').replaceAll('{', '').replaceAll('', ''));
            auxPath = "https://firebasestorage.googleapis.com/v0/b/itmapp-fee6e.appspot.com/o/books%2F";
            path = "books";
            aux = r + "_" + values.image[0]?.name?.replaceAll('%', '').replace(/ /g, '').replaceAll('#', '').replaceAll('+', '').replaceAll('{', '').replaceAll('}', '');
            fullPath = auxPath + aux + "?alt=media"
            obtainProgress = pdfRef.put(values.image[0]);
            links = fullPath

            links = links.toString()
        } else {
            alert('Selecciona una imagen');
            return null;
        }
        const data = { ...values, image: links };
        obtainProgress.on('state_changed', function (snapshot) {
            // Observar eventos de cambio de estado como progreso, pausa y reanudación
            // Obtener el progreso de la tarea, incluido el número de bytes transferidos y el número total de bytes a transferir
            increase = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (increase === 100) {
                // Disparar la acción para agregar el nuevo libro y, cuando se complete, desencadenar la acción para obtener todos los productos actualizados
                dispatch(addNewBook(data)).then(() => {
                    dispatch(fetchProducts());
                    setModal(!modal);
                    setValues({
                        title: '',
                        author: '', 
                        year: new Date().getFullYear(),
                        description: '',
                    });
                });
            }
        });
        
    };

    return (
        <>
            <Box p={3} pb={1}>
                <Button color="primary" variant="contained" fullWidth onClick={toggle}>
                    Add New Book
                </Button>
            </Box>
            <Dialog
                open={modal}
                onClose={toggle}
                maxWidth="sm"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" variant="h5">
                    {'Add New Book'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Lets add new Book for your application. fill the all field and
                        <br /> click on submit button.
                    </DialogContentText>
                    <Box mt={3}>
                        <form onSubmit={handleSubmit}>
                            <Grid spacing={1} container>
                                <Grid item xs={12} lg={12}>
                                    <FormLabel>Title</FormLabel>
                                    <TextField
                                        id="title"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        value={values.title}
                                        onChange={(e) => setValues({ ...values, title: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <FormLabel>Author</FormLabel>
                                    <TextField
                                        id="author"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        value={values.author}
                                        onChange={(e) => setValues({ ...values, author: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <FormLabel>Year</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileDatePicker
                                            views={["year"]}
                                            inputFormat="yyyy"
                                            maxDate={new Date()}
                                            value={new Date(values.year, 0, 1)} // Modificado para establecer correctamente el valor de la fecha
                                            onChange={(newValue) => setValues({ ...values, year: newValue.getFullYear().toString() })}
                                            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} lg={12}>
                                    <FormLabel>Description (Max length 250)</FormLabel>
                                    <TextField
                                        id="description"
                                        size="small"
                                        multiline
                                        rows="4"
                                        variant="outlined"
                                        fullWidth
                                        value={values.description}
                                        onChange={(e) => setValues({ ...values, description: e.target.value })}
                                        inputProps={{ maxLength: 250 }}
                                    />
                                </Grid>
                                <Grid textAlign="center" item xs={12} lg={12}>
                                    <label htmlFor="image" sx={{ marginLeft: 5 }}>
                                        <Button variant="contained" component="span" style={{ background: "#2667FF", marginRight: 5, color: 'white' }} startIcon={<FileUploadIcon />}>
                                            <Input onChange={(e) => { if (e.target.files.length > 0) { setValues({ ...values, image: (e.target.files) }) } }} type="file" id="image" accept="image/*" multiple />
                                            Upload Image{values.image && values.image[0].name.substring(0, 13)}
                                        </Button>
                                    </label>
                                    <br />
                                </Grid>
                                <Grid textAlign="end" item xs={12} lg={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mr: 1 }}
                                        type="submit"
                                        disabled={values.title.length === 0 || values.author.length === 0 || values.description.length === 0 || values.year === 0}
                                    >
                                        Submit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={toggle}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductAddNew;
