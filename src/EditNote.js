import React from 'react'
import NotefulContext from './NotefulContext'
//import PropTypes from 'prop-types'
//import ValidationError from './ValidationError'
import config from './config'

class EditNote extends React.Component {
    static contextType = NotefulContext;
        
    state = {
        note_name: '',
        content: '',
        folderid: ''
    }

    componentDidMount() { 
        const { noteId } = this.props.match.params
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
        }
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, options)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(responseData => {
                this.setState({
                  note_name: responseData.note_name,
                  content: responseData.content,
                  folderid: responseData.folderid,
                })
              })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }


    updateName = (event) => {
        this.setState({
            note_name: event.target.value
        })
    }

    updateContent = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    // componentDidMount() {
    //     const { noteId } = this.props.match.params
    //     //console.log(parseInt(noteId))
    //     let note = this.context.notes.find(note => note.id === parseInt(noteId)) 
    //     let name = note.note_name
    //     let content = note.content
    //     this.setState({
    //         name: {
    //             value: name
    //         },
    //         content: {
    //             value: content
    //         },
    //         folderid: note.folderid
    //     })

    //  }

    handleEditNote = (e) => {
        e.preventDefault()
        const { noteId } = this.props.match.params
        
        const note = {
            note_name: this.state.note_name, 
            content: this.state.content,
            modified: new Date(),
            folderid: this.state.folderid,
            id: parseInt(noteId)
        }
       
        const options = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            },
            body: JSON.stringify(note),
        }

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, options)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(this.context.editNote(note))
            .then(this.props.history.push('/'))
            .catch(error => {
                console.error({ error })
            })
    }

    // validateName() {
    //     let name = this.state.name.value
    //     if ( name.length === 0 ) {
    //         return "Enter a name"
    //     } else if ( name.length < 4 ) {
    //         return "Enter a longer name"
    //     }
    // }

    // validateContent() {
    //     let content = this.state.content.value
    //     if ( content.length === 0 ) {
    //         return "Enter content"
    //     } else if ( content.length < 4 ) {
    //         return "Enter more content"
    //     }
    // }
        
    render() {
        //const nameError = this.validateName()
        //const contentError = this.validateContent()

        // const newFolder = this.context.folders.map( (folder, idx) => {
        //     return (
        //         <option value={folder.id} key={idx}>
        //             {folder.title}
        //         </option>
        //     )
        // })
        
        const { note_name, content } = this.state
        console.log(note_name)
        return ( 
            <div>
                <h2>Note Form</h2>
                <br />
                <form onSubmit={this.handleEditNote}>
                    {/* <label htmlFor='folderid'>
                        Choose an existing folder:
                    </label>
                    <select 
                        name='folderid' 
                        id='folderid'
                    >
                        {newFolder}
                    </select> */}
                    <br />
                    <label htmlFor='note_name'>
                        Name
                    </label>
                    <input 
                        type='text' 
                        name='note_name' 
                        id='note_name'
                        value={note_name}
                        placeholder={note_name}
                        onChange={this.updateName}   
                    />
                    {/* {this.state.name.touched && <ValidationError message={nameError} />} */}
                    <br />
                    <label htmlFor='content'>
                        Content
                    </label>
                    <input 
                        type='text' 
                        name='content' 
                        id='content'
                        value={content}
                        placeholder={content}
                        onChange={this.updateContent} 
                    />
                    {/* {this.state.name.touched && <ValidationError message={contentError} />} */}
                    <br />
                    <button
                        type='submit'
                    >
                        SUBMIT
                    </button>
                </form>
                
            </div>
        )
    }
}

// AddNote.propTypes = {
//     name: PropTypes.string,
//     content: PropTypes.string
// }

export default EditNote