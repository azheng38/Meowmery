import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/images/blue.png", matched: false },
  { "src": "/images/green.png", matched: false },
  { "src": "/images/pink.png", matched: false },
  { "src": "/images/purple.png", matched: false },
  { "src": "/images/red.png", matched: false },
  { "src": "/images/white.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const[firstCard, setChoiceOne] = useState(null)
  const[secondCard, setChoiceTwo] = useState(null)

  const[disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setCards(shuffledCards);
      setTurns(0);
  }

  // handle choice
  const handleChoice = (card) => {
    firstCard ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare choices -- we use useEffect and cardOne + cardTwo as the dependecies
  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true); // when you have two cards selected... you want to be unable to flip other cards :)
      if (firstCard.src === secondCard.src) {
        // cards match
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstCard.src)
              return {...card, matched: true};
            else
              return card;

          })
        })
        resetChoices(); 
      }
      else {
        setTimeout(() => resetChoices(), 1000); // cards do not match
        // the timer is meant to wait 1 second and then call resetChoices
      }
    }
  }, [firstCard, secondCard])

  console.log(cards);

  // reset choices
  const resetChoices = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1) // so I guess you can always access the previous number w/ useState stuff

    setDisabled(false)
  }

  console.log(cards, turns);
  return (
    <div className="App">
      <h1>Meowmery</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card===firstCard || card===secondCard || card.matched}
            disabled={disabled}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );

  
}

export default App;
