import React from 'react';

export class Column extends React.Component{
    
    render(){
        return (
            <div 
                ref={ this.props.referance } 
                className={`column ${this.props.classNames}` }  
                style={{
                    minWidth: this.props.minWidth,
                    overflowX: this.props.overflowX,
                    overflowY: this.props.overflowY,
                    scrollHeight: this.props.scrollHeight,
                    boxSizing: this.props.boxSizing,
                    borderTop: this.props.borderTop,
                    overflow: this.props.overflow,
                    padding: this.props.padding,
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: this.props.alignItems || 'center',
                    alignSelf: this.props.alignSelf || 'center',
                    flexWrap: this.props.flexWrap,
                    alignContent: this.props.alignContent || 'center',
                    width: this.props.width || '100%',
                    height: this.props.height || '100%',
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

