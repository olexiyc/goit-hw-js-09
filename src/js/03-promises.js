import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const submitBtn = document.querySelector('button');
const delayId = document.querySelector('delay');
const stepId = document.querySelector('step');
const amountId = document.querySelector('amount');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const step = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);
  let delay = Number(event.target.delay.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay).then(onSuccess).catch(onError)
    delay += step
  }
};



function onSuccess(result) {
  Notiflix.Notify.success(result);

}

function onError(error) {
  Notiflix.Notify.failure(error);
}




function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  setTimeout(() => {
  if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`)
  }
  }, delay);
  
}
