function app(people){
  convertDOBsToAges(people);
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  var foundPerson;
  switch(searchType){
    case 'yes':
    foundPerson = searchByName(people);
    break;
    case 'no':
    foundPerson = searchByTraits(people);
    break;
    default:
    app(people);
    break;
  }
    mainMenu(foundPerson[0], people);
}

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people); 
  }

  var displayOption = promptPersonFound("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", selectPromptPersonFound).toLowerCase();

  switch(displayOption){
    case 'info':
    info = displayPerson(person);
    break;
    case "family":
    family = displayFamily(person, people);
    break;
    case "descendants":
    descendants = getDescendants(person, people);
    displayPeople(descendants);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
      return true;
    }
      else{
      return false;
    }
  })

  return foundPerson;
}

function displayPeople(people){
  if(people.length > 0){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  }
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "age: " + person.age + "\n";
  personInfo += "eye color: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function displayFamily(person, people){
  let parents = searchForParents(person, people);
  let siblings = searchForSiblings(person, people);
  let spouse = searchForCurrentSpouse(person, people);

  let personInfo = "";

    if(parents.length === 0){
      personInfo = "No parents" + "\n";
    }
    else{
      for(let i = 0; i < parents.length; i++) {
        let el = parents[i];
        personInfo += "Parent Name: " + el.firstName + " " + el.lastName + "\n";
      }  
    }

    if(siblings.length === 0){
      personInfo += "No siblings" + "\n";
    }
    else{
      for(let i = 0; i < siblings.length; i++) {
        personInfo += "Sibling: " + siblings[i].firstName + " " + siblings[i].lastName + "\n";
      }
    }

    if(spouse.length === 0){
      personInfo += "No spouse" + "\n";
    }
    else{
      for(let i = 0; i < spouse.length; i++) {
        personInfo += "Spouse: " + spouse[i].firstName + " " + spouse[i].lastName + "\n";
      }
    }
  alert(personInfo);
}

function getDescendants(person, people, descendants = []){
    people.map(function(el){
    if(person.id == el.parents[0] || person.id == el.parents[1]){
      descendants.push(el);
      getDescendants(el, people, descendants);
    }
  })
  if(descendants == 0){
    alert("This person has no descendants.");
    return app(people);
  }
  else{
  return descendants;
  }
}

function searchForSiblings(person, people){
  let siblingsNames;
  if(person.parents[0] == undefined){
    return [];
  }
  else{
    siblingsNames = people.filter(function(el){
    if(el.parents[0] == undefined){
      return false;
    }
    else{
      if(person.parents[0] == el.parents[1] || person.parents[1] == el.parents[1]){
        return true;
      }
      else{
        return false;
      }
    }
  });
  }
  return siblingsNames;
}

function promptFor(question, valid){
  do{
    var response = prompt(question).replace(/ /g,'').toLowerCase();
  } while(!response || !valid(response));
  return response;
}

function promptPersonFound(question, valid){
  do{
    var response = prompt(question).replace(/ /g,'').toLowerCase();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function selectSingleOrMulti(input){
  return input.toLowerCase() == "one" || input.toLowerCase() == "multiple";
}

function selectTraitTypes(input){
  return input.toLowerCase()  == "gender" || input.toLowerCase() == "age" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "eyecolor" || input.toLowerCase() == "occupation";
}

function selectMaleOrFemale(input){
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

function isNumber(input){
  return !isNaN(input); 
}

function selectEyeColor(input){
  return input.toLowerCase() == "black" || input.toLowerCase() == "blue" || input.toLowerCase() == "brown" || input.toLowerCase() == "green" || input.toLowerCase() == "hazel";
}

function selectOccupation(input){
  return input.toLowerCase() == "architect" || input.toLowerCase() == "assistant" || input.toLowerCase() == "doctor" || input.toLowerCase() == "landscaper" || input.toLowerCase() == "nurse" || input.toLowerCase() == "politician" || input.toLowerCase() == "programmer" || input.toLowerCase() == "student";
}

function selectPromptPersonFound(input){
  return input.toLowerCase() == "info" || input.toLowerCase() == "family" || input.toLowerCase() == "descendants" || input.toLowerCase() == "restart" || input.toLowerCase() == "quit";
}

function chars(input){
  return true; 
}

function searchByTraits(people){
  var searchType = promptFor("Would you like to search by one trait or multiple traits? Enter one or multiple.", selectSingleOrMulti).trim();
    switch (searchType){
      case "one":
        searchByOneTrait(people);
      case "multiple":
        searchByMultipleTraits(people);
    } 
}

function searchByMultipleTraits(people){
  var searchTraitType = promptFor("Which trait would you like to search by? Enter: Gender, age, height, weight, eye color, occupation.", selectTraitTypes).trim();
  var results = [];
    switch(searchTraitType){
      case 'gender':
       results = searchByGender(people);
        break;
      case 'age':
       restults = searchByAge(people);
        break;
      case 'height':
        results = searchByHeight(people);
        break;
      case 'weight':
        results = searchByWeight(people);
        break;
      case 'eyecolor':
        results = searchByEyeColor(people);
        break;
      case 'occupation':
        results = searchByOccupation(people);
        break;
      }
      while(results.length > 1 || results.length === 0 ){
        if(results.length === 0 ){
          alert("Your search yielded no results, resuming from last search.");
          searchByMultipleTraits(people);
        } else{
          searchByMultipleTraits(results);
        }
      }
   var selectName = prompt(results.map(function(person){
    return person.firstName + " " + person.lastName;
      }).join("\n") + "\n Is the person you are looking for listed here? Enter their name or quit.").toLowerCase();
        if(selectName == "quit"){
          app(people);
        } 
        else{
          let splitName = selectName.split(" ");

        var foundPerson = people.filter(function(person){
          if(person.firstName.toLowerCase() === splitName[0].toLowerCase() && person.lastName.toLowerCase() === splitName[1].toLowerCase()){
            return true;
          }
            else{
            return false;
          }
        })
        mainMenu(foundPerson[0], people)
        }
}

function searchByOneTrait(people){
var searchTraitType = promptFor("Which trait would you like to search by? Enter: Gender, age, height, weight, eye color, occupation.", selectTraitTypes).trim();
  var results = [];
    switch(searchTraitType){
      case 'gender':
        results = searchByGender(people);
        break;
      case 'age':
        results = searchByAge(people);
        break;
      case 'height':
         results = searchByHeight(people);
        break;
      case 'weight':
        results = searchByWeight(people);
        break;
      case 'eyecolor':
        results = searchByEyeColor(people);
        break;
      case 'occupation':
        results = searchByOccupation(people);
        break;
      }
      var selectName = prompt(results.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n") + "\n Is the person you are looking for listed here? Enter their name or quit").toLowerCase();
        if(selectName == "quit"){
          app(people);
        } 
        else{
          let splitName = selectName.split(" ");

        var foundPerson = people.filter(function(person){
          if(person.firstName.toLowerCase() === splitName[0].toLowerCase() && person.lastName.toLowerCase() === splitName[1].toLowerCase()){
            return true;
          }
            else{
            return false;
          }
        })
        mainMenu(foundPerson[0], people);
        }
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

function convertDOBsToAges(people){
  var today = new Date();
    people.map(function(person){
      let persondob = person.dob.split("/");
      let month = persondob[0];
      let day = persondob[1];
      let year = persondob[2];
      let personBirthYear = today.getFullYear() - year;
        if(today.getMonth() > month){
          personBirthYear ++
        }
        else if(today.getMonth == month){
          if(today.getDate() > day){
            personBirthYear++;
          }
        }
      let age = personBirthYear;
      person.age = age;
    });
}

function searchForParents(person, people){
  var parentsName = people.filter(function(el){
    for (let index = 0; index < person.parents.length; index++) {
      const element = person.parents[index];
      if (element === el.id) {
        return true;
      } 
    }
  });
return parentsName;
}

function searchForCurrentSpouse(person, people){
  let spouseName;
  if(person.currentSpouse == undefined){
    return [];
  }
  else{
    spouseName = people.filter(function(el){
      if(person.currentSpouse == el.id){
        return true;
      }
      else{
        return false;
      }
    })
   return spouseName;
  }
}

function searchForSiblings(person, people){
  let siblingsNames;
  if(person.parents[0] == undefined){
    return [];
  }
  else{
    siblingsNames = people.filter(function(el){
    if(el.parents[0] == undefined){
      return false;
    }
    else{
      if(person.parents[0] == el.parents[1] || person.parents[1] == el.parents[1]){
        return true;
      }
      else{
        return false;
      }
    }
  });
  }
  return siblingsNames;
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
            return false;
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