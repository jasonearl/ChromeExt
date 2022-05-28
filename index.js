let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")


// this will display the list of leads in the extension
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// save the tab the is currently open in chrome to list of leads
tabBtn.addEventListener("click", function(){
    // in Chrome, get access to the tabs in the current window
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // save the current tab url to the list of leads
        myLeads.push(tabs[0].url)
        // saving to local storage will prevent the tabs from being lost
        // when Chrome is closed closed
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})


// display the leads in the extension
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// remove all of the stored leads
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// save the user input to the leads list
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // saving to local storage will prevent the tabs from being lost
    // when Chrome is closed closed
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
