// Context is React's built-in way to have one shared piece of state (like "current user") that any component in the app can read, without passing it down manually through props or duplicating localStorage calls everywhere.
//localStorage.getItem("user_id") --> const { user } = useAuth();

//Done
import React from 'react'
import { createContext, useContext } from 'react'
export const IdContext = createContext();