 // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });


  let surveyForm_elem = document.querySelector("#survey-form") ; 

  surveyForm_elem.addEventListener("submit" , (e) => {
      e.preventDefault(); // prevents normal behavior of a form 

      const fullName = document.querySelector(".full-names").value.trim() ;
      const email = document.querySelector(".email").value.trim(); 
      const dob = document.querySelector(".date").value.trim() ; 
      let contact = document.querySelector(".number").value.trim() ; 
      // Validation 

      let errorMsgDate = document.querySelector(".error-message-date"); 
      let userAge = getAge(dob);

      if( userAge < 5 || userAge >= 120){
        setTimeout( () => {
        errorMsgDate.innerHTML = "";
        }, 2000);
        errorMsgDate.innerHTML = "You have to be between 5 - 120 years old."
        return ; 
      }
        
      const cleanedContact = contact.replace(/\s+/g, '');
      let notValid = false;
      if( cleanedContact.slice(0,3) == "+27"){
        let newCC = "0" + cleanedContact.slice(3,12); 
        
        validateTel(newCC); 
      } else {
        validateTel(cleanedContact);
      }
      
      let errorMsgContact = document.querySelector(".error-message-contact");
      function validateTel(cleanedContact){
      if (cleanedContact.length !== 10 || isNaN(cleanedContact)) {
       
        notValid = true;
      }
       contact = cleanedContact; 

      }
      if(notValid){
        setTimeout( () => {
        errorMsgContact.innerHTML = "";
        }, 2000);
        errorMsgContact.innerHTML = "Please enter a valid 10 digit number";
        return; 
      }

      const isAnyChecked = () => {
      const checkboxes = document.querySelectorAll(".fav-food-checkbox");
      return Array.from(checkboxes).some(checkbox => checkbox.checked);
    };

    let errorMsgFavFood = document.querySelector(".error-message-favFood");
    // Example usage:
    if (!isAnyChecked()) {
      setTimeout( () => {
        errorMsgFavFood.innerHTML = "";
        }, 2000);
        errorMsgFavFood.innerHTML = "Please select atleast one favorite food";
      return; 
    }
      // gets the fav food values 

      let favFoodArr = document.querySelectorAll(".fav-food-checkbox"); 
     let selectedFoods = []; 
      favFoodArr.forEach( (cbElem) => {
        if(cbElem.checked){
          selectedFoods.push(cbElem.value);
        }
        
      });
  
      function getRadioValue(name) {
      const checked = document.querySelector(`.table-body input[name='${name}']:checked`);
      return checked ? checked.value || "value for the name attribute is empty" : "not-selected" ; 
    }

    const radioAnswers = {
      "watch-movies": getRadioValue("watch-movies"), 
      "listen-radio": getRadioValue("listen-radio"),
      "eat-out": getRadioValue("eat-out"),
      "watch-tv":getRadioValue("watch-tv")
    }

    let errorMsgRadio = document.querySelector(".error-message-radio"); 
    const hasMissing = Object.values(radioAnswers).some(value => value === "not-selected");

    if (hasMissing) {
      setTimeout( () => {
        errorMsgRadio.innerHTML = "";
        }, 3000);
        errorMsgRadio.innerHTML = "Please rate your level of agreement for every option before submitting";
      
      return; 
    } 
    
    let UserObj = {
      fullName : fullName,
      email: email,
      dob: dob, 
      contact : contact,
      favFoodsArr: selectedFoods,
      radioAnswers: radioAnswers
    }
    
       // Validated the info , now going to send it to the backend using fetch 
    sendsInfoBackend(UserObj)
    resetForm(); 
    swal("Form submitted successfully!");
    }); 

 function sendsInfoBackend(UserObj){
  fetch('http://localhost:3000/submit', {
     method: "POST",
     headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(UserObj)
  }).then(response => response.json())
  .then(data => {
    // Handle data
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
 }

  function getAge(birthDateString) {
  const birthDate = new Date(birthDateString); // e.g., "2000-06-01"
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has not occurred yet this year
  const hasBirthdayPassedThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--; // birthday hasn't happened yet this year
  }

  return age;
}
function resetForm(){
  document.querySelector("#survey-form").reset();
}