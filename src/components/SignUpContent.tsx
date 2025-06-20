"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react'

export function SignUpContent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [error, setError] = useState("")
  const [emailExistsError, setEmailExistsError] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false, uppercase: false, lowercase: false, number: false, special: false,
  })

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])

  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    })
  }, [password])
  
  // 当用户修改OTP时，重置验证状态
  useEffect(() => {
    if (isCodeVerified) {
      setIsCodeVerified(false);
    }
  }, [otp]);


  const handleSendCode = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setIsSendingCode(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send code.')
      }
      
      setSuccess("Verification code sent. Please check your email.")
      setCooldown(60)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.')
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerifyCode = async () => {
    setIsVerifyingCode(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      setSuccess("Code verified successfully!");
      setIsCodeVerified(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid or expired code.");
    } finally {
      setIsVerifyingCode(false);
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 重置之前的提交错误
    setSubmitError(null)
    setEmailExistsError(false)

    if (!isFormValid) {
      setSubmitError("Please fill out all fields and verify your code.")
      return
    }

    setIsLoading(true)
    setError("") // 清除来自其他操作的通用错误

    try {
      const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, otp, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409 && data.code === 'EMAIL_EXISTS') {
            setEmailExistsError(true);
        } else {
            setSubmitError(data.error || 'Registration failed.');
        }
        return; 
      }

      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResponse?.error) {
        setSubmitError("Account created, but auto-login failed. Please go to the sign-in page.");
      } else {
        router.push('/dashboard');
      }

    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unknown error occurred.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const allPasswordCriteriaMet = Object.values(passwordCriteria).every(Boolean)
  const passwordsMatch = password && password === confirmPassword
  const isFormValid = name && email && isCodeVerified && allPasswordCriteriaMet && passwordsMatch && !isLoading

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Create Your Account
          </h2>
        </div>

        {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-center text-destructive">{error}</div>}
        {success && <div className="rounded-md bg-green-100 p-3 text-sm text-center text-green-800">{success}</div>}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* 用户名 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-input bg-white text-black rounded-md shadow-sm" />
          </div>

          {/* 邮箱和发送验证码 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
            <div className="flex items-center space-x-2 mt-1">
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-grow w-full px-3 py-2 border border-input bg-white text-black rounded-md shadow-sm" />
              <button type="button" onClick={handleSendCode} disabled={!/^\S+@\S+\.\S+$/.test(email) || isSendingCode || cooldown > 0} className="px-4 py-2 border rounded-md text-sm font-medium text-black bg-gray-200 hover:bg-gray-300 disabled:opacity-50 whitespace-nowrap">
                {isSendingCode ? "Sending..." : (cooldown > 0 ? `${cooldown}s` : "Send Code")}
              </button>
            </div>
          </div>
          
          {/* 验证码和验证按钮 */}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-foreground">Verification Code</label>
            <div className="flex items-center space-x-2 mt-1">
              <input 
                id="otp" 
                type="text" 
                placeholder="6-digit code from email" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                maxLength={6} 
                required 
                className="flex-grow w-full px-3 py-2 border border-input bg-white text-black rounded-md shadow-sm"
              />
              <button 
                type="button" 
                onClick={handleVerifyCode} 
                disabled={otp.length !== 6 || isVerifyingCode || isCodeVerified}
                className="px-4 py-2 border rounded-md text-sm font-medium text-black bg-gray-200 hover:bg-gray-300 disabled:opacity-50 whitespace-nowrap"
              >
                {isCodeVerified ? "Verified" : (isVerifyingCode ? "Verifying..." : "Verify")}
              </button>
            </div>
            {isCodeVerified && <div className="text-green-600 text-xs mt-1">Email verified successfully.</div>}
          </div>

          {/* 密码 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
            <div className="relative mt-1">
              <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full pr-10 px-3 py-2 border border-input bg-white text-black rounded-md shadow-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-900" /> : <Eye className="h-5 w-5 text-gray-900" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-1 text-sm">
            <PasswordCriterion label="At least 8 characters" met={passwordCriteria.length} />
            <PasswordCriterion label="At least one uppercase letter" met={passwordCriteria.uppercase} />
            <PasswordCriterion label="At least one lowercase letter" met={passwordCriteria.lowercase} />
            <PasswordCriterion label="At least one number" met={passwordCriteria.number} />
            <PasswordCriterion label="At least one special character" met={passwordCriteria.special} />
          </div>
          
          {/* 确认密码 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">Confirm Password</label>
            <div className="relative mt-1">
              <input id="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="block w-full pr-10 px-3 py-2 border border-input bg-white text-black rounded-md shadow-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-900" /> : <Eye className="h-5 w-5 text-gray-900" />}
              </button>
            </div>
            {!passwordsMatch && password && confirmPassword && <p className="text-sm text-destructive mt-1">Passwords do not match.</p>}
          </div>
          
          <button type="submit" disabled={!isFormValid} className="w-full flex justify-center py-2 px-4 border rounded-md text-sm font-medium text-black bg-primary hover:bg-primary/90 disabled:opacity-50">
            {isLoading ? "Creating Account..." : "Create Account & Sign In"}
          </button>
        </form>
        
        {/* 提交错误的显示位置 */}
        <div className="space-y-2 pt-2">
            {submitError && <div className="rounded-md bg-destructive/10 p-3 text-sm text-center text-destructive">{submitError}</div>}
            {emailExistsError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-center text-destructive">
                This email has already been registered. Please{' '}
                <Link href="/auth/signin" className="font-bold underline hover:text-destructive/80">
                  Sign In
                </Link>
                .
              </div>
            )}
        </div>

        <div className="text-center text-sm">
          <Link href="/auth/signin" className="text-primary hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

function PasswordCriterion({ label, met }: { label: string; met: boolean }) {
  return (
    <div className={`flex items-center transition-colors ${met ? 'text-green-500' : 'text-muted-foreground'}`}>
      {met ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
      <span>{label}</span>
    </div>
  )
}