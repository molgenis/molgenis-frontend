import mutations from '@/store/navigator/mutations'

describe('mutations', () => {
  describe('ADD_ALERTS', () => {
    it('should set add the alerts to existing alerts in the state', () => {
      const state = {
        alerts: [{ type: 'error', message: 'error message', code: 'error code' }]
      }

      const alerts = [
        [{ type: 'info', message: 'info message' }]
      ]

      mutations.__ADD_ALERTS__(state, alerts)
      expect(state.alerts[1]).toEqual(alerts[0])
    })
  })
  describe('REMOVE_ALERT', () => {
    it('should remove an alert by index in the state', () => {
      const state = {
        alerts: [
          { type: 'error', message: 'error message', code: 'error code' },
          { type: 'info', message: 'info message' }
        ]
      }

      const expectedAlerts = [
        { type: 'info', message: 'info message' }
      ]
      mutations.__REMOVE_ALERT__(state, 0)
      expect(state.alerts).toEqual(expectedAlerts)
    })
  })
  describe('ADD_JOB', () => {
    it('should add job to jobs in the state', () => {
      const job0 = { type: 'DOWNLOAD', id: '0', status: 'RUNNING' }
      const job1 = { type: 'COPY', id: '1', status: 'finished' }

      const state = {
        jobs: [job0]
      }

      mutations.__ADD_JOB__(state, job1)
      expect(state.jobs).toEqual([job0, job1])
    })
  })
  describe('UPDATE_JOB', () => {
    it('should update existing job in the state', () => {
      const job0 = { type: 'DOWNLOAD', id: '0', status: 'RUNNING' }
      const job1 = { type: 'COPY', id: '0', status: 'RUNNING' }

      const state = {
        jobs: [job0, job1]
      }

      const updatedJob1 = { type: 'COPY', id: '0', status: 'SUCCESS' }
      mutations.__UPDATE_JOB__(state, updatedJob1)
      expect(state.jobs).toEqual([job0, updatedJob1])
    })
  })
  describe('REMOVE_JOB', () => {
    it('should remove existing job in the state', () => {
      const job0 = { type: 'DOWNLOAD', id: '0', status: 'RUNNING' }
      const job1 = { type: 'COPY', id: '0', status: 'RUNNING' }

      const state = {
        jobs: [job0, job1]
      }

      mutations.__REMOVE_JOB__(state, job1)
      expect(state.jobs).toEqual([job0])
    })
  })
  describe('SET_FOLDER', () => {
    it('should set the folder', () => {
      const state = {
        folder: null
      }

      const folder = [
        { id: '0', label: 'grandchild', parent: { id: '1', label: 'child' } }
      ]

      mutations.__SET_FOLDER__(state, folder)
      expect(state.folder).toEqual(folder)
    })
  })
  describe('SET_RESOURCES', () => {
    it('should set the resources in the state and clear the selected resources', () => {
      const state = {
        resources: [{ type: 'PACKAGE', 'id': '0', 'label': 'label0' }],
        selectedResources: [{ type: 'PACKAGE', 'id': '0', 'label': 'label0' }]
      }

      const resources = [
        { type: 'PACKAGE', 'id': '1', 'label': 'label1' },
        { type: 'ENTITY_TYPE', 'id': '2', 'label': 'label2' }
      ]

      mutations.__SET_RESOURCES__(state, resources)
      expect(state.resources).toEqual(resources)
      expect(state.selectedResources).toEqual([])
    })
  })
  describe('SET_SELECTED_RESOURCES', () => {
    it('should set the selected resources in the state', () => {
      const state = {
        selectedResources: []
      }

      const selectedResources = [
        { type: 'PACKAGE', 'id': '1', 'label': 'label1' },
        { type: 'ENTITY_TYPE', 'id': '2', 'label': 'label2' }
      ]

      mutations.__SET_SELECTED_RESOURCES__(state, selectedResources)
      expect(state.selectedResources).toEqual(selectedResources)
    })
  })
  describe('SET_SHOW_HIDDEN_RESOURCES', () => {
    it('should enable show hidden resources', () => {
      const state = {
        showHiddenResources: false
      }
      mutations.__SET_SHOW_HIDDEN_RESOURCES__(state, true)
      expect(state.showHiddenResources).toBe(true)
    })
  })
  describe('SET_CLIPBOARD', () => {
    it('should set the clipboard in the state and clear the selected resources', () => {
      const state = {
        clipboard: null
      }

      const clipboard = {
        mode: 'CUT',
        resources: [
          { type: 'PACKAGE', 'id': '1', 'label': 'label1' },
          { type: 'ENTITY_TYPE', 'id': '2', 'label': 'label2' }
        ]
      }

      mutations.__SET_CLIPBOARD__(state, clipboard)
      // @ts-ignore
      expect(state.selectedResources).toEqual([])
      expect(state.clipboard).toEqual(clipboard)
    })
  })
  describe('RESET_CLIPBOARD', () => {
    it('should set the clipboard to null in the state', () => {
      const state = {
        clipboard: {
          mode: 'CUT',
          resources: [
            { type: 'PACKAGE', 'id': '1', 'label': 'label1' },
            { type: 'ENTITY_TYPE', 'id': '2', 'label': 'label2' }
          ]
        }
      }

      mutations.__RESET_CLIPBOARD__(state)
      expect(state.clipboard).toEqual(null)
    })
  })
})
