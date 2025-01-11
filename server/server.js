import cors from 'cors'
import express from 'express'

import { client } from './database.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    try {
        res.send('Server is running')
    } catch (error) {
        console.error(error)
    }
 }    
)

app.get('/cards', async (req, res) => {
    try {
        const cards = await client.query('SELECT * FROM cards')        
        res.send(cards.rows)
    } catch (error) {
        console.error(error)
    }
 }    
)

app.post('/cards', async (req, res) => {
    try {
        const { title, text } = req.body
        const newCard = await client.query('INSERT INTO cards (title, text) VALUES ($1, $2) RETURNING *', [title, text])
        res.send(newCard.rows[0])
    } catch (error) {
        console.error(error)
    }
 }    
)

app.put('/cards/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, text } = req.body
        const updatedCard = await client.query('UPDATE cards SET title = $1, text = $2 WHERE id = $3 RETURNING *', [title, text, id])
        res.send(updatedCard.rows[0])
    } catch (error) {
        console.error(error)
    }
 }
)


app.delete('/cards/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedCard = await client.query('DELETE FROM cards WHERE id = $1 RETURNING *', [id])
        res.send(deletedCard.rows[0])
    } catch (error) {
        console.error(error)
    }
 }
)

app.listen(5000, () => {
    try {
        console.log('Server is running on port 5000')
    } catch (error) {
        console.error(error)
    }
 }    
)
