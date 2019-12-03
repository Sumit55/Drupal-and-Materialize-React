import React, { Component } from 'react';
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import axios from 'axios';
import Image from "./components/Image";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      body:'',
      title:'',
      image:''
    };
  }
  
  componentDidMount() {

    axios.get('/jsonapi/node/article')
    .then(res => {
      this.setState({ items: res.data.data });
    })
    
  }
  
  render() {
    return (
      <div style={{ marginTop: 20, padding: 30 }}>
      <Grid container spacing={10} justify="center">
        {this.state.items.map(post => (
          <Grid item key={post.attributes.title} style={{ height: '200px', width: '600px' }}>
            <Card>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
              }
              title= {post.attributes.title}
              subheader= { new Date(post.attributes.created).toDateString() }
            />
            <CardActionArea>
              <Image fid={post.relationships.field_image.data.id} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography component="p">{post.attributes.body.value.replace(/<[^>]*>?/gm, '')}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
    );
  }
}

export default App;