import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("pidgeot");
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemon = async () => {
    setIsLoading(true);
    try {
      setErr(false);
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setData(res.data);
    } catch (err) {
      setData(null);
      setErr(true);
    }
    setIsLoading(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getPokemon();
    setName("");
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#e9ecef] ">
      <div className="bg-white text-center rounded-3xl border shadow-lg p-10 max-w-xs border-[#588157]">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="p-3 border-solid border-2 border-[#588157] rounded-md"
            placeholder="search by name "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-[#588157] px-2 mt-5 text-lg rounded text-gray-100">
            Search
          </button>
        </form>

        {err ? (
          <p className="my-5">No data was found</p>
        ) : (
          <>
            {isLoading ? (
              <p className="my-5">Loading...</p>
            ) : (
              <>
                {data && (
                  <>
                    {" "}
                    <img
                      className="my-5 w-50 h-50 rounded-xl shadow-lg mx-auto "
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                      alt={data.name}
                    />
                    <h1 className="text-lg text-gray-700">{data.name}</h1>
                    <ul className="text-left">
                      {data.stats.map((stat, index) => (
                        <li key={index}>
                          {stat.stat.name}: {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
