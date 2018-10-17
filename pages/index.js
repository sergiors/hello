import fetch from 'isomorphic-unfetch'
import throttle from 'lodash/throttle'
import { compose, withHandlers, withState, withProps, lifecycle } from 'recompose'

const Examples = ({ examples, onChange }) => (
  <div>
    <div>
      Type word that you would like to see examples <input type="text" onChange={onChange} />
    </div>
    <ul>
      {examples.map(example => <li key={example}>{example}</li>)}
    </ul>
  </div>
)

const states = compose(
  withState('value', 'updateValue', ''),
  withState('examples', 'updateExamples', [])
)

const handlers = withHandlers({
  onChange: props => event => {
      event.preventDefault()
      props.updateValue(event.target.value)
      
      fetch(`http://sergiors.herokuapp.com/examples?q=${event.target.value}`)
        .then(res => res.json())
        .then(data => props.updateExamples(data))
  }
})

export default compose(
  states,
  handlers
)(Examples)