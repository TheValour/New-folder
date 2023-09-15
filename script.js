const txtFiled = document.getElementById('text');
const btn = document.getElementById('btn');
const deleteBtn = document.getElementById('btn-Delete');
const tabBtn = document.getElementById('btn-Tab');
const show = document.getElementById('show');

let mySave = []

let temp = JSON.parse(localStorage.getItem("myStore"));
temp = temp?temp:[]
mySave = temp

btn.addEventListener("click", function() {
    mySave.push(txtFiled.value)
    localStorage.setItem("myStore", JSON.stringify(mySave));
    txtFiled.value = "";
    renderSave()
})

tabBtn.addEventListener("click", function() {
    console.log("Inside Tab block")
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var t = tabs[0]
        mySave.push(t.url)
        localStorage.setItem("myStore", JSON.stringify(mySave));
        renderSave()
    });
})

deleteBtn.addEventListener("click", function() {  
    localStorage.setItem("myStore", JSON.stringify([]));
    mySave = []
    renderSave()
})

function renderSave() {
    let listItem = ""
    for(let i=0; i<mySave.length; i++) {
        let temp = mySave[i]
        if(temp.includes('https') === false) {
            temp = 'https:/'+mySave[i];
        }
        listItem += `<li><a target="__blank" href='${temp}'>${mySave[i]}</a></li>` 
    }
    show.innerHTML = listItem
}
