import React from 'react';

export default class Announcement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showDate: false
		}
		this.date = new Date(this.props.announcement.date_added)
		this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	}

	showDate(){
		this.setState({
			showDate: !this.state.showDate
		})
	}

	render() {
		return (
			<li> 
				<p className="announcement-title"> {this.props.announcement.name}</p>
				<p className="announcement-text"> 
					{this.props.announcement.text.split("\n").map((item, index) =>
						<span key={index}>
							{item.includes("<link>") ? 
								<span> {item.split("<link>").map((item_link, index) =>
									<span key={index}> {item_link.includes('http://') ? <a href={item_link}>{item_link}</a> 
												:
											(item_link) }
									</span>
								)}
								</span>
								:
								(item)
							}
							<br/>
						</span>
					)}
				</p>
				{<p className="announcement-date"> added: {this.days[this.date.getDay()]}, {this.date.getMonth()}/{this.date.getDate() > 9 ? (this.date.getDate()) : (<span>0{this.date.getDate()}</span>)} </p>}
			</li>
		)
	}
}
