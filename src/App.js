import React from 'react'
import { Route, Switch } from 'react-router-dom'
import config from './config'
import './App.css';
import Header from './Header'
import FolderNav from './FolderNav'
import NoteNav from './NoteNav'
import AddNav from './AddNav'
import NotefulContext from './NotefulContext'
import NoteList from './NoteList'
import NotePage from './NotePage'
import AddFolder from './AddFolder'
import AddNote from './AddNote'
import EditNote from './EditNote'
import NotefulError from './NotefulError'

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  } 

  setFolders = folders => {
    this.setState({
      folders
    })
  }

  setNotes = notes => {
    this.setState({
      notes
    })
  }

  componentDidMount() {
    const fetchFolders = 
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_TOKEN}`
      }
    })
    const fetchNotes = 
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_TOKEN}`
      }
    })

    Promise
      .all([ fetchFolders, fetchNotes ])
      .then( ([ foldersRes, notesRes ]) => {
        if (!foldersRes.ok) {
          return foldersRes.json().then(error => Promise.reject(error))
        }
        if (!notesRes.ok) {
          return notesRes.json().then(error => Promise.reject(error))
        }  
        return Promise.all([foldersRes.json(), notesRes.json()]);
      })
      .then( ([folders, notes]) => {
        this.setState({folders, notes});
    })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      }) 
}

  handleDeleteNote = noteId => {
    console.log('delete note on app.js', noteId)
    const filteredNotes = this.state.notes.filter( notes => notes.id !== noteId)
    this.setState({
      notes: filteredNotes
    })
  }

  handleAddFolder = folder => {
    console.log('add folder on App.js', folder)
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    console.log('added note on App.js', note)
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  handleEditNote = updatedNote => {
    console.log('edit note on App.js', updatedNote)
    let notesEdited = this.state.notes.filter( n => n.id !== updatedNote.id)
    this.setState({
      notes: [...notesEdited, updatedNote]
    })
  }

  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote, 
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote, 
      editNote: this.handleEditNote
      }

    console.log('state: folders', this.state.folders)
    console.log('state: notes', this.state.notes)

    return (
      <NotefulContext.Provider value={value}>
        <div className='App'>
          <header>
            <Header />
          </header>
          <hr />
          <div className='group'>
            <nav>
              <Switch>
                <NotefulError>
                  <Route 
                      exact path='/'
                      component={FolderNav}
                  /> 
                  <Route 
                      path='/folder/:folderId'
                      component={FolderNav}
                    />
                  <Route 
                    path='/notes/:noteId'
                    component={NoteNav}
                  />
                  <Route
                    path={['/add-folder', '/add-note', '/edit/:noteId']}
                    component={AddNav}
                  />
                </NotefulError>
              </Switch>
            </nav>
            <hr />
            <main>
              <Switch>
                <NotefulError>
                  <Route 
                    exact path='/' 
                    component={NoteList} 
                  />
                  <Route 
                    path='/folder/:folderId'
                    component={NoteList}
                  />
                  <Route 
                    path='/notes/:noteId'
                    component={NotePage}
                  />
                  <Route 
                    path='/add-folder'
                    component={AddFolder}
                  />
                  <Route 
                    path='/add-note'
                    component={AddNote}
                  />
                  <Route
                    path='/edit/:noteId'
                    component={EditNote}
                  />
                </NotefulError>
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    )
  }
}

export default App;
