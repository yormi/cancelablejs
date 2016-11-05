/* global describe, beforeEach, it */

import assert from 'assert'
import sinon from 'sinon'

import makeCancelable from '../make_cancelable'

describe('Cancelable', () => {
  const cb = sinon.spy()

  beforeEach(() => {
    cb.reset()
  })

  it('handles no callback when it resolves', async () => {
    try {
      await makeCancelable(fakeAsync())
    } catch (err) {
      assert.fail(err)
    }
  })

  it('does not call the callback if the promise is not resolved', async () => {
    const promise = makeCancelable(fakeAsync(), cb)
    sinon.assert.notCalled(cb)
    await promise
  })

  it('calls the callback when the promise resolve', async () => {
    await makeCancelable(fakeAsync(), cb)
    sinon.assert.calledOnce(cb)
  })

  it('calls the callback with the value returned by the promise', async () => {
    const someData = 'banana'
    await makeCancelable(Promise.resolve(someData), cb)
    sinon.assert.calledWith(cb, someData)
  })

  it('does not call the callback if the promise is not resolved', async () => {
    await makeCancelable(fakeAsync(), cb).cancel()
    sinon.assert.notCalled(cb)
  })

  it('does not throw if the callback is cancelled', async () => {
    try {
      await makeCancelable(fakeAsync(), cb).cancel()
    } catch (err) {
      assert.fail(err)
    }
  })
})

const fakeAsync = (time = 5) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
