const bookmarksContainer = document.getElementById('bookmarks-container')
const modalElement = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameElement = document.getElementById('website-name')
const websiteUrlElement = document.getElementById('website-url')

let bookmarks = []


function showModal(){
    modalElement.classList.add('show-modal')
    websiteNameElement.focus()
    console.log(modalElement)
}

function closeModal(){
    modalElement.classList.remove('show-modal')
}

function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(urlValue.match(regex)){
        alert('match');
    }
    if(!urlValue.match(regex)){
        return false
    }
}
// Build Bookmarks
function buildBookmarks(){
    for (i in bookmarks){
        bookmarks[i]

        outerDiv = document.createElement('div')
        outerDiv.className ='item'
        outerDiv.id = `${bookmarks[i].name}`
        bookmarksContainer.appendChild(outerDiv)
        newIcon = document.createElement('i')
        newIcon.className= 'fas fa-times'
        newIcon.id = `${bookmarks[i].name}-i`
        // newIcon.title = 'Delete Bookmark'
        
        document.getElementById(`${bookmarks[i].name}`).appendChild(newIcon)

        innerDiv = document.createElement('div')
        innerDiv.className = 'name'
        innerDiv.id = `${bookmarks[i].name}-inner`
        document.getElementById(`${bookmarks[i].name}`).appendChild(innerDiv)

        newImg = document.createElement('img')
        newImg.src = `https://s2.googleusercontent.com/s2/favicons?domain=${bookmarks[i].url}`
        document.getElementById(`${bookmarks[i].name}-inner`).appendChild(newImg)

        newA= document.createElement('a')
        newA.href = bookmarks[i].url
        newA.textContent = bookmarks[i].name
        document.getElementById(`${bookmarks[i].name}-inner`).appendChild(newA)

    }
}

// Fetch Bookmarks
function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }
    else{
        bookmarks = [
            {
                name:'konga',
                url:'https://konga.com'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    console.log("bookmarks:", bookmarks)
}
// Delete Bookmark
function deleteBookMark(url){
    console.log('delete URL', url)
    // for (i in bookmarks){
        // chosenId = document.getElementById(`${bookmarks[i].name}-i`)
        // target.addEventListener('click', ()=>{
        //     console.log('this is it')
        //     // bookmarksContainer.removeChild(chosenId)
        // })
    // }
}

function addBookmark(e){
    e.preventDefault()

    const nameValue = websiteNameElement.value
    let urlValue = websiteUrlElement.value

    if(!urlValue.includes('http://', 'https://')){
        urlValue = `https://${urlValue}`
    }
    const bookmark={
        name: nameValue,
        url: urlValue,
        
    }
    bookmarks.push(bookmark);
    // console.log(bookmarks)

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
    // localStorage.getItem('bookmarks')
    bookmarkForm.requestPointerLock()

    closeModal()

        outerDiv = document.createElement('div')
        outerDiv.className ='item'
        outerDiv.id = `${nameValue}`
        bookmarksContainer.appendChild(outerDiv)
        newIcon = document.createElement('i')
        newIcon.setAttribute('onclick', `deleteBookmark('${urlValue}')`)
        newIcon.className= 'fas fa-times'
        newIcon.id = `${nameValue}-i`
        // newIcon.title = 'Delete Bookmark'
        
        document.getElementById(`${nameValue}`).appendChild(newIcon)

        innerDiv = document.createElement('div')
        innerDiv.className = 'name'
        innerDiv.id = `${nameValue}-inner`
        document.getElementById(`${nameValue}`).appendChild(innerDiv)

        newImg = document.createElement('img')
        newImg.src = `https://s2.googleusercontent.com/s2/favicons?domain=${urlValue}`
        document.getElementById(`${nameValue}-inner`).appendChild(newImg)

        newA= document.createElement('a')
        newA.href = urlValue
        newA.textContent = nameValue
        document.getElementById(`${nameValue}-inner`).appendChild(newA)

        console.log(nameValue, urlValue)
        validate(nameValue, urlValue)
    }
        
    


// Event Listeners
 modalShow.addEventListener('click', showModal)
 modalClose.addEventListener('click', closeModal)
 
bookmarkForm.addEventListener('submit', addBookmark)

// On load fetch bookmarks
fetchBookmarks()
buildBookmarks()
