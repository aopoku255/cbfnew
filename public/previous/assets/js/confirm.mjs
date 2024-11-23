const email = document.getElementById("email");
const submitBtn = document.getElementById("btn");
const errormsg = document.getElementById("errormsg");

async function handleSubmit(e) {
  e.preventDefault();

  const email_value = email.value.trim();

  if (!email_value) {
    errormsg.innerHTML = "Please enter email";

    setTimeout(() => {
      errormsg.innerHTML = "";
    }, 3000);
    return;
  } else {
    const response = await axios.post(
      "https://cariscabusinessforum-27yaq2miua-uc.a.run.app/api/v1/confirm-attendance",
      {
        email: email_value,
      }
    );
    if (response?.data?.status === "success") {
      window.location.href = "/thanks.html";
    } else {
      errormsg.innerHTML = response?.data?.data;
      setTimeout(() => {
        errormsg.innerHTML = "";
      }, 3000);
    }
  }
}

submitBtn.addEventListener("click", handleSubmit);
