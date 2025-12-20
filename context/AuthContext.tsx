// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

// Типы
type User = {
  id: number
  username: string
  email: string | null
  role: string
  created_at: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isLoading: boolean
}

// Создаем контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    checkAuth()
  }, [])

  // Функция проверки авторизации
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        // Токен невалидный - очищаем
        localStorage.removeItem('token')
        setUser(null)
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Функция входа
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Сохраняем токен
        localStorage.setItem('token', data.token)
        
        // Сохраняем данные пользователя
        setUser(data.user)
        
        // Редирект на главную
        router.push('/')
        
        return { success: true }
      } else {
        const errorData = await response.json()
        return { 
          success: false, 
          message: errorData.message || 'Ошибка входа' 
        }
      }
    } catch (error) {
      console.error('Ошибка при входе:', error)
      return { 
        success: false, 
        message: 'Сетевая ошибка. Проверьте соединение.' 
      }
    }
  }

  // Функция выхода
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/login')
  }

  // Значение контекста
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return context
}
