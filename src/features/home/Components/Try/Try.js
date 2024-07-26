import React, { useRef, useState } from "react";
import { useEffect } from "react";

export default function Try() {
const [text, settext] = useState('');
    const count = useRef(1);
    const num = useRef(1);


const handleclickNum=()=>{
    num.current=num.current+1;
    console.log(num.current);
}


  return (
    <div>
      {`count is ${count.current} number is ${num.current} `}
      <br />
      <div className="btn btn-primary m-2" >
        Increase
      </div>

      <input
        type="text"
        className="m-2"
        onChange={(e)=>{settext(e.target.value)}}
        
      />
      <div className="btn btn-danger  " onClick={handleclickNum}>
        increament
      </div>
    </div>
  );
}
