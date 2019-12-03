import React from 'react';
import axios from 'axios';
import CardMedia from "@material-ui/core/CardMedia";
class Image extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }
      
  componentDidMount() {
    
    let id = this.props.fid;
    axios.get('/jsonapi/file/file/'+id)
      .then(response => {
        this.setState({image: response.data.data.attributes.uri.url});
      
    }); 
  }
  render(){
    let root = window.location.protocol + '//' + window.location.hostname;
    return(
      <div className="post-image">
        <CardMedia
          component="img"
          height="140"
          image= {root + this.state.image}
        />      
      </div>
    )
  }
}

export default Image;