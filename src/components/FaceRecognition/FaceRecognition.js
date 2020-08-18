import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({image, box}) => {
	return (
		<div className='center ma'> 
			<div className='absolute mt2'>
				<img id='myImage' alt='' src={image} width='300' height='auto'/>
				<div className='boxBackground' style={{top: box.top, bottom: box.bottom, left: box.left, right: box.right}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;