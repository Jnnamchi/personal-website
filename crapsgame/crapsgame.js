let moneyAvailable = 1000
let betAmount = 100
let minimumBet = 100
let roundsLasted = 0
let selectedBet = 'PASS'
let roundIsOver = true

const diceResultPass = [7, 11]
const diceResultNoPass = [2, 3, 12]
const pointScoreNoPass = 7

const timeouts = {
    firstRoll: 850,
    firstPointRoll: 3000,
    nextPointRolls: 1700,
}

const PASS = 'PASS'
const NO_PASS = 'NO PASS'
const POINT_SCORE = 'POINT SCORE'

// Game and Round Setup

function registerCrapsPlayer () {
    let crapsUsername = document.getElementById('craps-username').value

    let invalidCharacterPattern = /^[0-9]|[^a-zA-Z0-9_]/g
    let usernameIsInvalid = crapsUsername.length < 5

    if (usernameIsInvalid || invalidCharacterPattern.test(crapsUsername)) {
        crapsUsername = "User123"
        alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a number! Assigning default username: " + crapsUsername)
    }
    document.getElementById('craps-username').value = ''

    document.getElementById('craps-username-greeting').innerHTML = crapsUsername
    document.getElementById('craps-registration-pane').style.display = 'none'
    document.getElementById('craps-main-pane').style.display = 'block'

    setupRound()
}

function setupRound () {
    document.getElementById('dice-roll-result').innerHTML = 'WAITING TO ROLL'

    roundIsOver = true
    selectBet(selectedBet)

    if (betAmount >= moneyAvailable) {
        betAmount = minimumBet
        document.getElementById('craps-bet-amount').innerHTML = betAmount
    }

    // Close actions and open roll
    document.getElementById('craps-action-continue-exit').style.display = 'none'
    document.getElementById('craps-action-roll').style.display = 'block'
}

function selectBet (bet) {
    if (roundIsOver) {
        selectedBet = bet
        if (bet === PASS) {
            document.getElementById('craps-bet-pass').style.backgroundColor = 'red'
            document.getElementById('craps-bet-no-pass').style.backgroundColor = 'transparent'
            document.getElementById('craps-result-description').innerHTML = 'Bet ' + PASS + ' - Need one of ' + diceResultPass.join(', ') + ' to win!'
        } else if (bet === NO_PASS) {
            document.getElementById('craps-bet-no-pass').style.backgroundColor = 'red'
            document.getElementById('craps-bet-pass').style.backgroundColor = 'transparent'
            document.getElementById('craps-result-description').innerHTML = 'Bet ' + NO_PASS + ' - Need one of ' + diceResultNoPass.join(', ') + ' to win!'
        }
    }
}

function decreaseBet () {
    if (betAmount > minimumBet) {
        betAmount -= minimumBet
        document.getElementById('craps-bet-amount').innerHTML = betAmount
    }
}

function increaseBet () {
    if (betAmount < moneyAvailable) {
        betAmount += minimumBet
        document.getElementById('craps-bet-amount').innerHTML = betAmount
    }
}

// First Roll Handling

function doFirstRoll () {
    let diceResultSum = startDiceRoll()

    // Add small delay before calling function
    setTimeout(function(){
        handleFirstRoll(diceResultSum)
    }, timeouts.firstRoll)
}

function handleFirstRoll (diceResultSum) {

    let diceResultName
    if (diceResultPass.includes(diceResultSum)) {
        diceResultName = PASS
    } else if (diceResultNoPass.includes(diceResultSum)) {
        diceResultName = NO_PASS
    } else {
        diceResultName = POINT_SCORE
    }
    // Above conditional needed to set the dice result in the roll result section
    document.getElementById('dice-roll-result').innerHTML = 'Sum: ' + diceResultSum + ', Result: ' + diceResultName

    if (diceResultName === POINT_SCORE) {
        document.getElementById('dice-roll-result').innerHTML += ', rolling again...'
        let scoreToWin
        let scoreToLose
        if (selectedBet === PASS) {
            scoreToWin = diceResultSum
            scoreToLose = pointScoreNoPass
        } else {
            scoreToWin = pointScoreNoPass
            scoreToLose = diceResultSum
        }
        document.getElementById('craps-result-description').innerHTML = 'Bet ' + selectedBet + ', need to roll a ' + scoreToWin + ' before a ' + scoreToLose + ' to win!'
        setTimeout(function(){
            doPointRoll(diceResultSum)
        }, timeouts.firstPointRoll)
    } else {
        settleRound(diceResultName)
    }
}

// Point Roll Handling

function doPointRoll (pointScore) {
    let diceResultSum = startDiceRoll()

    // Add small delay before calling function
    setTimeout(function(){
        if (diceResultSum === pointScoreNoPass) {
            document.getElementById('dice-roll-result').innerHTML = 'Sum: ' + diceResultSum + ', Result: ' + NO_PASS
            settleRound(NO_PASS)
        } else if (diceResultSum === pointScore) {
            document.getElementById('dice-roll-result').innerHTML = 'Sum: ' + diceResultSum + ', Result: ' + PASS
            settleRound(PASS)
        } else {
            doPointRoll(pointScore)
        }
    }, timeouts.nextPointRolls)
}

// End Round / Game Management

function settleRound (diceResultName) {
    if (selectedBet === diceResultName) {
        document.getElementById('craps-result-description').innerHTML = 'YOU WIN!'
        moneyAvailable += betAmount
    } else {
        document.getElementById('craps-result-description').innerHTML = 'YOU LOSE :('
        moneyAvailable -= betAmount
    }

    roundsLasted += 1
    document.getElementById('craps-user-money').innerHTML = moneyAvailable
    document.getElementById('craps-user-rounds').innerHTML = roundsLasted
    document.getElementById('craps-action-continue-exit').style.display = 'block'

    // If no more money, game is over
    if (moneyAvailable === 0) {
        endGame()
    }
}

function endGame () {
    alert('After lasting ' + roundsLasted + ' rounds, you have left with ' + moneyAvailable + '$ dollars!')
    document.getElementById('craps-main-pane').style.display = 'none'
    document.getElementById('craps-registration-pane').style.display = 'block'
    roundIsOver = true

    // Reset money and rounds
    moneyAvailable = 1000
    roundsLasted = 0
    document.getElementById('craps-user-money').innerHTML = moneyAvailable
    document.getElementById('craps-user-rounds').innerHTML = roundsLasted

    // Remove everything inside the dice-roll-area
    document.getElementById('dice-roll-area').innerHTML = ''
}

// Dice Rolling Utilities

function startDiceRoll () {
    roundIsOver = false

    document.getElementById('dice-roll-result').innerHTML = 'ROLLING...'
    document.getElementById('craps-action-roll').style.display = 'none'

    let diceResult1 = getDiceResult()
    let diceResult2 = getDiceResult()
    let diceResults = [diceResult1, diceResult2]
    runDiceAnimation(diceResults)

    return diceResult1 + diceResult2
}

function getDiceResult () {
    return Math.floor(Math.random() * 6) + 1
}

function runDiceAnimation (diceResults) {
    const element = document.getElementById('dice-roll-area')
    const numberOfDice = diceResults.length
    const options = {
        element, // element to display the animated dice in.
        numberOfDice, // number of dice to use
        callback: function(){}, // Run nothing
        values: diceResults,
        delay: 100000000,
    }
    rollADie(options)
}
