console.log("hello")

//global variables to define json request urls

var rootUrl = "https://api.github.com/users/"
var userName = "gimmeyergold"
var baseUrl = rootUrl + userName
var reposUrl = baseUrl + "/repos"



//json request promises

var pinkyPromiseUser = $.getJSON(baseUrl)
var pinkyPromiseRepo = $.getJSON(reposUrl)

//DOM selectors to populate data when promise is fulfilled, and search selector

var userContainer = document.querySelector(".userContainer")
var repoContainer = document.querySelector(".repoContainer")
var inputEl = document.querySelector("input")



// var query = inputEl.value

//check results

console.log(baseUrl)
console.log(reposUrl)


//takes the hashified search term and passes it into the JSON request to pull unique user data

var doRequest = function(query) {

var searchBaseUrl = rootUrl + query
var searchRepoUrl = rootUrl + query + "/repos"
var pinkyPromiseUser = $.getJSON(searchBaseUrl)
var pinkyPromiseRepo = $.getJSON(searchRepoUrl)
pinkyPromiseUser.then(showUserData)
pinkyPromiseRepo.then(showRepoData)

}

//controller to be initiated when there's a hashchange

var controller = function() {
	var hash = location.hash.substr(1)
	doRequest(hash)
}

// search function to pass user search in as a hash

var handleUserInput = function(keyEvent) {
	if (keyEvent.keyCode === 13) {
		var inputEl = keyEvent.target
		var query = inputEl.value
		location.hash = query
		inputEl.value = ""
		console.log(location.hash)
	}
}

//assigns the HTMLified userData to the correct area of the page.

var showUserData = function(jsonUserData) {
	userContainer.innerHTML = userObjToHTML(jsonUserData)
	}

//assigns the HTMLified repoData to the correct area of the page.

var showRepoData = function(jsonRepoData) {

    var newRepoHTMLstring = ""
    var repoArray = jsonRepoData

    for (var i = 0; i < repoArray.length; i++) {
        repoObj = repoArray[i]
        newRepoHTMLstring += repoObjToHTML(repoObj)
        repoContainer.innerHTML = newRepoHTMLstring
       	console.log(repoObj)
    }
}

//turns the jsonUserData into HTML. This will be used to paint the page in the user profile section with the showUserData function.

var userObjToHTML = function(jsonUserData) {

	console.log(jsonUserData)

	var userAvatar = jsonUserData.avatar_url
	var userName = jsonUserData.name
	var userLogin = jsonUserData.login
	var userLocation = jsonUserData.location
	var userEmail = jsonUserData.email
	var userBlog = jsonUserData.blog
	var userCreationDate = jsonUserData.created_at
	var followers = jsonUserData.followers
	var following = jsonUserData.following

	var userHTML = '<img class="userAvatar" src="' + userAvatar + '">' + '<h1 class="userName">' + userName + '</h1>' + '<h2 class="userLogin">' + userLogin + '</h2>' + '<ul><li>' + userLocation + '</li>' + '<li>' + userEmail + '</li>' + '<li>' + userBlog + '</li>' + '<li>' + userCreationDate + '</li></ul>' + '<div class="faves"><h1>' + followers + '</h1>' + "<p>Followers</p>" + '</div><div class="faves"><h1>0</h1>' + "<p>Starred</p>" + '</div><div class="faves"><h1>' + following + '</h1>' + "<p>Following</p>" + '</div>'
	return userHTML
}

//turns the jsonRepoData into HTML. This will be used to paint the page in the repo section with the showRepoData function.

var repoObjToHTML = function(jsonRepoData) {

    var repoName = repoObj.name
    var repoDesc = repoObj.description
    var updatedAt = repoObj.updated_at
    var language = repoObj.language

    var repoHTML = '<ul class="repoItem"><h3 class="repoName">' + repoName + '</h3>' + '<p class="language">' + language + '<p class="repoDesc">' + repoDesc + '</p><p class="updatedAt">Updated at: ' + updatedAt + '</p></ul>'

    return repoHTML
}

//event listeners for the search function and the hash change. The hash change will initiate a page refresh. IDEALLY.

inputEl.addEventListener("keydown", handleUserInput)
window.addEventListener("hashchange", controller)

//initates the doRequest function with the hash phrase, minus the hashtag

doRequest(location.hash.substr(1))

//inital promises to populate the page with my user info and depos

pinkyPromiseUser.then(showUserData)
pinkyPromiseRepo.then(showRepoData)
