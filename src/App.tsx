import * as MaterialD from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import * as React from 'react';
// import Dropzone from 'react-dropzone';
// import Loader from 'react-loader-spinner'
import './App.css';
// import { Button } from 'react-bootstrap';

interface IState {
  results: any,
  dropzone: any,
  cityID: any,
  button: any,
  open: any
}

export default class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      cityID: document.getElementById("01"),
      results: "",
      dropzone: this.onDrop.bind(this),
      button: this.onClick.bind(this),
      open: false,
    }
    this.onClick = this.onClick.bind(this),
    this.updateCityID = this.updateCityID.bind(this)
  }

  public onClick(){
    this.upload()
    this.setState({
      open: true,
    })
  }

  public handleClose = () => {
    this.setState({
      open: false,
    })
  }

  public onDrop(files: any) {
    this.setState({
      results: ""
    })
    const file = files[0]
    const reader = new FileReader();
    reader.onload = (readerEvt: any) => {
        this.upload()
    };

    reader.readAsBinaryString(file);
  }

  public upload() {
    // fetch('https://api.openweathermap.org/data/2.5/weather?id='+ this.state.cityID + '&appid=75dc83ae2f9fe5edc1e29769a660f641', {
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+ this.state.cityID + '&appid=75dc83ae2f9fe5edc1e29769a660f641', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    .then((response : any) => {
      if (!response.ok) {
        this.setState({results: response.statusText})
      }
      else {
        response.json().then((data:any) => this.setState({results: String((data.weather[0].description))}))
      }

      return response
    })
  }


public updateCityID(event: any) {
  this.setState({cityID: event.target.value})
}

  public render() {
    
    return (
      <div className="container-fluid">
        <div className="centreText">
          <form>
          <TextField
          id="01"
          label="City"
          value={this.state.cityID}
          onChange={this.updateCityID}
          margin="normal"
        />
         <div>
      {/*   <Button onClick={this.handleClickOpen('paper')}>scroll=paper</Button>
        <Button onClick={this.handleClickOpen('body')}>scroll=body</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Weather in {this.state.cityID}</DialogTitle>
          <MaterialD.DialogContent>
            <MaterialD.DialogContentText>
            {this.state.results}
            </MaterialD.DialogContentText>
          </MaterialD.DialogContent>
          <MaterialD.DialogActions>
            <MaterialD.Button onClick={this.handleClose} color="primary">
              Okay
            </MaterialD.Button>
          </MaterialD.DialogActions>
        </Dialog>
      </div>
            <MaterialD.Button type="button" onClick={this.onClick}>Get the weather!</MaterialD.Button>
          </form> 
        </div>
      </div>
    );
  }
}

