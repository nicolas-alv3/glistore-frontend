import shajs from 'sha.js';

export function hash(value :string) :string {
    return shajs('sha256').update(value).digest('hex')
}