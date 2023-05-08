import React from "react";

import AvilableMeals from "./AvilableMeals";
import MealsSummary from "./MealsSummary";

const Meals=()=>{
    return (
        <React.Fragment>
            <MealsSummary/>
            <AvilableMeals/>
        </React.Fragment>
    );
}

export default Meals;