const board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
const tableID = [['00', '01', '02', '03'], ['10', '11', '12', '13'], ['20', '21', "22", '23'], ['30', '31', '32', '33']];

function getRandNumber(num){
	return parseInt(Math.random()*num);
}

function setPosition(){
	let x1 = getRandNumber(4);
	let x2 = getRandNumber(4);
	let y1 = getRandNumber(4);
	let y2 = getRandNumber(4);
	if(x1 == x2){//만약 x좌표가 같고 y좌표가 같은 경우 다를 때 까지 y좌표만 다시 뽑는다.
		while(y1 == y2){
			y2 = getRandNumber(4);
		}
	}
	board[x1][y1] =2;
	board[x2][y2] = 2;
	paintScreen();
}

function makeNewNumber(){
	setPosition();
	paintScreen();
	
}

function paintScreen(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var cell = document.getElementById(tableID[i][j]);
            cell.innerHTML = board[i][j]==0 ? "" : board[i][j];
            coloring(cell);
        }
    }
}
function coloring(cell){
    var cellNum = parseInt(cell.innerHTML);
    switch(cellNum){
        case 0:
        case 2:
            cell.style.color="#684A23";
            cell.style.background="#FBEDDC";
            break;
        case 4:
            cell.style.color="#684A23";
            cell.style.background="#F9E2C7";
            break;
        case 8:
            cell.style.color="#684A23";
            cell.style.background="#F6D5AB";
            break;
        case 16:
            cell.style.color="#684A23";
            cell.style.background="#F2C185";
            break;
        case 32:
            cell.style.color="#684A23";
            cell.style.background="#EFB46D";
            break;
        case 64:
            cell.style.color="#FFFFFF";
            cell.style.background="#EBA24A";
            break;
        case 128:
            cell.style.color="#FFFFFF";
            cell.style.background="#E78F24";
            break;
        case 256:
            cell.style.color="#FFFFFF";
            cell.style.background="#E87032";
            break;
        case 512:
            cell.style.color="#FFFFFF";
            cell.style.background="#E85532";
            break;
        case 1024:
            cell.style.color="#FFFFFF";
            cell.style.background="#E84532";
            break;
        case 2048:
            cell.style.color="#FFFFFF";
            cell.style.background="#E83232";
            break;
        default:
            if(cellNum>2048){
                cell.style.color="#FFFFFF";
                cell.style.background="#E51A1A";
            }
            else{
                cell.style.color="#684A23";
                cell.style.background="#FBEDDC";
            }
            break;
    }
}


function setScore() {//점수 계산 후 보여줌.
	let sum = 0;
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < 4; j++){
			sum += board[i][j];
		}
	}
	const score = document.getElementById("score");
	score.innerText = sum-4;
	paintScreen();
	return sum;
}

//초기설정
function initialSet(){
	makeNewNumber();
	paintScreen();
	const best_score_html = document.getElementById("best_score");
	const item = localStorage.getItem("best_score");
	best_score_html.innerText = item;
}
initialSet();

function generate(){ //새로운 숫자 생성
    var zeroNum=0;
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
            if(board[i][j]==0)
                zeroNum++;
    while(true){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    if(zeroNum==1){ //민약 남은 공간이 1개인 경우 하나만 만들어 진다.
                        board[i][j]=getNewNum();
                        return;
                    }
					else{
						let x1 = getRandNumber(4);
						let x2 = getRandNumber(4);
						let y1 = getRandNumber(4);
						let y2 = getRandNumber(4);
						if(x1 == x2){//만약 x좌표가 같고 y좌표가 같은 경우 다를 때 까지 y좌표만 다시 뽑는다.
							while(y1 == y2){
								y2 = getRandNumber(4);
							}
						}
						if(board[x1][y1] != 0 && board[x2][y2] != 0){
							continue;
						}
						else if(board[x1][y1] == 0 && board[x2][y2] == 0){
							board[x1][y1] = getNewNum();
							board[x2][y2] = getNewNum();
							return;
						}
						else{
							continue;
						}
					}
                }
            }
        }
    }
	paintScreen()
}

function getNewNum(){ //확률적으로 4가 나오도록 
    var rand = parseInt(Math.random()*10);
    if(rand==0) 
		return 4;
    return 2;
}

function rotate(n){
    while(n--){
        var tempBoard = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++)
                tempBoard[i][j]=board[i][j];
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++)
                board[j][3-i]=tempBoard[i][j];

    }
}

function moveDir(num) {
	switch(num){
        case 0: //up
			var isMoved=false;
			var isPlused = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
			for(var i=1;i<4;i++){
				for(var j=0;j<4;j++){
					if(board[i][j]==0) continue;
					var tempY = i-1;
					while(tempY>0 && board[tempY][j]==0) tempY--;
					if(board[tempY][j]==0){
						board[tempY][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else if(board[tempY][j]!=board[i][j]){
						if(tempY+1==i) continue;
						board[tempY+1][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else{
						if(isPlused[tempY][j]==0){
							board[tempY][j]*=2;
							score+=board[tempY][j];
							board[i][j]=0;
							isPlused[tempY][j]=1;
							isMoved=true;
						}
						else{
							board[tempY+1][j]=board[i][j];
							board[i][j]=0;
							isMoved=true;
						}
					}
				}
			}
			if(isMoved){
				paintScreen()
				generate();
			}
			else checkGameOver(); 
			break;
        case 1://down
			rotate(2);
			var isMoved=false;
			var isPlused = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
			for(var i=1;i<4;i++){
				for(var j=0;j<4;j++){
					if(board[i][j]==0) continue;
					var tempY = i-1;
					while(tempY>0 && board[tempY][j]==0) tempY--;
					if(board[tempY][j]==0){
						board[tempY][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else if(board[tempY][j]!=board[i][j]){
						if(tempY+1==i) continue;
						board[tempY+1][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else{
						if(isPlused[tempY][j]==0){
							board[tempY][j]*=2;
							score+=board[tempY][j];
							board[i][j]=0;
							isPlused[tempY][j]=1;
							isMoved=true;
						}
						else{
							board[tempY+1][j]=board[i][j];
							board[i][j]=0;
							isMoved=true;
						}
					}
				}
			}
			if(isMoved){
				paintScreen()
				generate();
			}
			else checkGameOver(); 
			rotate(2);
			break; 
        case 2: //left
			rotate(1);
			var isMoved=false;
			var isPlused = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
			for(var i=1;i<4;i++){
				for(var j=0;j<4;j++){
					if(board[i][j]==0) continue;
					var tempY = i-1;
					while(tempY>0 && board[tempY][j]==0) tempY--;
					if(board[tempY][j]==0){
						board[tempY][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else if(board[tempY][j]!=board[i][j]){
						if(tempY+1==i) continue;
						board[tempY+1][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else{
						if(isPlused[tempY][j]==0){
							board[tempY][j]*=2;
							score+=board[tempY][j];
							board[i][j]=0;
							isPlused[tempY][j]=1;
							isMoved=true;
						}
						else{
							board[tempY+1][j]=board[i][j];
							board[i][j]=0;
							isMoved=true;
						}
					}
				}
			}
			if(isMoved){
				paintScreen()
				generate();
			}
			else checkGameOver(); 
			rotate(3);
			break; //left
        case 3: 
			rotate(3);
			var isMoved=false;
			var isPlused = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
			for(var i=1;i<4;i++){
				for(var j=0;j<4;j++){
					if(board[i][j]==0) continue;
					var tempY = i-1;
					while(tempY>0 && board[tempY][j]==0) tempY--;
					if(board[tempY][j]==0){
						board[tempY][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else if(board[tempY][j]!=board[i][j]){
						if(tempY+1==i) continue;
						board[tempY+1][j]=board[i][j];
						board[i][j]=0;
						isMoved=true;
					}
					else{
						if(isPlused[tempY][j]==0){
							board[tempY][j]*=2;
							score+=board[tempY][j];
							board[i][j]=0;
							isPlused[tempY][j]=1;
							isMoved=true;
						}
						else{
							board[tempY+1][j]=board[i][j];
							board[i][j]=0;
							isMoved=true;
						}
					}
				}
			}
			if(isMoved){
				paintScreen()
				generate();
			}
			else checkGameOver(); 
			rotate(1); 
			break; //right
    }
	paintScreen();
}

function moveHandler(e) {
	switch(e.keyCode){
        case 38: moveDir(0); break; //up
        case 40: moveDir(1); break; //down
        case 37: moveDir(2); break; //left
        case 39: moveDir(3); break; //right
    }
	setScore();
}
function checkGameOver(){
    for(var i=0;i<4;i++){
        var colCheck = board[i][0];
        if(colCheck==0) return;
        for(var j=1;j<4;j++){
            if(board[i][j]==colCheck || board[i][j]==0) return;
            else colCheck = board[i][j];
        }
    }
    for(var i=0;i<4;i++){
        var rowCheck = board[0][i];
        if(rowCheck==0) return;
        for(var j=1;j<4;j++){
            if(board[j][i]==rowCheck || board[j][i]==0) return;
            else rowCheck = board[j][i];
        }
    }
    gameover();
}

// 게임오버 처리
function gameover(){
	let userName;
	let newScore = setScore() -4;
	let best_score_text = localStorage.getItem("best_score")
	let best_score = best_score_text?.split("_")?.[best_score_text?.split("_")?.length -1];
	let best_score_owner = best_score_text?.split("_")[0];
	// let best_score_owner = best_score_text?.split(" ")?.slice(-1, 1).toString();
	console.log(best_score_owner)
    alert(`Game Over !`)	
	if(best_score_text === null){
		alert(`Your score : ${newScore}`)
		userName = prompt("Your name? : ");
		localStorage.setItem("best_score", `${userName}_${newScore}`);
	}
	else if(newScore> best_score){
		userName = prompt("Your name? : ");
		localStorage.removeItem("best_score");
		localStorage.setItem("best_score", `${userName}_${newScore}`);
	}
	else{
		 alert(`Your score : ${newScore} 
		 best_score : ${best_score} by "${best_score_owner}"`);
	}
	
}

document.onkeydown = moveHandler;
