window.onload = function()
{
    
    let startGame = document.getElementById('start');
    let endGame = document.getElementById('gameOver');
    let addPlayer = document.getElementById('newPlayer');
    let deletePlayer = document.getElementById('deletePlayer');
    let bodyTimer = document.getElementById('bodyTimer');
    let countOfPlayer = 2;

    //adding new player
    addPlayer.addEventListener('click', function(){
        if (countOfPlayer < 4) {
         countOfPlayer += 1;
         document.getElementById('gameStatusField').innerText = `Количество игроков ${countOfPlayer}`;
         display();
         }else {
             alert('Максимальное количество игроков 4!')
         }
     });
     //deleting one player
     deletePlayer.addEventListener('click', function(){
        if (countOfPlayer > 2) {
             countOfPlayer -= 1;
             document.getElementById('gameStatusField').innerText = `Количество игроков ${countOfPlayer}`;
               let timer = document.querySelectorAll('.card');
               timer[timer.length-1].remove();
             }else {
             alert('Минимальное количество игроков 2!')
         }
     });
     document.getElementById('gameStatusField').innerText = `Количество игроков ${countOfPlayer}`;

//timer 
const display = () => {
    bodyTimer.innerHTML = "";
    for (let i = 1; i <= countOfPlayer; i++) {
      let bodyCard = document.createElement('div');
      let cardTimer = document.createElement('div');
      let namePlayer = document.createElement('div');
       bodyCard.className = 'card';
       namePlayer.innerHTML = `Игрок ${i}`; 
       namePlayer.className = 'text_timer';   
       cardTimer.innerHTML = `00:00`;
       cardTimer.className = 'timer-output';
       cardTimer.id = "timerField"+i;
       bodyTimer.append(bodyCard);
       bodyCard.append(cardTimer);
       bodyCard.prepend(namePlayer);
    }
  };
  display();

  startGame.addEventListener('click', function(){
    tikTakBoom.init(
        tasks,
        document.getElementById('timerField1'),
        document.getElementById('timerField2'),
        document.getElementById('timerField3'),
        document.getElementById('timerField4'),
        document.getElementById('gameStatusField'),
        document.getElementById('questionField'),
        countOfPlayer,
        document.getElementById('answer1'),
        document.getElementById('answer2'),
        document.getElementById('answer3'),
        document.getElementById('answer4'),
        parseInt(document.getElementById('boomTimer').value)
      )
    tikTakBoom.run();
    document.getElementById('gameStatusField').innerText = `Игра идёт`;
});
endGame.addEventListener('click', function(){
	tikTakBoom.finish();
});  

    tikTakBoom.run();
}
