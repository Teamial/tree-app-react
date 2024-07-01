import { useEffect, useState } from "react";
import "./App.css";

let ws = null;
const origin = "http://localhost:8080";

function App() {
  const [page, setPage] = useState("home");
  const [auth, setAuth] = useState({
    username: "",
    password: "",
    bio: "",
  });
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typeMessage, setTypeMessage] = useState("");

  useEffect(() => {
    (async () => {
      if (page === "home") {
        try {
          const res = await fetch(`${origin}/api/chat`, {
            method: "GET",
            headers: {
              authorization: localStorage.getItem("auth"),
            },
          });

          const p_res = await res.json();
          console.log(p_res);
          setChatrooms(p_res);
        } catch (e) {
          console.log(e);
        }
      } else if (page.split(":").at(0) === "chatroom") {
        // 1. get all the messages
        // 2. initialize web socket connection and send entering
        const res = await fetch(`${origin}/api/chat/${page.split(":")[1]}`, {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("auth"),
          },
        });

        ws = new WebSocket(`ws://localhost:8080/ws/chat/${page.split(":")[1]}`);

        ws.onopen = () => {
          ws.send(`{
            "message_type": "entering",
            "user_id": ${Number(localStorage.getItem("id"))}
          }`);
        };

        const p_res = await res.json();

        console.log(p_res["messages"]);
        console.log(p_res);

        setMessages(p_res["messages"]);
      }
    })();
  }, [page]);

  return (
    <>
      {page === "signup" ? (
        <form>
          <h1>Signup</h1>
          <input
            type="text"
            value={auth.username}
            onChange={(e) => setAuth({ ...auth, username: e.target.value })}
          />
          <input
            type="password"
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          />
          <textarea
            value={auth.bio}
            onChange={(e) => setAuth({ ...auth, bio: e.target.value })}
          />
          <button
            type="button"
            onClick={async () => {
              const res = await fetch(`${origin}/api/auth/sign-up`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(auth),
              });

              const p_res = await res.json();

              localStorage.setItem("auth", p_res.token);
              localStorage.setItem("id", p_res.user_id);

              setPage("home");
            }}
          >
            signup
          </button>
        </form>
      ) : page === "home" ? (
        <main>
          <h1>Home</h1>
          {chatrooms.map((chatroom, i) => (
            <div key={i}>
              <button
                onClick={() => {
                  setPage(`chatroom:${chatroom.chatroom_name}`);
                }}
              >
                {chatroom.chatroom_name}
              </button>
            </div>
          ))}
        </main>
      ) : page.split(":").at(0) === "chatroom" ? (
        <div>
          <h1>chatroom {page.split(":").at(0)}</h1>
          {messages.map((message, i) => (
            <p key={i}>{message.text}</p>
          ))}
          <input
            type="text"
            value={typeMessage}
            onChange={(e) => {
              setTypeMessage(e.target.value);
            }}
          />
          <button
            onClick={() => {
              ws.send(`{
            "message_type": "message",
            "user_id": ${Number(localStorage.getItem("id"))},
            "message": "${typeMessage}"
          }`);
              // displayed in frontend
              console.log("here", messages, typeMessage);
              setMessages([...messages, typeMessage]);

              // store it in database (missing)
              setTypeMessage("");
            }}
          >
            send
          </button>
        </div>
      ) : (
        <>Page not found</>
      )}
    </>
  );
}

export default App;
