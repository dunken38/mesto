let likeState = document.querySelectorAll('.description__like');
for (let i = 0; i < likeState.length; i++){ /*5 часов (myeyes)*/
  likeState[i].addEventListener('click', function likeStatus() {  
    if (likeState[i].classList.contains('description__like_noactive')) {
      likeState[i].classList.remove('description__like_noactive');
      likeState[i].classList.add('description__like_active');
    }
    else {
      likeState[i].classList.remove('description__like_active');
      likeState[i].classList.add('description__like_noactive');
    } 
  })
}