<template>
  <div class="row">
    <!-- Attribute tree -->
    <div class="col-md-3 attribute-tree">
      <div class="row">
        <div class="col">
          <strong>{{ 'attribute-tree-title' | i18n }}</strong>
          <button @click="addAttribute" class="btn btn-primary btn-sm float-right" aria-label="add attribute"><i
            class="fa fa-plus" aria-hidden="true"></i></button>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col">
          <div class="btn-toolbar float-right" role="toolbar"
               :aria-label="$t('button-group-aria-label')">
            <div class="btn-group mr-2" role="group">
              <button @click="moveAttribute('up')" class="btn btn-secondary btn-sm"
                      :disabled="!selectedAttribute || selectedAttributeIndex === 0" aria-label="move up">

                <i class="fa fa-chevron-up" aria-hidden="true"></i>
              </button>
              <button @click="moveAttribute('down')" class="btn btn-secondary btn-sm"
                      :disabled="!selectedAttribute || selectedAttributeIndex === editorEntityType.attributes.length - 1" aria-label="move down">

                <i class="fa fa-chevron-down" aria-hidden="true"></i>
              </button>
            </div>
            <div class="btn-group" role="group">
              <button @click="deleteAttribute(selectedAttribute)"
                      class="btn btn-danger float-right btn-sm"
                      :disabled="!selectedAttribute"
                      aria-label="delete">

                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <attribute-tree :selectedAttribute="selectedAttribute" :attributeTree="attributeTree"
                      :onAttributeSelect="onAttributeSelect"></attribute-tree>

      <p v-if="editorEntityType.entityTypeParent !== undefined">
        {{ 'compound-attribute-text' | i18n }}
        <strong>{{editorEntityType.entityTypeParent.label}}:</strong><br>
        <span v-for="attribute in editorEntityType.entityTypeParent.attributes">- {{attribute.label}} <br></span>
      </p>
    </div>

    <!-- Attribute form inputs -->
    <div v-if="!selectedAttribute" class="col-md-9">
      <div class="row">
        <div class="col">
          <h4 class="text-muted text-center">{{ 'no-attribute-selected-text' | i18n }}</h4>
        </div>
      </div>
    </div>
    <div v-else class="col-md-9">
      <div class="row">
        <div class="col attribute-form-header">
          <strong>{{ 'selected-attribute-label' | i18n }}:</strong> {{selectedAttribute.label}}
          <hr>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-name-label' |
              i18n }}</label>
            <div class="col">
              <input v-model="name" :disabled="!selectedAttribute.isNew" class="form-control" type="text"
                     :placeholder="$t('attribute-edit-form-name-placeholder')">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-label-label' |
              i18n }}</label>
            <div class="col input-group">
              <input v-model="label" class="form-control" type="text"
                     :placeholder="$t('attribute-edit-form-label-placeholder')">
              <div class="input-group-append">
                <button @click="showLabelLanguageInputs = !showLabelLanguageInputs" class="btn btn-outline-secondary"><i
                  class="fa fa-language fa-lg" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>

          <div v-if="showLabelLanguageInputs" v-for="languageCode in languageCodes"
               class="form-group row">
            <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-label-label' | i18n
              }} ({{ languageCode }})</label>
            <div class="col">
              <input :value="labelI18n[languageCode]"
                     @input="updateLabelI18n(languageCode, $event.target.value)" class="form-control"
                     type="text"
                     :placeholder="$t('attribute-edit-form-label-placeholder')">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label text-muted">{{
              'attribute-edit-form-description-label' | i18n }}</label>
            <div class="col input-group">
              <input v-model="description" class="form-control" type="text"
                     :placeholder="$t('attribute-edit-form-description-placeholder')">
              <div class="input-group-append">
                <button @click="showDescriptionLanguageInputs = !showDescriptionLanguageInputs" class="btn btn-outline-secondary"><i
                  class="fa fa-language fa-lg" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>

          <div v-if="showDescriptionLanguageInputs" v-for="languageCode in languageCodes"
               class="form-group row">
            <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-description-label' |
              i18n
              }} ({{ languageCode }})</label>
            <div class="col">
              <input :value="descriptionI18n[languageCode]"
                     @input="updateDescriptionI18n(languageCode, $event.target.value)" class="form-control"
                     type="text"
                     :placeholder="$t('attribute-edit-form-description-placeholder')">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-type-label' |
              i18n }}</label>
            <div class="col">
              <multiselect v-model="type" :options="attributeTypes"
                           selectLabel="" deselectLabel=""
                           :placeholder="$t('attribute-edit-form-type-placeholder')"></multiselect>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-parent-label' |
              i18n }}</label>
            <div class="col">
              <multiselect v-model="parent" :options="compoundAttributes" label="label"
                           selectLabel="" deselectLabel=""
                           :placeholder="$t('attribute-edit-form-parent-placeholder')"></multiselect>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label text-muted">{{
              'attribute-edit-form-default-value-label' | i18n }}</label>
            <div class="col">
              <input v-model="defaultValue" class="form-control" type="text"
                     :placeholder="$t('attribute-edit-form-default-value-placeholder')">
            </div>
          </div>

          <div v-if="isReferenceType" class="form-group row">
            <label class="col-3 col-form-label text-muted">{{
              'attribute-edit-form-reference-entity-label' | i18n
              }}</label>
            <div class="col">
              <multiselect v-model="refEntityType" :options="entityTypes" label="label"
                           selectLabel="" deselectLabel=""
                           :placeholder="$t('attribute-edit-form-reference-entity-placeholder')"></multiselect>
            </div>
          </div>

          <div v-if="isReferenceType" class="form-group row">
            <div class="col-3 text-muted"><label for="cascadeDeleteCheckbox">{{ 'attribute-edit-form-cascade-delete-label' | i18n }}</label></div>
            <div class="col-9">
              <div class="form-check">
                <input v-model="cascadeDelete" class="form-check-input position-static" type="checkbox" id="cascadeDeleteCheckbox">
              </div>
            </div>
          </div>

          <div v-else-if="isNumericType">
            <div class="form-group row">
              <label class="col-3 col-form-label text-muted">{{
                'attribute-edit-form-minimum-range-label' | i18n
                }}</label>
              <div class="col">
                <input v-model.number="rangeMin" class="form-control" type="number"
                       :placeholder="$t('attribute-edit-form-minimum-range-placeholder')">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-3 col-form-label text-muted">{{
                'attribute-edit-form-maximum-range-label' | i18n
                }}</label>
              <div class="col">
                <input v-model.number="rangeMax" class="form-control" type="number"
                       :placeholder="$t('attribute-edit-form-maximum-range-placeholder')">
              </div>
            </div>
          </div>

          <div v-else-if="isEnumType" class="form-group row">
            <label class="col-3 col-form-label text-muted">{{
              'attribute-edit-form-enum-options-label' | i18n }}</label>
            <div class="col">
              <input v-model.lazy="enumOptions" class="form-control" type="text"
                     :placeholder="$t('attribute-edit-form-enum-options-placeholder')">
            </div>
          </div>

          <div v-if="isOneToManyType">
            <div class="form-group row">
              <label class="col-3 col-form-label text-muted">{{
                'attribute-edit-form-mapped-by-label' | i18n }}</label>
              <div class="col">
                <multiselect v-model="mappedByAttribute" :options="mappedByAttributes"
                             :custom-label="customOneToManyLabel"
                             selectLabel="" deselectLabel=""
                             :placeholder="$t('attribute-edit-form-mapped-by-placeholder')"></multiselect>
              </div>
            </div>

            <!-- TODO: make this editable -->
            <div class="form-group row" v-if="orderBy && orderBy.orders">
              <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-order-by-label'
                | i18n }}</label>
              <div class="col">
                <p class="form-control-static">
                  <span v-for="o in orderBy.orders"> {{o.attributeName}}
                  <i class="fa"
                    aria-hidden="true"
                     :class="{'fa-sort-amount-asc': o.direction === 'ASC', 'fa-sort-amount-desc': o.direction === 'DESC'}"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">

          <div class="form-group row">
            <div class="col-9 text-muted"><label for="nullableCheckbox">{{ 'attribute-edit-form-nullable-label' | i18n }}</label></div>
            <div class="col-3">
              <div class="form-check">
                <input v-model="nullable" class="form-check-input position-static" type="checkbox" id="nullableCheckbox">
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-9 text-muted"><label for="autoCheckbox">{{ 'attribute-edit-form-auto-label' | i18n }}</label></div>
            <div class="col-3">
              <div class="form-check">
                <input v-model="auto" class="form-check-input position-static" type="checkbox" id="autoCheckbox">
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-9 text-muted"><label for="visibleCheckbox">{{ 'attribute-edit-form-visible-label' | i18n }}</label></div>
            <div class="col-3">
              <div class="form-check">
                <input v-model="visible" class="form-check-input position-static" type="checkbox" id="visibleCheckbox">
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group row">
            <div class="col-9 text-muted"><label for="uniqueCheckbox">{{ 'attribute-edit-form-unique-label' | i18n }}</label></div>
            <div class="col-3">
              <div class="form-check">
                <input v-model="unique" class="form-check-input position-static" type="checkbox" id="uniqueCheckbox">
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-9 text-muted"><label for="readonlyCheckbox">{{ 'attribute-edit-form-readonly-label' | i18n }}</label></div>
            <div class="col-3">
              <div class="form-check">
                <input v-model="readonly" class="form-check-input position-static" type="checkbox" id="readonlyCheckbox">
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-9 text-muted"><label for="aggregatableCheckbox">{{ 'attribute-edit-form-aggregatable-label' | i18n }}</label></div>
            <div class="col-3">
              <div class="form-check">
                <input v-model="aggregatable" class="form-check-input position-static" type="checkbox" id="aggregatableCheckbox">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label class="text-muted">{{ 'attribute-edit-form-computed-expression-label' | i18n
              }}</label>
            <textarea v-model="expression" class="form-control" rows="3"
                      :placeholder="$t('attribute-edit-form-computed-expression-placeholder',
                        { interpolation: { prefix: '<<', suffix: '>>' } })"></textarea>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label class="text-muted">{{ 'attribute-edit-form-nullable-expression-label' | i18n
              }}</label>
            <textarea v-model="nullableExpression" class="form-control" rows="3"
                      :placeholder="$t('attribute-edit-form-nullable-expression-placeholder')"></textarea>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label class="text-muted">{{ 'attribute-edit-form-visible-expression-label' | i18n
              }}</label>
            <textarea v-model="visibleExpression" class="form-control" rows="3"
                      :placeholder="$t('attribute-edit-form-visible-expression-placeholder')"></textarea>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label class="text-muted">{{ 'attribute-edit-form-validation-expression-label' | i18n
              }}</label>
            <textarea v-model="validationExpression" class="form-control" rows="3"
                      :placeholder="$t('attribute-edit-form-validation-expression-placeholder')"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

  @media (min-width: 768px) {
    .col-md-3.attribute-tree {
      border-right: solid black thin;
      overflow-x: auto;
      white-space: nowrap;
    }
  }

</style>

<script>
  import AttributeTree from './generic-components/AttributeTree'
  import {mapState, mapGetters} from 'vuex'
  import {
    SET_SELECTED_ATTRIBUTE_ID,
    UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
    DELETE_SELECTED_ATTRIBUTE,
    UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE_ORDER
  } from '../store/mutations'

  import {CREATE_ATTRIBUTE} from '../store/actions'
  import {getConfirmBeforeDeletingProperties} from '../store/getters'

  import Multiselect from 'vue-multiselect'

  export default {
    name: 'metadata-manager-attribute-edit-form',
    data: function () {
      return {showLabelLanguageInputs: false, showDescriptionLanguageInputs: false}
    },
    methods: {
      deleteAttribute (selectedAttribute) {
        this.$swal(getConfirmBeforeDeletingProperties(selectedAttribute.label, this.$t)).then(
          () => {
            this.$store.commit(DELETE_SELECTED_ATTRIBUTE, selectedAttribute.id)
          }).catch(this.$swal.noop)
      },
      onAttributeSelect (selectedAttribute) {
        this.$store.commit(SET_SELECTED_ATTRIBUTE_ID, selectedAttribute.id)
      },
      addAttribute () {
        this.$store.dispatch(CREATE_ATTRIBUTE)
      },
      moveAttribute (moveOrder) {
        this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE_ORDER, {
          moveOrder: moveOrder,
          selectedAttributeIndex: this.selectedAttributeIndex
        })
      },
      customOneToManyLabel (attr) {
        return `${attr.entity.label} - ${attr.label}`
      },
      updateLabelI18n (languageCode, value) {
        var labelI18n = Object.assign({}, this.selectedAttribute.labelI18n)
        labelI18n[languageCode] = value
        this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'labelI18n', value: labelI18n})
      },
      updateDescriptionI18n (languageCode, value) {
        var descriptionI18n = Object.assign({}, this.selectedAttribute.descriptionI18n)
        descriptionI18n[languageCode] = value
        this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'descriptionI18n', value: descriptionI18n})
      }
    },
    computed: {
      ...mapState(['languageCodes', 'editorEntityType', 'attributeTypes', 'entityTypes']),
      ...mapGetters({
        selectedAttributeIndex: 'getIndexOfSelectedAttribute',
        selectedAttribute: 'getSelectedAttribute',
        editorEntityTypeAttributes: 'getEditorEntityTypeAttributes',
        attributeTree: 'getAttributeTree',
        compoundAttributes: 'getCompoundAttributes',
        mappedByAttributes: 'getMappedByAttributes'
      }),
      isReferenceType: function () {
        return ['file', 'xref', 'mref', 'categorical', 'categoricalmref', 'onetomany'].includes(
          this.selectedAttribute.type)
      },
      isNumericType: function () {
        return ['int', 'long'].includes(this.selectedAttribute.type)
      },
      isEnumType: function () {
        return this.selectedAttribute.type === 'enum'
      },
      isOneToManyType: function () {
        return this.selectedAttribute.type === 'onetomany'
      },
      name: {
        get () {
          return this.selectedAttribute.name
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'name', value: value})
        }
      },
      label: {
        get () {
          return this.selectedAttribute.label
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'label', value: value})
        }
      },
      labelI18n: function () {
        return this.selectedAttribute.labelI18n
      },
      description: {
        get () {
          return this.selectedAttribute.description
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'description', value: value})
        }
      },
      descriptionI18n: function () {
        return this.selectedAttribute.descriptionI18n
      },
      parent: {
        get () {
          return this.selectedAttribute.parent
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'parent', value: value})
        }
      },
      defaultValue: {
        get () {
          return this.selectedAttribute.defaultValue
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'defaultValue', value: value === '' ? null : value})
        }
      },
      type: {
        get () {
          return this.selectedAttribute.type
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'type', value: value})
        }
      },
      refEntityType: {
        get () {
          return this.selectedAttribute.refEntityType
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'refEntityType', value: value})
        }
      },
      cascadeDelete: {
        get () {
          return this.selectedAttribute.cascadeDelete
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'cascadeDelete', value: value})
        }
      },
      nullable: {
        get () {
          return this.selectedAttribute.nullable
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'nullable', value: value})
        }
      },
      auto: {
        get () {
          return this.selectedAttribute.auto
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'auto', value: value})
        }
      },
      visible: {
        get () {
          return this.selectedAttribute.visible
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'visible', value: value})
        }
      },
      unique: {
        get () {
          return this.selectedAttribute.unique
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'unique', value: value})
        }
      },
      readonly: {
        get () {
          return this.selectedAttribute.readonly
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'readonly', value: value})
        }
      },
      aggregatable: {
        get () {
          return this.selectedAttribute.aggregatable
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'aggregatable', value: value})
        }
      },
      expression: {
        get () {
          return this.selectedAttribute.expression
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'expression', value: value === '' ? null : value})
        }
      },
      nullableExpression: {
        get () {
          return this.selectedAttribute.nullableExpression
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'nullableExpression', value: value === '' ? null : value})
        }
      },
      visibleExpression: {
        get () {
          return this.selectedAttribute.visibleExpression
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'visibleExpression', value: value === '' ? null : value})
        }
      },
      validationExpression: {
        get () {
          return this.selectedAttribute.validationExpression
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'validationExpression', value: value === '' ? null : value})
        }
      },
      enumOptions: {
        get () {
          return this.selectedAttribute.enumOptions.join(',')
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'enumOptions', value: value.split(',')})
        }
      },
      mappedByAttribute: {
        get () {
          return this.selectedAttribute.mappedByAttribute
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
            {key: 'mappedByAttribute', value: value})
        }
      },
      orderBy: {
        get () {
          return this.selectedAttribute.orderBy
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'orderBy', value: value})
        }
      },
      rangeMin: {
        get () {
          return this.selectedAttribute.rangeMin
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'rangeMin', value: value})
        }
      },
      rangeMax: {
        get () {
          return this.selectedAttribute.rangeMax
        },
        set (value) {
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'rangeMax', value: value})
        }
      }
    },
    components: {
      AttributeTree,
      Multiselect
    }
  }
</script>
