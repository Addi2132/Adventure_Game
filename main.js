import inquirer from "inquirer";
/* Game Variables */
const enemies = ['Lex', 'Batman', 'Darkseid', 'Brainiac', 'General Zod', 'Doomsday'];
let maxenemiesHealth = 100;
const enemiesAttackDamage = 25;
/* Player Variables */
let playerHealth = 100;
const playerAttackDamage = 50;
let noHealthPotions = 3;
const HealthPotionHealAmount = 30;
const HealthPotionDropChance = 50; // Percentage
let running = true;
console.log('Welcome to the Dungeon!');
GAME: while (running) {
    console.log('---------------------------------------------------------------------------------');
    let enemyHealth = Math.floor(Math.random() * maxenemiesHealth);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t# ${enemy} appeared! \n`);
    while (enemyHealth > 0) {
        console.log(`\tYour HP: ${playerHealth}`);
        console.log(`\t${enemy}'s HP: ${enemyHealth}`);
        console.log(`\n\tWhat would you like to do ?`);
        let question = await inquirer.prompt({
            type: "list",
            name: "options",
            choices: [
                {
                    name: "\t1. Attack",
                    value: "attack"
                },
                {
                    name: "\t2. Drink health potion",
                    value: "potion"
                },
                {
                    name: "\t3. Run",
                    value: "run"
                },
            ]
        });
        if (question.options === "attack") {
            let damageDealt = Math.floor(Math.random() * playerAttackDamage);
            let damageTaken = Math.floor(Math.random() * enemiesAttackDamage);
            enemyHealth -= damageDealt;
            playerHealth -= damageTaken;
            console.log(`\t> You strike the ${enemy} for ${damageDealt} damage.`);
            console.log(`\t> You recived ${damageTaken} in retaliation.`);
            if (playerHealth < 1) {
                console.log('\t> You have taken too much damage.You are too weak to go on!');
                break;
            }
        }
        else if (question.options === "potion") {
            if (noHealthPotions > 0) {
                playerHealth += HealthPotionHealAmount;
                noHealthPotions--;
                console.log(`\t> You drink health potion to heal yourself to ${HealthPotionHealAmount}. \n\t  Your now have ${playerHealth} HP. \n\t  You have ${noHealthPotions} health potions left.`);
            }
            else {
                console.log(`\t> You have no healt potions left! Defeat an enemy for a chance to get one!\n`);
            }
        }
        else if (question.options === "run") {
            console.log(`You run away from the ${enemy}!`);
            continue GAME;
        }
        else {
            console.log("Error Occured!");
        }
    }
    if (playerHealth < 1) {
        console.log(`You limp out of the dungeon, weak form battle.`);
        break;
    }
    console.log('---------------------------------------------------------------------------------');
    console.log(` # ${enemy} was defeted! #`);
    console.log(` # You have ${playerHealth} HP left.`);
    let randNum = Math.floor(Math.random() * 100);
    if (randNum < HealthPotionDropChance) {
        noHealthPotions++;
        console.log(` # Enemy droped a health potion! # `);
        console.log(` # You now have ${noHealthPotions} health ${noHealthPotions > 1 ? 'potions' : 'potion. # '}`);
    }
    console.log('---------------------------------------------------------------------------------');
    console.log('What would you like to do ?');
    let question = await inquirer.prompt({
        type: "list",
        name: "options",
        choices: [
            {
                name: "\t1. Continue Fighting",
                value: "continueFignt"
            },
            {
                name: "\t2. Exit Dungeon",
                value: "exit"
            }
        ]
    });
    if (question.options === 'continueFignt') {
        console.log('You continue on your advanture...');
    }
    else if (question.options === 'exit') {
        console.log('You exit from the dungeon, successful from your advanture.');
        break;
    }
    else {
        console.log('Error Occured!');
    }
}
;
console.log('############################');
console.log('\tTHANKS FOR PLAYING');
console.log('############################');
