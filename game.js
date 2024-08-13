let boxes = document.querySelectorAll(".box");
let messagecontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetbtn = document.querySelector(".btnreset");
let newGame = document.querySelector(".newgame");

let turno = true;

const winningPattren = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (turno) {
            box.innerText = "O";
            console.log("o inserted");
            turno = false;
        } else {
            box.innerText = "X";
            console.log("X inserted");
            turno = true;
        }

        checkwinner();
        check_no_winner();

    });
});

// ------Button's reset and new Game------
const resetGame = () => {
    turno = true;
    boxes.forEach((box) => {
        box.innerText = ""; // Clear text
        box.disabled = false; // Enable box
    });
    messagecontainer.classList.add("hide"); // Hide message container
}
// ------------------------------------------------------------?

const disable_box = () => {
    boxes.forEach((box)=>{
        box.disabled = true;
        // box.innerText = "";
    });
}

const enable_box = () => {
    boxes.forEach((box)=>{
        box.disabled = false;
    });
}

const showwinner = (winner) => { 
    msg.innerText = `Congratulations, you are Winner ${winner}`;
    messagecontainer.classList.remove("hide");
    disable_box();
};

const showdraw = () => {
    msg.innerText = "No Winner Game Lost ! ): "
    messagecontainer.classList.remove("hide");
}


const checkwinner = () => {
    for (let win of winningPattren) {
        let position_1 = boxes[win[0]].innerText;
        let position_2 = boxes[win[1]].innerText;
        let position_3 = boxes[win[2]].innerText;

        if (position_1 !== "" && position_2 !== "" && position_3 !== "") {
            if(position_1 === position_2 && position_2 === position_3){
                console.log("winner", position_1);
                showwinner(position_1);
                
               
            }
        }
    }
    
}

const check_no_winner = () => {
    let boxFull = true;

    for (let nowinner of winningPattren) {
        let position_1 = boxes[nowinner[0]].innerText;
        let position_2 = boxes[nowinner[1]].innerText;
        let position_3 = boxes[nowinner[2]].innerText;

        if (position_1 === "" || position_2 === "" || position_3 === "") {
            boxFull = false; // There are still empty spots
            continue; // Skip to next pattern
        }

        if (position_1 === position_2 && position_2 === position_3) {
            console.log("Winner Found!", position_1); // This would be handled elsewhere to declare the winner
            return;
        }
    }
    
    if (boxFull) {
        console.log("NO Winner Game Lost!");
        showdraw();
    }
    
};


resetbtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);