import * as MaterialD from '@material-ui/core';
import * as React from 'react';
// import Dropzone from 'react-dropzone';
// import Loader from 'react-loader-spinner'
import './App.css';
// import { Button } from 'react-bootstrap';

interface IState {
  results: any,
  dropzone: any,
  cityID: any,
  button: any
}

export default class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      cityID: document.getElementById("01"),
      results: "",
      dropzone: this.onDrop.bind(this),
      button: this.onClick.bind(this),
    }
    this.onClick = this.onClick.bind(this),
    this.updateCityID = this.updateCityID.bind(this)
  }

  public onClick(){
    this.upload()
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
    fetch('https://api.openweathermap.org/data/2.5/weather?id='+ this.state.cityID + '&appid=75dc83ae2f9fe5edc1e29769a660f641', {
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
        response.json().then((data:any) => this.setState({results: JSON.stringify(data.weather[0].main)}))
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
            City Id: 
            <input type = "text" name = "cityid" id="01" defaultValue={this.state.cityID} onChange = {this.updateCityID} />
            <MaterialD.Button type="button" onClick={this.onClick}>Get the weather</MaterialD.Button>
          </form>  
          <div  className="dank">
            <p>{this.state.results}</p>
            <p>{this.state.cityID}</p>
          </div>
        </div>
      </div>
    );
  }
}

