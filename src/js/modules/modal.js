function showModal(modal){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.classList.add('hidden');
}

function closeModal(modal) {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.classList.remove('hidden');
}

function modal() {
    //Modal
    const  modal = document.querySelector('.modal');
    creatModal(modal, 'button[data-modal]', 'div[data-close]');
    const timerModalID = setTimeout(showModal, 4000, modal);
    function creatModal(modal, button, close){
        const scrollModal = function() {
            showScrollModal(modal, timerModalID, scrollModal);
        };
        window.addEventListener('scroll', scrollModal);
        document.body.addEventListener('click', event => {
            const target = event.target;
            if (target && target.matches(button)) {
                event.preventDefault();
                showModal(modal); 
                escModal(modal);
                clearInterval(timerModalID);           
            } else if (target && target.matches(close) || target === modal) {
                closeModal(modal);
            }
        });
    }
    
    function escModal(modal) {
        document.addEventListener('keydown', event => {
            if(event.code === 'Escape' && modal.classList.contains('show')){
                closeModal(modal);
            }
        });
    }

    function showScrollModal(modal, timer, scroll) {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modal);
            window.removeEventListener('scroll', scroll);
            clearInterval(timer);          
        }
    }
}

export default modal;
export {closeModal, showModal};