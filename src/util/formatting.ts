// src/utils/formatting.js
export const formatTimestamp = (d: string | undefined | null | number) => {
  if (!d) {
    return ''
  }
  return new Date(d).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export const formatTimestampLong = (d: string | undefined | null | number) => {
  if (!d) {
    return ''
  }
  return new Date(d).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'long',
  })
}

export const formatOnlyTime = (d: string | undefined | null | number) => {
  if (!d) {
    return ''
  }
  return new Date(d).toLocaleString(undefined, {
    timeStyle: 'short',
  })
}

export const formatGraphTime = (d: string | undefined | null | number) => {
  if (!d) {
    return ''
  }
  var date = new Date(d).toLocaleString(undefined, {
               dateStyle: 'short',
             })
  var time = new Date(d).toLocaleString(undefined, {
               timeStyle: 'short',
             })
  return { date: date, time: time };
}
