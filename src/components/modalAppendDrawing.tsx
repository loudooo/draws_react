import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Fragment, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';

export default function BasicModal() {
    const [open, setOpen] = useState(false);
    const [selectedDate, handleDateChange] = useState(new Date());
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button color="inherit" onClick={handleOpen}>Ajoutez un dessin</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    style={{
                        position: "absolute", top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '30vw',
                        height: '50vh',
                        backgroundColor: '#1976d2',
                        border: '2px solid #000',
                        color: 'white'
                        // boxShadow: 24
                    }}>

                    <FormControl>
                        <InputLabel htmlFor="title">Titre</InputLabel>
                        <Input id="title" aria-describedby="Ex:Couché de soleil sur Paris" />
                        <FormHelperText id="Ex:Couché de soleil sur Paris">Ex:Couché de soleil sur Paris</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="medium">Medium</InputLabel>
                        <Input id="medium" aria-describedby="Ex: crayon,feutre ..." />
                        <FormHelperText id="Ex: crayon,feutre ...">Ex: crayon,feutre ...</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="category">Catégorie</InputLabel>
                        <Input id="category" aria-describedby="Ex: challenge, tuto ..." />
                        <FormHelperText id="Ex: challenge, tuto ...">Ex: challenge, tuto ...</FormHelperText>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            clearable
                            value={selectedDate}
                            placeholder="10/10/2018"
                            onChange={(date: any) => handleDateChange(date)}
                            minDate={new Date()}
                            format="MM/dd/yyyy"
                        />
                    </MuiPickersUtilsProvider>
                </Box>
            </Modal>
        </div>
    );
}