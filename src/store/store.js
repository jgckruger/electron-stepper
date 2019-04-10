export const store = {
  state: {
    configMotor:{
      ipEsp: null,
      sentido: null,
      velocidade: null,
      aceleracao: null
    }
  },
  setConfig(newConfig) {
    this.state.configMotor = Object.assign({}, newConfig);
  },
  getConfig() {
    return this.state.configMotor;
  },
  getState() {
    return this.state;
  }
};