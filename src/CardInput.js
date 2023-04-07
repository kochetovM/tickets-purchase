import { useState } from 'react';

const CardInput = (props) => {
  const {
    cardNumber,
    exp,
    securityCode,
    handleCardCVVChange,
    handleCardExpiryChange,
    handleCardNumberChange,
    handleAddCard,
    cancelAddCard,
    showNewCardInputs
  } = props

  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Regex patterns for validation
    const cardNumberPattern = /^(?:\d{4}-){3}\d{4}$/
    const cardExpiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    const cardCVVPattern = /^[0-9]{3}$/

    // Validate card number
    if (!cardNumberPattern.test(cardNumber)) {
      setError('Invalid card number')
      return
    }

    // Validate expiry date
    if (!cardExpiryPattern.test(exp)) {
      setError('Invalid expiry date')
      return
    }

    // Validate CVV
    if (!cardCVVPattern.test(securityCode)) {
      setError('Invalid CVV')
      return
    }

    setError('')
    handleAddCard()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-inputs">
        <label>Card Number:</label>
        <input
          className="card-input"
          type="text"
          id="card-number"
          name="card-number"
          placeholder="  xxxx-xxxx-xxxx-xxxx  "
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
      </div>

      <label htmlFor="card-expiry">Expiry Date:</label>
      <input
        className="card-input-exp"
        type="text"
        id="card-expiry"
        name="card-expiry"
        placeholder="MM/YY"
        value={exp}
        onChange={handleCardExpiryChange}
      />

      <label htmlFor="card-cvv">CVV:</label>
      <input
        className="card-input-sec"
        type="text"
        id="card-cvv"
        name="card-cvv"
        placeholder="xxx "
        value={securityCode}
        onChange={handleCardCVVChange}
      />

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <div>
        <button type="submit" className="add-card-btn">
          Save Card
        </button>
        {showNewCardInputs && (
          <button onClick={cancelAddCard}>
            Cancel
          </button >
        )}
      </div>
    </form>
  );
}

export default CardInput;