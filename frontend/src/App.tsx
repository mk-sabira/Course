import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DiagnosticCategory, toEditorSettings } from 'typescript';
import InputField from './components/inputField';
import {Todo} from "./components/model";
import TodoList from './components/TodoList'

// let role:[string, number];

// role = ["DiagnosticCategory", 3];

// // objct
// type Person= {
//   name:string;
//   age?:number;
// };

// let person: Person = {
//   name: "Dina",
//   // age: 22
// };

// let ManyPeople:Person[];

// // ManyPeople= 
// let mix:number | string;

// mix = "Name";
// mix = 12;

// function printName(name:string)
// {
//   console.log(mix);
// };

// let test: unknown;

// test = "string"

// type X = {
//   a:string;
//   b: number;
// };

// type Y = X &{
//   c:string;
//   b:number;
// };

// interface Human extends Person {
//   profession:string;

// }





const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo)
    {
      setTodos([...todos, {id: Date.now(), todo, isDone:false}]);
      setTodo("");

    }
  };


  console.log(todos);

  return <div className='App'>
    <span className='heading'>Taskify</span>
    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
    {/* {todos.map((t) => (
      <li>{t.todo}</li>
    ))} */}
    <TodoList/>
  </div>;
};

export default App;
