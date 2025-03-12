// SPONSORS FORM SECTION

// CAPTURE FORM FIELDS
const errormsg = document.getElementById("errormsg");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const prefix = document.getElementById("prefix");
const email = document.getElementById("email");
const organization = document.getElementById("organization");
const continent = document.getElementById("continent");
const mobile_number = document.getElementById("mobile_number");
const country = document.getElementById("country");
const role = document.getElementById("role");
const sector = document.getElementById("sector");
const specify_sector = document.getElementById("specify_sector");
const specify_role = document.getElementById("specify_role");
const gender = document.getElementById("gender");
// const comment = document.getElementById("comment");
const submitBtn = document.getElementById("submit");
const spinnerLd = document.getElementById("spinner");
const mailing_list = document.getElementById("mailing_list");

// ADD EVENT LISTENER

function handleSectorChange(e) {
  const mysector = sector.value;
  if (mysector === "Other") {
    specify_sector.classList.remove("d-none");
  } else {
    specify_sector.classList.add("d-none");
  }
}

function handleRoleChange(e) {
  const myrole = role.value;
  console.log(myrole);
  if (myrole === "Other") {
    specify_role.classList.remove("d-none");
  } else {
    specify_role.classList.add("d-none");
  }
}

// HANDLE CHANGE
sector.addEventListener("change", handleSectorChange);
role.addEventListener("change", handleRoleChange);

async function handleSubmit(e) {
  e.preventDefault();
  const first_name_value = first_name.value;
  const last_name_value = last_name.value;
  const prefix_value = prefix.value;
  const email_value = email.value;
  const organization_value = organization.value;
  const continent_value = continent.value;
  const mobile_number_value = mobile_number.value;
  const country_value = country.value;
  const role_value = role.value;
  const gender_value = gender.value;
  const sector_value = sector.value;
  const mailing_list_value = mailing_list.checked;
  // //   const comment_value = comment.value;

  if (
    !first_name_value ||
    !last_name_value ||
    !prefix_value ||
    !email_value ||
    !organization_value ||
    !continent_value ||
    !country_value ||
    !role_value ||
    !gender_value
  ) {
    errormsg.innerHTML = "Please enter all required fields";

    setTimeout(() => {
      errormsg.innerHTML = "";
    }, 3000);
    return;
  } else {
    spinnerLd.classList.remove("d-none");
    const response = await axios.post(
      "https://api.cariscabusinessforum.com/api/v1/register",
      {
        prefix: prefix_value,
        first_name: first_name_value,
        last_name: last_name_value,
        email: email_value,
        organization: organization_value,
        continent: continent_value,
        mobile_number: mobile_number_value,
        country: country_value,
        role: role_value,
        sector: sector_value,
        gender: gender_value,
        mailing_list: mailing_list_value,
      }
    );

    if (response?.data?.status === "success") {
      sessionStorage.setItem("response", response?.data?.data);
      window.location.href = "/thanks";
      setTimeout(() => {
        window.location.href = "https://paystack.com/pay/u7wp5a0-8r";
      }, 9000);
    }
    if (response?.data?.status === "error") {
      errormsg.innerHTML = response?.data?.data;
    } else {
      console.log(response);
      errormsg.innerHTML = response?.data?.data;
      setTimeout(() => {
        errormsg.innerHTML = "";
      }, 3000);
    }
    spinnerLd.classList.add("d-none");
    // window.location.href = "/thanks.html";
  }
}

submitBtn.addEventListener("click", handleSubmit);

import { countries } from "./country.mjs";

countries
  .sort((a, b) => a - b)
  .map((c) => {
    const options = document.createElement("option");
    options.value = c.countryName;
    options.text = c.countryName;
    country.append(options);
  });
