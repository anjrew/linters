import { connect } from "net";
import React from 'react';
import { getListOfAnimals } from "./actions";

class CuteAnimals extends React.Component{

    componentDidMount(){
        this.props.dispatch(getListOfAnimals());
    }

    return(){
        <div>
            <h1>REDUX!!!!!!</h1>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        hello: 'no'
        //We'll come back tot this oncce uoru global state actually has something in it
    };
};

export default connect(mapStateToProps)(CuteAnimals);