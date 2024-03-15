import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TableCreateInput} from "./Inputs";
import '../css/BotChatPage.css'
import theme from "./theme";

const TableCreateDialog =
    ({
         open,
         handleClose,
         handleSubmit
    } : {
        open: boolean;
        handleClose: ()=> void;
        handleSubmit: ()=> void;
    }) => {
    return (
        <Dialog
            open={open}
            onClose={()=> {handleClose();}}
            // className="table-create-dialog"
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>)=> {
                    event.preventDefault();
                    handleSubmit();
                    handleClose();
                },
                style: {
                    borderRadius: 32,
                    padding: 50,
                    display: 'flex',
                    flexDirection: 'column',
                }
            }}
        >
            <DialogTitle className="table-create-title">
                {'Assistant Name'}
            </DialogTitle>
            <DialogContent>
                <TableCreateInput title={"item1"} placeholder={"item1"} name={"item1"} />
                <TableCreateInput title={"item2"} placeholder={"item2"} name={"item2"} />
                <TableCreateInput title={"item3"} placeholder={"item3"} name={"item3"} />
            </DialogContent>
            <DialogActions
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
            }}
            >
                <Button
                    className="drawer-button"
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                    }}
                    onClick={handleClose}
                >Cancel
                </Button>
                <Button
                    className="drawer-button"
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                    }}
                    type="submit"
                >Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TableCreateDialog;
