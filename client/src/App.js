import "./App.css";
import "./normal.css";
import {useState, useEffect} from 'react';



function App() {

  useEffect(()=>{
    getEngines();
  }, [])

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState(["ada"]);
  const [chatLog, setChatLog] = useState([
    {user: "gpt",
    message: "Hello, how are you?"},{
      user: "me",
    message: "I want to use GPTecho "
    }
  ]);

  function clearChat(){
    setChatLog([]);
  }

  function getEngines(){
    fetch("http://localhost:3080/models") 
      .then(res => res.json())
      .then(data => setModels(data.models))
  }


  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    setChatLog([...chatLog, {user:"me", message: `${input}`}])
    console.log(input);
    setInput("");

    const response = await fetch("http://localhost:3080/", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: input,
      currentModel,
      })
    });
    const data = await response.json();
    setChatLog([...chatLog, {user:"gpt", message: `${data.message}`} ])
    console.log(data.message);


  }


  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>

        <div className="models">
          <select onChange={(e) =>{
            setCurrentModel(e.target.value)
          }}>
            {models.map((model, index) => (
              <option key={model.id} value={model.id}>{model.id}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <section className="Chatbox">

        <div className="chat-log">
          {chatLog.map((message,index) =>(
            <ChatMessage key={index} message={message} />
          ))}
          
        </div>

        

        <div className="chat-input-holder">
          
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value) }
              className="chat-input-textarea"
              placeholder="Your prompt"
            ></input>
          </form>

        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" ? "chatgpt" : "user"}`}>
      {message.user === "gpt" && (
        <div className="avatar">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M7 12H17M8 8.5C8 8.5 9 9 10 9C11.5 9 12.5 8 14 8C15 8 16 8.5 16 8.5M8 15.5C8 15.5 9 16 10 16C11.5 16 12.5 15 14 15C15 15 16 15.5 16 15.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </g>
</svg>
        </div>
      )}
      <div className="message">
        {message.message}
      </div>
    </div>


  // return (
  //   <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
  //     <div className="chat-message-center">
  //       <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
  //         {message.user === "gpt" && <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  //       <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  //       <g id="SVGRepo_iconCarrier">
  //         <path d="M7 12H17M8 8.5C8 8.5 9 9 10 9C11.5 9 12.5 8 14 8C15 8 16 8.5 16 8.5M8 15.5C8 15.5 9 16 10 16C11.5 16 12.5 15 14 15C15 15 16 15.5 16 15.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  //       </g>
  //     </svg>}
  //       </div>
  //       <div className="message">
  //         {message.message}
  //       </div>
  //     </div>
  //   </div>

    // <div className={`chat-message ${message.user === "gpt" ? "chatgpt" : "user"}`}>
    //   <div className="chat-message-centre">
    //     <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
    //       {message.user === "gpt" && (
            

    //         <div style={{ width: 40, height: 50 }}>
    //   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    //     <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    //     <g id="SVGRepo_iconCarrier">
    //       <path d="M7 12H17M8 8.5C8 8.5 9 9 10 9C11.5 9 12.5 8 14 8C15 8 16 8.5 16 8.5M8 15.5C8 15.5 9 16 10 16C11.5 16 12.5 15 14 15C15 15 16 15.5 16 15.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    //     </g>
    //   </svg>
    // // </div>
    //       )}
    //     </div>
    //     <div className="message">
    //       {message.message}
    //     </div>
    //   </div>
    // </div>
  );
};


export default App;
