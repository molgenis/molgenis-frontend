import test from "tape";
import React from "react";
import {jobs} from "./jobs";
import Jobs from "react-components/jobs/Jobs";
import JobTable from "react-components/jobs/JobTable";
import sd from "skin-deep";

const tree = sd.shallowRender(Jobs({
    jobs: jobs,
    onSelect: function() {}
},JobTable({
    customColumns: [
        {
            th: 'Type', td: function (job) {
                return job.type
            }
        },
        {
            th: 'Message', td: function (job) {
                return job.progressMessage
            }
        }]
})))
const html = tree.toString()

test('Test if the Jobs component renders Running jobs before Finished jobs', assert => {
    assert.true(html.indexOf('Running Jobs') < html.indexOf('Finished Jobs'), 'Jobs component should render running jobs before finished jobs');
    assert.end();
});

test('Test if the Jobs component renders CANCELING jobs with the running jobs', assert => {
    assert.true(html.indexOf('CANCELING') > html.indexOf('Running Jobs') && html.indexOf('CANCELING') < html.indexOf('Finished Jobs'), 'Jobs component should render canceling job with the running jobs');
    assert.end();
});

test('Test if the Jobs component renders RUNNING jobs with the running jobs', assert => {
    assert.true(html.indexOf('100/500') > html.indexOf('Running Jobs') && html.indexOf('100/500') < html.indexOf('Finished Jobs'), 'Jobs component should render running job with the running jobs');
    assert.end();
});

test('Test if the Jobs component renders CANCELED jobs with the finished jobs', assert => {
    assert.true(html.indexOf('Canceled') > html.indexOf('Finished Jobs'), 'Jobs component should render canceled job with the finished jobs');
    assert.end();
});

test('Test if the Jobs component renders SUCCESS jobs with the finished jobs', assert => {
    assert.true(html.indexOf('Success') > html.indexOf('Finished Jobs'), 'Jobs component should render successful job with the finished jobs');
    assert.end();
});

test('Test if the Jobs component renders FAILED jobs with the finished jobs', assert => {
    const html = tree.toString()
    assert.true(html.indexOf('Failed') > html.indexOf('Finished Jobs'), 'Jobs component should render failed job with the finished jobs');
    assert.end();
});