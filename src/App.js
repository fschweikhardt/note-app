import React from 'react'
import { Route, Switch } from 'react-router-dom'
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
import NotefulError from './NotefulError'

class App extends React.Component {
  state = {
    folders: [],
    notes: []
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
    fetch('http://localhost:9000/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer 123456789`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setNotes)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleDeleteNote = (noteId) => {
    const filteredNotes = this.state.notes.filter( notes => notes.id !== noteId)
    this.setState({
      notes: filteredNotes
    })
  }

  handleAddFolder = (folder) => {
    console.log('add folder on App', folder)
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  // handleAddNote = (note) => {
    
  // }
  
  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote, 
      addFolder: this.handleAddFolder,
      //addNote: this.handleAddNote
      }
    
    //console.log(this.state.folders)

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
                    path={['/add-folder', '/add-note']}
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
