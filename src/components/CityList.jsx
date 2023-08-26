import React from 'react'
import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import CityItem from './CityItem';
import { useCities } from '../contexts/CitiesContext';

const CityList = () => {
  const { cities,isLoading }=useCities();
  if(isLoading) return <Spinner />
  return (
    <div className={styles.cityList}>
      {
        cities.map((city, index) => <CityItem city={city} key={index} />)
      } 
    </div>
  )
}

export default CityList