import { useState, useEffect } from 'react'

import '../style/index.scss'

const Cards = () => {
    const api = 'http://localhost:5000'

    const [cards, setCards] = useState([])
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        fetch(`${api}/cards`)
            .then(res => res.json())
            .then(data => setCards(data))
    }, [])
  
    const cardEffect = document.querySelectorAll(".card")
    cardEffect.forEach(card => {
        card.addEventListener("click", () => {
            card.style.boxShadow = "0 0 3rem #FF0000, 0 0 5px #0000FF";
        })
        card.addEventListener("mouseover", () => {
            card.style.backgroundColor = "white";
        })
        card.addEventListener("mouseout", () => {
            card.style.boxShadow = '0 0 5px #239c21';
            card.style.backgroundColor = "transparent";
        })
    })

    const createNewCard = () => {
        const newCard = { id: Date.now(), title: title, text: text }
        setCards([...cards, newCard])
        setTitle("")
        setText("")
    }

    const deleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id))
        console.log(cards)
    }

    const cut = title => {
        if (title.length > 30) {
            return title.slice(0, 30) + '...'
        } else {
            return title
        }
    }

    return (
        <div className='container'>
            <div className='cardCreate'>
                <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" placeholder='Text' value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={createNewCard} className='addButton'>ADD CARD</button>
            </div>
            <div className='cards'>
                {cards.map(card => (
                    <div key={card.id} className="card"  >
                        <h2 className='title'>{cut(card.title)}</h2>
                        <p>{card.text}</p>
                        <button onClick={() => deleteCard(card.id)} className='bottonDelete'>DEL</button>
                    </div>
                ))}
            </div>
        </div>

    )

}

export default Cards
