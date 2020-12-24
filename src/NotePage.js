import React from 'react'
import Note from './Note';
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types'

class NotePage extends React.Component {
    static defaultProps = {
        match : { 
            params: {}
        }
    }

    static contextType = NotefulContext;

    handleDeleteNote = (noteId) => {
        this.props.history.push(`/`)
      }

    render() {

        const noteId = this.props.match.params.noteId
        const findNote = this.context.notes.find( note => noteId === note.id)

        console.log("NotePage", this.context.notes[0].id, findNote, noteId)
        return (
            <div className='notepage'>
                <h2>
                    Note Page Component
                </h2>
                <Note
                    id={findNote.id}
                    name={findNote.note_name}
                    modified={findNote.modified}
                    content={findNote.content}
                    onDeleteNote={this.handleDeleteNote}
                />
                <p>{findNote.content}</p>
                {/* <Note /> */}
            </div>
        )
    }
}

NotePage.propTypes = {
    history: PropTypes.object.isRequired, 
    match: PropTypes.shape({
        params: PropTypes.shape({
            noteId: PropTypes.string
        })
    })
}

export default NotePage