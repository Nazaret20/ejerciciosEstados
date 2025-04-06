import { useState } from "react"

const useCount = (initialValue = 0) => {
    // const [add, subtract, divide, multiply] = useState(0)

    const [count, setCount] = useState(initialValue);

    const add = () => setCount((prevNum) => prevNum + 1);
    const subtract = () => setCount(prevNum => (prevNum - 1 < 0 ? 0 : prevNum - 1));
    const reset = () => setCount(initialValue)

    return [
        count, add, subtract, reset
    ]
}

export default useCount;