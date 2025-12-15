import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

type AuthContextType = {
    isAuthenticated: boolean
    login: (email: string, password: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = (email: string, password: string) => {
        // Mock login: любой email + пароль
        if (email && password) {
            setIsAuthenticated(true)
            router.push('/') // редирект после логина
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
