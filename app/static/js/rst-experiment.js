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

// Subject ID Screen
function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
}
var subject_id = {
    type: 'survey-text',
    button_label: 'המשך',
    questions: [{
      prompt: 'נא להכניס מספר נבדק כאן',
    }],
    on_finish: function(data){
      sub_num = JSON.parse(data.responses)["Q0"];
      jsPsych.data.addProperties({
        sub: sub_num,
        start_time: getFormattedDate()
      });
    }
};

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
};

var instructions2 = {
  type: 'instructions',
  pages: [
    `<img src='../static/img/instructions08.png' style="${style}"</img>`,
  ],
  show_clickable_nav: true,
};

var instructions3 = {
  type: 'instructions',
  pages: [
    `<img src='../static/img/instructions09.png' style="${style}"</img>`,
  ],
  show_clickable_nav: true,
};

//------------------------------------//
// Define risk sensitivity task.
//------------------------------------//

// Forced practice conditions. 16 trials total.
// (each condition added twice in left-right balancin.)
const practice_1 = [
  [0, 4],    // (1) forced certain-0
  [0, 4],    // (2) forced certain-0

  [1, 4],    // (3) forced certain-1
  [1, 4],    // (4) forced certain-1

  [2, 4],    // (5) forced certain-2
  [2, 4],    // (6) forced certain-2

  [3, 4],    // (7) forced risky-2
  [3, 4],    // (8) forced risky-2
];

const practice1_correct = [

  // forced certain-0
  [37,39],
  [37,39],

  // forced certain-1
  [37,39],
  [37,39],

  // forced certain-2
  [37,39],
  [37,39],

  // forced risky-2
  [37,39],
  [37,39],

];

// choice practice conditions. 10 trials total.
const practice_2 = [
  [0, 1],    // (1) certain-0 vs certain-1 fish
  [1, 2],    // (2) certain-1 vs certain-2 fish
  [0, 3],    // (3) certain-0 vs risky-2 fish
  [1, 3],    // (4) certain-1 vs risky-2 fish
  [2, 3],    // (5) certain-2 vs risky-2 fish
];

const practice2_correct = [
  [39,37], // certain-0 vs certain-1 fish
  [37,39], // certain-1 vs certain-2 fish
  [39,37], // certain-0 vs risky-2
  [-1,-1], // certain-1 vs risky-2 fish
  [37,39], // certain-2 vs risky-2 fish

];

// each trial condition here is added twice (left and right balancing)
const trial_conditions = [

  // 30 risk trials total
  [1, 3],    // (1) certain-1 vs risky-2 fish
  [1, 3],    // (2) certain-1 vs risky-2 fish
  [1, 3],    // (3) certain-1 vs risky-2 fish
  [1, 3],    // (4) certain-1 vs risky-2 fish
  [1, 3],    // (5) certain-1 vs risky-2 fish
  [1, 3],    // (6) certain-1 vs risky-2 fish
  [1, 3],    // (7) certain-1 vs risky-2 fish
  [1, 3],    // (8) certain-1 vs risky-2 fish
  [1, 3],    // (9) certain-1 vs risky-2 fish
  [1, 3],    // (10) certain-1 vs risky-2 fish
  [1, 3],    // (11) certain-1 vs risky-2 fish
  [1, 3],    // (12) certain-1 vs risky-2 fish
  [1, 3],    // (13) certain-1 vs risky-2 fish
  [1, 3],    // (14) certain-1 vs risky-2 fish
  [1, 3],    // (15) certain-1 vs risky-2 fish

  // 20 certain-0 vs risky-2 fish
  [0, 3],    // (1) certain-0 vs risky-2 fish
  [0, 3],    // (2) certain-0 vs risky-2 fish
  [0, 3],    // (3) certain-0 vs risky-2 fish
  [0, 3],    // (4) certain-0 vs risky-2 fish
  [0, 3],    // (5) certain-0 vs risky-2 fish
  [0, 3],    // (6) certain-0 vs risky-2 fish
  [0, 3],    // (7) certain-0 vs risky-2 fish
  [0, 3],    // (8) certain-0 vs risky-2 fish
  [0, 3],    // (9) certain-0 vs risky-2 fish
  [0, 3],    // (10) certain-0 vs risky-2 fish

  // 20 certain-2 vs risky-2
  [2, 3],    // (1) certain-2 vs risky-2 fish
  [2, 3],    // (2) certain-2 vs risky-2 fish
  [2, 3],    // (3) certain-2 vs risky-2 fish
  [2, 3],    // (4) certain-2 vs risky-2 fish
  [2, 3],    // (5) certain-2 vs risky-2 fish
  [2, 3],    // (6) certain-2 vs risky-2 fish
  [2, 3],    // (7) certain-2 vs risky-2 fish
  [2, 3],    // (8) certain-2 vs risky-2 fish
  [2, 3],    // (9) certain-2 vs risky-2 fish
  [2, 3],    // (10) certain-2 vs risky-2 fish

  // 16 certain-0 vs certain-1 fish
  [0, 1],    // (1) certain-0 vs certain-1 fish
  [0, 1],    // (2) certain-0 vs certain-1 fish
  [0, 1],    // (3) certain-0 vs certain-1 fish
  [0, 1],    // (4) certain-0 vs certain-1 fish
  [0, 1],    // (5) certain-0 vs certain-1 fish
  [0, 1],    // (6) certain-0 vs certain-1 fish
  [0, 1],    // (7) certain-0 vs certain-1 fish
  [0, 1],    // (8) certain-0 vs certain-1 fish

  // 16 certain-1 vs certain-2 fish
  [1, 2],    // (1) certain-1 vs certain-2 fish
  [1, 2],    // (2) certain-1 vs certain-2 fish
  [1, 2],    // (3) certain-1 vs certain-2 fish
  [1, 2],    // (4) certain-1 vs certain-2 fish
  [1, 2],    // (5) certain-1 vs certain-2 fish
  [1, 2],    // (6) certain-1 vs certain-2 fish
  [1, 2],    // (7) certain-1 vs certain-2 fish
  [1, 2],    // (8) certain-1 vs certain-2 fish

  // 14 forced risky-2
  [3, 4],    // (1) forced risky-2
  [3, 4],    // (2) forced risky-2
  [3, 4],    // (3) forced risky-2
  [3, 4],    // (4) forced risky-2
  [3, 4],    // (5) forced risky-2
  [3, 4],    // (6) forced risky-2
  [3, 4],    // (7) forced risky-2

  // 12 forced 0
  [0, 4],    // (1) forced certain-0
  [0, 4],    // (2) forced certain-0
  [0, 4],    // (3) forced certain-0
  [0, 4],    // (4) forced certain-0
  [0, 4],    // (5) forced certain-0
  [0, 4],    // (6) forced certain-0


  // 12 forced 1
  [1, 4],    // (1) forced certain-1
  [1, 4],    // (2) forced certain-1
  [1, 4],    // (3) forced certain-1
  [1, 4],    // (4) forced certain-1
  [1, 4],    // (5) forced certain-1
  [1, 4],    // (6) forced certain-1


  // 12 forced 2
  [2, 4],    // (1) forced certain-2
  [2, 4],    // (2) forced certain-2
  [2, 4],    // (3) forced certain-2
  [2, 4],    // (4) forced certain-2
  [2, 4],    // (5) forced certain-2
  [2, 4],    // (6) forced certain-2

];

// Define correct key press.
// The correct key is listed first.
// 37 => ArrowLeft
// 39 => ArrowRight
// -1 => no correct answer
const trial_correct = [

  // Risk Trials (15 x2)
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],
  [-1,-1],

  // 20 certain-0 vs risky-2 fish
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],

  // 20 certain-2 vs risky-2
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],

  // 16 certain-0 vs certain-1 fish
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],

  // 16 certain-1 vs certain-2 fish
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],
  [39,37],

  // 14 forced risky-2
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],

  // 12 forced 0
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],

  // 12 forced 1
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],
  [37,39],

  // 12 forced 2
  [37,39],
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
function create_trial_set(conditions, correct){
  var set = [];

  for (i = 0; (i < conditions.length); i++) { // the conditions

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

          // Set missing data to false.
          data.missing = false;

          // Define accuracy.
          data.accuracy = data.key == data.correct;

          // Add interactions to the data variable
          //var interaction_data = jsPsych.data.getInteractionData();
          //jsPsych.data.get().addToLast({interactions: interaction_data.json()});

          // Display jsPsych data in viewport.
          //jsPsych.data.displayData();

          // attempt to save data on every trial
          //pass_data("{{workerId}}", "{{assignmentId}}", "{{hitId}}",  "{{a}}", "{{tp_a}}", "{{b}}", "{{tp_b}}", "{{c}}", "{{tp_c}}");

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
// Forced choice, 16 trials total.
var forced_choice_practice = [];
forced_choice_practice = forced_choice_practice.concat(jsPsych.randomization.shuffle(create_trial_set(practice_1, practice1_correct)));

// Create the second round of practice
// It consists of 10 trials.
var choice_practice = [];
choice_practice = choice_practice.concat(jsPsych.randomization.shuffle(create_trial_set(practice_2, practice2_correct)));

// Create the full trial set
const set = create_trial_set(trial_conditions, trial_correct); //add all the conditions
var rst_trials = [];
rst_trials = rst_trials.concat(jsPsych.randomization.shuffle(set));
