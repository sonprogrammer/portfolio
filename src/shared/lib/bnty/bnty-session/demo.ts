const DEMO_SESSION_KEY = 'bnty-demo-session'

export function getDemoSession () {
    const savedSession = localStorage.getItem(DEMO_SESSION_KEY)

    if(savedSession){
        return savedSession
    }

    const newSession = crypto.randomUUID()

    localStorage.setItem(DEMO_SESSION_KEY, newSession)

    return newSession
}