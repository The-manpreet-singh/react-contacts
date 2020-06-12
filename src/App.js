import React, { Component } from 'react';

import ListContacts from './ListContacts';

import * as ContactsAPI from './utils/ContactsAPI';

import AddContact from './AddContact';


class app extends Component {
  
  state= {
    contacts : [
      // {
      //   "id": "karen",
      //   "name": "Karen Isgrigg",
      //   "handle": "karen_isgrigg",
      //   "avatarURL": "http://localhost:5001/karen.jpg"
      // },
      // {
      //   "id": "richard",
      //   "name": "Richard Kalehoff",
      //   "handle": "richardkalehoff",
      //   "avatarURL": "http://localhost:5001/richard.jpg"
      // },
      // {
      //   "id": "tyler",
      //   "name": "Tyler McGinnis",
      //   "handle": "tylermcginnis",
      //   "avatarURL": "http://localhost:5001/tyler.jpg"
      // }
     ],
     screen: 'list'
  }

  componentDidMount() {
    ContactsAPI.getAll()
     .then( (contacts)=> {
       this.setState( ()=> ({
         contacts
       }) )
     } )
  }

  removeHanlder = (contact)=> {
     this.setState( (currentState)=> ({
         contacts: currentState.contacts.filter( (item)=>{
           return item.id !== contact.id
         })
     }) )

     ContactsAPI.remove(contact)
  }

  render(){
   return (
    <div>
      {this.state.screen === 'list' && (
          <ListContacts 
          contacts={this.state.contacts}
          deleteHandler={this.removeHanlder}
          onNavigate = { ()=> {
             this.setState( ()=> ({
               screen: 'Add'
             }) )
          } } />
      ) }

     {this.state.screen === 'Add' && (
      <AddContact /> 
      ) }
        
    </div>
  );
}
}

export default app;
