import React from 'react'
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types'
import config from './config'

class AddFolder extends React.Component {
    static contextType = NotefulContext;
    // constructor(props) {
    //     super(props)
        state = {
            title: {
                value: 'blank', 
                touched: false
            } 
        }
    //}

    updateName = (title) => {
        this.setState({
            title: {
                value: title, 
                touched: true
            }
        })
    }

    handleAddFolder = (e) => {
        e.preventDefault()
        const folder = {
            //id: Math.ceil(Math.random() * 100000).toString(),
            //title: e.target['title'].value
            title: this.state.title.value
        }
       
        const options = {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${config.API_TOKEN}`
            }
        }

        fetch(`${config.API_ENDPOINT}/add-folder`, options)
            .then(res => {
                if (!res.ok)
                return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then( data => {
                console.log(data)
                this.context.addFolder(data)
                //this.props.history.push('/')
            })
            .catch(error => {
                console.error({ error })
            })
    }

    validateTitle() {
        let title = this.state.title.value.trim()
        if ( title.length === 0 ) {
            return 'Enter a folder title'
        } else if ( title.length < 4 ) {
            return 'Enter a longer title'
        }
    }
    
    render() {
        const nameError = this.validateTitle()
        //console.log(this.context.addFolder)

        return ( 
            <div>
                <h2>Folder Form</h2>
                <br />
                <form onSubmit={(e)=> this.handleAddFolder(e)}>
                    <label htmlFor='title'>
                        Name
                    </label>
                    <input 
                        type='text' 
                        name='title' 
                        id='title'
                        onChange={(e)=> this.updateName(e.target.value)}
                        required
                    />
                     {this.state.title.touched && <ValidationError message={nameError} />}
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

AddFolder.propTypes = {
    title: PropTypes.string
}

export default AddFolder