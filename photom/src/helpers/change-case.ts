import { camelCase, snakeCase } from 'change-case'
import deepMapKeys from 'deep-map-keys'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAnyObject = { [k: string]: any }

const camelCaseKeys = (obj: TAnyObject): TAnyObject => deepMapKeys(obj, camelCase)
const snakeCaseKeys = (obj: TAnyObject): TAnyObject => deepMapKeys(obj, snakeCase)

export { camelCase, snakeCase, camelCaseKeys, snakeCaseKeys }
