import React from "react"
import Img from './unnamed.png'

class About extends React.Component {
	render() {
		return (
			<div> 
				<center>
					<img src= {Img} alt="pic" />
					<br/> <b> Welcome!!! </b>
				</center>
			</div>
		)
	}
}
export default About