import * as types from './mutation_types'
const mutations = {
  [types.SET_SINGER](state,singer){
    state.singer = singer
  },
  [types.SET_PLAYING_STAT](state,flag){
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state,flag){
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state,list){
    state.playList = list
  },
  [types.SET_PLAY_MODE](state,mode){
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state,index){
    state.currentIndex = index
  }
}
