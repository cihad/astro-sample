import { useState, useEffect, useRef } from 'react'


function alignItems(visual: HTMLElement, rect: DOMRect) {
  Object.assign(visual.style, {
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    'inset-block-start': `${rect.top}px`,
    'inset-inline-start': `${rect.left}px`,
  });
}


function App() {
  const rectangle = useRef<HTMLDivElement>(null)
  const [currentEl, setCurrentEl] = useState("P")

  useEffect(() => {
    function messageHandle(e: MessageEvent) {
      if (e.data.type === "hover") {
        const payload = (e.data).payload;
        alignItems(rectangle.current, payload.rect);
        setCurrentEl(payload.element);
      }
    }

    window.addEventListener('message', messageHandle);

    return () => window.removeEventListener("message", messageHandle)
  }, [])

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div style={{ position: "relative" }}>
        <div
          ref={rectangle}
          style={{
            position: "absolute",
            outline: "0.1rem solid #646cff",
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              position: "relative",
              userSelect: "none",
              height: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              fontSize: "0.7rem",
              backgroundColor: "#646cff",
              color: "whitesmoke",
              top: "-1.7rem",
              left: "-0.1rem",
              padding: "0 0.6rem",
              borderRadius: "0.2rem",
              pointerEvents: "all",
            }}
          >{currentEl}</div>
        </div>
      </div>
      <iframe src="http://localhost:3000" style={{ width: "100%", height: "100%", border: 0 }} />
    </div>
  )
}




export default App
