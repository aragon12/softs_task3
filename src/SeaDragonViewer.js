import OpenSeaDragon from "openseadragon";
import { useEffect, useState } from "react";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import FullScreenIcon from '@material-ui/icons/Fullscreen';
import { IconButton, Tooltip} from '@material-ui/core';
import './App.css';
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor";

const sdConf = {
  id: "openSeaDragon",
  prefixUrl: "opensd-images/",
  animationTime: 0.5,
  blendTime: 0.1,
  constrainDuringPan: true,
  maxZoomPixelRatio: 2,
  minZoomLevel: 1,
  visibilityRatio: 1,
  zoomPerScroll: 2,
  zoomInButton: "zoom-in",
  zoomOutButton: "zoom-out",
  homeButton: "home",
  fullPageButton: "fullscreen",
}

const toolTipDelay = 700;

function SeaDragonViewer(props) {
  const [viewer, setViewer] = useState( null);

  useEffect(() => {
    if (props.slide && viewer) {
      viewer.open(props.slide.source);
    }
  }, [props.slide]);

  useEffect(() => {
    viewer && viewer.destroy();
    setViewer(OpenSeaDragon(sdConf));
    return () => {
        viewer && viewer.destroy();
    };
  }, []);

  return (
    <div>
  <div 
  id="openSeaDragon" 
  style={{
    height: "480px",
    "boxShadow":"0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)"
  }} />
  <div className="control_cont">
  <Tooltip title="Zoom in" enterDelay={toolTipDelay}>
    <IconButton color="primary" id="zoom-in">
      <ZoomInIcon fontSize="large" />
    </IconButton>
  </Tooltip>
  <Tooltip title="Zoom out" enterDelay={toolTipDelay}>
    <IconButton color="primary" id="zoom-out">
      <ZoomOutIcon fontSize="large" />
    </IconButton>
  </Tooltip>
  <Tooltip title="Reset" enterDelay={toolTipDelay}>
    <IconButton color="primary" id="home">
      <YoutubeSearchedForIcon fontSize="large" />
    </IconButton>
  </Tooltip>
  <Tooltip title="Fullscreen" enterDelay={toolTipDelay}>
    <IconButton color="primary" id="fullscreen">
      <FullScreenIcon fontSize="large" />
    </IconButton>
  </Tooltip>
  </div>
  </div>
  );
};

export default SeaDragonViewer;
