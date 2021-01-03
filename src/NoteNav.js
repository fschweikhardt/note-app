import React from 'react' 
import NotefulContext from './NotefulContext'
import {findNote, findFolder} from './note-helpers'
//import PropTypes from 'prop-types'

class NoteNav extends React.Component {
    // static defaultProps = {
    //     history: {
    //         goBack: () => {}
    //     },
    //     match: {
    //         params: {}
    //     }
    // }
    static contextType = NotefulContext;

    render() {

        // const findFolder = (folders=[], folderId) =>
        // folders.find(folder => folder.id == folderId)

        // const findNote = (notes=[], noteId) =>
        // notes.find(note => note.id == noteId)

        // const { notes, folders, } = this.context
        // const { noteId } = this.props.match.params
        // const note = findNote(notes, noteId)
        // const folder = findFolder(folders, note.folderId)

        //console.log('folders', this.context.folders)
        //console.log('notes', this.context.notes)


        //use below--------------------------------------------->


        // const { noteId } = this.props.match.params
        // const note = this.context.notes.find(note => note.id === parseInt(noteId))
        // const noteFolder = note.folderid
        // console.log(noteFolder)
        // const folderName = this.context.folders.find( folder => folder.id === parseInt(noteFolder))
        // console.log(folderName.title)


        //---------------------------> with helpers below

        const { noteId } = this.props.match.params
        const note = findNote(this.context.notes, noteId)
        console.log(note)
        const folder = findFolder(this.context.folders, note.folderid)
        console.log(folder)

        return (
            <div className='sidebar'>
                <h2>Note Sidebar</h2>
                <br />
                <button
                    onClick={this.props.history.goBack}
                >
                    GO BACK
                </button>
                <br />
                <br />
                
                <p>Your current folder is:</p>
                
                {folder &&
                <>
                    <h3>
                        {folder.title}
                    </h3>
                </>
                }
            </div>
        )
    }
}

// NoteNav.propTypes = {
//     match: PropTypes.shape({
//         params: PropTypes.object.isRequired
//     }), 
//     history: PropTypes.object.isRequired
// }


export default NoteNav