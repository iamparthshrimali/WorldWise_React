import React from 'react'
import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

const CountryList = () => {
  const { cities,isLoading }=useCities();
  if(isLoading) return <Spinner />
  console.log(cities,"from country list")
  
 let countries=cities.reduce((arr,currCity)=>{
    if(!arr.map((e)=>e.country).includes(currCity.country)){
        return [...arr,{country:currCity.country,emoji:currCity.emoji}]
    }
    return arr;
 },[])
 console.log(countries,"countries from countries")
  return (
    <div className={styles.countryList}>
      {
        countries.map((country, index) => <CountryItem country={country} key={index} />)
      }
    </div>
  )
}

export default CountryList