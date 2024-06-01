import { memo } from "react";

const CardWrapper = memo(function({todos}){
    return(
        todos.map(function(value){
            return(
                <div>
            <h3>{value.title}</h3>
            <h4>{value.description}</h4>
            <button>{value.completed == true ? "Completed" : "Not Completed"}</button>
        </div>
            )
        })
    )
})

export default CardWrapper;