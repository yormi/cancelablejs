export default function MakeCancelable (promise, cb) {
  let isCanceled

  const cancelableCallback = (data) => {
    if (isCanceled) return

    return cb ? cb(data) : data
  }

  const newPromise = promise.then(cancelableCallback)

  newPromise.cancel = () => {
    isCanceled = true
  }

  return newPromise
}
