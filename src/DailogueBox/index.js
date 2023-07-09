import {Component} from 'react'
import Modal from 'react-modal'
import {FaTimes} from 'react-icons/fa'
import ReactLoading from 'react-loading'

import './index.css'

Modal.setAppElement(document.getElementById('root'))

class DialogueBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: true,
      joke: '',
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {value1} = this.props
    this.setState({isLoading: true})

    const response = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${value1}`,
    )
    const jsonData = await response.json()
    this.setState({joke: jsonData.value})
    console.log(jsonData.value)
    console.log(value1)
    this.setState({isLoading: false})
  }

  openDialogue = () => {
    this.setState({isOpen: true})
  }

  closeDialogue = () => {
    this.setState({isOpen: false})
  }

  render() {
    const {isOpen, joke, isLoading} = this.state

    const {value1} = this.props
    return (
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={this.closeDialogue}
          contentLabel="Dialogue Box"
          className="modalCon"
        >
          <button
            className="button1"
            type="button"
            onClick={this.closeDialogue}
          >
            <FaTimes />
          </button>
          {isLoading ? (
            <div className="load">
              <ReactLoading
                type="spin"
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
          ) : (
            <div className="content">
              <h2>{value1}</h2>
              <h2>{joke}</h2>
            </div>
          )}

          <button onClick={this.fetchData} className="but1" type="button">
            Next Joke
          </button>
        </Modal>
      </div>
    )
  }
}

export default DialogueBox
