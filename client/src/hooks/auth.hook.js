import { useCallback, useState, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState(null);
    
    const login = useCallback((jwtToken, id, name, email) => {
        setToken(jwtToken);
        setUserId(id);
        
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id, name, email, avatar: 'https://iruimbatam.com/img/no-user-image.jpg'
        }));

        setProfile(JSON.parse(localStorage.getItem(storageName)));
    }, [])

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.name, data.email);
        }
    }, [login, logout])

    return { login, logout, token, userId, profile }
}