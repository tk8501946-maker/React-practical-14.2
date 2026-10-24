import { useState } from 'react';

export default function LiveStateInspector({ formData, submittedData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inspector-container">
      <button
        type="button"
        className="inspector-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="inspector-icon">{isOpen ? '▼' : '▶'}</span>
        <span>
          <strong>Live Controlled State Inspector</strong> (React{' '}
          <code>useState</code>)
        </span>
        <span className="inspector-pill">
          {formData.fullName ? `Active: ${formData.fullName}` : 'Listening'}
        </span>
      </button>

      {isOpen && (
        <div className="inspector-body">
          <div className="inspector-column">
            <h4>Current Form State (`formData`):</h4>
            <pre className="code-block">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
          {submittedData && (
            <div className="inspector-column">
              <h4>Last Submitted State (`submittedData`):</h4>
              <pre className="code-block">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

