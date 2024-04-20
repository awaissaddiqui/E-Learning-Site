// import starFill from '../assets/starFill.png';
// import starEmpty from '../assets/starEmpty.png';

export function goBack() {
    window.history.back();
}

export function getStarRating(rating, maxStars) {
    const filledStars = Math.round(rating);
    let starRating = '';
    for (let i = 0; i < filledStars; i++) {
        starRating += `<img src="../assets/starFill.png" alt="Filled Star"  class='reviewStars'>`;
    }
    for (let i = 0; i < maxStars - filledStars; i++) {
        starRating += `<img src="../assets/starEmpty.png" alt="Empty Star"  class='reviewStars'>`;
    }
    return starRating;
}