/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { MessageTile } from '../components/boxes/message_tile';
import { Column } from '../components/layout/column';
import { Row } from '../components/layout/row';
import { TextArea } from '../components/inputs/text_area';
import { socket } from '../react_utils/socket';

class Chat extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
			message: '',
		};
		this.elemRef = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}
	
    render(){
		const messages =  this.props.messages;
        return (
            <Column
                padding='20px'>
					<Row
						margin='20px'>
						<TextArea
							name='message' 
							value={ this.state.message } 
							handleChange={ this.handleChange }
							width='80%'/>
                    <button 
                        onClick={ () => {
							this.setState({
								message: ''
							});
							socket.emit('newMessage',{ 
                            message: this.state.message }); 
						}}
                    >Leave comment</button>
                </Row>
                <Column>
                    { messages && messages.map(message => (
                        <MessageTile key={message.id} message={ message } />
                    ))}
                </Column>
				<button id="get-more-chat"
                        onClick={() => {
                            socket.emit("moreChat", { id: messages[ messages.length - 1 ].id });
                        }}
                >More</button>
            </Column>
        );
	}

	// componentDidUpdate() {
    //     this.elemRef.current.scrollTop =
    //         this.elemRef.current.scrollHeight - this.elemRef.current.offsetTop;
    // }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}

const mapStateToProps = (state) => {
    return { messages: state.messages };
};


export default connect(mapStateToProps)(Chat);