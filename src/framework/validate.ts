import * as Parameter from 'parameter'
const validateRule = (paramPart) => (rule) => {
    return (target, name, descriptor) => {
        const oldValue = descriptor.value
        descriptor.value = (...args) => {
            const ctx = args[0]
            const p = new Parameter()
            const data = ctx[paramPart]
            const errors = p.validate(rule, data)
            if (errors) {
                throw new Error(JSON.stringify(errors))
            }
            return oldValue.apply(null, args)
        }
        return descriptor
    }
}

export const querystring = validateRule('query')
export const body = validateRule('body')
