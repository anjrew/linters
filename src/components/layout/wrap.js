import React from 'react';

export class Wrap extends React.Component{

    render(){
        return (
            <div 
                className="wrap" 
                style={{
                    padding: this.props.padding,
                    display:'flex',
                    flexDirection: this.props.flexDirection ||'row',
                    justifyContent: 'center',
                    alignItems: this.props.alignItems || 'center',
                    alignSelf: this.props.alignSelf || 'center',
                    flexWrap: 'wrap',
                    alignContent: this.props.alignContent || 'center',
                    width: this.props.width || '100%'
                }}>
                {this.props.children}
            </div>
        );
    }
}