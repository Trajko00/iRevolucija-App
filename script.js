var apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'http://irevolucija.net/wp-json/wp/v2/posts?_embed');
apiRequest.onload = function() {
  if (apiRequest.status >= 200 && apiRequest.status < 400) {
    var data = JSON.parse(apiRequest.responseText);
    //nakon sto uspesno ucita json poziva ovu funkciju, moze da se uradi splashscreen dok se ucitava data
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

apiRequest.onerror = function() {
  console.log("Connection error");
};

apiRequest.send();

function createHTML(postsData) {

  var htmlString = '';
  //loop kroz postove
  for (i = 0; i < postsData.length; i++) {
    //let imageLink = 'postsData[i]._embedded.wp:featuredmedia.source_ur';
    //pocetak diva u koji dodaje tj za svaki post pravi novu karticu
    htmlString += '<div class="card-columns"';
    htmlString += `
      <div class="card mb-2">
      <img class="card-img-top" src='${postsData[i]._embedded['wp:featuredmedia']['0'].source_url}'>
      <div class="card-body">
        <h5 class="card-title">${postsData[i].title.rendered}</h5>
        <p class="card-text">${postsData[i].excerpt.rendered}</p>
        <a href="#" target="_blank
        " class="btn btn-primary">Read More</a>
        <hr>
        <span class="badge badge-secondary">Subreddit: nesto</span>
        <span class="badge badge-dark">Score: nesto</span>
      </div>
    </div>
      `
    htmlString += '</div>';
  }
  //baci ceo string tj napravljen post u div sa klasom post
  document.getElementById('posts').innerHTML = htmlString;
}
