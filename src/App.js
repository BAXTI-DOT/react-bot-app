import { useEffect, useState } from "react";

const App = () => {
  const [ requests, setRequests ] = useState([])
  const [ state, setState ] = useState(0)

  useEffect(() => {
    fetch('https://bot-n37.herokuapp.com/requests')
    .then(res => res.json())
    .then(data => setRequests(data))
  }, [requests])

  const handleSubmit = e => {
    const { name, price, description } = e.target

    e.preventDefault();
    fetch('https://bot-n37.herokuapp.com/newCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          price: price.value,
          description: description.value,
        })
      }
    )
    .then(res => res.json())
    .then(data => setState(state + 1))
  }

  return (<>
    <form onSubmit={handleSubmit}>
      <input type={"text"} placeholder="name" name="name" />
      <input type={"text"} placeholder="price" name="price" />
      <input type={"text"} placeholder="desc" name="description" />
      <button type="submit">Send</button>
    </form>
    <ul>
      {
        requests && requests.map((e, i) => (
          <li key={i}>
            <h5>{e.name}</h5>
            <h5>{e.course}</h5>
            <a href={`tel:${e.contact}`}>{e.contact}</a>
          </li>
        ))
      }
    </ul>
  </>)
}

export default App;