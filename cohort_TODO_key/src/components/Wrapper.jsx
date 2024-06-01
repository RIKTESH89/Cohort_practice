import { memo } from "react";

const Wrapper = memo(function({children}){
    return (
        <div style={{border: "2px black solid"}}>
            {children}
        </div>
    )
})

export default Wrapper;