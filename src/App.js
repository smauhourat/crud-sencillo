import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Row, Col, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" } ,
  { id: 2, personaje: "Goku", anime: "Dragon Ball" } ,
  { id: 3, personaje: "Kenshin Himura", anime: "Rorouni Kenshi" } ,
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" } ,
  { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" } ,
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" }

];

class App extends Component {
  state = {
    data: data,
    form: {
      id: '',
      personaje: '',
      anime: ''
    },
    mostrarModal: false,
    modalModoEditar: false
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModal = (modoEditar) => {
    this.setState({mostrarModal: true, modalModoEditar: modoEditar});
  }

  ocultarModal = () => {
    this.setState({mostrarModal: false});
  }  

  grabarElemento = (modoEditar) => {
    if (!modoEditar) {
      var nuevoElemento = {...this.state.form};
      nuevoElemento.id = this.state.data.length+1;
      var dataUpdated = this.state.data;
      dataUpdated.push(nuevoElemento);
      this.setState({
        data: dataUpdated,
        modalInsertar: false,
        form: {
          id: '',
          personaje: '',
          anime: ''
        },      
      });
    }

  }

  eliminarElemento = (e) => {
    var dataUpdated = this.state.data.filter((ele) => ele.id !== e.id);
    this.setState({
      data: dataUpdated
    })    
  }

  render() {
    return (
      <>
          <Container>
            <Row><Col>&nbsp;</Col></Row>
            <Row>
              <Col>
                <Button color="success" onClick={() => this.mostrarModal(false)}>Insertar nuevo personaje</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                  <Table>
                    <thead>
                      <tr>
                        <td>Id</td>
                        <td>Personaje</td>
                        <td>Anime</td>
                        <td>Acciones</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((ele) => (
                        <tr>
                          <td>{ele.id}</td>     
                          <td>{ele.personaje}</td>     
                          <td>{ele.anime}</td>
                          <td><Button color="primary" onClick={() => this.mostrarModal(true)}>Editar</Button></td>
                          <td><Button color="danger" onClick={() => this.eliminarElemento(ele)}>Eliminar</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
              </Col>
            </Row>            
          </Container>
          <Modal isOpen={this.state.modalInsertar || this.state.modalEditar }>
            <ModalHeader>
              <div>
                <h3>
                  {this.state.modalEditar ? "Editar Registro" : "Insertar Registro"}
                </h3>
              </div>
            </ModalHeader>
            <ModalBody>
            <FormGroup>
                <label>Id:</label>
                <input className="form-control" name="id" readonlye type="text" value={this.state.data.length+1} />
              </FormGroup>
              <FormGroup>
                <label>Personaje:</label>
                <input className="form-control" name="personaje" type="text" value={this.state.form.personaje} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <label>Anime:</label>
                <input className="form-control" name="anime" type="text" value={this.state.form.anime} onChange={this.handleChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.insertarElemento(false)}>Insertar</Button>
              <Button color="danger" onClick={() => this.ocultarModal()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
      </>
    );
  }
}

export default App;

