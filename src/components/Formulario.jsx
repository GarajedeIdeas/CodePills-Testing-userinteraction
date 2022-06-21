import { Box, Button, FormControl, Input, InputLabel, MenuItem, NativeSelect, OutlinedInput, Popover, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Formulario = ({ createTask }) => {

    const [newTask, setNewTask] = useState({ category: 'home' });
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        createTask(newTask);
    }

    const changeField = (event, field) => {
        setNewTask({ ...newTask, [field]: event.target.value });
    }

    const handlePopoverOpen = (event) => {
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    return <>
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
                margin: '50px auto'
            }}
        >
            <h2>Crea una nueva tarea</h2>
            <form onSubmit={onSubmit}>
                <TextField fullWidth variant="standard" label="Título" id="title" onChange={(event) => changeField(event, 'title')} margin="normal" role="input" />
                <TextField fullWidth variant="standard" label="Texto" id="text" onChange={(event) => changeField(event, 'text')} margin="normal" />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label" htmlFor="demo-simple-select">Categoría</InputLabel>
                    <NativeSelect
                        type="select"
                        defaultValue={newTask.category}
                        inputProps={{
                            name: 'category',
                            id: 'demo-simple-select',
                        }}
                        onChange={(event) => changeField(event, 'category')}
                    >
                        <option value="home">Casa</option>
                        <option value="office">Trabajo</option>
                        <option value="hobbie">Ocio</option>
                    </NativeSelect>
                </FormControl>
                <Button type="submit" variant="outlined">Crear nueva tarea</Button>
            </form>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{
                    marginTop: '20px'
                }}
            >
                ¿Quieres más información?
            </Typography>
            <Popover
                id="mouse-over-popover"
                open={open}
                sx={{
                    pointerEvents: 'none',
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                disableRestoreFocus
            >
                <Typography sx={{ p: 2 }}>Rellenando el formulario anterior podrás crear una nueva tarea.</Typography>
            </Popover>
        </Box>
    </>
}

export default Formulario;