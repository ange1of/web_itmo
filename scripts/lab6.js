const contactsDiv = document.querySelector('#contacts-div');
contactsDiv.addEventListener('click', (event) => event.stopPropagation());

const popupShadow = document.createElement('div');
popupShadow.id = 'popup-shadow';
popupShadow.addEventListener('click', () => {
    popupShadow.removeChild(contactsDiv);
    document.body.removeChild(popupShadow);
    setTimeout(() => contactsDiv.style.display = 'none', 200);
    contactsDiv.style.opacity = 0;
});

document.querySelector('#contacts-button').addEventListener('click', () => {
    document.body.appendChild(popupShadow);
    popupShadow.appendChild(contactsDiv);
    contactsDiv.style.display = 'flex';
    setTimeout(() => contactsDiv.style.opacity = 1, 0);
});
