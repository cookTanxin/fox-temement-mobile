import axios from "axios"

export function getBAiDuIpCity() {
  return new Promise((resolve, reject) => {
    try {
      const localCity = new window.BMapGL.LocalCity()
      localCity.get((res) => {
        resolve(res)
      })
    } catch (e) {
      reject(e)
    }
  })
}
