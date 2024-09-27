import React, { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = () => {
    let error='';
    if(firstName==='')
      error+='first name is required!!';

    if(lastName==='')
      error+='last name is required!!';

    if(age<='')
      error+='Age is required!!';

    if(error===''){

    
    const newData = {
      id: EmployeeData.length + 1,
      firstName,
      lastName,
      age,
    };
    setData([...data, newData]);
    handleClear();
  }
  else{
    alert(error)
  }
  };

  const handleUpdate = () => {
    const dt = data.find((item) => item.id === id);
    if (dt) {
      const index = data.findIndex((item) => item.id === id);
      data[index].firstName = firstName;
      data[index].lastName = lastName;
      data[index].age = age;
      setData([...data]);
      handleClear();
    }
  };

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <div>
          <label>First Name: 
            <input type='text' placeholder='Enter First name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label>Last Name: 
            <input type='text' placeholder='Enter Last name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label>Age: 
            <input type='number' placeholder='Enter Age' onChange={(e) => setAge(e.target.valueAsNumber)} value={age} />
          </label>
          <div>
            {!isUpdate ? (
              <button className='btn btn-primary' onClick={handleSave}>Save</button>
            ) : (
              <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
            )}
            <button className='btn btn-danger' onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;