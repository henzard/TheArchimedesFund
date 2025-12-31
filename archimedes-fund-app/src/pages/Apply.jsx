import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './Apply.css';

const applySchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Age is required'),
  education: z.string().min(1, 'Please select your education level'),
  experience: z.string().min(1, 'Please select your experience level'),
  motivation: z.string().min(50, 'Please provide at least 50 characters explaining your motivation'),
  goals: z.string().min(50, 'Please provide at least 50 characters about your goals'),
  commitment: z.boolean().refine(val => val === true, 'You must commit to the full 12-week program'),
});

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(applySchema),
  });

  const onSubmit = async (data) => {
    try {
      // Prepare data for backend
      const applicationData = {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        dateOfBirth: `${new Date().getFullYear() - parseInt(data.age)}-01-01`, // Approximate
        address: data.address || 'Not provided',
        educationLevel: data.education,
        currentSituation: data.currentSituation || 'Not provided',
        programmingExperience: data.experience,
        financialSituation: data.financialSituation || 'Not provided',
        whyApply: data.motivation,
        goals: data.goals,
        commitment: data.commitment ? 'yes' : 'no',
        hearAboutUs: data.referral || 'Not provided',
      };

      const response = await fetch('/.netlify/functions/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const error = await response.json();
        alert(`Submission failed: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('Network error. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="apply">
        <div className="container">
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={80} color="var(--success)" />
            <h2>Application Submitted!</h2>
            <p>Thank you for applying to The Archimedes Fund. We'll review your application and get back to you within 5-7 business days.</p>
            <Button variant="primary" onClick={() => window.location.href = '/'}>
              Return Home
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="apply">
      <div className="container">
        <motion.div
          className="apply-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Apply to The Archimedes Fund</h1>
          <p>Take the first step toward financial mastery and technical excellence.</p>
        </motion.div>

        <div className="apply-content">
          <motion.div
            className="apply-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card padding="large">
              <h3>What to Expect</h3>
              <ul className="info-list">
                <li>12-week intensive bootcamp</li>
                <li>Financial mastery curriculum</li>
                <li>Advanced technology training</li>
                <li>Mentorship from industry leaders</li>
                <li>Job placement support</li>
                <li>Lifetime alumni network</li>
              </ul>

              <h3 style={{ marginTop: '2rem' }}>Requirements</h3>
              <ul className="info-list">
                <li>Commitment to full 12-week program</li>
                <li>Willingness to learn and grow</li>
                <li>Basic computer literacy</li>
                <li>High school diploma or equivalent</li>
              </ul>

              <div className="info-note">
                <p><strong>Note:</strong> Scholarships and financial aid are available based on merit and need.</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="apply-form-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card padding="large">
              <form onSubmit={handleSubmit(onSubmit)} className="apply-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName')}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName')}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input
                      type="number"
                      id="age"
                      {...register('age')}
                      className={errors.age ? 'error' : ''}
                    />
                    {errors.age && (
                      <span className="error-message">{errors.age.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="education">Education Level *</label>
                    <select
                      id="education"
                      {...register('education')}
                      className={errors.education ? 'error' : ''}
                    >
                      <option value="">Select...</option>
                      <option value="high-school">High School</option>
                      <option value="some-college">Some College</option>
                      <option value="associates">Associate's Degree</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree or Higher</option>
                    </select>
                    {errors.education && (
                      <span className="error-message">{errors.education.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Technical Experience *</label>
                  <select
                    id="experience"
                    {...register('experience')}
                    className={errors.experience ? 'error' : ''}
                  >
                    <option value="">Select...</option>
                    <option value="none">No Experience</option>
                    <option value="beginner">Beginner (Some self-taught basics)</option>
                    <option value="intermediate">Intermediate (Some projects/courses)</option>
                    <option value="advanced">Advanced (Professional experience)</option>
                  </select>
                  {errors.experience && (
                    <span className="error-message">{errors.experience.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="motivation">Why do you want to join The Archimedes Fund? *</label>
                  <textarea
                    id="motivation"
                    rows="5"
                    {...register('motivation')}
                    className={errors.motivation ? 'error' : ''}
                    placeholder="Tell us about your motivation..."
                  />
                  {errors.motivation && (
                    <span className="error-message">{errors.motivation.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="goals">What are your career goals? *</label>
                  <textarea
                    id="goals"
                    rows="5"
                    {...register('goals')}
                    className={errors.goals ? 'error' : ''}
                    placeholder="Tell us about your career aspirations..."
                  />
                  {errors.goals && (
                    <span className="error-message">{errors.goals.message}</span>
                  )}
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      {...register('commitment')}
                    />
                    <span>I commit to completing the full 12-week program *</span>
                  </label>
                  {errors.commitment && (
                    <span className="error-message">{errors.commitment.message}</span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      Submit Application <Send size={20} />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Apply;

