<template>
  <div>
    <ul class="fa-ul">
      <draggable v-model="attributes" @start="drag=true" @end="drag=false">
        <attribute-tree-node v-for="attribute in attributes" :attribute="attribute"
                             :onAttributeSelect="onAttributeSelect"></attribute-tree-node>
      </draggable>
    </ul>
  </div>
</template>

<script>
  import { UPDATE_EDITOR_ENTITY_TYPE } from '../../store/mutations'

  import AttributeTreeNode from './AttributeTreeNode'
  import draggable from 'vuedraggable'

  export default {
    name: 'attribute-tree',
    props: {
      attributeTree: {
        type: Array,
        required: true
      },
      onAttributeSelect: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        flatTree: []
      }
    },
    computed: {
      attributes: {
        get () {
          return this.attributeTree
        },
        set (value) {
          this.createFlatTree(value)
          this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, { key: 'attributes', value: this.flatTree })
        }
      }
    },
    methods: {
      createFlatTree (attributeTree) {
        this.flatTree = []
        this.fillFlatTree(attributeTree)
      },
      fillFlatTree (attributeTree) {
        attributeTree.forEach((attr) => {
          this.flatTree.push(attr)
          if (attr.children.length > 0) {
            this.fillFlatTree(attr.children)
          }
        })
      }
    },
    components: {
      AttributeTreeNode,
      draggable
    }
  }
</script>
