import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../../features/auth/authApi'

import { useAppDispatch } from '../../hooks/redux'
import { setCredentials } from '../../features/auth/authSlice'

export default function LoginPage() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isLoading }] =
    useLoginMutation()

  const [error, setError] = useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setError('')

    if (!nickname.trim()) {
      setError('Nickname is required')

      return
    }

    if (!password.trim()) {
      setError('Password is required')

      return
    }

    try {
      const response = await login({
        nickname,
        password,
      }).unwrap()

      dispatch(
        setCredentials(
          response.accessToken
        )
      )

      navigate('/tasks')
    } catch (err: any) {
      setError(
        err?.data?.message ||
          'Login failed'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) =>
            setNickname(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          disabled={isLoading}
          className="w-full bg-black text-white p-3 rounded cursor-pointer"
        >
          {isLoading
            ? 'Loading...'
            : 'Login'}
        </button>

        <p className="mt-4">
          No account?{' '}
          <Link
            to="/register"
            className="text-blue-500"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
