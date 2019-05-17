function app(people){
  convertDOBsToAges(people);
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  var foundPerson;
  switch(searchType){
    case 'yes':
      // TODO: search by name
    foundPerson = searchByName(people);
    break;
    case 'no':
    // TODO: search by traits
    foundPerson = searchByTraits(people);
    break;
    default:
    app(people); // restart app
    break;
  }
  if (foundPerson.length === 1) {
      mainMenu(foundPerson[0], people);
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).replace(/ /g,'').toLowerCase();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function selectTraitTypes(input){
  return input.toLowerCase()  == "gender" || input.toLowerCase() == "dateofbirth" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "eyecolor" || input.toLowerCase() == "occupation";
}
function selectMaleOrFemale(input){
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}
// function selectBirthRange(input){
//   return input.toLowerCase() = 
// }


function isNumber(input){
  return !isNaN(input); 
}

function selectEyeColor(input){
  return input.toLowerCase() == "black" || input.toLowerCase() == "blue" || input.toLowerCase() == "brown" || input.toLowerCase() == "green" || input.toLowerCase() == "hazel";
}
function selectOccupation(input){
  return input.toLowerCase() == "architect" || input.toLowerCase() == "assistant" || input.toLowerCase() == "doctor" || input.toLowerCase() == "landscaper" || input.toLowerCase() == "nurse" || input.toLowerCase() == "politician" || input.toLowerCase() == "programmer" || input.toLowerCase() == "student";
}
// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
function searchByTraits(people){
  var searchType = promptFor("Which trait would you like to search by? Enter: Gender, date of birth, height, weight, eye color, occupation.", selectTraitTypes).trim();

  var results = [];
    switch(searchType){
      case 'gender':
        results = searchByGender(people);
        break;
      case 'dateofbirth':
        searchByDateOfBirth(people);
        break;
      case 'height':
        searchByHeight(people);
        break;
      case 'weight':
        searchByWeight(people);
        break;
      case 'eyecolor':
        searchByEyeColor(people);
        break;
      case 'occupation':
        searchByOccupation(people);
        break;
    }
    return results;
}
function searchByGender(people){
  var searchGender = promptFor("Enter gender: Male or female.", selectMaleOrFemale).trim();
    var genderList = people.filter(function(person){
      if(person.gender === searchGender){
        return true;
      }
      else{
        return false;      
      }
    })
  displayPeople(genderList);
  return genderList;
 }
function searchByAge(people){
  var searchAge = promptFor("Enter age.", isNumber).trim();
    var ageList = people.filter(function(person){
      if(person.age == searchAge){
        return true;
      }
      else{
        return false;
      }
    })
  displayPeople(ageList);
  return ageList;
}

function convertDOBsToAges(people) {
  var today = new Date();
    people = people.map(function(person) {
      // need to grab person dob and split the string
      // let personBirthdate = new Date(yyyy, mm, dd);
      let age = 
      person.age = age;
      return person;
    });
}

function searchByHeight(people){
  var searchHeight = promptFor("Enter the person's height", isNumber).trim();
    let heightList = people.filter(function(person){
      if(person.height == searchHeight){
        return true;
      }
      else{
        return false;
      }
    })
  displayPeople(heightList);  
  return heightList;
}

function searchByWeight(people){
    var searchWeight = promptFor("Enter weight.", isNumber).trim();
      
        var weightList = people.filter(function(person){
          if(person.weight == searchWeight){
            return true;
          }
          else{
            return false
          }
        })
    displayPeople(weightList);
    return weightList;
}
function searchByEyeColor(people){
  var searchEyeColor = promptFor("Enter eye color: Black, blue, brown, green or hazel", selectEyeColor).trim();
    let eyeColorList = people.filter(function(person){
      if(person.eyeColor === searchEyeColor){
        return true;
      }
      else{
        return false;
      }
    })
  displayPeople(eyeColorList);
  return eyeColorList;
}
function searchByOccupation(people){
  var searchOccupation = promptFor("Enter occupation: Architect, assistant, doctor, landscaper, nurse, politician, programmer or student.", selectOccupation).trim();
    let occupationList = people.filter(function(person){
      if(person.occupation === searchOccupation){
        return true;
      }
      else{
        return false;
      }
    })
  displayPeople(occupationList);
  return occupationList;
}
