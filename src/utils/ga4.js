// utils/GoogleAnalytics.js
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

export const initGA = (trackingId, debug = false, options = {}) => {
  ReactGA.initialize(trackingId, { debug, ...options })
}

export const usePageView = (options = {}) => {
  const location = useLocation()

  useEffect(() => {
    const page = location.pathname + location.search
    const { origin } = window.location

    ReactGA.set({
      page,
      location: `${origin}${page}`,
      ...options
    })

    ReactGA.send({ hitType: 'pageview', page })
  }, [location])
}
