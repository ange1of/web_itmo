class Bot {
    replies = [
        'Вау', 'Круто', 'Не думаю', 'Ну такое...', 'Одобряю', 'Лолкек чебурек',
        'ДА!', 'Хех мда', 'Согласен', 'Звучит подозрительно', 'Ты не прав, дядя',
        'Ладно, так что там с деньгами?',
        'Тут могло бы быть много слов, но я экономлю процессорное время',
        'Да ты рофлишь', 'Ну уж нет', 'Дарова'
    ]

    createReply() {
        const ind = Math.floor(Math.random() * this.replies.length);
        return this.replies[ind];
    }
}


class Message {

    constructor(text, parentElement, incoming=false) {
        this.text = text;
        this.incoming = incoming;
        this.parentElement = parentElement;
        this.date = new Date();
        
        this.element = this.renderMessage();
    }

    renderMessage() {
        const element = document.createElement('div');

        element.classList.add('message');
        if (this.incoming) {
            element.classList.add('incoming');
        }

        const textParagraph = document.createElement('p');
        textParagraph.classList.add('message-text');
        textParagraph.innerText = this.text;
        element.appendChild(textParagraph);

        const dateBlock = document.createElement('span');
        dateBlock.classList.add('message-date');
        dateBlock.innerText = `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()} ` +
                              `${this.date.getHours().toString().padStart(2, '0')}:${this.date.getMinutes().toString().padStart(2, '0')}`;
        element.appendChild(dateBlock);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.onclick = this.remove.bind(this);
        element.appendChild(removeButton);
        
        return element;
    }
    
    remove() {
        this.parentElement.removeChild(this.element);
        if (document.querySelectorAll('.message').length === 0) {
            document.querySelector('#empty-placeholder').style.display = 'inherit';
        }
    }
}

class Chat {

    postButton = document.querySelector('#post-button');
    messageTextarea = document.querySelector('#message-text');
    emptyPlaceholder = document.querySelector('#empty-placeholder');
    
    constructor(element) {
        this.element = element;
        this.bot = new Bot();
        this.postButton.onclick = () => {
            this.sendMessage(this.messageTextarea.value);
        }
        this.messageTextarea.onkeydown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.sendMessage(this.messageTextarea.value);
                this.messageTextarea.value = '';
            }
        }
    }

    sendMessage(message) {
        if (message) {
            if (this.emptyPlaceholder.style.display !== 'none') {
                this.emptyPlaceholder.style.display = 'none';
            }

            this.element.appendChild(new Message(message, this.element).element);
            setTimeout(() => 
                this.element.appendChild(
                    new Message(this.bot.createReply(), this.element, true).element
                ), 300
            );
        }
    }
    
}

const chat = new Chat(document.querySelector('#message-block'));