import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import NotefulContext from './NotefulContext'
import config from './config'

class Note extends React.Component { 
        static defaultProps = {
            onDeleteNote: ()=>{}
          }
    
    static contextType = NotefulContext;

    handleDeleteButton = (e) => {
        //e.preventDefault()
        const noteId = this.props.id

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            })
            .then(res => {
                if (!res.ok)
                return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(this.props.onDeleteNote(noteId))
            .then(this.context.deleteNote(noteId))
            
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        return (
            <div className='note'>
                <h3>
                    <Link to={`/notes/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h3>
                <button className='deleteButton'
                    type='button'
                    onClick={()=> this.handleDeleteButton()}
                >  
                    DELETE
                </button>
            </div>
        )
    }
}

Note.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onDeleteNote: PropTypes.func.isRequired
}

export default Note