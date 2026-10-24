import { useState } from 'react';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import SubmissionDisplay from './components/SubmissionDisplay';
import LiveStateInspector from './components/LiveStateInspector';
import './App.css';

const initialFormState = {
  fullName: '',
  rollNumber: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  course: '',
  semester: 'Semester 1',
  skills: [],
  address: '',
  agreeTerms: false,
};

export default function App() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [activeView, setActiveView] = useState('form'); // 'form' | 'submitted'

  // Controlled component generic input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'skills') {
        // Multi-select checkbox group
        setFormData((prev) => ({
          ...prev,
          skills: checked
            ? [...prev.skills, value]
            : prev.skills.filter((skill) => skill !== value),
        }));
      } else {
        // Single boolean checkbox (e.g., terms agreement)
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      // Text, email, tel, date, radio, select, textarea
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Form validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll / Registration Number is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }

    if (!formData.course) {
      newErrors.course = 'Please select an academic course/department.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Permanent address is required.';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Please provide a more detailed address.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must confirm the declaration to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const record = {
        ...formData,
        submittedAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
      setSubmittedData(record);
      setActiveView('submitted');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset form handler
  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the form? All entered information will be cleared.',
      )
    ) {
      setFormData(initialFormState);
      setErrors({});
    }
  };

  // Auto-fill sample student data for demonstration
  const handleFillSample = () => {
    setFormData({
      fullName: 'Aarav Sharma',
      rollNumber: '2026-CSE-108',
      email: 'aarav.sharma@campus.edu',
      phone: '9876543210',
      dob: '2004-08-15',
      gender: 'Male',
      course: 'Computer Science & Engineering',
      semester: 'Semester 4',
      skills: [
        'Web Development',
        'Python & Data Science',
        'Machine Learning / AI',
      ],
      address: 'Plot 42, Silicon Valley Avenue, Tech City, Karnataka 560100',
      agreeTerms: true,
    });
    setErrors({});
  };

  // Reset everything to register another student
  const handleNewRegistration = () => {
    setFormData(initialFormState);
    setSubmittedData(null);
    setErrors({});
    setActiveView('form');
  };

  return (
    <div className="app-container">
      {/* Header section */}
      <header className="app-header">
        <div className="header-badge">
          <span className="pulse-dot"></span> React Controlled Form
        </div>
        <h1 className="app-title">Student Registration Portal</h1>
        <p className="app-description">
          Demonstrating <strong>React Controlled Components</strong> where each input
          value is bound to and managed via <code>useState()</code>, with real-time
          validation and display upon submission.
        </p>

        {/* View Switcher Tabs (when submission exists) */}
        {submittedData && (
          <div className="nav-tabs">
            <button
              type="button"
              className={`nav-tab-btn ${activeView === 'form' ? 'active' : ''}`}
              onClick={() => setActiveView('form')}
            >
              Registration Form
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${activeView === 'submitted' ? 'active' : ''}`}
              onClick={() => setActiveView('submitted')}
            >
              Submitted Details
              <span className="tab-indicator">✓</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        {activeView === 'form' ? (
          <StudentRegistrationForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onFillSample={handleFillSample}
          />
        ) : (
          <SubmissionDisplay
            data={submittedData}
            onEdit={() => setActiveView('form')}
            onNewRegistration={handleNewRegistration}
          />
        )}

        {/* Live Controlled State Monitor */}
        <LiveStateInspector
          formData={formData}
          submittedData={submittedData}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Student Registration System &bull; Built with React &amp; Vite &bull; Controlled Components Architecture
        </p>
      </footer>
    </div>
  );
}
