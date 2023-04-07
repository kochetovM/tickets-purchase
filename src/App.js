import './App.css';
import Tickets from "./Tickets";
import {useState} from "react";
import Billing from "./Billing";

function App() {
  const [billingInfo, setBillingInfo] = useState({
    goBilling: false,
    price: 0,
    count: 0
  })
  const [cards, setCards] = useState([]);

  const onBuyClick = (show) => {
    setBillingInfo({
      goBilling: true,
      price: show.price,
      count: show.count
    })
  }
  const onCancelClick = () => {
    setBillingInfo({
      goBilling: false
    })
  }

  const addCard = (newCard) => {
    setCards([...cards, newCard])
  }

  const deleteCard = (cardToDelete) => {
    setCards(cards.filter((card) => card !== cardToDelete));
  };

  return (
    <div>
      {!billingInfo.goBilling ? (
        <Tickets onBuyClick={onBuyClick}/>
      ) : (
        <Billing
          billingInfo={billingInfo}
          onCancelClick={onCancelClick}
          cards={cards}
          addCard={addCard}
          deleteCard={deleteCard}
        />
      )}
    </div>
  );
}

export default App;
