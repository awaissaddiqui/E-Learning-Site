// import starFill from '../assets/starFill.png';
// import starEmpty from '../assets/starEmpty.png';

export function goBack() {
    window.history.back();
}

export function getStarRating(rating, maxStars) {
    const filledStars = Math.round(rating); 
    const emptyStars = maxStars - filledStars; 

    let stars = '';
    for (let i = 0; i < filledStars; i++) {
        stars += '⭐'; // Filled star character
    }

    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="empty-star">☆</span>'; // Empty star character
    }

    return stars;
}

