import { useState } from 'react';

export function useInfinityScroll (effects) {
    const [effect, setEffect] = useState([])
    const [page, setPage] = useState(0)

    const scroll = function (){
        const newData = effects?effects.slice(page, page+25):[]
        setEffect(effect.concat(newData))
        setPage(page+25)
    }

    return [
        effect,
        scroll
    ]
}