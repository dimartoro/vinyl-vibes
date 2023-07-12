import React, { createContext, useContext } from "react";
import { useAlbumReducer } from './reducers'

// Create a new context for the store
const StoreContext = createContext();
const { Provider } = StoreContext;

// Create a provider component that wraps the application and provides the state and dispatch functions
const StoreProvider = ({ value = [], ...props }) => {
   // Use the useAlbumReducer hook to initialize the state and dispatch
  const [state, dispatch] = useAlbumReducer({
    cart: [],
    cartOpen: false,
    albums:[],
    genres:[],
    currentGenre:''
  });
 // Provide the state and dispatch values to the nested components
  return <Provider value={[state, dispatch]} {...props} />;
};

// Create a custom hook to easily access the state and dispatch functions from the context
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
