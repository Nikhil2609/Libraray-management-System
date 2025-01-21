import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function ConfirmationDialogue(props: DialogueProps) {
    const { open, body, title, confirmBtnText, confirmBtnClick, cancelBtnClick, cancelBtnText, closeDialogue } = props;
    return (
        <>
            <Dialog open={open} onClose={() => closeDialogue()}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {body}
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                    <Button onClick={() => cancelBtnClick()} color="secondary" variant='outlined'>
                        {cancelBtnText}
                    </Button>
                    <Button onClick={() => confirmBtnClick()} color="error" variant='contained'>
                        {confirmBtnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ConfirmationDialogue;

interface DialogueProps {
    open: boolean;
    closeDialogue: Function;
    title: string;
    body: string;
    cancelBtnText: string;
    confirmBtnText: string;
    cancelBtnClick: Function;
    confirmBtnClick: Function;
}