import React, { Component } from 'react';
import './App.css';
import ImageCompressor from 'image-compressor.js';
import saveAs from 'file-saver';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      imageUrl: "",
      imageName: ""
    }
  }

  updateStates = (imageUrl, imageName) => {
    this.setState({
      imageUrl,
      imageName
    })
  }

  handleChange = (e) => {
    const file = e.target.files[0];
  
    if (!file) {
      return;
    }

    let compressionObj = {
      quality: 0.8,
      mimeType: 'image/jpeg',
      maxWidth: 700
    };
  
    let imageCompressor = new ImageCompressor(file, {
      compressionObj,
      success : (result) => {
        const formData = new FormData();  
        formData.append('file', result, result.name);

        const imageUrl = URL.createObjectURL(result);
        const imageName = result.name;
        /*const img = document.getElementById('resultImage');
        
        img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
        document.querySelector('img').src = imageUrl;*/

        this.updateStates(imageUrl, imageName)

      },
      error(e) {
        console.log(e.message);
      },
    });

  }

  handleClick = (e) => {
    saveAs(this.state.imageUrl, this.state.imageName);
  }


  render() {
    return (
      <div className="App">
        <div style={{width: '100%',float: 'left'}}>
          <label>Insert image here:</label><br  />
          <input ref="uploadImage" type="file" id="image" accept="image/*" onChange={this.handleChange} />
        </div>
        <div style={{width: '100%',float: 'left'}} >
          <img style={{maxWidth: '700px'}} id="resultImage" src={this.state.imageUrl} alt="" />
        </div>
        <div style={{width: '100%',float: 'left'}}>
          <button id="downloadImg" onClick={this.handleClick}>Download</button>
        </div>
      </div>
    );
  }
}

export default App;
