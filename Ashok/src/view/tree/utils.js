export const getPerson = data => {
  let arr = []
  if (!Array.isArray(data) || !data.length) return arr
  data.forEach((select, index) => {
    if (select.children) {
      const child = getPerson(select.children)
      arr = [...arr, ...child]
    } else {
      arr.push(select)
    }
  })
  return arr
}

export const getPersonNum = data => {
  let arr = []
  if (!Array.isArray(data) || !data.length) return 0
  data.forEach((select, index) => {
    if (select.children) {
      const child = getPerson(select.children)
      arr = [...arr, ...child]
    } else {
      arr.push(select)
    }
  })
  return arr.length
}

export const splitSring = str => {
  let sub = str.substr(0, 5) + '...'
  return str.length > 5 ? sub : str
}
