import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [q, setq] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateHashtags = async (e) => {
    e.preventDefault();

    if (!q) return alert("input cannot be empty");
    else {
      setLoading(true);
      try {
        const response = await openai.createCompletion(
          {
            model: "text-davinci-003",
            prompt: `Generate and return only the hashtags for instagram post about: ${q}`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
          },
          {
            timeout: 5000,
          }
        );
        setResponse(response.data.choices[0].text);
        setq("");
      } catch (error) {
        setResponse(`${error.message} try again`);
      }
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <div>
        <h1>#tag</h1>
        <form
          onSubmit={generateHashtags}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          <input
            style={{
              fontSize: "1.5rem",
              border: "none",
              borderBottom: "2px solid whitesmoke",
              padding: "0.5rem",
            }}
            placeholder="about your post"
            type="text"
            name="query"
            id="query"
            onChange={(e) => {
              setq(e.target.value);
            }}
          />
          <button
            style={{ display: "block", border: "2px solid whitesmoke" }}
            type="submit"
          >
            Generate
          </button>
        </form>
        <p style={{ whiteSpace: "wrap" }}>
          {loading ? "Loading..." : response}
        </p>
      </div>
    </div>
  );
}

export default App;
