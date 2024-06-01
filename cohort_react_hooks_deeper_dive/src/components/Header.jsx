import { memo } from "react";
const FirstMemo = memo( function({title}){
    return (
        <div>
            <h1>My name is {title}</h1>
        </div>
    )
  })

export default FirstMemo;