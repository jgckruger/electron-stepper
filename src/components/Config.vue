<template>
  <div style="padding: 100px;">
    <form novalidate class="md-layout" @submit.prevent="validateConfig">
      <md-card class="md-layout-item md-size-50 md-small-size-100" style="margin-left:auto;margin-right:auto;">
        <md-card-header>
          <div class="md-title">Configurações</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('ipEsp')">
                <label for="ipEsp">IP do ESP</label>
                <md-input name="ipEsp" id="ipEsp" v-model="form.ipEsp" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.ipEsp.required">O IP do ESP é obrigatório!</span>
                <span class="md-error" v-else-if="!$v.form.ipEsp.minlength">O IP do ESP é inválido!</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('velocidade')">
                <label for="velocidade">Velocidade</label>
                <md-input type="number" id="velocidade" name="velocidade" autocomplete="velocidade" v-model="form.velocidade" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.velocidade.required">The velocidade is required</span>
                <span class="md-error" v-else-if="!$v.form.velocidade.maxlength">Invalid velocidade</span>
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('aceleracao')">
                <label for="aceleracao">Aceleração</label>
                <md-input type="number" id="aceleracao" name="aceleracao" autocomplete="aceleracao" v-model="form.aceleracao" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.aceleracao.required">The aceleracao is required</span>
                <span class="md-error" v-else-if="!$v.form.aceleracao.maxlength">Invalid aceleracao</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('sentido')">
                <label for="sentido">Sentido</label>
                <md-select name="sentido" id="sentido" v-model="form.sentido" md-dense :disabled="sending">
                  <md-option value="horario">Horário</md-option>
                  <md-option value="anti-horario">Anti-horário</md-option>
                </md-select>
                <span class="md-error">Sentido é obrigatório</span>
              </md-field>
            </div>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-accent" v-bind:class="!this.$v.$invalid?'md-raised':''" :disabled="sending">Enviar configuração</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="configSaved">A configuração {{ configMotor }} foi salva com sucesso!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import { store } from '@/store/store'

  window.store = store

  const { ipcRenderer } = require('electron')

  export default {
    name: 'Config',
    mixins: [validationMixin],
    data: () => ({
      configMotor: Object.assign({}, store.getConfig()),
      form: {
        ipEsp: store.getConfig().ipEsp,
        sentido: store.getConfig().sentido,
        velocidade: store.getConfig().velocidade,
        aceleracao: store.getConfig().aceleracao
      },
      configSaved: false,
      sending: false
    }),
    validations: {
      form: {
        ipEsp: {
          required,
          minLength: minLength(3)
        },
        sentido: {
          required
        },
        velocidade: {
          required,
          minLength: minLength(3)
        },
        aceleracao: {
          required,
          minLength: minLength(3)
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
        //this.form.ipEsp = null
      },
      saveConfig () {
        this.sending = true
        this.configMotor = {
          ipEsp: this.form.ipEsp,
          sentido: this.form.sentido,
          velocidade: this.form.velocidade,
          aceleracao: this.form.aceleracao
        }

        store.setConfig(this.configMotor)

        // Chamando o electron e então mostrando o resultado
        this.enviaConfig().then(res=>{
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
      enviaConfig() {
        return new Promise((resolve,reject)=>{resolve(ipcRenderer.sendSync('configEsp', this.configMotor))})
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
