import OpenAI from 'openai';
import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const API_KEY = 'INSERT YOUR API KEY'

const openai = new OpenAI({
    apiKey: "INSERT YOUR API KEY"
});



    


const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = 3080

app.post('/',async (req,res) =>{
    const {message, currentModel} = req.body;
    const response = await openai.chat.completions.create({
        model: `${currentModel}`,
        messages: [{role: "user", content: `${message}`}],
        temperature: 0.5
    });
    console.log(currentModel);
    console.log("\n-----------\n", response.choices[0].message.content);
    
    res.json({
        message: response.choices[0].message.content
    })
});



app.get('/models', async (req, res) => {
  const response = await openai.models.list();
  console.log(response.data);
  console.log("response.data.data was above");
  res.json({
    models: response.data
  });
});

app.listen(port, () =>{
    console.log(`Example app listening http://localhost:${port}`)
});