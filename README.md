# cancelablejs

Gives the power to cancel a callback without having to handle a rejected promise !

Very simple !
```javascript
import makeCancelable from 'cancelable'
makeCancelable (promise, callback)
```

## What it does ?

Let's take a look at the tests:

    ✓ handles no callback when it resolves
    ✓ does not call the callback if the promise is not resolved
    ✓ calls the callback when the promise resolves
    ✓ calls the callback with the value returned by the promise
    ✓ does not call the callback if the promise is canceled
    ✓ does not throw if the callback is cancelled
 
 ## You have a good idea ?
 
 Go for it ! :)

