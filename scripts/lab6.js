const contactsDiv = document.querySelector('#contacts-div');
contactsDiv.addEventListener('click', (event) => event.stopPropagation());

const popupShadow = document.createElement('div');
popupShadow.id = 'popup-shadow';

function hideContactsPopup() {
    popupShadow.removeChild(contactsDiv);
    popupShadow.removeEventListener('click', hideContactsPopup);
    document.body.removeChild(popupShadow);
    setTimeout(() => contactsDiv.style.display = 'none', 200);
    contactsDiv.style.opacity = 0;
}


document.querySelector('#contacts-button').addEventListener('click', () => {
    document.body.appendChild(popupShadow);
    popupShadow.appendChild(contactsDiv);
    popupShadow.addEventListener('click', hideContactsPopup);
    contactsDiv.style.display = 'flex';
    setTimeout(() => contactsDiv.style.opacity = 1, 0);
});


const imageNames = ['my_photo.jpg', 'my_photo_2.jpg', 'my_photo_3.jpg'];
const images = []
imageNames.forEach((imageName) => {
    const elem = document.createElement('img');
    elem.src = `images/${imageName}`;
    images.push(elem);
});
const imagePopup = document.createElement('div');
imagePopup.id = 'image-popup';

const prevArrow = document.createElement('div');
prevArrow.classList.add('change-image-arrow');
prevArrow.id = 'prev-image-arrow';
prevArrow.innerHTML = '<span><</span>';

const nextArrow = document.createElement('div');
nextArrow.classList.add('change-image-arrow');
nextArrow.id = 'next-image-arrow';
nextArrow.innerHTML = '<span>></span>';

const imageContainer = document.createElement('div');
imageContainer.id = 'image-popup-image-container';

imagePopup.appendChild(prevArrow);
imagePopup.appendChild(imageContainer);
imagePopup.appendChild(nextArrow);

let currentImageIndex = 0;

function hideImagesPopup(event) {
    event.stopPropagation();
    popupShadow.removeChild(imagePopup);
    popupShadow.removeEventListener('click', hideImagesPopup);
    document.body.removeChild(popupShadow);
    imageContainer.removeChild(images[currentImageIndex]);
    currentImageIndex = 0;
}

function nextImage(event) {
    event.stopPropagation();
    imageContainer.removeChild(images[currentImageIndex]);
    if (currentImageIndex == images.length - 1) {
        currentImageIndex = 0;
    } else {
        currentImageIndex++;
    }
    imageContainer.appendChild(images[currentImageIndex]);
}
nextArrow.onclick = nextImage;

function prevImage() {
    imageContainer.removeChild(images[currentImageIndex]);
    if (currentImageIndex == 0) {
        currentImageIndex = images.length - 1;
    } else {
        currentImageIndex--;
    }
    imageContainer.appendChild(images[currentImageIndex]);
}
prevArrow.onclick = prevImage;

const imageButton = document.querySelector('#my-photo');
imageButton.addEventListener('click', () => {
    document.body.appendChild(popupShadow);
    popupShadow.addEventListener('click', hideImagesPopup);
    popupShadow.appendChild(imagePopup);
    imageContainer.appendChild(images[currentImageIndex]);
});

