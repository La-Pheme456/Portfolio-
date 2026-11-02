document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-enquiry");
  if (!form) return;
  const recipient = "femilawal433@gmail.com";
  const status = document.querySelector("#contact-form-status");
  document.querySelector("#copy-email").addEventListener("click", async () => {
    const feedback = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText(recipient);
      feedback.textContent = "Email address copied.";
    } catch {
      feedback.textContent = "Copy isn't available here. Select the email address above, or click it to open your email app.";
    }
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name;
    const message = form.elements.message;
    for (const field of [name, message]) {
      field.setCustomValidity(field.value.trim() ? "" : "Please fill in this field.");
    }
    if (!form.reportValidity()) return;
    const subject = encodeURIComponent(form.elements.topic.value + " - " + name.value.trim());
    const body = encodeURIComponent("Hello LA-Code,\n\nName: " + name.value.trim() +
      "\nEmail: " + form.elements.email.value.trim() + "\nEnquiry: " + form.elements.topic.value +
      "\n\n" + message.value.trim() + "\n\nSent from the LA-Code portfolio.");
    status.textContent = "Your email draft is ready to open. Send it from your email app. If nothing opens, email " + recipient + " directly.";
    window.location.href = "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
  });
  form.addEventListener("input", (event) => {
    if (typeof event.target.setCustomValidity === "function") event.target.setCustomValidity("");
  });
});
