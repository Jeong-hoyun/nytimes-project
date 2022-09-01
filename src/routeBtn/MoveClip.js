import React from "react";
import { useNavigate } from "react-router-dom";

function MoveClip(){
  let navigate = useNavigate()

  const clickClipBtn = () => {
    navigate(`/clip/`)
  }
  return <li onClick={clickClipBtn}>CLIP</li>
}

export default MoveClip;