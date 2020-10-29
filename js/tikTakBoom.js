tikTakBoom = {
    init(
        tasks,
        timerField1,
        timerField2,
        timerField3,
        timerField4,
        countOfPlayers,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        textFieldAnswer3,
        textFieldAnswer4,
        boomTimer
    ) {
        //this.boomTimer = boomTimer;
        this.startTimer = 4;
        this.tasks = JSON.parse(tasks);
        this.timeId;
        this.timerField = [];
        this.boomTimer = {"player1": boomTimer, "player2": boomTimer, "player3": boomTimer, "player4": boomTimer};
        this.rightAnswers = {"player1": 0, "player2": 0, "player3": 0, "player4": 0};
        this.loseAnswers = {"player1": 0, "player2": 0, "player3": 0, "player4": 0};

        this.countOfPlayers = countOfPlayers;
        this.playerNumber = [1, 2, 3, 4]; 
        this.playerNumber.length = this.countOfPlayers;
        this.timerField = [timerField1, timerField2, timerField3, timerField4]; 
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;
        this.textFieldAnswer3 = textFieldAnswer3;
        this.textFieldAnswer4 = textFieldAnswer4;
        this.textFieldAnswer5 = textFieldAnswer5;

        this.needRightAnswers = 3;
        this.needLoseAnswers = 3;
    },

    run() {

        this.newTasks = [...this.tasks];
        this.state = 1;
        this.nowPlayer = 1;
        this.playerNumber[0];
        this.startTime(this.playerNumber[0]);
        setTimeout(
            () => {
                this.turnOn();
                this.timer(this.boomTimer["player1"], this.playerNumber[0]);
                this.start = new Date().getTime();
            },
                4*1000,
        );     
    },

    turnOn() {
        
        this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`;

        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]);

        this.tasks.splice(taskNumber, 1);

        this.state = (this.state === this.countOfPlayers) ? this.playerNumber[0] : this.playerNumber[this.state];

    },

    turnOff(value) {
        if (this.state){
            this.b = `player`+ this.nowPlayer;
            if (this.currentTask[value].result) {
                this.gameStatusField.innerText = 'Верно!';
                this.rightAnswers[this.b] += 1;
                this.boomTimer[this.b] += 5;
            } else {
                this.gameStatusField.innerText = 'Неверно!';
                this.loseAnswers[this.b] += 1;
                this.boomTimer[this.b] -= 5;
            }
            if (this.rightAnswers[this.b] < this.needRightAnswers) {
                if ((this.tasks.length === 0) || (this.loseAnswers[this.b] >= this.needLoseAnswers)) {
                    this.nowPlayer = (this.nowPlayer >= this.countOfPlayers) ? this.playerNumber[0] : this.playerNumber[this.nowPlayer];
                    this.deletePlayer = this.nowPlayer - 1;
                    this.finishPlayer('lose', this.deletePlayer);
                } else {
                    this.end = new Date().getTime();
                    this.sortTime = parseInt((this.end - this.start)/1000 - 4*(this.newTasks.length - this.tasks.length - 1));
                    clearTimeout(timeId);
                    this.boomTimer[this.b] = this.boomTimer[this.b] - this.sortTime;
                    this.nowPlayer = (this.nowPlayer >= this.countOfPlayers) ? this.playerNumber[0] : this.playerNumber[this.nowPlayer];
                }
                this.c = `player`+ this.nowPlayer;
                this.startTimer = 4;
                this.startTime(this.nowPlayer);
                setTimeout(
                    () => {
                        this.turnOn();
                        this.timer(this.boomTimer[this.c], this.nowPlayer);
                    },
                        4*1000,
                )
            } else {
                this.finish('won', player);
            }
        }
        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
        this.textFieldAnswer3.removeEventListener('click', answer3);
        this.textFieldAnswer4.removeEventListener('click', answer4);
        this.textFieldAnswer5.removeEventListener('click', answer5);
    },

    printQuestion(task, player) {

        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;
        this.textFieldAnswer3.innerText = task.answer3.value;
        this.textFieldAnswer4.innerText = task.answer4.value;
        this.textFieldAnswer5.innerText = task.answer5.value;


        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));
        this.textFieldAnswer3.addEventListener('click', answer3 = () => this.turnOff('answer3'));
        this.textFieldAnswer4.addEventListener('click', answer4 = () => this.turnOff('answer4'));
        this.textFieldAnswer5.addEventListener('click', answer5 = () => this.turnOff('answer5'));

        this.currentTask = task;
    },

    finishPlayer(result = 'lose', number) {
        if (result === 'lose') {
            this.gameStatusField.innerText = `Игрок ${number} выбыл!`;
        }
        this.numberPlayer = `player`+ number;
        this.deletePlayer = number - 1;
        clearTimeout(timeId);
            this.countOfPlayers--;
            this.timerField[this.deletePlayer] = "";
            this.playerNumber.splice[this.deletePlayer, 1];
            this.boomTimer[this.numberPlayer] = "";
            //delete this.boomTimer[this.numberPlayer];
            //delete this.rightAnswers[this.numberPlayer];
            //delete this.loseAnswers[this.numberPlayer];
        if (this.countOfPlayers == 0) {
            this.finish('lose');
        }
    },

    finish(result = 'lose', number) {
        this.state = 0;
        if (result === 'lose') {
            this.gameStatusField.innerText = `Все проиграли! Конец игры!`;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Игрок ${number} выиграл!`;
        }
        
        this.gameStatusField.innerText = `Количество игроков ${countOfPlayer}`;
        this.timerField = ``;
        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;
        this.textFieldAnswer3.innerText = ``;
        this.textFieldAnswer4.innerText = ``;
        this.textFieldAnswer5.innerText = ``;

        //console.log(this);
    },

    startTime(i) {
        this.startTimer -=1;
        this.timerNewField = this.timerField[i-1];
        this.timerNewField.innerText = `${this.startTimer}`;
        if (this.startTimer > 0) {
                setTimeout(
                    () => {
                        this.startTime(i)
                    },
                    1000,
                )
            }
    },

    timer(time, i) {
        if (this.state) {
            this.timerNewField = this.timerField[i-1];
            time -= 1;
            let sec = time % 60;
            let min = (time - sec) / 60;
            sec = (sec >= 10) ? sec : '0' + sec;
            min = (min >= 10) ? min : '0' + min;
            this.timerNewField.innerText = `${min}:${sec}`;
            if (time > 0) {
                timeId = setTimeout(
                    () => { 
                        this.timer(time, i)
                    },
                    1000,
                )
            } else {
                this.finish('lose');
            }
        }
    }
}