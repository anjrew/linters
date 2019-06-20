import React from 'react';

export class Row extends React.Component{

    render(){
        return (
            <div 
                id={this.props.id}
                className="row" 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    alignItems: this.props.alignItems || 'center',
                    width: this.props.width || '100%',
                    backgroundColor: this.props.backgroundColor,
                    padding: this.props.padding,
                    placeContent: this.props.placeContent || 'center space-between',
                    margin: this.props.margin,
                    transform: this.props.transform,
                    borderBottomStyle: this.props.borderBottomStyle
                }}
                onClick={this.props.onClick}
            >
                { this.props.children }
            </div>
        );
    }
}