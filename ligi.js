function set(obj, props) {
    for(const prop in props) {
        if(typeof props[prop] == 'object' && typeof obj[prop] == 'object' && !Array.isArray(props[prop]) && ~Array.isArray(obj[prop]))
            set(obj[prop], props[prop])
        else {
            if(obj[prop] != props[prop])
                obj[prop] = props[prop]
        }
    }
}

function list(el, key, create, f, initial) {
    el._list = initial || []
    return list => {
        const newListKeys = list.map(key)
        const oldListKeys = el._list.map(key)
        const indicesToRemove = []
        const childrenToRemove = []

        for(let i = 0; i < el._list.length; i++) {
            if(newListKeys.indexOf(oldListKeys[i]) < 0) {
                indicesToRemove.push(i)
                childrenToRemove.push(el.children[i])
            }
        }

        for(const i of indicesToRemove)
            el._list.splice(i, 1)
        
        for(const child of childrenToRemove)
            el.removeChild(child)

        for(let i = 0; i < list.length; i++) {
            if(oldListKeys.indexOf(newListKeys[i]) < 0)
                el.insertBefore(create(list[i]), el.children[i])

            f(el.children[i], list[i])
        }

        el._list = Array.from(list)
    }
}

function createElement(tag, props, ...children) {
    const el = document.createElement(tag, props || {})

    if(typeof props == 'object') {
        for(const prop in props) {
            if(prop.startsWith('on'))
                el.addEventListener(prop.substr(2), props[prop])
            else if(prop != 'is')
                el[prop] = props[prop]
        }
    }

    for(const child of children) {
        if(typeof child == 'string')
            el.appendChild(document.createTextNode(child))
        else
            el.appendChild(child)
    }

    return el
}

function equals(a, b) {
    if(typeof a != typeof b)
        return false
    
    if(typeof a == 'object') {
        if(Array.isArray(a) && Array.isArray(b)) {
            if(a.length != b.length)
                return false
            
            for(let i = 0; i < a.length; i++) {
                if(!equals(a[i], b[i]))
                    return false
            }
        } else {

            for(const key in a) {
                if(!equals(a[key], b[key]))
                    return false
            }

            for(const key in b) {
                if(!equals(a[key], b[key]))
                    return false
            }
        }

        return true
    } else return a == b
}

export default function $_(...args) {
    if(typeof args[0] == 'string')
        return createElement(...args)
    if(args.length == 2)
        set(...args)
    else if(args.length == 1 && Array.isArray(args[0])) {
        for(const item of args[0].slice(1)) {
            if(!equals(item, args[0][0]))
                return false
        }

        return true
    } else
        return list(...args)
}