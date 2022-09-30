import { RicardianContract } from "@ricardianfabric/react-components"
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState, Fragment } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [contractAccepted, setContractAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // You need to request accounts with your provider before rendering the Ricardian Contract
  useEffect(
    function () {
      window.ethereum.request({ method: "eth_requestAccounts" });

      // Make sure you are on the correct network! Switch networks here after requesting accounts.

    }, [])



  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const snackbarAction = (
    <Fragment>
      <p>{errorMessage}</p>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  if (contractAccepted) {
    return <p>You have accepted the contract!</p>
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ width: 500, paddingLeft: 5, paddingRight: 5, marginBottom: 10, marginTop: 10 }}>
        <RicardianContract
          LoadingIndicator={<CircularProgress />}
          arweaveTx='TvWFf0c5E_k-mvDGHCpfQL_ajBIJFcGn9rMu8pLEB7g'
          AcceptButton={<Button>Sign With Metamask</Button>}
          signingSuccessCallback={() => { setContractAccepted(true) }}
          signingErrorCallback={(msg) => {
            setErrorMessage(msg);
            setOpenSnackbar(true);
            setContractAccepted(false)
          }}
          provider={window.ethereum}
          useReverseGeocoding={true}
        ></RicardianContract>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="ERROR:"
        action={snackbarAction}
      />
    </Box>
  );
}

export default App;
