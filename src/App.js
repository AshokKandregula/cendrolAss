import {Component} from 'react'
import ReactLoading from 'react-loading'
import DialogueBox from './DailogueBox'
import './App.css'

class App extends Component {
  state = {data: [], value1: '', result: false, isLoading1: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/categories')
    const data = await response.json()
    this.setState({data})
    this.setState({isLoading1: false})
  }

  buttonClick = each => {
    this.setState({value1: each})
    this.setState({result: true})
  }

  render() {
    const {data, value1, result, isLoading1} = this.state

    return (
      <div className="mainCon">
        <h1 className="margin anim text-green">Chunk Norries</h1>
        {isLoading1 ? (
          <div className="load">
            <ReactLoading
              type="spin"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </div>
        ) : (
          <ul className="unorder">
            {data.map(each => (
              <li className="list1" key={each}>
                <button
                  className="listItem"
                  type="button"
                  onClick={() => this.buttonClick(each)}
                >
                  <div>
                    <h1 className="h12">{each}</h1>
                    <p className="p1">Unlimited Jokes On {each}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {result && <DialogueBox value1={value1} result={result} />}
      </div>
    )
  }
}

export default App
