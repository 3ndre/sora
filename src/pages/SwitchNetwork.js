import * as React from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SwitchNetwork() {
  const [open, setOpen] = React.useState(true);

  const { chain } = useNetwork()
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

    {chain.id !== 80001 ? 
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{mb: 2}} style={{textAlign: 'center'}}>
          {"Switch network"}
        </DialogTitle>
        <DialogContent sx={{mb: 1}} style={{textAlign: 'center'}}>
          <DialogContentText id="alert-dialog-description" sx={{mb: 2}} >
            Please switch your wallet's RPC to the <span style={{color: '#00ac56'}}>Polygon Mumbai</span> testnet
          </DialogContentText>
     
          {isLoading && pendingChainId === 80001 ? 
          <Button variant="contained" disabled autoFocus>
            Switching...
          </Button> : 
          <Button variant="contained" onClick={() => switchNetwork?.(80001)} autoFocus>
            Switch network
          </Button>
          }
         
        </DialogContent>
       
      </Dialog>
    </div>
    : null}
    </>
  );
}
