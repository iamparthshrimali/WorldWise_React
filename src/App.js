import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Login from "./pages/Login"
import City from "./components/City"
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import Form from "./components/Form"
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtecteRoute from './components/ProtecteRoute'

const App = () => {
  
  return (
    <>
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route 
            path="app"
            element={
            <ProtecteRoute>
               <AppLayout /> 
            </ProtecteRoute>} >
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList  />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
    </>
  )
}

export default App