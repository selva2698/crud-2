import React, { useState, Fragment, useEffect } from "react";
import AddUserForm from "./adduser";
import EditUserForm from "./edituser";
import UserTable from "./usertable";
import Button from "@material-ui/core/Button";
const App = () => {
  const initialFormState = {
    id: null,
    name: "",
   
    avatar: ""
  };

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
function getUsers(){
  fetch("https://6130a7c78066ca0017fda9c1.mockapi.io/api/v1/userdata" ,{ 
    method:"GET",
  })
  .then((data)=> data.json())
  .then((users)=>setUsers(users));
}

useEffect(()=>{
  getUsers()
},[]);
  const addUser = (user) =>{
    console.log("create user");
    fetch("https://6130a7c78066ca0017fda9c1.mockapi.io/api/v1/userdata" ,{ 
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name: user.name,avatar:user.avatar})
    })
    .then((data)=> data.json())
    
    .then(()=>getUsers());
    setopen(false);
  }
  const deleteUser = (id) =>{
    fetch(`https://6130a7c78066ca0017fda9c1.mockapi.io/api/v1/userdata/${id}` ,{ 
      method:"DELETE",
    })
    .then((data)=> data.json())
    .then(user=>console.log(user))
    .then(()=>getUsers());
  }
  const updateUser = (id, user) =>{
    console.log("create user");
    fetch(`https://6130a7c78066ca0017fda9c1.mockapi.io/api/v1/userdata/${id}` ,{ 
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name: user.name,avatar:user.avatar})
    })
    .then((data)=> data.json())
    
    .then(()=>getUsers());
    setopen(false);
    setEditing(false);
  }
  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    });
  };
  const [open, setopen] = React.useState(false);
  const handleopen = () => {
    setopen(true);
  };
  return (
    <div className="container">
      <Button variant="outlined" onClick={handleopen}>
        add
      </Button>

      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              {open ? (
                <div>
                  <h2>Add user</h2>
                  <AddUserForm addUser={addUser} />
                </div>
              ) : (
                ""
              )}
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;