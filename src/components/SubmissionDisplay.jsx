export default function SubmissionDisplay({
  data,
  onEdit,
  onNewRegistration,
}) {
  const getInitials = (name) => {
    if (!name) return 'ST';
    return name
      .trim()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="submission-card">
      {/* Success Notification Banner */}
      <div className="success-banner">
        <div className="success-icon-wrapper">
          <svg
            className="success-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div className="success-text">
          <h3>Registration Submitted Successfully!</h3>
          <p>
            The student information has been captured via controlled React state
            and recorded at{' '}
            <strong>{data.submittedAt || new Date().toLocaleString()}</strong>.
          </p>
        </div>
      </div>

      {/* Student Badge / Identity Header */}
      <div className="student-badge">
        <div className="student-avatar">{getInitials(data.fullName)}</div>
        <div className="student-badge-info">
          <h2>{data.fullName}</h2>
          <div className="badge-meta">
            <span className="badge-pill pill-roll">
              ID: {data.rollNumber}
            </span>
            <span className="badge-pill pill-course">{data.course}</span>
            <span className="badge-pill pill-semester">{data.semester}</span>
          </div>
        </div>
      </div>

      {/* Structured Details Grid */}
      <div className="details-table-card">
        <h3 className="details-header">Submitted Student Record</h3>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Full Name</span>
            <span className="detail-value font-highlight">{data.fullName}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Roll / Reg Number</span>
            <span className="detail-value font-mono">{data.rollNumber}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">
              <a href={`mailto:${data.email}`} className="link-text">
                {data.email}
              </a>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Phone Number</span>
            <span className="detail-value">{data.phone}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Date of Birth</span>
            <span className="detail-value">{data.dob}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{data.gender}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Academic Program</span>
            <span className="detail-value">{data.course}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Current Semester</span>
            <span className="detail-value">{data.semester}</span>
          </div>

          <div className="detail-item full-width">
            <span className="detail-label">Technical Skills & Interests</span>
            <div className="detail-skills-tags">
              {data.skills && data.skills.length > 0 ? (
                data.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-muted">None selected</span>
              )}
            </div>
          </div>

          <div className="detail-item full-width">
            <span className="detail-label">Permanent Address</span>
            <span className="detail-value address-box">{data.address}</span>
          </div>

          <div className="detail-item full-width">
            <span className="detail-label">Declaration Status</span>
            <span className="detail-value status-verified">
              ✓ Verified & Agreed to University Regulations
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="submission-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={onNewRegistration}
        >
          <span className="btn-icon">+</span> Register Another Student
        </button>
        <button type="button" className="btn-secondary" onClick={onEdit}>
          <span className="btn-icon">✎</span> Edit This Registration
        </button>
        <button
          type="button"
          className="btn-text-secondary"
          onClick={handlePrint}
        >
          <span className="btn-icon">🖨</span> Print Summary
        </button>
      </div>
    </div>
  );
}

