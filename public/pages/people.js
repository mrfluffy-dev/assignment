async function loadPeople(name,id) {
    try {
        // fix name from spaces to dashes
        name = name.replace(' ', '+');
        const response = await fetch(`http://localhost:4200/api/${name}`);
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