<template>
  <div class="container my-4">
    <h2>Theme Manager</h2>

    <div class="custom-control custom-radio mt-3">
      <input
        id="theme-selection-public" v-model="selectionMethod"
        type="radio"
        class="custom-control-input" name="radio-stacked"
        value="public"
      >
      <label class="custom-control-label" for="theme-selection-public">Select a public theme</label>
    </div>

    <div class="custom-control custom-radio">
      <input
        id="theme-selection-custom" v-model="selectionMethod"
        type="radio"
        class="custom-control-input" name="radio-stacked"
        value="custom"
      >
      <label class="custom-control-label" for="theme-selection-custom">URL to a custom theme</label>
    </div>

    <div class="custom-control custom-radio mb-4">
      <input
        id="theme-selection-generated" v-model="selectionMethod"
        type="radio"
        class="custom-control-input" name="radio-stacked"
        value="generated"
      >
      <label class="custom-control-label" for="theme-selection-generated">Create your own theme</label>
    </div>

    <div v-if="selectionMethod === 'public'">
      <div class="form-group">
        <label for="bootstrap-theme-select">Available Themes</label>
        <select id="bootstrap-theme-select" v-model="selectedTheme" class="form-control">
          <option v-for="_theme in themes" :key="_theme.id" :value="_theme.id">
            {{ _theme.name || _theme.id }}
          </option>
        </select>
      </div>
    </div>

    <div v-else-if="selectionMethod === 'custom'">
      <div class="form-group">
        <label for="theme-url">Theme url</label>
        <input
          id="theme-url" v-model="themeUrl"
          type="text"
          class="form-control" autocomplete="off"
        >
        <small id="emailHelp" class="form-text text-muted">Url to a customized <a href="https://github.com/molgenis/molgenis-theme">molgenis-theme</a> Bootstrap 4 file.</small>
      </div>
      <div class="form-group">
        <label for="theme-url-legacy">Theme url (legacy)</label>
        <input
          id="theme-url-legacy" v-model="themeUrlLegacy"
          type="text"
          class="form-control" autocomplete="off"
        >
        <small id="emailHelp" class="form-text text-muted">Url to a customized <a href="https://github.com/molgenis/molgenis-theme">molgenis-theme</a> Bootstrap 3 file.</small>
      </div>
    </div>

    <div v-else-if="selectionMethod === 'generated'">
      <label for="navbar-style">Navbar style</label>
      <select id="navbar-style" v-model="theme.variables['mg-navbar-style']" class="form-control">
        <option value="brand">
          brand
        </option>
        <option value="light">
          light
        </option>
      </select>

      <div class="form-group">
        <label for="primary-color">Primary color</label><br>
        <input v-model="theme.variables['mg-color-primary']" type="color" name="favcolor">&nbsp;
        <input v-model="theme.variables['mg-color-primary-contrast']" type="color" name="favcolor">
        <small id="emailHelp" class="form-text text-muted">{{ $t('A primary branding color with with contrast color') }}</small>
      </div>

      <div class="form-group">
        <label for="primary-color">Secondary color</label><br>
        <input v-model="theme.variables['mg-color-secondary']" type="color" name="favcolor">&nbsp;
        <input v-model="theme.variables['mg-color-secondary-contrast']" type="color" name="favcolor">
        <small id="emailHelp" class="form-text text-muted">{{ $t('A secondary branding color with its contrast color') }}</small>
      </div>
    </div>

    <button class="btn btn-primary" @click="save">
      Save
    </button>
  </div>
</template>

<script>
const themeRepository = '/@molgenis-ui/molgenis-theme/dist/themes'

export default {
  data () {
    return {
      theme: {
        name: location.hostname,
        variables: {
          'mg-color-primary': '#0166ca',
          'mg-color-primary-contrast': '#ffffff',
          'mg-color-secondary': '#005ec4',
          'mg-color-secondary-contrast': '#ffffff',
          'mg-navbar-style': 'brand'
        }
      },
      themes: [],
      selectionMethod: 'public',
      selectedTheme: null,
      themeUrl: '',
      themeUrlLegacy: ''
    }
  },
  watch: {
    selectedTheme (newVal) {
      this.themeUrl = `${themeRepository}/mg-${newVal}-4.css`
      this.themeUrlLegacy = `${themeRepository}/mg-${newVal}-3.css`
      // Changing the theme from the theme-manager will always use
      // the current Bootstrap 4 url.
      // document.querySelector('#bootstrap-theme').setAttribute('href', this.themeUrl)
    }
  },
  async created () {
    const settings = await (await fetch('/api/data/sys_set_app/app', { method: 'GET' })).json()

    this.themeUrl = settings.data.theme_url
    this.themeUrlLegacy = settings.data.legacy_theme_url

    const allThemes = await (await fetch(`${themeRepository}/index.json`, { method: 'GET' })).json()

    // Only show themes that are meant to be public.
    this.themes = allThemes.filter((t) => t.share)
    var matchedTheme = this.themes.find(t => this.themeUrl.includes(t.id))
    // Theme repository should be part of the expected path; otherwise it is a custom url.
    if (matchedTheme && this.themeUrl.includes(themeRepository)) {
      this.selectedTheme = matchedTheme.id
      this.selectionMethod = 'public'
    } else {
      this.selectionMethod = 'custom'
    }
  },
  methods: {
    async save () {
      // First post the theme variables to get the theme urls back:
      if (this.selectionMethod === 'generated') {
        const res = await (await fetch('/themes', {
          body: JSON.stringify(this.theme),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })).json()

        this.themeUrlLegacy = `/themes/generated/${res.themeUrlLegacy}`
        this.themeUrl = `/themes/generated/${res.themeUrl}`
      }

      await fetch('/api/data/sys_set_app/app', {
        body: JSON.stringify({
          legacy_theme_url: this.themeUrlLegacy,
          theme_url: this.themeUrl
        }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })

      location.reload()
    }
  }
}
</script>
