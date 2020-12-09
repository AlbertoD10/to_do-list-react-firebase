import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "./task.scss";

const db = firebase.firestore(firebase);

export default function Task(props) {
  const { task, setReloadTask } = props;

  const completeTask = () => {
    db.collection("task")
      .doc(task.id)
      .update({ completed: !task.completed })
      .then(() => {
        console.log("Okay");
        setReloadTask(true);
      });
  };

  const deleteTask = () => {
    db.collection("task")
      .doc(task.id)
      .delete()
      .then(() => {
        setReloadTask(true);
      });
  };

  return (
    <div className="task">
      <ListGroup>
        {!task.completed ? (
          <div className="task-item">
            <ListGroup.Item className="task-item__text" action variant="danger">
              {task.name}
            </ListGroup.Item>
            <Button onClick={completeTask} variant="outline-success">
              <Check onClick={completeTask} />
            </Button>
            <Button onClick={deleteTask} variant="outline-danger ">
              <Delete onClick={deleteTask} />
            </Button>
          </div>
        ) : (
          <div className="task-item">
            <ListGroup.Item
              className="task-item__text"
              action
              variant="success"
            >
              {task.name}
            </ListGroup.Item>
            <Button onClick={completeTask} variant="outline-success">
              <Check onClick={completeTask} />
            </Button>
            <Button onClick={deleteTask} variant="outline-danger ">
              <Delete onClick={deleteTask} />
            </Button>
          </div>
        )}
      </ListGroup>
    </div>
  );
}
