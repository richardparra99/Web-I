async function getPersonas(){
    const response = await fetch('/api/personas');
    const responseJson = await response.json();
    return responseJson;
}

async function insertarPersonas(nuevaPersona) {
    const response = await fetch('/api/personas', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringity(nuevaPersona)
    });
    const responseJson = await response.json();
    return responseJson;
}

async function eliminarPersonas(index) {
    const response = await fetch('/api/personas/${index}', {
        method: 'DELETE'
    });
    const responseJson = await response.json();
    return responseJson;   
}