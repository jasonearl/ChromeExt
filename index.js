let myBookmarks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const bookmarksFromLocalStorage = JSON.parse( localStorage.getItem("myBookmarks") )
const tabBtn = document.getElementById("tab-btn")


// this will display the list of bookmarks in the extension
if (bookmarksFromLocalStorage) {
    myBookmarks = bookmarksFromLocalStorage
    render(myBookmarks)
}

// save the tab the is currently open in chrome to list of bookmarks
tabBtn.addEventListener("click", function(){
    // in Chrome, get access to the tabs in the current window
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // save the current tab url to the list of bookmarks
        myBookmarks.push(tabs[0].url)
        // saving to local storage will prevent the tabs from being lost
        // when Chrome is closed closed
        localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks) )
        render(myBookmarks)
    })
})


// display the bookmarks in the extension
function render(bookmarks) {
    let listItems = ""
    for (let i = 0; i < bookmarks.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${bookmarks[i]}'>
                    ${bookmarks[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// remove all of the stored bookmarks
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myBookmarks = []
    render(myBookmarks)
})

// save the user input to the bookmarks list
inputBtn.addEventListener("click", function() {
    myBookmarks.push(inputEl.value)
    inputEl.value = ""
    // saving to local storage will prevent the tabs from being lost
    // when Chrome is closed closed
    localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks) )
    render(myBookmarks)
})
