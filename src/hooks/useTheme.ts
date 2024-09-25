import { useEffect, useState } from "react";

const useTheme = () => {
    const [isDark, setIsDark] = useState(false);

    // Добавление в LocalStorage для сохранения темы
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark ? 'dark' : 'light';
        setIsDark(!isDark);
        document.body.classList.toggle('dark-theme', !isDark);
        localStorage.setItem('theme', newTheme);
    };

    return { isDark, toggleTheme };
};

export default useTheme;