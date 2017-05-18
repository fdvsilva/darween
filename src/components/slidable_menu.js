import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import FontAwesome from 'react-fontawesome';

class SlidableMenu extends Component  {

  constructor(props) {
    super(props);
    this.state = {yOffset: 0, overflow: false, slidableMenuRef: null};
    this.moveDown = this.moveDown.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.checkOverflow = this.checkOverflow.bind(this);
    this.defaultOffset = 50;
  }


  moveDown() {
      let diff = this.state.slidableMenuRef.scrollHeight - this.state.slidableMenuRef.clientHeight;

      if (diff > 0) {
        let offset = diff >= this.efaultOffset ? this.defaultOffset : diff;
        this.setState({yOffset: this.state.yOffset - offset});
        setTimeout(this.checkOverflow, 0)
      }
  }

  moveUp() {

    if (this.state.yOffset < 0) {
      let offset = this.state.yOffset <= -this.defaultOffset ? this.defaultOffset : - this.state.yOffset;
      this.setState({yOffset: this.state.yOffset + offset});
      setTimeout(this.checkOverflow, 0)
    }
  }

  checkOverflow () {
    if (this.state.slidableMenuRef.scrollHeight > this.state.slidableMenuRef.clientHeight || this.state.yOffset < 0) {
      this.setState({overflow: true});
    } else {
      this.setState({overflow: false});
    }
  }


  render () {
    const childrenWithCheckOverFlowFun = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       checkOverflow: () => setTimeout(this.checkOverflow, 0)
     })
    );

    let childrenStyles = {
      transform: `translateY(${this.state.yOffset}px)`
    }

    return (
      <div className="slidable-menu" ref={(ref) => this.state.slidableMenuRef = ref}>
      <p className="menu-header">
      <FontAwesome className="header-icons left-aligned-icons-slidable-menu" name={this.props.iconName} />
      {this.props.title}
      <label className="header-icons right-aligned-icons-slidable-menu" htmlFor={this.props.title}>
        <FontAwesome name='caret-down'/>
      </label>
      </p>
      <input className="toggle" type="radio" id={this.props.title} name="accordion-menu"/>
      <div className="children-container" style={childrenStyles} >
        {childrenWithCheckOverFlowFun}
      {/*buildTopics(props.topicsData)*/}
      </div>
      { this.state.overflow &&
          <div className="up-down-arrows">
          <FontAwesome onClick={this.moveUp} className="up-arrow" name='chevron-up' />
          <FontAwesome onClick={this.moveDown} className="down-arrow" name='chevron-down' />
          </div>
      }
      </div>
    );
  }
}

SlidableMenu.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired

}

SlidableMenu.defaultProps = {
  iconName: 'commenting-o',
  title: ''
}

export default SlidableMenu;
