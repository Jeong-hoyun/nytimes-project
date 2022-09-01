import React from "react";
import { useNavigate } from "react-router-dom";

function MoveHome(){
  let navigate = useNavigate()

  const clickHomeBtn = () => {
    navigate(`/`)
  }

  return(
    <li onClick={clickHomeBtn}>HOME</li>
  )
}

export default MoveHome