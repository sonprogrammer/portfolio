'use client'

import { useEffect } from "react"

const OWNER_SESSION_KEY = 'portfolio'

function getDevide(){
    const width = window.innerWidth

    if(width<768){
        return '모바일 '
    }

    if(width < 968){
        return '테블릿'
    }

    return '데스크탑'
}


export function VisitorTracker() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        if(params.has('me')){
            localStorage.setItem(OWNER_SESSION_KEY, 'true')
            return
        }

        if(localStorage.getItem(OWNER_SESSION_KEY) === 'true'){
            return
        }


        const sendVisit = async() => {
            try {
                await fetch('/api/visitor', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        page: window.location.pathname,
                        referrer: document.referrer
                            ? new URL(document.referrer).hostname
                            : '직접 방문',
                        device: getDevide()
                    })
                })
            } catch (error) {
                console.log('방문 기록 전송 실패', error)
            }
        }
        sendVisit()
    },[])
  return null
}