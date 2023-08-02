
import { useEffect, useState, useRef } from 'react';
import myAxios from './api/axios.js';

function App() {
    const [inputValue, setInputValue] = useState('');
    const abortControllerRef = useRef(new AbortController())

    useEffect(() => { 
        handleGetDataSerch();
        return () => {
            abortControllerRef.current.abort();
        };
    }, [inputValue])

    const handleGetDataSerch = async () => {
        if (abortControllerRef.current) {
            // Abort any ongoing request before making a new one
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController(); // Update the AbortController
        try {
            myAxios.get(`/search/get?key_words=${inputValue}`,
                // {}, // when using method post you must pass newAbortController as 3rd argument -- method get, pass newAbortController as 2rd argument
                {
                    signal: abortControllerRef.current.signal, // Set the signal property in the request config
                }
            )   
                .then(API => {
                    console.log(API);
                    // if (API && API.data) {
                    //     console.log(API.data);
                    // }
                })
                .catch(err => console.log(err))
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted:', error.message)
            } else {
                console.log(error)
            }
        }
    } 

    return (
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <h2>Hãy bật dev mode và theo dõi tab 'Console' và 'Network' để hiểu rõ hơn</h2>
            <input
                style={{ width: '60%', height: '1.5rem' }}
                type="text"
                placeholder="Search"
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
}

export default App;
