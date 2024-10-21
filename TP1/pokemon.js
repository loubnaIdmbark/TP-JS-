import fetch from "node-fetch";
import readline from "readline";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/";
let playerHP = 300;
let botHP = 300;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getPokemonData(pokemonName) {
  const response = await fetch(`${POKE_API_BASE_URL}pokemon/${pokemonName}`);
  const data = await response.json();
  return {
    name: data.name,
    moves: data.moves.slice(0, 5),
    stats: data.stats,
  };
}

async function getMoveData(moveUrl) {
  const response = await fetch(moveUrl);
  const data = await response.json();
  return {
    name: data.name,
    power: data.power || 50,
    accuracy: data.accuracy || 100,
    pp: data.pp || 10,
  };
}

function calculateDamage(power) {
  return Math.floor(Math.random() * (power / 2)) + power / 2;
}

function moveHits(accuracy) {
  return Math.random() * 100 < accuracy;
}

async function playerTurn(player, bot) {
  console.log(`It's your turn! Choose a move:`);
  player.moves.forEach((move, index) => {
    console.log(`${index + 1}: ${move.move.name}`);
  });

  return new Promise((resolve) => {
    rl.question("Select your move (1-5): ", async (moveIndex) => {
      const move = player.moves[parseInt(moveIndex) - 1];
      const moveData = await getMoveData(move.move.url);

      if (moveHits(moveData.accuracy)) {
        const damage = calculateDamage(moveData.power);
        botHP -= damage;
        console.log(
          `Your move ${move.move.name} hit! You dealt ${damage} damage. Bot HP: ${botHP}`
        );
      } else {
        console.log(`Your move missed!`);
      }

      resolve();
    });
  });
}

async function botTurn(player, bot) {
  console.log(`Bot's turn!`);
  const randomMove = bot.moves[Math.floor(Math.random() * bot.moves.length)];
  const moveData = await getMoveData(randomMove.move.url);

  if (moveHits(moveData.accuracy)) {
    const damage = calculateDamage(moveData.power);
    playerHP -= damage;
    console.log(
      `Bot's move ${randomMove.move.name} hit! Bot dealt ${damage} damage. Your HP: ${playerHP}`
    );
  } else {
    console.log(`Bot's move missed!`);
  }
}

async function gameLoop(player, bot) {
  while (playerHP > 0 && botHP > 0) {
    await playerTurn(player, bot);
    if (botHP <= 0) {
      console.log("You won!");
      rl.close();
      break;
    }

    await botTurn(player, bot);
    if (playerHP <= 0) {
      console.log("Bot won!");
      rl.close();
      break;
    }
  }
}

async function choosePokemon() {
  const choices = ["pikachu", "charmander", "squirtle"];
  console.log("Choose your Pokémon:");
  choices.forEach((choice, index) => {
    console.log(`${index + 1}: ${choice}`);
  });

  return new Promise((resolve) => {
    rl.question("Select your Pokémon (1-3): ", async (choiceIndex) => {
      const selectedPokemon = choices[parseInt(choiceIndex) - 1];
      const pokemonData = await getPokemonData(selectedPokemon);
      resolve(pokemonData);
    });
  });
}

async function main() {
  const playerPokemon = await choosePokemon();
  const botPokemon = await getPokemonData("bulbasaur");

  console.log(`You chose ${playerPokemon.name}! Bot chose ${botPokemon.name}!`);

  await gameLoop(playerPokemon, botPokemon);
}

main();
