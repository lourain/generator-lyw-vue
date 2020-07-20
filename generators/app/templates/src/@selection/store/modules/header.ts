const state = {
  language: 'zh',
};

const getters = {};

const mutations = {
  // tslint:disable-next-line: no-shadowed-variable
  setLanguage(state: any, payload: any) {
    state.language = payload.language;
  },
};

const actions = {
  changeLang(context: any, language: string) {
    const { commit } = context;
    commit({
      type: 'setLanguage',
      language,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
