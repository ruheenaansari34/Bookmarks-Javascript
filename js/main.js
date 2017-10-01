//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	//Get form values
	var siteName=document.getElementById('siteName').value;
	console.log(siteName);
	var siteUrl=document.getElementById('siteUrl').value;


	/*if(!validateForm(siteName,siteUrl)){
		return false;
	}*/


	var bookmark={
		name: siteName,
		url: siteUrl	
	}
/*
	localStorage.setItem('test','Hello World');
	console.log(localStorage.getItem('test'));
	localStore.removeItem('test');
	console.log(localStorage.getItem('test'));*/

	//test if bookmarks is null
	localStorage.removeItem('test') ;
	if(localStorage.getItem('bookmarks')===null){
		//init array
		var bookmarks=[];

		//Add to array
		bookmarks.push(bookmark);
		//set to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	else {
		//Get bookmarks from LocalStorage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	//clear form

	document.getElementById('myForm').reset();

	fetchBookmarks();

	//Prevent form from submitting
	e.preventDefault();
}



function deleteBookmark(url){
	//console.log(url);
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	for(var i=0;i<bookmarks.length;i++){
		if(bookmarks[i].url==url){
			//Remove the bookmark

			bookmarks.splice(i,1);

		}
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); 

		//re-fetch bookmarks
		fetchBookmarks();
		
	}
}

//fetch bookmarks
function fetchBookmarks(){
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

	var bookmarksResults=document.getElementById('bookmarksResults');

	bookmarksResults.innerHTML='';

	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

		bookmarksResults.innerHTML+='<div class="well">'+
									'<h2>'+name+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+
									' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+
									' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
									'</h3>'+
									'</div>';

	}
}


function validateForm(siteName,siteUrl){
if(!siteName||!siteUrl){
		alert('Invalid inputs');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	
	if(!siteUrl.match(regex)){
		alert('Please use valid url');
		return false;
	}
	return true;
}