export default function ProgressBar({ currentStep }) {
  return (
    <>
      <section className="progress-stepper">
        <ul className="stepper-list">
          {[...Array(3)].map((_, index) => {
            // creates an array of 3 steps
            const stepNumber = index + 1;
            const isCurrent = currentStep === stepNumber; // checks if currentStep matches the current step num
            const isCompleted = currentStep > stepNumber; // then check if currentStep has already been completed

            return (
              <li
                key={stepNumber}
                className={`stepper-item ${
                  isCurrent
                    ? "current-item"
                    : isCompleted
                    ? "completed-item"
                    : ""
                }`} // apply the correct class based on the currentStep value
              >
                <span className="progress-count">{stepNumber}</span>
                <span className="progress-label">
                  {["Create Event", "Add Car", "Share"][index]}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
      {/* # 2 */}
    </>
  );
}
