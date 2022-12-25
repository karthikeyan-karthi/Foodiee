import { Cards } from "../UI/Cards.js";
import style from "../Meals/availablemeals.module.css";
import { MealItem } from "./MealsItem/MealItem";
import { useState, useEffect } from "react";

export const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);
  const [isLoaded,setisLoaded]=useState(true);
  const [error,setError]=useState(null);
  useEffect(() => {
    setError(null)
      const MealsListData = async () => {
        const response = await fetch(
          "https://reacthttp-2d450-default-rtdb.firebaseio.com/meals.json"
        );
        if(!response.ok){
          throw new Error('Error in database');
        }
        
        const mealsData = await response.json();
        const loadedMeals = [];
        for (const key in mealsData) {
          loadedMeals.push({
            id: key,
            name: mealsData[key].name,
            description: mealsData[key].description,
            price: mealsData[key].price,
          });
        }
        setMeals(loadedMeals);
        setisLoaded(false)

      };
    
    MealsListData().catch((err)=>{
      setisLoaded(false)
      setError(err.message)
    })
    
  }, []);
if(error){
  return <p  className={style.load} >{error}</p>
}


  if(isLoaded){
   return <p className={style.load}>Loading....</p>
  }
  const mealslist = meals.map((meal) => (
   <MealItem
    key={meal.key}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
  />
  ));

  return (
    <section className={style.meals}>
      <Cards>
      <ul>
        {mealslist}
      </ul> 
      </Cards>
    </section>
  );
};
