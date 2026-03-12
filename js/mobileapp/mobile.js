var lastClickedEl = null;
this.answer = function(result) {
    var msg = '';
    if (result.error == "") {
        msg = result.generatedcontent;
    } else {
        msg = 'error: ' + result.error;
    }
    this.update_history(msg);
};

document.querySelectorAll(`#go`).forEach((btn) => {
    btn.addEventListener('click', e => {
        lastClickedEl = btn;
    });
});

this.update_history = function(msg) {
    let root = lastClickedEl.closest('#openai_block');
    let log = root.querySelector('.logs');
    let question = root.querySelector('#openai_input').value;
    if (question == '') {
    } else {
        root.querySelector('#openai_input').value = '';
        log.insertAdjacentHTML(
            'beforeend',
            '<div class="openai_message user"><span>' + question + '</span></div>' +
            '<ion-item class="chat-loading">' +
                '<ion-spinner name="crescent"></ion-spinner>' +
            '</ion-item>'
        );
        let lq = log.querySelector(':last-child');
        log.scrollTop = lq.offsetTop;
    }
    let assistantname = root.querySelector('#openai_assistantname');
    let newHtml = '<span style="color: gray; margin-bottom: .2em">' + assistantname.innerHTML + '</span><div class="openai_message bot"><span><p>' + msg + '</p></span></div>';

    log.querySelector('.chat-loading').remove();
    log.insertAdjacentHTML('beforeend', newHtml);
    let lastMessage = log.querySelector('div:last-child');
    log.scrollTop = lastMessage.offsetTop;
};

document.querySelectorAll(`.openai_input_refresh_btn`).forEach(function(btn) {
    btn.addEventListener('click', e => {
        document.querySelectorAll('.logs').forEach(function(log) {
           log.innerHTML = "";
        });
    });
});
