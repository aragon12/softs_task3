import {useEffect, useState} from "react";
import {fabric, initFabricJSOverlay} from '@adamjarling/openseadragon-fabricjs-overlay';
import {OpenSeadragon} from "use-open-seadragon";
import {IconButton, Tooltip} from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import FullScreenIcon from '@material-ui/icons/Fullscreen';
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import './App.css';


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

var rect = new fabric.Rect({
  top: 200,
  left: 200,
  width: 200,
  height: 200,
  fill: 'transparent',
  stroke:
  'red',
  strokeWidth: 5
});

var cir = new fabric.Circle({
  top: 200,
  left: 200,
  radius: 100,
  fill: 'transparent',
  stroke:
  'red',
  strokeWidth: 5
});

const toolTipDelay = 700;

function SeaDragonViewer(props) {
  const [viewer, setViewer] = useState(null);
  const [overlay, setOverlay] = useState(null);

  initFabricJSOverlay(OpenSeadragon, fabric);

  useEffect(() => {
    if (props.slide && viewer && overlay) {
      viewer.open(props.slide.source);
      overlay.fabricCanvas().clear();
    }
  }, [props.slide]);

  useEffect(() => {
    viewer && viewer.destroy();
    const v = OpenSeadragon(sdConf);
    setViewer(v);
    setOverlay(v.fabricjsOverlay({scale: 1}));
    return () => {
        viewer && viewer.destroy();
    };
  }, []);

  const addRect = (e) => {
    overlay.fabricCanvas().add(rect);
  }

  const addCircle = (e) => {
    overlay.fabricCanvas().add(cir);
  }

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
  <Tooltip title="Add circle" enterDelay={toolTipDelay}>
    <IconButton color="primary" onClick={addCircle}>
      <RadioButtonUncheckedIcon fontSize="large" />
    </IconButton>
  </Tooltip>
  <Tooltip title="Add rectangle" enterDelay={toolTipDelay}>
    <IconButton color="primary" onClick={addRect}>
      <CheckBoxOutlineBlankIcon fontSize="large" />
    </IconButton>
  </Tooltip>
  </div>
  </div>
  );
};

export default SeaDragonViewer;
