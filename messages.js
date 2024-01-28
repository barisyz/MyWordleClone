const MESSAGE_KEYS = "";

const LANG_TR = "tr";
const LANG_EN = "en";

let SELECTED_LANGUAGE = LANG_TR;

const MESSAGE_INVALID_GUESS_KEY = "message_invalid_guess";
const MESSAGE_DISPLAYING_WORD_KEY = "message_displaying_word";
const MESSAGE_CONGRATS_WITH_TURN_KEY = "message_congrats_with_turn";
const MESSAGE_FAILED_KEY = "message_failed_turn";
const MESSAGE_TOTAL_PLAYED_KEY = "message_total_played";
const MESSAGE_SCORE_DISTRUBITION_KEY = "message_score_dist";
const MESSAGE_TURN_AND_SCORE = "message_turn_and_score";

const MESSAGE_WIN_AT_TURN_1 = "message_win_at_turn_1";

const MESSAGES = {
  "tr": {
    "message_displaying_word": "Kelime: :word\n",
    "message_invalid_guess": "Tahmininde yeterli harf yok...",
    "message_congrats_with_turn": "Tebrikler kelimeyi :turn denemede bildin!\n",
    "message_failed_turn": "Maalesef kelimeyi dogru tahmin edemedin!\n",
    "message_total_played": "Toplam oynanma: :total\n",
    "message_score_dist": "Puan Dagilimi\n",
    "message_turn_and_score": ":turn : :score\n",
  },
  "en": {
    "message_displaying_word": "Word: :word\n",
    "message_invalid_guess": "Not enough letters..",
    "message_congrats_with_turn": "Congrats, you guessed at turn :turn!\n",
    "message_failed_turn": "Failed to guess\n",
    "message_total_played": "Total played: :total\n",
    "message_score_dist": "Score Distribution\n",
    "message_turn_and_score": ":turn : :score\n",
  }
}

const WIN_MESSAGES = {
  "tr": {
    "0": "YUHH!!!",
    "1": "Muhtesem!!",
    "2": "Cok iyi!",
    "3": "Fena degil.",
    "4": "Idare eder..",
    "5": "Olsun...",
  },
  "en": {
    "0": "Genius!!!",
    "1": "Magnificent!!",
    "2": "Impressive!",
    "3": "Splendid",
    "4": "Great..",
    "5": "Phew...",
  }
}

var __hasProp = Object.prototype.hasOwnProperty;
function get_message(key, obj) {
  if (obj) {
    let message = MESSAGES[SELECTED_LANGUAGE][key];

    for (param in obj) {
      if (!__hasProp.call(obj, param)) continue;
      let regex = new RegExp(":" + param, "g");
      message = message.replace(regex, obj[param]);
    }

    return message;
  }

  return MESSAGES[SELECTED_LANGUAGE][key];
}

function get_win_message(turn) {
  return WIN_MESSAGES[SELECTED_LANGUAGE]["" + turn];
}