export default {
  namespaced:true,
  state:()=>({
    address:JSON.parse(uni.getStorageSync('address')||'{}')
  }),
  mutations:{
    updateAddress(state,address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
  getters:{
    addstr() {
      if(!this.address.provinceName) return ''
      return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
    }
  }
}