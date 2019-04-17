<template>
  <div style="padding: 100px;">
    <form novalidate class="md-layout" @submit.prevent="validateConfig">
      <md-card class="md-layout-item md-size-50 md-small-size-100" style="margin-left:auto;margin-right:auto;">
        <md-card-header>
          <div class="md-title">Comandos</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('distancia')">
                <label for="distancia">Distância</label>
                <md-input type="number" name="distancia" id="distancia" v-model="form.distancia" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.distancia.required">A distância é obrigatória!</span>
              </md-field>
            </div>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-accent" v-bind:class="!this.$v.$invalid?'md-raised':''" :disabled="sending">Enviar distância</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="configSaved">O comando {{ lastRes }} foi enviado com sucesso!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required
  } from 'vuelidate/lib/validators'
  import { store } from '@/store/store'
  
  const { ipcRenderer } = require('electron')

  window.store = store

  export default {
    name: 'Command',
    mixins: [validationMixin],
    data: () => ({
      form: {
        distancia: null
      },
      lastRes: null,
      configSaved: false,
      sending: false
    }),
    validations: {
      form: {
        distancia: {
          required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.distancia = null
      },
      saveConfig () {
        this.sending = true

        // Chamando o electron e então mostrando o resultado
        this.sendDistancia().then(res=>{
          this.lastRes = res
          this.configSaved = true
          this.sending = false
          this.clearForm()
          console.log(res);
        });
      },
      validateConfig () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.saveConfig()
        }
      },
      sendDistancia() {
        return new Promise((resolve,reject)=>{resolve(ipcRenderer.sendSync('sendDistancia', this.form.distancia))})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
