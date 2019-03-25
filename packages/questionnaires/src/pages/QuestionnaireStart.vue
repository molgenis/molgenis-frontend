<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-if="error" class="alert alert-warning" role="alert">{{ error }}</div>

        <!-- Loading spinner -->
        <template v-if="loading">
          <loading-spinner :message="$t('questionnaire_loading_text')"></loading-spinner>
        </template>

        <!-- Questionnaire start -->
        <template v-else>
          <router-link class="btn btn-sm btn-outline-secondary mt-2"
                       to="/">
            {{ 'questionnaire_back_to_questionnaire_list' | i18n }}
          </router-link>
          <hr>

          <h5 class="display-4">{{ questionnaireLabel }}</h5>
          <p v-html="questionnaireDescription"></p>

          <button class="btn btn-lg btn-primary mt-2 float-right" @click="startQuestionnaire">
            <template v-if="isStarted">
              {{ 'questionnaires_table_continue_questionnaire_button' | i18n }}
            </template>
            <template v-else>
             {{ 'questionnaire_start' | i18n }}
            </template>
          </button>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import LoadingSpinner from '../components/LoadingSpinner'

  export default {
    name: 'QuestionnaireStart',
    props: ['questionnaireId'],
    methods: {
      startQuestionnaire () {
        this.$store.dispatch('START_QUESTIONNAIRE', this.questionnaireId).then(() => {
          this.$router.push('/' + this.questionnaireId + '/chapter/1')
        })
      }
    },
    computed: {
      loading () {
        return this.$store.state.loading
      },
      error () {
        return this.$store.state.error
      },
      questionnaireDescription () {
        return this.$store.getters.getQuestionnaireDescription(this.questionnaireId)
      },
      questionnaireLabel () {
        return this.$store.getters.getQuestionnaireLabel(this.questionnaireId)
      },
      questionnaireList () {
        return this.$store.state.questionnaireList
      },
      isStarted () {
        return this.$store.getters.isStarted(this.questionnaireId)
      }
    },
    created () {
      if (this.questionnaireList.length < 1) {
        this.$store.dispatch('GET_QUESTIONNAIRE_LIST')
      }
      if (!this.$store.state.mapperOptions.booleanLabels) {
        const mapperOptions = {
          booleanLabels: {
            trueLabel: this.$t('questionnaire_boolean_true'),
            falseLabel: this.$t('questionnaire_boolean_false'),
            nillLabel: this.$t('questionnaire_boolean_null')
          }
        }
        this.$store.commit('SET_MAPPER_OPTIONS', mapperOptions)
      }
    },
    components: {
      LoadingSpinner
    }
  }
</script>
