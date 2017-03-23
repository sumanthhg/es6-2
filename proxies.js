/** Proxies **/

// Proxies allows us to defined behaviour whenever
// the properties of a target object are accessed.
var target = {}
// The handler object is used to configure traps for
// our Proxy.
var handler = {}
var proxy = new Proxy(target, handler)

// Proxy works as a simple pass-through to the target.
proxy.foo = 'Mr.Foo'

console.log(target.foo) // 'Mr.Foo'
console.log(target.bar) // undefined

// We can define Traps on our handler.
// Traps allow us to intercept interactions on target,
// as long as those interactions happen through the Proxy.

// Let's define a Trap on the handler.get().
var handler = {
    // The handler.get() method is a trap for getting a property value.
    get: function (target, property, receiver) {
        // We run our Trap code, i.e. console.log.
        console.log(`Got property ${property}`)
        // Then return the value as .get() will usually do.
        return target[property]
    }
}
var target = { foo: 'Mr.Foo' }
var proxy = new Proxy(target, handler)

console.log(proxy.foo)
// 'Got property foo'
// 'Mr.Foo'

// A use case for a Proxy would be to block the access to private properties.
// Let's assume that a private property begin with underscore.
// To simplify we will only define a Trap for .set().
var handler = {
    set: function (target, property, receiver) {
        if (property[0] === '_') {
            throw new Error (`Invalid attempt to set the private property ${property}`)
        }
        target[property] = receiver;
        return true;
    }
}
var target = { foo: 'Mr.Foo', _bar: 'Mr.Bar' }
var proxy = new Proxy(target, handler)

proxy.foo = 'Foo'   // Ok
console.log(target.foo);
// proxy._bar = 'Bar'  // Invalid attempt to set the private property _bar

// It is important to design our proxy in a way
// that the target object is only acessible through the Proxy.
// Only this way we will ensure that we will obey our access rules.