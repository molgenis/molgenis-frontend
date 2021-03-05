<template>
  <div class="text-nowrap text-truncate mouse-ref">
    <a href="details" @click.prevent="$bvModal.show(value.id)" >
      {{value.label}}
    </a>
    <a :href="value.url" class="ml-1">
      <font-awesome-icon icon="download" />
    </a>

    <b-modal :id="value.id" title="File details" hide-footer>
      <dl class="row">
        <dt class="col-sm-3">{{ 'dataexplorer_file_modal_name_label' | i18n}}</dt>
        <dd class="col-sm-9">{{value.filename}}</dd>
        <dt class="col-sm-3">{{ 'dataexplorer_file_modal_content_type_label' | i18n}}</dt>
        <dd class="col-sm-9">{{value.contentType}}</dd>
        <dt class="col-sm-3">{{ 'dataexplorer_file_modal_size_label' | i18n}}</dt>
        <dd class="col-sm-9">{{value.size}} byte</dd>
        <dt class="col-sm-3">{{ 'dataexplorer_file_modal_url_label' | i18n}}</dt>
        <dd class="col-sm-9"><a :href=value.url>{{value.url}}</a></dd>
      </dl>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'FileDisplay',
  props: {
    value: {
      /*
      *  id:string
      *  filename:string
      *  contentType:string
      *  label:string
      *  size:number
      *  url:string (full url)
      */
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
dl dt, dl dd
{
  flex: null;
  max-width: 100%;
}
</style>
