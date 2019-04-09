import test from "tape";
import React from "react";
import sd from "skin-deep";
import {job_success, job_failed, job_running, job_canceled, job_canceling} from "./jobs";
import Job from "react-components/jobs/Job";

test('Test if the Job component renders a succeeded job correctly', assert => {
    const tree = sd.shallowRender(Job({
        job: job_success
    }));

    assert.equals(tree.toString(),
        '<div><p>TEST job job</p><div>Test (started by Tape)<div class="progress background-lightgrey"><div class="progress-bar progress-bar-success" role="progressbar" style="min-width:2em;width:100%;">1000/1000</div></div></div><div class="btn-group" role="group"><button type="button" class="btn btn-default">Show log</button></div><button type="button" class="btn btn-warning disabled pull-right">Cancel</button></div>',
        'Job component rendered a succeeded job correctly, with active log and disabled cancel button');

    assert.end();
});

test('Test if the Job component renders a running job correctly', assert => {
    const tree = sd.shallowRender(Job({
        job: job_running
    }));

    assert.equals(tree.toString(),
        '<div><p>TEST job job</p><div>Test (started by Tape)<div class="progress background-lightgrey"><div class="progress-bar progress-bar-primary progress-bar-striped active" role="progressbar" style="min-width:2em;width:20%;">100/500</div></div></div><div class="btn-group" role="group"><button type="button" class="btn btn-default">Show log</button></div><button type="button" class="btn btn-warning pull-right">Cancel</button></div>',
        'Job component rendered a running job correctly, with log and cancel buttons');

    assert.end();
});

test('Test if the Job component renders a failed job correctly', assert => {
    const tree = sd.shallowRender(Job({
        job: job_failed
    }));

    assert.equals(tree.toString(),
        '<div><p>TEST job job</p><div>Test (started by Tape)<div class="progress background-lightgrey"><div class="progress-bar progress-bar-danger" role="progressbar" style="min-width:2em;width:25%;">50/200</div></div></div><div class="btn-group" role="group"><button type="button" class="btn btn-default">Show log</button></div><button type="button" class="btn btn-warning disabled pull-right">Cancel</button></div>',
        'Job component rendered a failed job correctly with active log and disabled cancel buttons');

    assert.end();
});

test('Test if the Job component renders a canceling job correctly', assert => {
    const tree = sd.shallowRender(Job({
        job: job_canceling
    }));

    assert.equals(tree.toString(),
      '<div><p>Script job</p><div><div class="progress background-lightgrey"><div class="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" style="min-width:2em;width:100%;">CANCELING</div></div></div><div class="btn-group" role="group"><button type="button" class="btn btn-default">Show log</button></div><button type="button" class="btn btn-warning disabled pull-right">Cancel</button></div>',
      'Job component rendered a canceling job correctly with active log and disabled cancel button');

    assert.end();
});

test('Test if the Job component renders a canceled job correctly', assert => {
    const tree = sd.shallowRender(Job({
        job: job_canceled
    }));

    assert.equals(tree.toString(),
      '<div><p>Script job</p><div><div class="progress background-lightgrey"><div class="progress-bar progress-bar-warning" role="progressbar" style="min-width:2em;width:100%;">CANCELED</div></div></div><div class="btn-group" role="group"><button type="button" class="btn btn-default">Show log</button></div><button type="button" class="btn btn-warning disabled pull-right">Cancel</button></div>',
      'Job component rendered a canceled job correctly, full-width warning color with status CANCELED and with active log and disabled cancel button');

    assert.end();
});