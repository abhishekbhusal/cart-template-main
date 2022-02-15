import React, {useState} from "react";
import Base from "./Base";
import Img from './unnamed.png'
import { authenticate } from "./CartService";




function Home() {
  const isAuthenticated= authenticate();
  
  return (
    <Base>
      <div className="app-home" >
        <h1 style={{color:"blueviolet",textAlign:"center"}}>   Welcome to TechNova Global Shopping Home Page </h1>
        <center>
					<img src= {Img} alt="pic" />
					<br/> <b> Welcome {isAuthenticated.user}!!! </b> 
				</center>
        
      </div>
    </Base>
  );
}

export default Home;
