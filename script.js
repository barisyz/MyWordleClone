console.log(word_list.length)

let game_state = {
  is_game_running: false,
  word: "",
  word_length: 5,
  current_turn: 0,
  current_guess: "",
  guesses: [null, null, null, null, null, null],
}

let total_game = 0;
const score = {
  "0": 0,
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
}

function start_game() {
  const selected_word = word_list[Math.floor(Math.random() * word_list.length)].toLocaleUpperCase('tr-TR');

  game_state.is_game_running = true;
  game_state.current_guess = "";
  game_state.word = selected_word;
  game_state.word_length = selected_word.length;
  game_state.current_turn = 0;
  game_state.guesses = [null, null, null, null, null, null];
  console.log("WORLD", selected_word);
  clear_keyboard();
  draw_game();
}

function draw_game() {
  for (let i = 0; i < game_state.guesses.length; i++) {
    let word_container = document.getElementById("idx_" + i)
    const is_guess_row = i == game_state.current_turn;
    const guess = is_guess_row ? game_state.current_guess : game_state.guesses[i];

    for (let j = 0; j < word_container.children.length; j++) {

      let ch_elem = word_container.children[j]
      ch_elem.classList.remove("success", "wrong-spot", "failed");

      if (guess != null && j < guess.length) {
        let curr_ch = guess[j];
        ch_elem.innerHTML = curr_ch;

        if (!is_guess_row) {
          keyboard_ch_key_elem = document.querySelector('[data-value="' + guess[j] + '"]')
          keyboard_ch_key_elem.classList.remove("success", "wrong-spot", "failed");
          if (curr_ch == game_state.word[j]) {
            ch_elem.classList.add("success");
            keyboard_ch_key_elem.classList.add("success");
          } else if (game_state.word.includes(curr_ch)) {
            ch_elem.classList.add("wrong-spot");
            keyboard_ch_key_elem.classList.add("wrong-spot");
          } else {
            ch_elem.classList.add("failed");
            keyboard_ch_key_elem.classList.add("failed");
          }
        }

      } else {
        ch_elem.innerHTML = "&nbsp;";
      }
    }
  }
}

function check_guess() {
  if (game_state.is_game_running) {
    if (game_state.current_guess && game_state.current_guess.length < game_state.word_length) {
      alert(get_message(MESSAGE_INVALID_GUESS_KEY));
    } else if (game_state.word == game_state.current_guess) {
      game_state.is_game_running = false;
      end_game(game_state.current_turn)
    } else if (game_state.current_guess && game_state.current_guess.length == game_state.word_length) {
      game_state.guesses[game_state.current_turn] = game_state.current_guess;
      game_state.current_guess = "";
      game_state.current_turn += 1;

      if (game_state.current_turn >= game_state.guesses.length) {
        game_state.is_game_running = false;
        end_game()
      }
    }
  }

  draw_game();
}

function add_ch(value) {
  if (!game_state.is_game_running) {
    return;
  }
  if (game_state.current_guess.length < game_state.word_length) {
    game_state.current_guess = game_state.current_guess + value;
  }

  draw_game();
}

function delete_ch() {
  if (!game_state.is_game_running) {
    return;
  }

  if (game_state.current_guess.length > 0) {
    game_state.current_guess = game_state.current_guess.slice(0, -1);
  }

  draw_game();
}

function click_button(elem) {
  if (!game_state.is_game_running) {
    return;
  }

  if (elem.dataset.value) {
    add_ch(elem.dataset.value);
  }
}

function end_game(guessed_turn) {
  total_game += 1;
  let message = get_message(MESSAGE_DISPLAYING_WORD_KEY, { word: game_state.word });
  if (guessed_turn != undefined) {
    score[guessed_turn] += 1;
    message += get_message(MESSAGE_CONGRATS_WITH_TURN_KEY, { turn: game_state.current_turn + 1 });
  } else {
    message += get_message(MESSAGE_FAILED_KEY);
  }

  message += get_message(MESSAGE_TOTAL_PLAYED_KEY, { total: total_game });;
  message += get_message(MESSAGE_SCORE_DISTRUBITION_KEY);
  message += get_message(MESSAGE_TURN_AND_SCORE, { turn: 1, score: score[0] });
  message += get_message(MESSAGE_TURN_AND_SCORE, { turn: 2, score: score[1] });
  message += get_message(MESSAGE_TURN_AND_SCORE, { turn: 3, score: score[2] });
  message += get_message(MESSAGE_TURN_AND_SCORE, { turn: 4, score: score[3] });
  message += get_message(MESSAGE_TURN_AND_SCORE, { turn: 5, score: score[4] });
  message += get_message(MESSAGE_TURN_AND_SCORE, { turn: 6, score: score[5] });

  alert(message)

  start_game();
}

function clear_keyboard() {
  const keyboard_ch_key_elems = document.querySelectorAll('[data-value]');
  keyboard_ch_key_elems.forEach(elem => {
    elem.classList.remove("success", "wrong-spot", "failed");
  })
}

function init() {
  var buttons = document.getElementsByTagName('button')
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener('click', () => {
      click_button(button);
    });
  }
}



init();
start_game()
