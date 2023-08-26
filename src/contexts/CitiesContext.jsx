import { createContext, 
  useContext,
  useEffect, 
  useReducer
 } from "react";

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:9000'

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {...state, isLoading: true }
    case "cities/loaded":
      return {...state, isLoading: false, cities: action.payload}
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state, isLoading: false, cities: [...state.cities, action.payload]
      }
    case "city/deleted":
      return {
        ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload)
        ,currenCity:{}
      }
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");

  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity,setCurrentCity]=useState({});
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState)


  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" })
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data })
      }
      catch {
        dispatch({ type: "rejected", payload: "There was an error while loading data" })
      }

    }
    fetchCities()
  }, [])

  async function getCity(id) {
    if(Number(id)===currentCity.id) return;
    dispatch({ type: "loading" })
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data })
    }
    catch {
      dispatch({ type: "rejected", payload: "There was an error while loading data" })
    }

  }

  async function createCity(newCity) {
    // console.log("creating city ",newCity)
    dispatch({ type: "loading" })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': "application/json"
        }
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data })
    }
    catch {
      dispatch({ type: "rejected", payload: "There was an error while creating city" })
    }

  }


  async function deleteCity(id) {
    dispatch({ type: "loading" })
    // console.log("creating city ",newCity)
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id })
    }
    catch {
      dispatch({ type: "rejected", payload: "There was an error while deleting city" })
    }

  }

  return <CitiesContext.Provider   value={{
    cities,
    isLoading,
    currentCity,
    error,
    getCity,
    createCity,
    deleteCity,
  }}>
    {children}
  </CitiesContext.Provider>
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Context was used outside the Context Provider")

  return context;
}

export { useCities, CitiesProvider };