//----------Pour indiquer le nombre d'onglets ouverts
let tabs = await chrome.tabs.query({ currentWindow: true });

// Mettre au singulier ou au pluriel selon le nombre de tab ouvert
if (tabs.length ==1 ){
    document.getElementsByName('tabNumber')[0].textContent = "Vous avez "+tabs.length+" onglet ouvert"
} 
else{
    document.getElementsByName('tabNumber')[0].textContent = "Vous avez "+tabs.length+" onglets ouverts"
}

//----------Pour récupérer les informations de l'input  
let inputValue = document.getElementById("limit").addEventListener("input", () => console.log(document.getElementById("limit").value));
//console.log(inputValue);

//---------Evolution de l'arrière-plan en fonction du nombre d'onglets limite
if(tabs.length <=5){
    document.body.style.background = 'green'
} else if (tabs.length >=6 && tabs.length <=15){
    document.body.style.background = 'orange'
} else{
    document.body.style.background = 'red'
}


let bouton = document.getElementById("btn");
console.log(bouton);

bouton.addEventListener('click', event => {
    //console.log(document.getElementById("limit").value);
    bouton.innerHTML = "Votre limite : " + (document.getElementById("limit").value) + " onglets";
    // retourne la valeur choisie au clic dans la console et sur le bouton

    chrome.runtime.sendMessage(
        document.getElementById("limit").value
      )
})