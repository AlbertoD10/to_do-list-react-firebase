import React, { useState, useEffect } from "react";
import AddTasks from "./components/AddTasks";
import firebase from "./utils/firebase";
import "firebase/firestore";
import { map, size } from "lodash";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Task from "./components/Task";

import "./app.scss";

// Inicializo la base de datos pasandole la configuracion firebase
const db = firebase.firestore(firebase);

function App() {
  const [tasks, setTasks] = useState(null);
  const [reloadTask, setReloadTask] = useState(false); //Trigger que me actualizara la tarea en la lista.

  useEffect(() => {
    db.collection("task")
      .orderBy("completed", "asc") //Ordeno la tarea
      .get()
      .then((response) => {
        const arrayTasks = []; //Guardo la tarea
        response.docs.map((task) => {
          //Dentro de docs se encuentran las tareas, las recorro
          const data = task.data(); //task.data para extraer la informacin.
          data.id = task.id; //Creo el id de la tarea
          arrayTasks.push(data);
        });
        setTasks(arrayTasks);
      });
    setReloadTask(false);
  }, [reloadTask]);

  return (
    <div className="App">
      <Container fluid className="title">
        <h1>Lista de tareas</h1>
      </Container>

      <Row className="todo">
        <Col
          className="todo__title"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <h2>Hoy</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          {!tasks ? ( // Si no se ha cargado, muestro cargando.
            <div className="loading">
              <Spinner animation="border" variant="primary" />
              <span>Cargando...</span>
            </div>
          ) : size(tasks) == 0 ? ( //Verifico si el array tiene tareas
            <p>No hay tareas...</p>
          ) : (
            /* Aqui voy a imprimir mis tareas, recorro el estado tasks y devuelvo las tareas */
            tasks.map((task) => (
              <Task key={task.id} task={task} setReloadTask={setReloadTask} />
            ))
          )}
        </Col>
        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTasks setReloadTask={setReloadTask} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
