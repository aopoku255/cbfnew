const email = document.getElementById("email");
const submitBtn = document.getElementById("btn");
const errormsg = document.getElementById("errormsg");
const fullName = document.getElementById("fullname");
const organization = document.getElementById("organization");
fullName.classList.add("d-none");
organization.classList.add("d-none");

async function handleSubmit(e) {
  e.preventDefault();

  const email_value = email.value;

  if (!email_value) {
    errormsg.innerHTML = "Please enter email";

    setTimeout(() => {
      errormsg.innerHTML = "";
    }, 3000);
    return;
  } else {
    submitBtn.innerHTML = "Loading...";
    const response = await axios.post(
      "https://cariscabusinessforum-27yaq2miua-uc.a.run.app/api/v1/checkin",
      {
        email: email_value,
      }
    );
    if (response?.data?.status === "success") {
      submitBtn.innerHTML = "Submit";
      //   window.location.href = "/thanks.html";
      fullName.innerHTML = `<b>Full Name</b>: ${response?.data?.prefix} ${response?.data?.first_name} ${response?.data?.last_name}`;
      organization.innerHTML = `<b>Organization</b>: ${response?.data?.organization}`;
      fullName.classList.remove("d-none");
      organization.classList.remove("d-none");
    } else {
      submitBtn.innerHTML = "Submit";
      errormsg.innerHTML = response?.data?.data;
      setTimeout(() => {
        errormsg.innerHTML = "";
      }, 3000);
    }
  }
}

submitBtn.addEventListener("click", handleSubmit);
