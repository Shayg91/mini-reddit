var fetchdata = function() {
    var query = {
        query: `{
 	reddit {
    subreddit(name: "pics"){
      hotListings(limit: 8) {
        score
        title
        url
        numComments
        author{
          username
          linkKarma
          
        }
           
      }
    }
  }
}`
    };
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("fetching").style.display = "none";
            createTable(xhttp.response.data.reddit.subreddit.hotListings);
        }
    };
    xhttp.open("GET", "https://www.graphqlhub.com/graphql?query=" + query.query);
    xhttp.send(JSON.stringify(query));
};

function createTable(arr){
    var table = document.getElementById("listings");
    for(var i=0; i<arr.length; i++ )
    {
        var row = table.insertRow();
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);

        row.className="listing-row";

        cell0.innerHTML='<div class = "listing-id">' + i + '</div>';
        cell1.innerHTML='<div class = "listing-score">' + arr[i].score + '</div>';
        cell2.innerHTML='<div class="listing-content">' +
            '<div class="listing-title">'+ targetlink(arr[i]) +'</div>' +
            '<div class="listing-subtitle">' +
            '<div class="listing-author"><a target="_blank" href="https://old.reddit.com/user/'+arr[i].author.username+'"style="text-decoration: none">'+ arr[i].author.username +'</a></div><div class="listing-comments">'+ arr[i].numComments +' comments</div>' +
            '</div>'
            + '</div>';

    }
}

function targetlink(listing){
    if (listing.url.includes("r/pics/comments")) {
        return '<a target="_blank" href="'+listing.url+'" style="text-decoration: none">'+listing.title+'</a>';
    }
    else{
        return '<a href="#" onClick="onlyImage(\''+listing.url+'\'); "style="text-decoration: none">' + listing.title + '</a>';
    }
}

function onlyImage(url){
    document.getElementById("data").style.display = "none";
    document.getElementById("imgelink").style.display = "flex";
    document.getElementById("image").setAttribute("src", url);
    document.getElementById("body").style.overflow = "hidden";
    document.getElementById("body").style.backgroundColor = "#00dfbf";
}
function backtotable(){
    document.getElementById("data").style.display = "flex";
    document.getElementById("imgelink").style.display = "none";
    document.getElementById("body").style.overflow = "visible";
    document.getElementById("body").style.backgroundColor = "white";
}

fetchdata();
