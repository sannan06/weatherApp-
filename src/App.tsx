// import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
// import Dropzone from 'react-dropzone';
// import Loader from 'react-loader-spinner'
import './App.css';

interface IState {
  results: any,
  dropzone: any,
  cityID: any
}

export default class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      cityID: "2172797",
      results: "",
      dropzone: this.onDrop.bind(this)
    }
  }

  public onDrop(files: any) {
    this.setState({
      results: ""
    })
    const file = files[0]
    const reader = new FileReader();
    reader.onload = (readerEvt: any) => {
        const binaryString = readerEvt.target!!.result;
        this.upload(btoa(binaryString))
    };

    reader.readAsBinaryString(file);
  }

  public upload(base64String: string) {
    fetch('https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=75dc83ae2f9fe5edc1e29769a660f641', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        file: base64String,
      })
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

  public render() {
    
    return (
      <div className="container-fluid">
        <div className="centreText">
{/*           <div className="dropZone">
            <Dropzone onDrop={this.state.dropzone} style={{position: "relative"}}>
              <div style={{height: '50vh'}}>
                {
                  this.state.cityID.length > 0 ? 
                    <div>{this.state.cityID.map}</div> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }  
              </div>
            </Dropzone>
          </div> */}
          <form>
            City Id
            <input type = "text" name = "cityid"/>
          </form>
          <div  className="dank">
{/*           {
            this.state.results === "" && this.state.cityID.length > 0 ?
            <CircularProgress thickness={3} /> :
            <p>{this.state.results}</p>
          } */}
          </div>
        </div>
      </div>
    );
  }
}

