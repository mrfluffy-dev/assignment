async function loadPeople(name,id) {
    try {
        // fix name from spaces to dashes
        name = name.replace(/ /g, '+');
        const response = await fetch(`https://wars.mrfluffy.xyz/api/${name}`);
        const data = await response.json();
        const peopleElement = document.getElementById('people'+id);
        // Clear any existing content
        peopleElement.innerHTML = '';
        // Create a div element for the person
        const personElement = document.createElement('div');
        // Set the text content using the person's name, height, mass, hair color, skin color, eye color, birth year, and gender
        personElement.innerHTML = `Name: ${data.name}<br>
            Height: ${data.height}<br>
            Mass: ${data.mass}<br>
            Hair Color: ${data.hair_color}<br>
            Skin Color: ${data.skin_color}<br>
            Eye Color: ${data.eye_color}<br>
            Birth Year: ${data.birth_year}<br>
            Gender: ${data.gender}`;
        // Append the person element to the people element
        peopleElement.appendChild(personElement);
    } catch (error) {
        console.error('Error loading people:', error);
    }
}

// make a function to load the people it takes in to parameters name and name2 and and calles http://localhost:4200/battle/name/name2 plave the responce in id battle
async function loadBattle(name, name2) {
    try {
        // fix name from spaces to dashes
        name = name.replace(/ /g, '+');
        name2 = name2.replace(/ /g, '+');
        const response = await fetch(`https://wars.mrfluffy.xyz/battle/${name}/${name2}`);
        let data = await response.text(); // Assuming the response is plain text
        const battleElement = document.getElementById('battle');
        // Clear any existing content
        battleElement.innerHTML = '';
        // Create a div element for the battle
        const battleDiv = document.createElement('div');
        // Replace all \n with <br> and set the text content using the battle story
        battleDiv.innerHTML = data.replace(/\\n/g, '<br>');
        // Append the battleDiv element to the battleElement
        battleElement.appendChild(battleDiv);
    } catch (error) {
        console.error('Error loading battle:', error);
    }
}