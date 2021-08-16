import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import SeaDragonViewer from './SeaDragonViewer';
import DrawerList from './Drawerlist';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function App() {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  const [slideData, setSlideData] = useState();

  useEffect(() => {
    getImages();
  }, []);
  
  const getImages = async () => {
    const response = await fetch("https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json")
    let image = await response.json();
    setImages(image.groups)
  };

  const handleClick = (slide) => {
    setSlideData(slide.slide);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            OpenSeaDragon Image Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <DrawerList data={images} onSlideSelect={handleClick} />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <SeaDragonViewer slide={slideData}/>
      </main>
    </div>
  );
}

