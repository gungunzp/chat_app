import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addMessage } from '../store/actions';

const mapStateToProps = state => ({
	messages: state.messages
});

const mapDispatchToProps = dispatch => ({
	addMessage: bindActionCreators(addMessage, dispatch)
});

class Chat extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.messages.length !== prevProps.messages.length) {
			this.scrollTo(0, this.last);
		}
	}

	scrollTo = (coord, el) => {
		el.scrollIntoView({ block: 'start', behavior: 'smooth' });
	};

	sendMessage = e => {
		e.preventDefault();
		const { messages } = this.props;
		const lastMessage = messages[messages.length - 1];
		const elems = Array.prototype.slice.call(e.target.elements);
		const author = elems.find(el => el.name === 'author').value;
		const text = elems.find(el => el.name === 'text').value;
		if (author && text && author.trim() && text.trim()) {
			const message = {
				id: Date.now(),
				author: author.trim(),
				text: text.trim()
			};
			// check for the new author
			let authorMessage = messages.find(m => m.author === message.author);
			message.authorColor = authorMessage
				? authorMessage.authorColor
				: `#${Math.random()
						.toString(16)
						.slice(9)}`;
			// check for same author write message in no time
			if (
				message.author === lastMessage.author &&
				message.id !== lastMessage.id
			) {
				message.sameAuthor = true;
			}
			this.props.addMessage(message);
		} else {
			alert('Fill the form!');
		}
	};

	render() {
		const { messages } = this.props;
		return (
			<Fragment>
				<header className="header">
					<h1>Chat</h1>
					<form onSubmit={this.sendMessage}>
						<label className="form-group">
							<span className="form-group__label">Author:</span>
							<input
								className="form-group__content"
								type="text"
								name="author"
								// value="bot"
							/>
						</label>
						<label className="form-group">
							<span className="form-group__label">Text:</span>
							<textarea
								className="form-group__content"
								type="text"
								name="text"
								// value="test"
							/>
						</label>
						<button>send</button>
					</form>
				</header>
				<ul className="chat">
					{messages.map(({ id, author, authorColor, text, sameAuthor }) => (
						<li
							key={id}
							className="chat__message"
							ref={node => (this.last = node)}
						>
							<div
								style={{ backgroundColor: authorColor || 'red' }}
								className={`chat__message__avatar${
									sameAuthor ? ' chat__message__avatar--hidden' : ''
								}`}
							>
								{author && author.slice(0, 1).toUpperCase()}
							</div>
							<div className="chat__message__inner">
								{!sameAuthor && (
									<div className="chat__message__author">{author}</div>
								)}
								<div
									style={{ backgroundColor: authorColor || 'red' }}
									className="chat__message__text"
								>
									{text}
								</div>
							</div>
						</li>
					))}
				</ul>
			</Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);
