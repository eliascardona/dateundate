import { useState, useEffect } from 'react'

function useCompare(defaultValue, dataToSet, dependency) {
    const [data, setData] = useState(defaultValue)

    useEffect(() => {
        setData(dataToSet)
    }, [dependency])

    return data
}

export default useCompare