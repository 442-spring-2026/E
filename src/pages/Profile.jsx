import { useState } from 'react'
import './Profile.css'

function Profile() {
  const [children, setChildren] = useState([{ id: 1 }])

  function handleAddChild() {
    const newChild = { id: Date.now() }
    setChildren([...children, newChild])
  }

  function handleRemoveChild(id) {
    setChildren(children.filter((child) => child.id !== id))
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <h1>Profile</h1>

        <div className="child-profile-list">
          {children.map((child, index) => (
            <div className="child-profile-card" key={child.id}>
              <div className="child-profile-header">
                <h2>Child {index + 1}</h2>

                {children.length > 1 && (
                  <button
                    type="button"
                    className="remove-child-button"
                    onClick={() => handleRemoveChild(child.id)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <label>
                Child Age
                <input type="number" placeholder="Enter child age" />
              </label>

              <label>
                Screen Time Limit
                <input type="text" placeholder="Enter screen time limit" />
              </label>

              <label>
                Interests
                <input type="text" placeholder="Enter interests" />
              </label>
            </div>
          ))}
        </div>

        <div className="profile-buttons">
          <button type="button" className="add-child-button" onClick={handleAddChild}>
            Add Child
          </button>

          <button type="button" className="save-button">
            Save
          </button>
        </div>
      </section>
    </main>
  )
}

export default Profile