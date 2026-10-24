export default function StudentRegistrationForm({
  formData,
  errors,
  onChange,
  onSubmit,
  onReset,
  onFillSample,
}) {
  const availableCourses = [
    'Computer Science & Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Master of Computer Applications (MCA)',
  ];

  const availableSemesters = [
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8',
  ];

  const availableSkills = [
    'Web Development',
    'Python & Data Science',
    'Machine Learning / AI',
    'Cloud Computing (AWS/GCP)',
    'Mobile App Development',
    'Cybersecurity',
    'DevOps & Docker',
    'Database Systems',
  ];

  return (
    <form className="student-form" onSubmit={onSubmit} noValidate>
      <div className="form-card-header">
        <div className="form-title-group">
          <h2>Registration Details</h2>
          <p className="form-subtitle">
            Please fill in your academic and personal information below.
          </p>
        </div>
        <button
          type="button"
          className="btn-text-secondary"
          onClick={onFillSample}
          title="Auto-fill form with sample student information"
        >
          <span className="btn-icon">⚡</span> Fill Demo Data
        </button>
      </div>

      {/* Personal Information Section */}
      <div className="form-section">
        <h3 className="section-title">
          <span className="section-number">1</span> Personal Information
        </h3>

        <div className="grid-2-col">
          {/* Full Name */}
          <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
            <label htmlFor="fullName">
              Full Name <span className="required-star">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={onChange}
              placeholder="e.g. Samantha Miller"
              autoComplete="name"
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          {/* Roll Number */}
          <div className={`form-group ${errors.rollNumber ? 'has-error' : ''}`}>
            <label htmlFor="rollNumber">
              Roll / Registration No. <span className="required-star">*</span>
            </label>
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              value={formData.rollNumber}
              onChange={onChange}
              placeholder="e.g. 2026-CSE-042"
            />
            {errors.rollNumber && (
              <span className="error-message">{errors.rollNumber}</span>
            )}
          </div>
        </div>

        <div className="grid-2-col">
          {/* Email Address */}
          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">
              Email Address <span className="required-star">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="e.g. samantha.miller@college.edu"
              autoComplete="email"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
            <label htmlFor="phone">
              Phone Number <span className="required-star">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onChange}
              placeholder="e.g. 9876543210 (10 digits)"
              autoComplete="tel"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="grid-2-col">
          {/* Date of Birth */}
          <div className={`form-group ${errors.dob ? 'has-error' : ''}`}>
            <label htmlFor="dob">
              Date of Birth <span className="required-star">*</span>
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={onChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>

          {/* Gender (Radio buttons) */}
          <div className={`form-group ${errors.gender ? 'has-error' : ''}`}>
            <label>
              Gender <span className="required-star">*</span>
            </label>
            <div className="radio-group" role="radiogroup" aria-label="Gender">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={onChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-text">{g}</span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="form-section">
        <h3 className="section-title">
          <span className="section-number">2</span> Academic Program
        </h3>

        <div className="grid-2-col">
          {/* Course Dropdown */}
          <div className={`form-group ${errors.course ? 'has-error' : ''}`}>
            <label htmlFor="course">
              Enrolled Course / Department <span className="required-star">*</span>
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={onChange}
            >
              <option value="">-- Select Department / Course --</option>
              {availableCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.course && (
              <span className="error-message">{errors.course}</span>
            )}
          </div>

          {/* Current Semester */}
          <div className="form-group">
            <label htmlFor="semester">Current Semester</label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={onChange}
            >
              {availableSemesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Technical Skills & Interests (Multi-select Checkboxes) */}
        <div className="form-group">
          <label>Skills & Areas of Interest</label>
          <p className="field-hint">Select all technical domains that apply</p>
          <div className="checkbox-grid">
            {availableSkills.map((skill) => (
              <label key={skill} className="checkbox-card-label">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={onChange}
                />
                <span className="checkbox-card-content">
                  <span className="check-indicator"></span>
                  <span className="checkbox-text">{skill}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Declaration Section */}
      <div className="form-section">
        <h3 className="section-title">
          <span className="section-number">3</span> Contact Address & Declaration
        </h3>

        {/* Address (Textarea) */}
        <div className={`form-group ${errors.address ? 'has-error' : ''}`}>
          <label htmlFor="address">
            Permanent Address <span className="required-star">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            onChange={onChange}
            placeholder="Enter street, city, state, pin code..."
          ></textarea>
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </div>

        {/* Terms & Conditions (Checkbox) */}
        <div className={`form-group ${errors.agreeTerms ? 'has-error' : ''}`}>
          <label className="checkbox-single-label">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={onChange}
            />
            <span className="checkbox-custom"></span>
            <span className="declaration-text">
              I certify that all details provided in this registration form are
              accurate and complete. I agree to abide by the university code of
              conduct. <span className="required-star">*</span>
            </span>
          </label>
          {errors.agreeTerms && (
            <span className="error-message">{errors.agreeTerms}</span>
          )}
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          <span className="btn-icon">✓</span> Submit Registration
        </button>
        <button type="button" className="btn-secondary" onClick={onReset}>
          Reset Form
        </button>
      </div>
    </form>
  );
}

