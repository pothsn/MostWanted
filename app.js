function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      // TODO: search by name
    var foundPerson = searchByName(people);
    break;
    case 'no':
    // TODO: search by traits
    var foundPerson = searchByTraits(people);
    break;
    default:
    app(people); // restart app
    break;
  }
  mainMenu(foundPerson[0], people);
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
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response.toLowerCase();
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function traitTypes(input){
  return input.toLowerCase()  == "gender" || input.toLowerCase() == "dateofbirth" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "eyecolor" || input.toLowerCase() == "occupation";
}
function maleOrFemale(input){
    return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}
// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
function searchByTraits(people){
  var searchType = promptFor("Which trait would you like to seach by? Enter: Gender, date of birth, height, weight, eye color, occupation.", traitTypes).trim();
    switch(searchType){
      case 'gender':
        searchByGender(people);
        break;
      case 'dateofbirth':
        searchByDateOfBirth();
        break;
      case 'height':
        searchByHeight();
        break;
      case 'weight':
        searchByWeight();
        break;
      case 'eyecolor':
        searchByEyeColor();
        break;
      case 'occupation':
        searchByOccupation();
        break;
    }
}
function searchByGender(people){
  var searchGender = promptFor("Enter gender: Male or female.", maleOrFemale).trim();
    var genderList = people.filter(function(person){
      if(person.gender === searchGender){
        return true;
      }
      else{
        return false;      
      }
    })
  displayPeople(genderList);



 }
