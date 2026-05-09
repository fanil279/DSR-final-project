import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useRegisterMutation } from '../features/tasksApi'

import { useAppDispatch } from '../hooks/redux'
import { setCredentials } from '../features/authSlice'

export default function RegisterPage() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [nickname, setNickname] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] = useState('')

  const [register, { isLoading }] =
    useRegisterMutation()

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setError('')

    if (!nickname.trim()) {
      setError('Nickname is required')

      return
    }

    if (!email.trim()) {
      setError('Email is required')

      return
    }

    if (password.length < 6) {
      setError(
        'Password must be at least 6 characters'
      )

      return
    }

    try {
      const response = await register({
        nickname,
        email,
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
          'Register failed'
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
          Register
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
            : 'Register'}
        </button>

        <p className="mt-4">
          Already have account?{' '}
          <Link
            to="/login"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
