import React from 'react';

export class Column extends React.Component{
    
    render(){
        return (
            <div 
                ref={ this.props.referance } 
                className={`column ${this.props.classNames}` }  
                style={{
                    overFlow: this.props.overFlow,
                    padding: this.props.padding,
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: this.props.alignItems || 'center',
                    alignSelf: this.props.alignSelf || 'center',
                    flexWrap: 'wrap',
                    alignContent: this.props.alignContent || 'center',
                    width: this.props.width || '100%',
                    border: this.props.border,
                    borderRadius: this.props.borderRadius,
                    margin: this.props.margin,
                    backgroundColor: this.props.backgroundColor,
                    placeContent: this.props.placeContent || 'center center',
                    boxShadow: this.props.boxShadow,
                    top: this.props.top,
                    position: this.props.position,
                    borderLeft: this.props.borderLeft,
                    borderRight: this.props.borderRight,
                }} 
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

