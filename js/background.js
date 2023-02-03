let LIMIT_TAB = 20;

// quand on ouvre un onglet 
chrome.tabs.onCreated.addListener(async (tab) =>{
    // le param tab de ma fonction anonyme (fléchée) permet de récupérer l'id de la tab 
    const tabs = await chrome.tabs.query({ currentWindow: true });
    // on récupère toutes les données de la fenêtre active, stockée dans la const tabs 
    //console.log(tab.id); retourne l'id 
    if (tabs.length >= LIMIT_TAB) {
        await chrome.action.setIcon({ path: "/img/dont.png" })
        .then(chrome.tabs.remove(tab.id))
        // ET si on atteint la limite, on change l'icône et on supprime la tab supp 
        .then(chrome.notifications.create("NOTFICATION_ID", {
        // ET notification quand la limite est atteinte 
            type: 'basic',
            iconUrl: "https://emoji.slack-edge.com/TFLNG6MFU/siren-rouge/888706785cc75a75.gif",
            title: "Faites le tri !",
            message: "Vous avez dépassez la limite d'onglets",
            priority:2}))
    } else {
        await chrome.action.setIcon({ path: "/img/do.png" });
    }
})

// quand on referme le dernier onglet (limite), l'icône redevient verte 
chrome.tabs.onRemoved.addListener(async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    if (tabs.length >= LIMIT_TAB) {
        await chrome.action.setIcon({ path: "/img/dont.png" });
    } else {
        await chrome.action.setIcon({ path: "/img/do.png" }).then(chrome.notifications.clear(
            "NOTFICATION_ID",
        )) 
        // on supprime la notification quand on supprime l'onglet 
    }
})

// quand l'utilisateur choisit la limite d'onglets

chrome.runtime.onMessage.addListener((data)=>{
    LIMIT_TAB = data;
})