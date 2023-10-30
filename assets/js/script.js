const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  const form = $.querySelector("#contact-form");
  const submitButton = $.querySelector("#submit-btn");

  // Function to empty the form
  const cleanForm = () => {
    form.reset();
  };

  // Function to deactivate the submit button
  const isDisabled = () => {
    submitButton.setAttribute("disabled", "disabled");
    submitButton.classList.add("disabled-btn");
  };

  // Function to reactivate the submit button
  const isEnabled = () => {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("disabled-btn");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    isDisabled();

    const data = {
      firstname: $.querySelector("#firstname").value,
      lastname: $.querySelector("#lastname").value,
      email: $.querySelector("#email").value,
      // subject: $.querySelector("#subject").value,
      message: $.querySelector("#message").value,
    };

    try {
      const response = await axios.post(
        "https://site--form-backend--c9n4rr6v2pd4.code.run/form",
        data
      );

      if (response.status === 200) {
        alert("Votre formulaire a bien été envoyé");
        cleanForm();
        isEnabled();
      }
    } catch (error) {
      if (error.response?.data.message === "Missing parameters") {
        alert("Veuillez remplir tous les champs du formulaire");
      } else {
        alert("Une erreur est survenue");
        cleanForm();
      }

      isEnabled();
    }
  });
});
