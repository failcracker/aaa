import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'
import { login } from '/src/services/user/auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(username, password)

      navigate(`/dashboard`)
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } catch (error) {
      console.error('Error submitting form:', error)

      alert(error.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <TextInput id="username" type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <TextInput id="password" type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" isProcessing={loading} disabled={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
