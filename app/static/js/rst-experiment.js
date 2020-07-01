//------------------------------------//
// Define parameters.
//------------------------------------//

// Define context (color) assignment.
const contexts = jsPsych.randomization.shuffle(['red','green','blue','purple'])
contexts.push('closed');

// Define rewards.
const outcomes = [
  [0,0],    // certain-0
  [1,1],    // certain-1
  [2,2],    // certain-2
  [0,2],    // risky-2
  [-1,-1]   // null
];

// Define choices.
const choices = [37,39];

// Define timings.
const choice_duration = 10000;
const feedback_duration = 2000;

// Define missed repsonses count.
var missed_threshold = 100;
var missed_responses = 0;

//------------------------------------//
// Define instructions block.
//------------------------------------//

// Define image scaling CSS.
const style = "width:auto; height:auto; max-width:100%; max-height:80vh;";

var instructions1 = {
  type: 'instructions',
  pages: [
    `<img src='../static/img/instructions01.png' style="${style}"</img>`,
    `<img src='../static/img/instructions02.png' style="${style}"</img>`,
    `<img src='../static/img/instructions03.png' style="${style}"</img>`,
    `<img src='../static/img/instructions04.png' style="${style}"</img>`,
    `<img src='../static/img/instructions05.png' style="${style}"</img>`,
    `<img src='../static/img/instructions06.png' style="${style}"</img>`,
    `<img src='../static/img/instructions07.png' style="${style}"</img>`,
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next"
};

var instructions2 = {
  type: 'instructions',
  pages: [
    `<img src='../static/img/instructions08.png' style="${style}"</img>`,
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next"
};

var instructions3 = {
  type: 'instructions',
  pages: [
    `<img src='../static/img/instructions09.png' style="${style}"</img>`,
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next"
};

//------------------------------------//
// Define risk sensitivity task.
//------------------------------------//

// Define task conditions.
const conditions = [
  [0, 1],    // (0) certain-0 vs certain-1 fish
  [1, 2],    // (1) certain-1 vs certain-2 fish
  [0, 3],    // (2) certain-0 vs risky-2 fish
  [1, 3],    // (3) certain-1 vs risky-2 fish
  [2, 3],    // (4) certain-2 vs risky-2 fish
  [0, 4],    // (5) forced certain-0
  [1, 4],    // (6) forced certain-1
  [2, 4],    // (7) forced certain-2
  [3, 4],    // (8) forced risky-2
];

// Define correct key press.
const correct = [
  [39,37],
  [39,37],
  [39,37],
  [-1,-1],
  [-1,-1],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
];

// Define practice trials
const practice = [];

// Define trial sets.
// Creates a pair of trials for each condition (so that each context appears on the left and right)
function create_trial_set(start_condition, end_condition){
  var set = [];

  for (i = start_condition; (i < end_condition+1); i++) { // the conditions

    for (j = 0; j < 2; j++) { //two of each condition, flipping left and right

      // Define trial.
      const trial = {
        type: 'rst-trial',
        beach_left: contexts[conditions[i][j]],
        beach_right: contexts[conditions[i][1-j]],
        outcome_left: jsPsych.randomization.repeat(outcomes[conditions[i][j]],1)[0],
        outcome_right: jsPsych.randomization.repeat(outcomes[conditions[i][1-j]],1)[0],
        choices: choices,
        choice_duration: choice_duration,
        feedback_duration: feedback_duration,
        data: {
          stimulus_L: conditions[i][j],
          stimulus_R: conditions[i][1-j],
          correct: correct[i][j]
        },
        on_finish: function(data) {

          // Evaluate missing data
          if ( data.key == null ) {

            // Set missing data to true.
            data.missing = true;

            // Increment counter. Check if experiment should end.
            missed_responses++;
            if (missed_responses >= missed_threshold) {
              jsPsych.endExperiment();
            }

          } else {

            // Set missing data to false.
            data.missing = false;

            // Define accuracy.
            data.accuracy = data.key == data.correct;

          }

        }

      }

      // Define looping node.
      const trial_node = {
        timeline: [trial],
        loop_function: function(data) {
          return data.values()[0].missing;
        }
      }

      // Append trial.
      set.push(trial_node);

    }
  }
  return set;
}//function

// Create the first round of practice
// It consists of 4 of each forced choice conditions.
// The below adds a pair of each, twice (k=2)
var forced_choice_practice = [];
for (k = 0; k < 2; k++){
  console.log(k);
  forced_choice_practice = forced_choice_practice.concat(jsPsych.randomization.shuffle(create_trial_set(5,8)))
}

// Create the second round of practice
// It consists of 10 trials.
// 2 of each type of choice trials, of which there are 5 option.
var choice_practice = [];
for (k = 0; k < 2; k++){
  console.log(k);
  choice_practice = choice_practice.concat(jsPsych.randomization.shuffle(create_trial_set(0,4)))
}

const set = create_trial_set(0,8); //add all the conditions

// Define task trials.
// Add five of each pair of trials. 10 total for each condition.
var rst_trials = [];
for (i = 0; i < 5; i++) {
  rst_trials = rst_trials.concat(jsPsych.randomization.shuffle(set));
}
