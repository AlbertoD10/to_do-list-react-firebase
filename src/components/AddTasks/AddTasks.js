import React, { useState } from "react";
import "./addtask.scss";
import { Form, Button } from "react-bootstrap";
import { isEmpty } from "lodash";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import { ReactComponent as Send } from "../../assets/send.svg";

//Inicializo la base de datos pasandole nuestra configuracin de firebase
const db = firebase.firestore(firebase);

export default function AddTasks(props) {
  const { setReloadTask } = props;
  const [task, setTask] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    //Si la tarea tiene texto, la enviare a Firebase
    if (!isEmpty(task)) {
      db.collection("task")
        .add({
          name: task,
          completed: false,
        })
        .then(() => {
          setReloadTask(true);
          setTask(""); //Limpio el input dejandolo en blanco
        })
        .catch((e) => {
          console.log("hubo un error en la conexion", e);
        });
    }
  };

  return (
    <Form className="add-task" onSubmit={onSubmit}>
      <Form.Control
        type="text"
        placeholder="Añadir nueva tarea..."
        onChange={(e) => setTask(e.target.value)}
        value={task} //Se limpia el input
      />
      <Button variant="link" type="submit">
        <Send />
      </Button>
    </Form>
  );
}
