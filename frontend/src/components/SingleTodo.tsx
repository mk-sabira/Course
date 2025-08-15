import React, { useEffect, useRef, useState } from "react";
import {Todo} from "./model";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import "./styles.css";
import TodoList from "./TodoList";
import { Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
    index:number,
    todo:Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}


const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);


    const handleDone = (id: number) => {
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, isDone: !t.isDone } : t
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();

        setTodos(
            todos.map((todo) => (todo.id === id ? {...todo, todo:editTodo} :todo
        )));
        setEdit(false);
    };
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() =>{
        inputRef.current?.focus();
    }, [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided)=> (
                    <form 
                        className="todos_signle" 
                        onSubmit={ (e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                    {edit ? (
                            <input 
                            ref = {inputRef}
                            value={editTodo} 
                            onChange={(e) => setEditTodo(e.target.value)} 
                            className="todos_signle--text"/>
                        ): todo.isDone ? (
                        <s className="todos_signle--text">{todo.todo}</s>
                    ) : (
                        <span className="todos_signle--text">{todo.todo}</span>
                    )}

                    

                    <div className="icons">
                        <span className="icon" onClick={ () => {

                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}
                        >
                            <CiEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <MdDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <FaCheck />
                        </span>
                    </div>
                </form>
                )
            }

            
        </Draggable>
    );
};

export default SingleTodo;