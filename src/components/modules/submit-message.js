/* eslint-disable indent */
import React from 'react';

// COMPONENTS
import { Row } from '../layout/row';
import { TextArea } from '../inputs/text_area';

export class SubmitMessage extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
			message: '',
		};
		this.elemRef = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}
	
    render(){
        return (
				<Row
					margin='20px'>
					<TextArea
						name='message' 
						value={ this.state.message } 
						handleChange={ this.handleChange }
						width='80%'/>
					<button 
						onClick={ () => {
							
							this.props.submit(this.state.message);
						}}
						>Leave comment</button>	
                </Row>
		);
	}
			
	handleChange({ target }) {
		this.setState({
			[target.name]: target.value
		});
	}
}

		