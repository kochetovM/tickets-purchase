import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CardInput from './CardInput';

const UserName = "Joe Grown"

const Billing = (props) => {
  const {
    billingInfo: {
      price,
      count
    },
    cards,
    onCancelClick,
    addCard,
    deleteCard
  } = props

  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [showNewCardInputs, setShowNewCardInputs] = useState(false);
  const [showEditCardInputs, setShowEditCardInputs] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value)
  };

  const handleCardExpiryChange = (event) => {
    setExp(event.target.value);
  };

  const handleCardCVVChange = (event) => {
    setSecurityCode(event.target.value);
  };

  const handleAddCard = () => {
    const newCard = { cardNumber, exp, setSecurityCode }
    addCard(newCard)
    setCardNumber('')
    setExp('')
    setSecurityCode('')
    setShowNewCardInputs(false)
    setShowEditCardInputs(false)
  };

  const cancelAddCard = () => {
    setCardNumber('')
    setExp('')
    setSecurityCode('')
    setShowNewCardInputs(false)
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteCard = (cardToDelete) => {
    deleteCard(cardToDelete)
    if (selectedCard === cardToDelete) {
      setSelectedCard(null);
    }
  };

  const handleCardEdit = (card) => {
    setSelectedCard(null);
    setCardNumber(card.cardNumber);
    setExp(card.exp);
    deleteCard(card)
    setShowEditCardInputs(true);
  };

  const calculateSubtotal = () => {
    return price * count;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateFees();
  };

  const calculateFees = () => {
    return calculateSubtotal() * 0.1;
  };

  return (
    <div className="row bill-container">
      <div className="col-md-7 payment-container">
        <h3>Payment</h3>
        <h5>Use Credit/Debit Card</h5>
        <div>
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${
                card === selectedCard ? 'selected' : ''
              }`}
              onClick={() => handleCardSelect(card)}
            >
              <div className="row">
                <div className="col-sm-10">
                  <div className="card-details">
                    <span className="card-number">
                      **** **** **** {card.cardNumber.slice(-4)}
                    </span>
                    <div className="card-exp">
                      <p>
                        {UserName} | exp. {card.exp}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span
                      className="edit-card-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCardEdit(card)
                      }}
                    >
                      Edit
                    </span>
                    <span>|</span>
                    <span
                      className="delete-card-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCard(card)
                      }}
                    >
                      Delete
                    </span>
                  </div>
                </div>
                <div className="col-sm-2">
                  {card === selectedCard &&
                    <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#070750",}}/>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showNewCardInputs && !showEditCardInputs && (
          <button className="add-card-btn" onClick={() => setShowNewCardInputs(true)}>
            Add New Card
          </button>
        )}

        {(showNewCardInputs || showEditCardInputs) && (
          <div className="card">
            <CardInput
              cardNumber={cardNumber}
              exp={exp}
              securityCode={securityCode}
              handleCardNumberChange={handleCardNumberChange}
              handleCardCVVChange={handleCardCVVChange}
              handleCardExpiryChange={handleCardExpiryChange}
              handleAddCard={handleAddCard}
              cancelAddCard={cancelAddCard}
              showNewCardInputs={showNewCardInputs}
            />
          </div>
        )}
      </div>

      <div className="summary-container col-md-4">
        <div className="total">
          <span>Total</span>
          <span className="price">${calculateTotal()}</span>
        </div>

        <div className="ticket-bill-subtitle">
          <span>Tickets</span>
        </div>
        <div>
          <span>
            Resale Tickets: ${price} x {count}
          </span>
          <span className="price">${calculateSubtotal()}</span>
        </div>

        <div className="ticket-bill-subtitle">
          <span>Fees</span>
        </div>
        <div>
          <span>
            Service Fee: ${price * 0.1} x {count}
          </span>
          <span className="price">${calculateFees()}</span>
        </div>

        <div className="ticket-bill-subtitle">
          <span>Delivery</span>
        </div>
        <div className="delivery-subtitle">
          <span>Mobile Entry</span>
          <span className="price">Free</span>
        </div>

        <span
          className="cancel-order-btn"
          onClick={onCancelClick}
        >
          Cancel Order
        </span>

        <div className="ticket-bill-subtitle">
          <span>*All Sales Final - No Refunds</span>
        </div>

        <div>
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={agreeTerms}
            onChange={() => setAgreeTerms((prev)=>!prev)}
          />
          <label className="label-agree-term">
            I read and agree to terms of Use
          </label>
        </div>
        <button
          className="btn btn-outline-info btn-block place-order-btn"
          disabled={selectedCard===null || !agreeTerms}
        >
          Place Order
        </button>

      </div>
    </div>
  );
};

export default Billing;
