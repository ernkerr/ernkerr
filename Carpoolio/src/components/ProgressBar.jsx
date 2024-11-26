export default function ProgressBar({ currentStep }) {
  const steps = ["Create Event", "Car Details", "Customize Event"];
  const progress = (currentStep / steps.length) * 100;
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-step">
          Step {currentStep} of {steps.length} :
        </span>
        <span className="progress-title">{steps[currentStep - 1]}</span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-glow" />
      </div>
    </div>
  );
}
