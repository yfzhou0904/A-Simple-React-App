import React, { Component } from 'react';
import './App.css';
import { Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			filter: false,
			id: '',
			userId: ''
		};
	}

	componentDidMount(e) {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				let dataPromise = response.json();
				return dataPromise;
			})
			.then((data) => {
				this.setState({ posts: data });
			})

	}

	handleClick(e) {
		this.setState({ filter: !this.state.filter })
	}

	handleChangeId(e) {
		this.setState({ id: e.target.value })
	}

	handleChangeUserId(e) {
		this.setState({ userId: e.target.value })
	}

	render() {
		let postObjects = this.state.posts.map((postData) => {
			return (
				<Card className='d-flex' style={{ width: '18rem' }} key={postData.id}>
					<Card.Body>
						<Card.Title>{postData.title}</Card.Title>
						<Card.Text>
							{postData.body}
						</Card.Text>
					</Card.Body>
				</Card>
			);
		});
		if (this.state.filter) {
			let filteredData = this.state.posts.filter((postData) => {
				return postData.userId == this.state.userId || postData.id == this.state.id;
			});
			postObjects = filteredData.map((postData) => {
				return (
					<Card className='d-flex' style={{ width: '18rem' }} key={postData.id}>
						<Card.Body>
							<Card.Title>{postData.title}</Card.Title>
							<Card.Text>
								{postData.body}
							</Card.Text>
						</Card.Body>
					</Card>
				);
			})
		};

		return (
			<div className='container justify-content-center'>
					<Form className='d-flex justify-content-center'>
						<Form.Group controlId="formBasicEmail">
						<Form.Label>UserID</Form.Label>
						<Form.Control type="userid" placeholder="Enter userID" value={this.state.userId} onChange={this.handleChangeUserId.bind(this)} />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>ID</Form.Label>
						<Form.Control type="id" placeholder="id" value={this.state.id} onChange={this.handleChangeId.bind(this)} />
					</Form.Group>

					<Form.Group controlId="formBasicChecbox">
						<Form.Check type="checkbox" label="Filter" onClick={this.handleClick.bind(this)} />
					</Form.Group>
				</Form>
				<div className='container row justify-content-center'>
					{postObjects}
				</div>
			</div>
		);
	}
}

export default App;
