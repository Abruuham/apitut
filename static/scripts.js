// const tweetElement = document.querySelector('.tweet');


// setInterval(function(){
//     $.ajax({
//         url: "http://localhost:5000/get_updates",
//         type: "GET",
//         dataType: "json",
//         success: function(data){
//             // console.log(data);
//             tweetElement.innerHTML = '';


//             for(i = 0;i < data.length; i++){
//                 var temp = document.createElement("div")
//                 temp.className = "tweet";
//                 temp.innerHTML = data[i].tweet;
//                 document.getElementById("feed").appendChild(temp);
//             }
//         },
//         error: function(request, error){
//             console.log(error);
//         }
//     });
// }, 5000); // check every 5 seconds

console.log('Hello World!');

const form = document.querySelector('form'); // grabbing an element on the page
// const errorElement = document.querySelector('.error-message');
// const loadingElement = document.querySelector('.loading');
const tweetElement = document.querySelector('.tweet');
const loadMoreElement = document.querySelector('#loadMore');
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:5000/get_updates' : 'https://127.0.0.1:5000/get_updates';

let skip = 0;
let limit = 5;
let loading = false;
let finished = false;

// errorElement.style.display = 'none';

document.addEventListener('scroll', () => {
  const rect = loadMoreElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && !loading && !finished) {
    loadMore();
  }
});

listAllTweets();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('tweet');

  if (name.trim() && content.trim()) {
    errorElement.style.display = 'none';
    form.style.display = 'none';
    loadingElement.style.display = '';

    const tweet = {
      name,
      content
    };
    
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(mew),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {      
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType.includes('json')) {
          return response.json().then(error => Promise.reject(error.message));
        } else {
          return response.text().then(message => Promise.reject(message));
        }
      }
    }).then(() => {
      form.reset();
      setTimeout(() => {
        form.style.display = '';
      }, 30000);
      listAllMews();
    }).catch(errorMessage => {
      form.style.display = '';
    //   errorElement.textContent = errorMessage;
    //   errorElement.style.display = '';
      loadingElement.style.display = 'none';
    });
  } else {
    errorElement.textContent = 'Field cannot be empty.';
    errorElement.style.display = '';
  }
});

function loadMore() {
  skip += limit;
  listAllTweets(false);
}

function listAllTweets(reset = true) {
  loading = true;
  if (reset) {
    tweetElement.innerHTML = '';
    skip = 0;
    finished = false;
  }
  fetch(`${API_URL}`)
    .then(response => response.json())
    .then(result => {
      result.forEach(tweet => {
        const div = document.createElement('div');
        div.className = "post";

        const header = document.createElement('h3');
        header.textContent = tweet.tweet_id;

        const contents = document.createElement('p');
        contents.textContent = tweet.tweet_author;

        const date = document.createElement('small');
        date.textContent = new Date(tweet.tweet_date);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        tweetElement.appendChild(div);
      });
      loadingElement.style.display = 'none';
      if (!result.meta.has_more) {
        loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        loadMoreElement.style.visibility = 'visible';
      }
      loading = false;
    });
}


