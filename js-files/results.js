 // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

 getsInfoBackend(); 
  function getsInfoBackend(){
    fetch('http://localhost:3000/surveys', {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
        },
    }).then(response => response.json())
    .then(data => {
      let databaseArray = data.data;

      let totalSurveys = totalSurveysFun(databaseArray);
      let averageAge = averageAgeFun(databaseArray); 
      let oldestPerson = getOldest(databaseArray); 
      let youngestPerson = getYoungest(databaseArray); 

      let percLikePizza = percentLike(databaseArray , "Pizza") + " %";
      let percLikePasta = percentLike(databaseArray , "Pasta") + " %";
      let percLikePap = percentLike(databaseArray , "Pap and Wors") + " %";

      let likeMovies = likeActivities(databaseArray, "watch-movies");
      let likeRadio = likeActivities(databaseArray, "listen-radio");
      let likeEatOut = likeActivities(databaseArray, "eat-out");
      let likeWatchTV = likeActivities(databaseArray, "watch-tv");

      console.log("TESTING DATA : ")
      console.log(likeMovies); 
      console.log(likeRadio);
      console.log(likeEatOut);
      console.log(likeWatchTV);
      console.log(percLikePizza  + " %"); 
      console.log(oldestPerson  +"  "+ youngestPerson); 
      console.log(averageAge); 

      let surveyResults = {
           sr_numberSurveys : totalSurveys,
           sr_averageAge : averageAge,
           sr_oldest : oldestPerson,
           sr_youngest : youngestPerson,

           sr_percPizza : percLikePizza,
           sr_percPasta : percLikePasta,
           sr_percPap : percLikePap,

           sr_likeMovies : likeMovies,
           sr_likeRadio : likeRadio,
           sr_likeEatOut : likeEatOut,
           sr_likeWatchTV: likeWatchTV

      }; 
      displayInfo(surveyResults); 
    })
    .catch(error => {
      console.error("Error:", error);
    });
 }

 function totalSurveysFun(dbArray){
  return dbArray.length; 
 }
 function averageAgeFun(dbArray){
  let ageCounter = 0;
     dbArray.forEach( (obj) => {
        
        ageCounter += getAge(obj.dob);
     });

     return roundOffOneDecimal(ageCounter/dbArray.length); 
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
function roundOffOneDecimal(number){
  return number.toFixed(1); 
}
function getOldest(dbArray){
  const sortedByAge = dbArray.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  const oldest = sortedByAge[0]; 
  return getAge(oldest.dob); 
}
function getYoungest(dbArray){
  const sortedByAge = dbArray.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  const youngest = sortedByAge[dbArray.length - 1]; 
  return getAge(youngest.dob); 
}
function percentLike(dbArray , foodName){
  let total = totalSurveysFun(dbArray);
  let counter = 0; 
  dbArray.forEach( (obj) => {
       obj.favFoodsArr.forEach( (objItem) => {
         if(objItem === foodName){
          counter ++; 
         }
       });
  }); 
  return roundOffOneDecimal((counter / total) * 100); 
}
function likeActivities(dbArray, activity){
  let counter = 0; 
  let activityCounter = 0; 
   dbArray.forEach( (obj) => {
     counter++;     
     activityCounter += parseInt(obj.radioAnswers[activity]);
  });  
  console.log(counter + " |   activity counter : " + activityCounter); 
  console.log( " | People that like it :  " + activityCounter/ counter);
  console.log( " | People that like it ( rounded off to 1 dec. place) :  " + roundOffOneDecimal(activityCounter/ counter));

  return roundOffOneDecimal(activityCounter/ counter); 
}

/*********** Display to the frontend ************ */
function displayInfo(surveyResults){
  document.querySelector(".totalSurveys").innerHTML = surveyResults.sr_numberSurveys;
  document.querySelector(".averageAge").innerHTML = surveyResults.sr_averageAge;
  document.querySelector(".oldestPerson").innerHTML = surveyResults.sr_oldest; 
  document.querySelector(".youngestPerson").innerHTML = surveyResults.sr_youngest; 

  document.querySelector(".percPizza").innerHTML = surveyResults.sr_percPizza; 
  document.querySelector(".percPasta").innerHTML = surveyResults.sr_percPasta; 
  document.querySelector(".percPap").innerHTML = surveyResults.sr_percPap; 

  document.querySelector(".likeMovies").innerHTML = surveyResults.sr_likeMovies;
  document.querySelector(".likeRadio").innerHTML = surveyResults.sr_likeRadio;
  document.querySelector(".likeEatOut").innerHTML = surveyResults.sr_likeEatOut;
  document.querySelector(".likeWatchTV").innerHTML = surveyResults.sr_likeWatchTV;


}


