import React from 'react'
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types'
import ValidationError from './ValidationError'
import config from './config'

class AddNote extends React.Component {
    static contextType = NotefulContext;
    // constructor(props) {
    //     super(props)
        state = {
            name: {
                value: '', 
                touched: false
            },
            content: {
                value: '', 
                touched: false
            }
        }
    //}

    updateName(name) {
        this.setState({
            name: {
                value: name, 
                touched: true
            }
        })
    }

    updateContent(content) {
        this.setState({
            content: {
                value: content, 
                touched: true
            }
        })
    }

    handleAddNote = (e) => {
        e.preventDefault()
        
        const note = {
            note_name: this.state.name.value, 
            content: this.state.content.value,
            modified: new Date(document.lastModified),
            folderid: e.target['folderid'].value,
        }
       
        const options = {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            }
        }

        fetch(config.API_ENDPOINT_ADDNOTE, options)
            .then(res => {
                if (!res.ok)
                return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then( data => {
                this.context.addNote(data)
            })
            .then(this.props.history.push(`/`))
            .catch(error => {
                console.error({ error })
            })
    }

    validateName() {
        let name = this.state.name.value
        if ( name.length === 0 ) {
            return "Enter a name"
        } else if ( name.length < 4 ) {
            return "Enter a longer name"
        }
    }

    validateContent() {
        let content = this.state.content.value
        if ( content.length === 0 ) {
            return "Enter content"
        } else if ( content.length < 4 ) {
            return "Enter more content"
        }
    }
        
    render() {
        const nameError = this.validateName()
        const contentError = this.validateContent()

        const newFolder = this.context.folders.map( (folder, idx) => {
            return (
                <option value={folder.id} key={idx}>
                    {folder.title}
                </option>
            )
        })

        return ( 
            <div>
                <h2>Note Form</h2>
                <br />
                <form onSubmit={(e)=> this.handleAddNote(e)}>
                    <label htmlFor='folderid'>
                        Choose an existing folder:
                    </label>
                    <select 
                        name='folderid' 
                        id='folderid'
                    >
                        {newFolder}
                    </select>
                    <br />
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name'
                        onChange={(e)=>this.updateName(e.target.value)}
                        required
                    />
                    {this.state.name.touched && <ValidationError message={nameError} />}
                    <br />
                    <label htmlFor='content'>
                        Content
                    </label>
                    <input 
                        type='text' 
                        name='content' 
                        id='content'
                        onChange={(e)=>this.updateContent(e.target.value)}
                        required
                    />
                    {this.state.name.touched && <ValidationError message={contentError} />}
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

AddNote.propTypes = {
    name: PropTypes.string,
    content: PropTypes.string
}

export default AddNote