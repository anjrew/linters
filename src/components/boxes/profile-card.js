import React from 'react';
import { Column } from '../layout/column';
import { Avatar } from '../graphics/avatar';
import { ScaleTransition } from "../transitions/scale-transition";
import { Row } from '../layout/row';


export class ProfileCard extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            show: false,
            firstButtonClicked: false,
            secondButtonClicked: false,
        };
        this.textStyle={
            textAlign: 'start'
        };
        this.handleSecondButtonClick = this.handleSecondButtonClick.bind(this);
        this.handleFirstButtonClick = this.handleFirstButtonClick.bind(this);
    }
	
    componentDidMount(){
        this.setState({
            show: true
        });
    }

    render(){
        return (
            <ScaleTransition 
                in={this.state.show} 
                onExited={() =>{
                    if (this.state.firstButtonClicked){
                        this.props.handleFirstButtonClick(); 
                    } else {
                        this.props.onSecondButtonClick();
                    }
                }}>
                <Column 
                    margin={'20px'}
                    width={'unset'}
                    minWidth={'318px'}
                    onClick={ this.props.cardClick }>
                    <Avatar
                        height ='200px'
                        width = '200px'
                        imageUrl={this.props.user.imageUrl || this.props.user.pic_url || this.props.user.image_url }
                        description={`${this.props.user.first} ${this.props.user.last}`}
                    />
                    <h2>{`${this.props.user.first} ${this.props.user.last}`}</h2>   
                    { this.props.showBio && <h2>{this.props.user.bio}</h2> }

                    {(this.props.handleFirstButtonClick || this.props.secondButtonText) &&
	
						<Column 
						    placeContent={'center center'}>
						    { this.props.handleFirstButtonClick &&
							<button id='button-one'
							    onClick={this.handleFirstButtonClick}
							>{this.props.buttonText}</button>}
						    { this.props.secondButtonText &&
							<button id='button-two'
							    style={{ 
							        backgroundColor: 'black',
							        color: 'white'
							    }} 
							    onClick={this.handleSecondButtonClick}>{this.props.secondButtonText}
							</button>}
						</Column>
                    }
                    
                </Column>
            </ScaleTransition>
        );
    }

    handleFirstButtonClick(){
        this.setState({
            show: false,
            firstButtonClicked: true,
        });
    }
	
    handleSecondButtonClick( ){
        console.log('second button pressed in profile card');
        this.setState({
            show: false,
            secondButtonClicked: true,
        });
    }
}