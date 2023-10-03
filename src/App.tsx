import { useState } from 'react'
import './App.css'

const API_KEY = "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"

function App() {
  const [sentance, setSentance] = useState("")
  const [sentiment, setSentiment] = useState("");

  async function CallOpenAIAPI() {
    console.log("calling the open ai api hehe");

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": "what is the sentiment of this sentance?" + sentance,
      "temperature": 0,
      "max_tokens": 60,
      "top_p": 1.0, 
      "messages": [],
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0,
    }
    

    await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY

    },
    body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
    setSentance(data.choices[0].text.trim());
    });
  }

console.log(sentance)
  return (
    <>
      <div className="App">
      <div>
        <textarea onChange={(e) => setSentance(e.target.value)} placeholder='paste your sentance here' cols={50} rows={10}></textarea>
      </div>
      <div>
        <button onClick={CallOpenAIAPI}>Get ur answer here</button>
        {sentiment !== "" ? <h3>this sentance is : {sentiment}</h3> : null}
      </div>
      </div>
    </>
  )
}

export default App
