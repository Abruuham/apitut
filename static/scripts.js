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
const API_URL = 'http://127.0.0.1:5000/get_updates';

let skip = 0;
let limit = 5;
let loading = false;
let finished = false;

// errorElement.style.display = 'none';

// document.addEventListener('scroll', () => {
//   const rect = loadMoreElement.getBoundingClientRect();
//   if (rect.top < window.innerHeight && !loading && !finished) {
//     loadMore();
//   }
// });

listAllTweets();

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const formData = new FormData(form);
//   const name = formData.get('tweet');

//   if (name.trim()) {
//     // errorElement.style.display = 'none';
//     form.style.display = 'none';
//     // loadingElement.style.display = '';

//     const tweet = {
//       name
//     };
//     listAllTweets();
    
//     // fetch(API_URL, {
//     //   method: 'POST',
//     //   body: JSON.stringify(tweet),
//     //   headers: {
//     //     'content-type': 'application/json'
//     //   }
//     // }).then(response => {      
//     //   if (!response.ok) {
//     //     const contentType = response.headers.get('content-type');
//     //     if (contentType.includes('json')) {
//     //       return response.json().then(error => Promise.reject(error.message));
//     //     } else {
//     //       return response.text().then(message => Promise.reject(message));
//     //     }
//     //   }
//     // }).then(() => {
//     //   form.reset();
//     //   setTimeout(() => {
//     //     form.style.display = '';
//     //   }, 30000);
//     //   listAllTweets();
//     // }).catch(errorMessage => {
//     //   form.style.display = '';
//     // //   errorElement.textContent = errorMessage;
//     // //   errorElement.style.display = '';
//     //   // loadingElement.style.display = 'none';
//     // });
//   } else {
//     errorElement.textContent = 'Field cannot be empty.';
//     errorElement.style.display = '';
//   }
// });

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

        const header = document.createElement('div');
        header.className = "post__avatar";
        const image = document.createElement('img');
        image.src = "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png";
        header.appendChild(image);

        const post_body = document.createElement('div');
        post_body.className = 'post__body';

        const post__header = document.createElement('div');
        post__header.className = 'post__header'
        
        post_body.appendChild(post__header);

        const post_header_text = document.createElement('div');
        post_header_text.className = 'post__headerText';

        const post_header_description = document.createElement('div');
        post_header_description.className = 'post__headerDescription';

        post__header.appendChild(post_header_text);


        const p = document.createElement('p');
        p.textContent = tweet.tweet;

        post_header_description.appendChild(p);

        const tweet_image = document.createElement('img');
        tweet_image.src = "https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg";

        post_body.appendChild(tweet_image);

        post__header.appendChild(post_header_description);


        const h3 = document.createElement('h3');
        h3.textContent = " " + tweet.tweet_author + " ";

        const post_header_special = document.createElement('span');



        const material_icon_post__badge = document.createElement('span');
        material_icon_post__badge.className = "material-icons post__badge";
        material_icon_post__badge.textContent = "verified";

        
        post_header_special.className = "post_headerSpecial";

        post_header_special.appendChild(material_icon_post__badge);

        

        h3.appendChild(post_header_special);

        post_header_text.appendChild(h3);


        const post_footer = document.createElement('div');
        post_footer.className = "post__footer";

        const repeat = document.createElement('span');
        repeat.className = "material-icons";
        repeat.textContent = "repeat";
        const favorite = document.createElement('span');
        favorite.className = "material-icons";
        favorite.textContent = "favorite_border";
        const publish = document.createElement('span');
        publish.className = "material-icons";
        publish.textContent = "publish";

        post_footer.appendChild(repeat);
        post_footer.appendChild(favorite);
        post_footer.appendChild(publish);

        post_body.appendChild(post_footer);

        

        div.appendChild(header);
        div.appendChild(post_body);
        // div.appendChild(contents);
        // div.appendChild(date);

        tweetElement.appendChild(div);
      });
      // loadingElement.style.display = 'none';
      if (!result.has_more) {
        // loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        // loadMoreElement.style.visibility = 'visible';
      }
      loading = false;
    });
}




