import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [facts, setFacts] = useState<string[]>([])
  const [currentFactIndex, setCurrentFactIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}facts.md`)
      .then((res) => res.text())
      .then((text) => {
        // Simple parsing: look for lines starting with * or -
        const lines = text.split('\n')
        const extractedFacts = lines
          .filter((line) => line.trim().startsWith('*') || line.trim().startsWith('-'))
          .map((line) => line.trim().replace(/^[*-\s]+/, ''))
        
        setFacts(extractedFacts)
        if (extractedFacts.length > 0) {
          setCurrentFactIndex(Math.floor(Math.random() * extractedFacts.length))
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch facts:', err)
        setLoading(false)
      })
  }, [])

  const nextFact = () => {
    if (facts.length === 0) return
    let nextIndex
    do {
      nextIndex = Math.floor(Math.random() * facts.length)
    } while (nextIndex === currentFactIndex && facts.length > 1)
    setCurrentFactIndex(nextIndex)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Samit Facts</h1>
        <p className="subtitle">The absolute truth about Samit</p>
      </header>

      <main>
        {loading ? (
          <div className="loader">Loading the truth...</div>
        ) : facts.length > 0 && currentFactIndex !== null ? (
          <div className="fact-card">
            <p className="fact-text">"{facts[currentFactIndex]}"</p>
            <button className="next-button" onClick={nextFact}>
              Next Truth
            </button>
          </div>
        ) : (
          <div className="error">No facts found. Is Samit actually a myth?</div>
        )}
      </main>

      <footer>
        <p>Verified by the Samit Research Institute</p>
      </footer>
    </div>
  )
}

export default App
