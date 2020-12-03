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

  mostrarModalInsertar = () => {
    this.setState({mostrarModal: true, modalModoEditar: false});
  }

  mostrarModalEditar = (elemento) => {
    this.setState({mostrarModal: true, modalModoEditar: true, form: elemento});
  }

  ocultarModal = () => {
    this.setState({
      mostrarModal: false,
      form: {
        id: '',
        personaje: '',
        anime: ''
      }, 
    });
  }  

  insertarElemento = () => {
    var nuevoElemento = {...this.state.form};
    nuevoElemento.id = this.state.data.length+1;
    var dataUpdated = this.state.data;
    dataUpdated.push(nuevoElemento);
    this.setState({
      data: dataUpdated,
      mostrarModal: false,
      form: {
        id: '',
        personaje: '',
        anime: ''
      },      
    });
  }

  // actualizarElemento = () => {
  //   var actualizadoElemento = {...this.state.form};
  //   var dataUpdated = this.state.data;
  //   console.log(dataUpdated);
  //   console.log(actualizadoElemento);
  //   dataUpdated.map(ele =>  
  //     ele.id === actualizadoElemento.id 
  //     ? {...ele, id: actualizadoElemento.id, personaje: actualizadoElemento.personaje, anime: actualizadoElemento.anime} 
  //     : ele
  //   );
  //   console.log(dataUpdated);
  //   this.setState({
  //     data: dataUpdated,
  //     mostrarModal: false,
  //     form: {
  //       id: '',
  //       personaje: '',
  //       anime: ''
  //     },      
  //   });    
  // }

  actualizarElemento = () => {
    var idx = 0;
    var actualizadoElemento = this.state.form;
    console.log(actualizadoElemento);
    var dataUpdated = this.state.data;
    dataUpdated.map((ele) => {
      if (ele.id === actualizadoElemento.id) {
        dataUpdated[idx].personaje = actualizadoElemento.personaje;
        dataUpdated[idx].anime = actualizadoElemento.anime;
      }
      idx++;
    });
    this.setState({
      data: dataUpdated,
      mostrarModal: false,
      form: {
        id: '',
        personaje: '',
        anime: ''
      },      
    });       
  }

  grabarElemento = () => {
    if (!this.state.modalModoEditar) {
      this.insertarElemento();
    }
    else {
      this.actualizarElemento();
    }
  }

  eliminarElemento = (e) => {
    var dataUpdated = this.state.data.filter((ele) => ele.id !== e.id);
    this.setState({
      data: dataUpdated
    })    
  }

  render() {
    let inputId = (this.state.modalModoEditar) ? <input className="form-control" name="id" readonlye type="text" value={this.state.form.id} /> : <input className="form-control" name="id" readonlye type="text" value={this.state.data.length+1} />
    return (
      <>
          <Container>
            <Row><Col>&nbsp;</Col></Row>
            <Row>
              <Col>
                <Button color="success" onClick={() => this.mostrarModalInsertar()}>Insertar nuevo personaje</Button>
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
                          <td><Button color="primary" onClick={() => this.mostrarModalEditar(ele)}>Editar</Button></td>
                          <td><Button color="danger" onClick={() => this.eliminarElemento(ele)}>Eliminar</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
              </Col>
            </Row>            
          </Container>
          <Modal isOpen={this.state.mostrarModal }>
            <ModalHeader>
              <div>
                <h3>
                  {this.state.modalModoEditar ? "Editar Registro" : "Insertar Registro"}
                </h3>
              </div>
            </ModalHeader>
            <ModalBody>
            <FormGroup>
                <label>Id:</label>
                {inputId}
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
                      <Button color="primary" onClick={() => this.grabarElemento()}>{this.state.modalModoEditar ? "Grabar" : "Insertar"}</Button>
              <Button color="danger" onClick={() => this.ocultarModal()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
      </>
    );
  }
}

export default App;

