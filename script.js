import { occupation } from './data.js'

const occupationInfo = JSON.parse(occupation);

function renderWorkoutSchedule(occupationInfo) {
    const scheduleBox = document.querySelector('div');

    occupationInfo.forEach(item => {
        scheduleBox.insertAdjacentHTML('beforeend', `
        <div class="schedulItemBox" id="${item.nameOccupation}">
			<div class="scheduleItem">
                <p class="schedulItemTitle">${item.nameOccupation}</p>
                <p class="schedulItemTime">${item.timeOccupation}</p>
			    <p class="schedulItemMaxNumber">Максимальное количество участников: <span>${item.maxCountParticipants}</span></p>
                <p data-id=${item.id} class="scheduleItemCurrentNumber">Текущее количество записанных участников: <span>${item.currenNumberParticipants}</span></p>
            <div class="buttonBox">
            <button class="buttonSubmit" id="${item.id}">Записаться</button>
            <button class="buttonReject disabled" data-id="${item.nameOccupation}">Отменить запись</button>
            </div>
		</div>
        `)
        if (Number(item.maxCountParticipants) === Number(item.currenNumberParticipants)) {
            const submitButton = document.getElementById(`${item.id}`);
            submitButton.classList.add('disabled');
        }
    });
}
renderWorkoutSchedule(occupationInfo);

const scheduleBox = document.querySelector('div');

scheduleBox.addEventListener('click', function (e) {
    if (e.target.classList.contains('buttonSubmit')) {
        console.log(occupationInfo[e.target.id - 1]);

        let max = Number(occupationInfo[e.target.id - 1].maxCountParticipants);
        let cur = Number(occupationInfo[e.target.id - 1].currenNumberParticipants);

        if (max > cur) {
            occupationInfo[e.target.id - 1].currenNumberParticipants = Number(occupationInfo[e.target.id - 1].currenNumberParticipants) + 1;
        } else {
            alert('Записано максимальное кол-во участников!')
        }
        const currentNumberOfParticipants = document.querySelector(`[data-id="${e.target.id}"]`); 
        const span = currentNumberOfParticipants.querySelector('span');
        span.textContent = occupationInfo[e.target.id - 1].currenNumberParticipants;
        

        const currentSubmitButton = document.getElementById(`${e.target.id}`);
        console.log(currentSubmitButton);
        currentSubmitButton.classList.add('disabled');
        currentSubmitButton.nextElementSibling.classList.remove('disabled');
    }
    if (e.target.classList.contains('buttonReject')) {
        console.log(occupationInfo);
        let currentOccupationInfoItem = occupationInfo.filter(item => item.nameOccupation === e.target.dataset.id);
        let index = Number(currentOccupationInfoItem[0].id) - 1;
        if (occupationInfo[index].currenNumberParticipants > 0) {
            occupationInfo[index].currenNumberParticipants = occupationInfo[index].currenNumberParticipants - 1;
        } else {
            alert('Некорректное кол-во участников!')
        }
        

        const currentNumberOfParticipants = document.querySelector(`[data-id="${index + 1}"]`);
        const span = currentNumberOfParticipants.querySelector('span');
        span.textContent = occupationInfo[index].currenNumberParticipants;

        const currentRejectButton = document.querySelector(`[data-id="${e.target.dataset.id}"]`);
        currentRejectButton.classList.add('disabled');
        currentRejectButton.previousElementSibling.classList.remove('disabled');
    }
});