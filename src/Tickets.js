import React, { useState } from 'react';

function Tickets(props) {
  const [data, setData] = useState([
    { id: 1, name: "Show 1", date: "04/06/2023", price: 50, count: 1 },
    { id: 2, name: "Show 2", date: "04/07/2023", price: 75, count: 1 },
    { id: 3, name: "Show 3", date: "04/08/2023", price: 100, count: 1 },
    { id: 4, name: "Show 4", date: "04/09/2023", price: 120, count: 1 },
    { id: 5, name: "Show 5", date: "04/10/2023", price: 90, count: 1 }
  ]);

  const onCountChange = (id, isIncrement) => {
    const copyData = [ ...data]
    if (isIncrement) {
      copyData?.forEach((ticket) => {
        if (ticket.id === id) ticket.count += 1
      })
    } else {
      copyData?.forEach((ticket) => {
        if (ticket.id === id && ticket.count!==1) ticket.count -= 1
      })
    }

    setData([...copyData])
  };


  return (
    <div className="container bill-container">
      <h2>Upcoming Shows</h2>
      <ul>
        {data.map((show) => (
          <li
            key={show.id}

          >
            <div className="ticket-row">
              <span className="ticket-title">
                {show.name} - {show.date}  |  ${show.price}  | tickets: {show.count}
              </span>
              <button
                className="btn btn-secondary"
                onClick={() => onCountChange(show.id, true)}
              >
                +
              </button>
              <button
                className="btn btn-secondary btn-count"
                onClick={() => onCountChange(show.id, false)}
              >
                -
              </button>

              <button
                onClick={() => props.onBuyClick(show)}
                className="btn btn-primary buy-btn"
              >
                Buy
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Tickets;