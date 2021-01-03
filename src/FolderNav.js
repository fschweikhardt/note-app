import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import { countNotesForFolder } from './note-helpers'

class FolderNav extends React.Component {
    static contextType = NotefulContext;

    render() {
        //const folders = this.context.folders
        //console.log(this.context.folders)
        
        // const noteNum = this.context.folders && countNotesForFolder(this.context.notes, folder.id)
    return (
        <div className='sidebar'>
            <h2>Folders</h2>
            <ul>
                {this.context.folders.map( folder => {
                    return (
                        <li key={folder.id} >
                            <Link to={`/folder/${folder.id}`}>
                            {folder.title}
                            <br />
                            <p>Number of notes:</p>{countNotesForFolder(this.context.notes, folder.id)}
                            <br />
                            </Link>
                        </li>
            )
        })}
            </ul>
            <button
                className='addButton'
                >
                    <Link to='/add-folder'>
                        ADD FOLDER
                    </Link>
                
            </button>
        </div>
    )
}
}

export default FolderNav