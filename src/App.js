import React, { Component } from 'react';
import Chat from './components/Chat';
import './scss/style.scss';

export default class App extends Component {
	render() {
		return (
			<main className="app-wrap">
				<Chat />
			</main>
		);
	}
}
