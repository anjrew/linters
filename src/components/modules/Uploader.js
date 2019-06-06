import React from 'react';
import axios from '../../react_utils/axios';
import routes from '../../react_utils/react_routes';

// Components
import { Row } from '../layout/row';
import { Container } from '../boxes/container';

export class Uploader extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.upload = this.upload.bind(this);
    }

    render(){
        return (
            <Container 
                margin="20px" 
                padding='10px' 
                borderRadius="20px" 
                borderWidth="1px"
                borderColor="black" 
                borderStyle="solid"
                boxShadow={true} >
                <Row justifyContent={'flex-end'} >
                    <button onClick={ this.props.dismissLoader } style={{ height: '30px', width: '30px', padding: '0px' }}>x</button>
                </Row>
                <h2 style={{padding: '20px'}}>Want to change your image?</h2>
                <label>Add File...</label>
                <p>{this.state.file}</p>
                <input
                    // style={{ display: 'none' }}
                    id="upload-photo"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={ this.upload }>Upload</button>
            </Container>
        );
    }

    async upload() {
        console.log('Upload clicked and this is', this);
        var formData = new FormData();
        formData.append("file", this.state.file);
        try {
            const response = await axios.post(routes.upload, formData);
            console.log('The response data is ', response.data);
            this.props.changeImage(response.data.pic_url);
        } catch (e) {
            console.log('The axios call to upload the file failed');
        }
    }

    handleChange(e) {
        console.log('File changed and this is', this);
        this.setState({
            file: e.target.files[0]
        });
    }

    dismissLoader(){
        console.log('Dismissing uploader and this is', this);
    }
}