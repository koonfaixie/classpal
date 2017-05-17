import React from 'react';

export default class Peer extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            selected: false,
        }
	}

    select(){
        this.props.select(this.props.peer)
        this.setState({
            selected: true,
        })
    }

    deselect(){
        this.props.deselect(this.props.peer)
        this.setState({
            selected: false,
        })
    }

	render() {
		return (
            <div className="peer">
                { this.props.peer.username == this.props.username ? 
                    <span> {this.props.peer.first_name} {this.props.peer.last_name} - selected </span>
                        :
                    <span> {this.props.peer.first_name} {this.props.peer.last_name} {this.state.selected ? (<span onClick={this.deselect.bind(this)} className="peer-option-remove"><i className="fa fa-minus-circle" aria-hidden="true"></i></span>) : (<span onClick={this.select.bind(this)} className="peer-option-add"> <i className="fa fa-plus-circle" aria-hidden="true"></i> </span>)} </span>                     
                }
            </div>
		)
	}
}