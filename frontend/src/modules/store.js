
// or localStorage

let data = {

}

export default {
  get(id) {
    return data[id];
  },
  set(id, value) {
    data[id] = value;
  }
}

