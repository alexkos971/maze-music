import { useCallback, useState} from 'react';
// import Message from "./index.jsx";

export const useMessage = () => {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ message, setMessage ] = useState(null);

    return useCallback(text => {
        if (text) {
            setMessage(text);
            // console.log(message)
            setIsVisible(true);
            
            setTimeout(() => {
                setIsVisible(false);
                setMessage(null)
            }, 3000);
        }
        console.log(message);
        return { isVisible, message, setMessage }
    }, [message, isVisible])
}