import React from "react";
import "./Home.css";
import image from "./logo.jpg";
import HadithIteam from "./Components/HadithItem/HadithIteam";
export default function Home() {
  return (
    <div className="bg-info">
      <div className="wrapper p-1 ">
        
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
      </div>
      <div className="text">
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos aperiam quisquam modi debitis ex, saepe repellendus ea! Fuga, quidem placeat dignissimos officiis ab ad animi. Quae facere tempore necessitatibus aperiam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad tenetur neque inventore assumenda est eum. Minus qui exercitationem dolor dicta, sint, animi reiciendis hic provident voluptatem amet quam! Non, nisi? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex quisquam, tenetur reiciendis laborum, aliquid qui at officiis repellat commodi nam suscipit mollitia est, tempore unde magni eveniet hic voluptates cum!</h2>
      </div>
    </div>
  );
}
