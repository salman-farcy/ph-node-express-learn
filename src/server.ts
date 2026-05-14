
import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"

const app : Application = express()
const port = 5000

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}))
  
const pool = new Pool({
  connectionString : "postgresql://neondb_owner:npg_UnQL8VHISq5R@ep-morning-cake-aqy7c6ce-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

app.get('/', (req : Request, res : Response) => {
  // res.send("Express Server")
  res.status(200).json({
    "message" : "Express Server",
    "author" : "Next leverl"
  })
})

app.post('/', async (req : Request, res : Response) => {
  const body = req.body
  res.status(201).json({
    message: "Created",
    data: body
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
