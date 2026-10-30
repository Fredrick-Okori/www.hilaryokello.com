// Google requires this disclosure when the floating reCAPTCHA badge is hidden
// (see .grecaptcha-badge in app/global.css).
export function RecaptchaNotice() {
  return (
    <p className="text-xs text-ink/50">
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        className="underline hover:text-ink/70"
        href="https://policies.google.com/privacy"
        rel="noopener noreferrer"
        target="_blank"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        className="underline hover:text-ink/70"
        href="https://policies.google.com/terms"
        rel="noopener noreferrer"
        target="_blank"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
