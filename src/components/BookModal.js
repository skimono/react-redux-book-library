import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions';
import uuid from 'uuid';

class BookModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      name: '',
      author: '',
      category: 'Action'
    }
    this.toggleModal = toggleModal.bind(this)
  }

    // toggle = () => {
    //   this.setState({
    //     modal: !this.state.modal
    //   });
    // };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      id: uuid(),
      name: this.state.name,
      author: this.state.author,
      category: this.state.category
    }

    // Add book via addBook action:
    this.props.addBook(newBook);

    // Close modal:
    this.toggleModal();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggleModal}
        >
          Add Book
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>
            Add book to your library
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title:</Label>
                <Input
                  type="text"
                  name="name"
                  id="title"
                  placeholder="Example: Lord of The Rings"
                  onChange={this.onChange}
                />
                <Label for="author">Author:</Label>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Example: J.R. Tolkien"
                  onChange={this.onChange}
                />
                <Label for="category">Category:</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  onChange={this.onChange}
                >
                {this.props.categories.map(cat => <option key={cat} value={cat} selected={this.state.category == cat ? true : false}>{cat}</option>)}
                </Input>
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Add Book
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export function toggleModal() {
  this.setState({
    modal: !this.state.modal
  });
};


const mapStateToProps = state => ({
  book: state.book
});

export default connect(mapStateToProps, { addBook })(BookModal);
