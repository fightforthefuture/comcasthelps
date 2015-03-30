var rotation_index = 0;
var visible_index = 0;
var stop_rotating = false;
var interval_timeout = 6000;

document.getElementById("carousel").addEventListener("mouseenter", function() {
    stop_rotating = true;
}, false);

document.getElementById("carousel").addEventListener("mouseleave", function() {
    stop_rotating = false;
}, false);

var reps = document.querySelectorAll('#carousel .action');

for (var i = 0; i < reps.length; i++) {
    var knob = document.createElement('a');
    knob.className = i == 0 ? 'sel' : '';
    knob.href = "javascript:jump("+i+");";
    document.getElementById('knobs').appendChild(knob);
}

var interval_function = function() {
    if (stop_rotating)
        return;

    new_index = rotation_index < reps.length - 1 ? rotation_index + 1 : 0;
    switch_rep(new_index);
};

var interval = setInterval(interval_function, interval_timeout);

var add_class = function(el, className) {
    el.className = el.className + ' ' + className;
}

var remove_class = function(el, className) {
    el.className = el.className.replace(new RegExp(className, "g"), "");
}

var jump = function(index) {
    clearInterval(interval);
    interval = setInterval(interval_function, interval_timeout);
    switch_rep(index);
};

var switch_rep = function(index) {
    var hide_current = function(i) {
        remove_class(reps[i], 'visible');
        setTimeout(function() {
            remove_class(reps[i], 'display');
        }, 1000);
    }
    var show_new = function(i) {
        add_class(reps[i], 'display');
        setTimeout(function() {
            add_class(reps[i], 'visible');
        }, 10);
    }
    rotation_index = index;
    hide_current(visible_index);
    visible_index = rotation_index;
    show_new(visible_index);

    var knobs = document.querySelectorAll('#knobs a');
    for (var i = 0; i < knobs.length; i++)
        remove_class(knobs[i], 'sel');

    add_class(knobs[rotation_index], 'sel');
}