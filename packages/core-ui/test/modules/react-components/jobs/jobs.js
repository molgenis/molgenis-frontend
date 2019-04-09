const job_success = {
  identifier: 'test_1',
  status: 'SUCCESS',
  type: 'TEST job',
  entityTypeId: 'TapeTest',
  progressMax: 1000,
  progressInt: 1000,
  progressMessage: 'Test (started by Tape)',
  submissionDate: '2100-01-01T00:00:00+0100',
  startDate: '2100-01-01T00:15:00+0100',
  endDate: '2100-01-01T00:30:00+0100',
}

const job_running = {
  identifier: 'test_2',
  status: 'RUNNING',
  type: 'TEST job',
  entityTypeId: 'TapeTest',
  progressMax: 500,
  progressInt: 100,
  progressMessage: 'Test (started by Tape)',
  submissionDate: '2200-01-01T00:00:00+0100',
  startDate: '2200-01-01T00:15:00+0100',
  endDate: '2200-01-01T00:30:00+0100',
}

const job_failed = {
  identifier: 'test_3',
  status: 'FAILED',
  type: 'TEST job',
  entityTypeId: 'TapeTest',
  progressMax: 200,
  progressInt: 50,
  progressMessage: 'Test (started by Tape)',
  submissionDate: '2300-01-01T00:00:00+0100',
  startDate: '2300-01-01T00:15:00+0100',
  endDate: '2300-01-01T00:30:00+0100',
}

const job_canceling = {
  '_href': '/api/v2/sys_job_ScriptJobExecution/aaaac2p5c3hauascvqkaabaaae',
  'name': 'test',
  'parameters': '{"sleep_cycles":"10","sleep_time":"10"}',
  'identifier': 'aaaac2p5c3hauascvqkaabaaae',
  'user': 'admin',
  'status': 'CANCELING',
  'type': 'Script',
  'submissionDate': '2019-04-08T13:15:24Z',
  'startDate': '2019-04-08T13:15:24Z',
  'log': '13:15:24.301 - Execution started.\n13:15:28.288 - Canceling ...\n'
}

const job_canceled = {
  '_href': '/api/v2/sys_job_ScriptJobExecution/aaaac2p5c3hauascvqkaabaaae',
  'name': 'test',
  'parameters': '{"sleep_cycles":"10","sleep_time":"10"}',
  'identifier': 'aaaac2p5c3hauascvqkaabaaae',
  'user': 'admin',
  'status': 'CANCELED',
  'type': 'Script',
  'submissionDate': '2019-04-08T13:15:24Z',
  'startDate': '2019-04-08T13:15:24Z',
  'endDate': '2019-04-08T13:17:05Z',
  'log': '13:15:24.301 - Execution started.\n13:15:28.288 - Canceling ...\n13:17:05.056 - Canceled\n'
}

const jobs = [job_success, job_running, job_failed, job_canceling, job_canceled]

export { job_failed, job_running, job_success, job_canceling, job_canceled, jobs }