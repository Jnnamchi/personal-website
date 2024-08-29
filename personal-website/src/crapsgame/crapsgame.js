// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const startingMoney = 1000
const startingRounds = 0
const bets = {
	even: "EVEN",
	odd: "ODD"
}
const minimumBet = 100

// Craps Dice Roll Settings
const numDiceToRoll = 2
const hideDiceDelayMs = 10000000
const processDiceResultDelayMs = 1800

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"
const crapsRollDiceButton = "craps-roll-dice-button"
const crapsRollDiceAnimationContainer = "craps-roll-dice-animation-container"
const crapsBettingGridContainer = "craps-betting-grid-container"
const crapsRoundFinishGridContainer = "craps-round-finish-grid-container"
const crapsRoundFinishMessage = "craps-round-finish-message"
const crapsNextRoundButton = "craps-next-round-button"
const crapsNextRoundButtonDisabled = "craps-next-round-button-disabled"

// In-game variables
let currentMoney = startingMoney
let currentRounds = startingRounds
let currentBet = bets.even
let currentBetAmount = minimumBet
let canChangeBet = true

// HTML ELEMENT Manipulation Functions

function showElement (elementId) {
	document.getElementById(elementId).style.display = "block"
}

function hideElement (elementId) {
	document.getElementById(elementId).style.display = "none"
}

function showRegistrationPane () {
	showElement(crapsRegistrationPane)
}

function removeRegistrationPane () {
	hideElement(crapsRegistrationPane)
}

function showMainGameSection () {
	showElement(crapsMainSection)
}

function hideMainGameSection () {
	hideElement(crapsMainSection)
}

// Game Starting Point

function registerCrapsPlayer () {
	crapsUsername = document.getElementById(crapsUsernameInput).value

	// Username validation check
	let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
	if (crapsUsername.length < 5 || firstCharIsDigitRegex.test(crapsUsername)) {
		alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a number")
	} else {
		removeRegistrationPane()
		showMainGameSection()
		setupFirstRound()
	}
}

// Round Management Functions

function setupFirstRound () {
	document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
	hideElement(crapsNextRoundButtonDisabled)
	showElement(crapsNextRoundButton)
	setMoney(startingMoney)
	setRounds(startingRounds)
	betEven()
	setBetAmount(minimumBet)
	setupNextRound()
}

function setupNextRound () {
	hideElement(crapsRollDiceAnimationContainer)
	hideElement(crapsRoundFinishGridContainer)
	showElement(crapsRollDiceButton)
	showElement(crapsBettingGridContainer)
	canChangeBet = true
	setBetAmount(minimumBet)
}

// User Score Setting

function setMoney (money) {
	currentMoney = money
	document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRounds (round) {
	currentRounds = round
	document.getElementById(crapsStatsRounds).innerHTML = round
}

// Manage User Bet Selection

function betEven () {
	chooseBet(bets.even)
}

function betOdd () {
	chooseBet(bets.odd)
}

function chooseBet (bet) {
	if (canChangeBet) {
		currentBet = bet
		document.getElementById(bet).style.backgroundColor = "red"
		const deselectBet = bet == bets.even ? bets.odd : bets.even
		document.getElementById(deselectBet).style.backgroundColor = "transparent"
	}
}

function increaseBet () {
	setBetAmount(Math.min(currentBetAmount + minimumBet, currentMoney))
}

function decreaseBet () {
	setBetAmount(Math.max(currentBetAmount - minimumBet, minimumBet))
}

function setBetAmount (betAmount) {
	if (canChangeBet) {
		currentBetAmount = betAmount
		document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
	}
}

// Roll Dice and Process Results

function rollDice () {
	canChangeBet = false
	formatDiceScale()
	showElement(crapsRollDiceAnimationContainer)
	hideElement(crapsRollDiceButton)
	const diceRollElement = document.getElementById(crapsRollDiceAnimationContainer)
	rollADie({ element: diceRollElement, numberOfDice: numDiceToRoll, callback: delayedProcessDiceResult, delay: hideDiceDelayMs });
}

window.addEventListener("resize", formatDiceScale);
function formatDiceScale () {
	const vw = window.innerWidth * 0.8
	const vh = window.innerHeight * 0.8
	const widthScale = Math.min(700, vw, vh)
	const heightScale = widthScale * 0.714
	const scale = heightScale / 494.6592
	document.getElementById(crapsRollDiceAnimationContainer).style.transform = "scale(" + scale + ")"
}

function delayedProcessDiceResult (diceResult) {
	setTimeout(function() { processDiceResult(diceResult) }, processDiceResultDelayMs)
}
function processDiceResult (diceResult) {
	const sum = diceResult.reduce((partialSum, a) => partialSum + a, 0)
	let diceSumResult = bets.even
	if (sum % 2 === 1) {
		diceSumResult = bets.odd
	}
	setRounds(currentRounds + 1)
	let roundFinishMessage = ""
	if (diceSumResult === currentBet) {
		roundFinishMessage = "YOU WIN!"
		setMoney(currentMoney + currentBetAmount)
	} else {
		roundFinishMessage = "YOU LOSE :("
		setMoney(currentMoney - currentBetAmount)
	}
	if (currentMoney === 0) {
		roundFinishMessage = "YOU'RE OUT!"
		showElement(crapsNextRoundButtonDisabled)
		hideElement(crapsNextRoundButton)
	}
	hideElement(crapsBettingGridContainer)
	showElement(crapsRoundFinishGridContainer)
	document.getElementById(crapsRoundFinishMessage).innerHTML = roundFinishMessage
}

// Exit Game

function exitGame () {
	alert("After playing " + currentRounds + " rounds, you leave with " + currentMoney + "$")
	hideMainGameSection()
	showRegistrationPane()
	document.getElementById(crapsUsernameInput).value = ""
}
