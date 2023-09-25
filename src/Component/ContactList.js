import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import './contactList.css';

// define the api endpoint url
const URL = "https://jsonplaceholder.typicode.com/users";

function ContactList() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [contacts, setContact] = useState([]);
  const [updateContact, setUpdateContact] = useState(-1);

  //
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setContact(response.data);
      })
      .catch((Error) => {
        console.error("Error in loading data", Error);
      });
  }, []);

  // handling New contact
  const handleContact = (e) => {
    e.preventDefault();
    console.log("handle contact");
    console.log(name, phone);
    setContact([...contacts, { name, phone }]);
  };
  
  //Delete contact using id
  const deleteContact = (i) => {
    setContact(contacts.filter((contact, index) => i !== index));
  };

  // Edit contact list
  const handleEdit = (id) => {
    setUpdateContact(id);
  };

  const Edit = ({ current, contacts, setContact }) => {
    const handleInput = (e) => {
      const newContact = contacts.map((li) =>
        li.id === current.id ? { ...li, [e.target.name]: e.target.value } : li
      );
      setContact(newContact);
    };

    return (
      <tr>
        <td>
          <input
            onChange={handleInput}
            type="text"
            name="name"
            value={current.name}
          />
        </td>
        <td>
          <input
            onChange={handleInput}
            type="text"
            name="phone"
            value={current.phone}
          />
        </td>
        <td>
          <button type="submit">Update</button>
        </td>
      </tr>
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateContact(-1);
  };
  return (
    < div className="Container" >
    <div>
      <form onSubmit={handleUpdate}>
        <h2>ContactList</h2>
        <table>
          <tr>
            <th>
              <strong>Name : </strong>
            </th>
            <th>
              <strong>Phone : </strong>
            </th>
            <th>
              <strong>Button</strong>
            </th>
          </tr>
          {contacts.map((contact, i) =>
            updateContact === contact.id ? (
              <Edit
                current={contact}
                contacts={contacts}
                setContact={setContact}
              />
            ) : (
              <tr>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>

                <td>
                  <button onClick={() => handleEdit(contact.id)}>Edit</button>
                  <button onClick={() => deleteContact(i)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </table>
      </form>
      </div>
      <div >
      
      <form  className="NewContact" onSubmit={handleContact}>
      <h3>NewContact</h3>
        <label htmlFor="">Name  </label>
        <input
          value={contacts.name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <br />
        <label htmlFor="">Phone  </label>
        <input
          value={contacts.phone}
          onChange={(e) => setPhone(e.target.value)}
          type="number"
        />
        <br />
        <button type="submit">Save</button>
      </form>
      </div>
    </div>
  );
}

export default ContactList;
