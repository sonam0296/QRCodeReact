import { Button, Card, CardContent, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

function App() {
  const [text, setText] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [scanFile, setScanFile] = useState('')
  const [scanWebCam, setScanWebCam] = useState('')
  const qrRef = useRef(null)
  const classes = useStyles();
  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageURL(response);
    } catch (error) {
      console.log(error);
    }
  }
  const scanQRCode = async () => {
    qrRef.current.openImageDialog();
  }

  const handleErrorFile = (err) => {
    console.log(err);
  }

  const handleScanFile = (result) => {
    if (result) {
      setScanFile(result);
    }
  }

  const handleErrorWebCam = (err) => {
    console.log(err);
  }

  const handleScanWebCam = (result) => {
    if (result) {
      setScanWebCam(result);
    }
  }

  return (
    <>
      <Container className={classes.container}>
        <Card>
          <h2 className={classes.title}>
            Generate Download & Scan QR Code with React.js
          </h2>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <TextField
                  label="Enter Text"
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => generateQRCode()}
                >
                  Generate
                </Button>
                {
                  imageURL ? (
                    <a href={imageURL} download>
                      <img src={imageURL} alt="QR Code" />
                    </a>
                  ) : null
                }

              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => scanQRCode()}
                >
                  Scan QR Code
                </Button>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
                />
                <h3>Scanned Code: {scanFile}</h3>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <h3>QR Code Scan By using WebCam</h3>
              <QrReader
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                />
                <h3>Scanned By Web Cam: {scanWebCam}</h3>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    background: '#D8E9A8',
    color: '#1E5128',
    padding: 20
  },
  button: {
    display: 'flex',
    marginTop: 20
  }
}))

export default App;
