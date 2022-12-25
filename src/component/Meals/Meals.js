import { Fragment } from "react" 
import { AvailableMeal } from "./AvailableMeals"
import { MealSummary } from "./MealSummary"



export const Meals=()=>{

    return(
<Fragment>
    <MealSummary />
    <AvailableMeal />

</Fragment>
    )
}